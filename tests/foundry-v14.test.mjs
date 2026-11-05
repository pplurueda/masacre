import { strict as assert } from "node:assert";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const registrations = [];
const hooks = new Map();
const messages = [];
const templates = [];

// Deliberately expose only namespaced APIs, not the old Foundry globals.
class Sheet {
  constructor(document, options = {}) {
    this.actor = document;
    this.item = document;
    this.options = options;
    this.isEditable = true;
  }

  static get defaultOptions() {
    return {};
  }

  async getData(options) {
    return { actor: this.actor, item: this.item, options };
  }
}

class Document {
  prepareDerivedData() {}
}

class Roll {
  constructor(formula) {
    this.formula = formula;
  }

  async evaluate() {
    this.total = 4;
    return this;
  }
}

globalThis.foundry = {
  abstract: { TypeDataModel: class {} },
  data: { fields: {} },
  appv1: { sheets: { ActorSheet: Sheet, ItemSheet: Sheet } },
  applications: {
    sheets: { ActorSheetV2: class {}, ItemSheetV2: class {} },
    apps: {
      DocumentSheetConfig: {
        registerSheet: (...args) => registrations.push(args),
        unregisterSheet: () => {}
      }
    },
    handlebars: {
      loadTemplates: async paths => {
        templates.push(...paths);
      },
      renderTemplate: async (path, data) => JSON.stringify({ path, data })
    }
  },
  utils: { mergeObject: (base, options) => ({ ...base, ...options }) },
  documents: {
    Actor: Document,
    Item: Document,
    ChatMessage: {
      getSpeaker: ({ actor }) => ({ actor: actor.id, token: actor.token?.id }),
      create: async data => {
        assert.equal(data.type, undefined);
        assert.equal(data.roll, undefined);
        assert.equal(data.style, 0);
        messages.push(data);
        return data;
      }
    }
  },
  dice: { Roll }
};
globalThis.Hooks = {
  once: (name, callback) => hooks.set(name, callback),
  on: (name, callback) => hooks.set(name, callback)
};
globalThis.Handlebars = require("handlebars");
globalThis.CONFIG = { debug: {}, Actor: {}, Item: {} };
globalThis.CONST = { CHAT_MESSAGE_STYLES: { OTHER: 0 } };
globalThis.game = { user: { isGM: true }, combat: null };

await import("../masacre.js");
hooks.get("init")();

test("v14 manifest and system initialization use namespaced APIs", async () => {
  const manifest = JSON.parse(await readFile(new URL("../system.json", import.meta.url)));
  assert.deepEqual(manifest.compatibility, { minimum: "14", verified: "14", maximum: "14" });
  assert.equal(registrations.length, 8);
  for (const [document, scope, sheet, options] of registrations) {
    assert.ok([foundry.documents.Actor, foundry.documents.Item].includes(document));
    assert.equal(scope, "masacre");
    assert.ok(sheet.prototype instanceof Sheet);
    assert.equal(options.makeDefault, true);
    assert.equal(options.types.length, 1);
    assert.ok(sheet.defaultOptions.classes.includes("masacre"));
    await readFile(new URL(`../${new sheet({}).template.replace("systems/masacre/", "")}`, import.meta.url));
  }
  assert.equal(templates.length, 19);
  for (const path of templates) {
    await readFile(new URL(`../${path.replace("systems/masacre/", "")}`, import.meta.url));
  }
});

test("all sheet contexts await parent data and receive system configuration", async () => {
  const document = { id: "actor-id", system: {}, isOwner: true };
  const options = { test: true };
  for (const [, , SheetClass] of registrations) {
    const data = await new SheetClass(document).getData(options);
    assert.equal(data.config, CONFIG.masacre);
    assert.equal(data.options, options);
    assert.equal(data.actor, document);
  }
});

test("ability and casualty rolls attach rolls and preserve formula text", async () => {
  const { realizarTiradas } = await import("../modules/realizarTiradas.js");
  const actor = { id: "actor-id", name: "Marine", system: {}, token: { id: "token-id" } };
  const start = messages.length;
  const result = await realizarTiradas.actor.hability(actor, { type: "hability", value: "6" });
  await realizarTiradas.item.bajas(actor, { type: "bajas", value: "2d6" });
  assert.equal(result, 4);
  const rolls = messages.slice(start);
  assert.equal(rolls.length, 2);
  for (const message of rolls) {
    assert.equal(message.rolls.length, 1);
    assert.ok(message.rolls[0] instanceof Roll);
    assert.deepEqual(message.speaker, { actor: actor.id, token: actor.token.id });
  }
  assert.equal(JSON.parse(rolls[0].content).data.success, true);
  assert.equal(JSON.parse(rolls[1].content).data.value, "2d6");
});

test("item info messages use the v14 chat style", async () => {
  const actor = { id: "actor-id", name: "Marine" };
  const item = { type: "weapon", toObject: () => ({ name: "Rifle" }) };
  const start = messages.length;
  for (const [, , SheetClass] of registrations.filter(([, , , options]) =>
    ["character", "alien"].includes(options.types[0]))) {
    await new SheetClass(actor)._showItemInfo(item);
  }
  assert.equal(messages.length - start, 2);
  assert.ok(messages.slice(start).every(message => !message.rolls));
});

test("all weapon maximum stats are ready synchronously", async () => {
  const { MasacreItem } = await import("../modules/objects/MasacreItem.mjs");
  const item = new MasacreItem();
  item.type = "weapon";
  item.system = { cc: "1", cd: "1d10", ld: "3d10" };
  assert.equal(item.prepareDerivedData(), undefined);
  assert.equal(item.system.ccmax, "1d10");
  assert.equal(item.system.cdmax, "2d10");
  assert.equal(item.system.ldmax, "1d100");
});

test("initiative lookup tolerates combatants without an actor", async () => {
  const { MasacreActorSheet } = await import("../modules/sheets/MasacreActorSheet.mjs");
  const actor = { id: "actor-id" };
  const updates = [];
  game.combat = {
    combatants: [{ actor: null }, { id: "combatant-id", actor }],
    setInitiative: async (...args) => updates.push(args)
  };
  try {
    await new MasacreActorSheet(actor).setInitiative(4);
    assert.deepEqual(updates, [["combatant-id", 4]]);
  } finally {
    game.combat = null;
  }
});
