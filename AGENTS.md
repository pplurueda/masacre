# AGENTS.md — masacre (Foundry VTT v14 Game System)

## Project Overview

This is a **Foundry VTT v14 game system** implementing the tabletop RPG
**"3:16 Masacre en la Galaxia"** (3:16 Carnage Amongst the Stars).
It is written in plain JavaScript (ES Modules), uses Handlebars templates
for UI and LESS for styling. There is no build step, bundler, or transpiler.

- **Entry point:** `masacre.js` (registered via `system.json` as an ES module)
- **Foundry compatibility:** v14 only
- **System version:** `2.0.0` (see `system.json`)
- **Languages:** Spanish (primary) and English

## Foundry VTT API documentation URL
https://foundryvtt.com/api/

## Handlebars API documentation URL
https://handlebarsjs.com/

## Less API documentation URL
https://lesscss.org/

## Build / Compile / Test Commands

There is **no build pipeline, external test framework, or linter** configured in this project.

### CSS (LESS)

LESS files in `less/` are compiled to `masacre.css` at the project root.
The LESS files contain editor hints for the **VS Code "Easy LESS" extension**:

```
//main: ./masacre.less
//relativeUrls: true, out: ../masacre.css
```

If you modify any `.less` file, recompile by saving `less/masacre.less` with
Easy LESS enabled, or run manually:

```bash
npx lessc less/masacre.less masacre.css
```

### Running the System

Load Foundry VTT and select the "masacre" system. There is no standalone
dev server or hot-reload tooling. Refresh the Foundry browser tab after
changing `.js`/`.mjs`/`.hbs` files; recompile LESS after changing `.less` files.

### Tests

Run the API compatibility smoke tests with Node.js 22 or later:

```bash
node --test tests/foundry-v14.test.mjs
```

The tests use Node's built-in runner and Foundry API doubles, not a running world.
The six smoke tests cover initialization and manifest compatibility, sheet contexts,
chat rolls and item messages, synchronous weapon preparation, and initiative lookup.
Passing these tests does not establish full compatibility in a live Foundry world.
See `docs/foundry-v14.md` for the manual integration checklist.

### Linting

No ESLint or Prettier configuration exists. If adding linting in the future,
respect the existing code style documented below.

## Directory Structure

```
masacre.js                 # System entry point (hooks, registration)
system.json                # Foundry system manifest
masacre.css                # Compiled CSS (do not edit directly)
docs/foundry-v14.md         # Migration notes and manual integration checklist
tests/foundry-v14.test.mjs  # Node built-in runner tests with Foundry API doubles
packs/316-en-espanol/      # Spanish Item compendium (LevelDB database)
macros/                    # Standalone Foundry macros
lang/                      # Localization (es.json, en.json)
less/                      # LESS source stylesheets
modules/
  config.js                # System constants (flashback states/types)
  utils.js                 # Utility functions (placeholder)
  dice.js                  # Dice logic (placeholder)
  dialog.js                # Dialog logic (placeholder)
  realizarTiradas.js        # Ability/casualty rolls, chat messages, initiative
  documents/dataModels/    # TypeDataModel subclasses for actors/items
  objects/                 # Custom Actor/Item document classes
  sheets/                  # ActorSheet/ItemSheet subclasses
templates/
  sheets/actors/           # Actor sheet Handlebars templates
  sheets/items/            # Item sheet Handlebars templates
  partials/                # Reusable Handlebars partial templates
  messages/                # Item information and roll result chat templates
```

## Code Style

### Language and Modules

- **Plain JavaScript only** — no TypeScript, no JSDoc type annotations.
- All source files use **ES Module** syntax (`import`/`export`).
- `.mjs` extension for class-based module files, `.js` for config/utility files.

### Imports

- Always use **named imports**: `import { Foo } from './path.mjs';`
- Always include **explicit file extensions** (`.js` or `.mjs`).
- Use **relative paths** with `./` or `../` prefix.
- Foundry globals (`foundry`, `Hooks`, `CONFIG`, `game`, `ui`, `CONST`) are
  provided by the runtime — do not import them.
- Use namespaced APIs instead of legacy global aliases such as `ActorSheet`,
  `ItemSheet`, `Actors`, `Items`, `mergeObject`, `renderTemplate`, or `loadTemplates`.

```javascript
import { masacre } from './modules/config.js';
import { CharacterDataModel } from './modules/documents/dataModels/CharacterDataModel.mjs';
```

### Naming Conventions

| Element              | Convention   | Examples                                      |
|----------------------|------------- |-----------------------------------------------|
| Classes              | PascalCase   | `CharacterSheet`, `MasacreActor`              |
| Class files          | PascalCase   | `CharacterSheet.mjs`, `WeaponDataModel.mjs`   |
| Utility/config files | camelCase    | `config.js`, `utils.js`                       |
| Variables/functions  | camelCase    | `combatSkill`, `preloadHandlebarsTemplates`   |
| Private methods      | `_` prefix   | `_prepareCharacterDerivedData`, `_onItemControl` |
| CSS classes          | kebab-case   | `character-sheet`, `stat-box`                 |
| Data model fields    | camelCase    | `combatSkill`, `nonCombatSkill`, `deathAliens` |

Some identifiers use **Spanish** terms (e.g., `listaArmas`, `datosBasicos`,
`puntosVida`). Follow the existing convention in each file.

### Foundry Class Patterns

**Data Models** extend `foundry.abstract.TypeDataModel` (or the project's
`ActorDataModel` base class). Define fields in a static `defineSchema()` method
and spread the parent schema:

```javascript
static defineSchema() {
    const fields = foundry.data.fields;
    return {
        ...super.defineSchema(),
        myField: new fields.NumberField({ initial: 0 }),
    };
}
```

**Document classes** (`MasacreActor`, `MasacreItem`) extend `foundry.documents.Actor`
and `foundry.documents.Item`. Override `prepareDerivedData()` for computed values.
Keep data preparation synchronous, including weapon maximum-stat calculations;
do not use async helpers or document updates during preparation.

**Sheet classes** extend `foundry.appv1.sheets.ActorSheet` or
`foundry.appv1.sheets.ItemSheet` (legacy sheets, still available in v14). Use the static getter
`get defaultOptions()` with `foundry.utils.mergeObject(super.defaultOptions, {...})`.
Await `super.getData(options)` before extending sheet context. Register sheets through
`foundry.applications.apps.DocumentSheetConfig`. Use namespaced APIs for Handlebars
(`foundry.applications.handlebars`) and chat messages (`foundry.documents.ChatMessage`).
Chat rolls use `rolls: [roll]` and `style: CONST.CHAT_MESSAGE_STYLES.OTHER`, not legacy
`roll` or `CONST.CHAT_MESSAGE_TYPES`.
Use `foundry.dice.Roll` for dice and
`foundry.documents.ChatMessage.getSpeaker({ actor })` for roll speakers.
The configuration namespace is `CONFIG.masacre`, not `CONFIG.Masacre`.
The current UI still uses legacy sheet listeners and jQuery; it has not been
converted to ApplicationV2 and does not provide its native pop-out support.

### Handlebars Templates

- Use `{{localize "masacre.key"}}` for all user-facing strings. Add keys to
  both `lang/es.json` and `lang/en.json`.
- Reference partials with full system path:
  `{{> "systems/masacre/templates/partials/name.hbs"}}`
- Form inputs use `name="system.field.path"` for Foundry's automatic data binding.
- Templates live in `templates/sheets/` (full sheets) and `templates/partials/`
  (reusable fragments).

### LESS / CSS

- Main entry: `less/masacre.less` (imports all other files).
- One LESS file per sheet type (e.g., `charactersheetTMP.less`, `alienSheet.less`).
- Use kebab-case for CSS class names.
- The compiled output `masacre.css` should not be edited directly.

### Error Handling

- Minimal explicit error handling in the codebase.
- Use **guard clauses** for type checks and null checks:
  ```javascript
  if (this.type !== "character") return;
  if (item.actor === undefined) return;
  ```
- Do not add try/catch blocks unless interfacing with external APIs or async
  operations that may genuinely fail.

### Formatting

- **2-space indentation** in JavaScript files.
- Opening braces on the same line as the statement.
- Use `const` for values that are not reassigned; `let` when reassignment is needed.
- No semicolons are required (the codebase is inconsistent — some files use them,
  some omit them). Match the style of the file you are editing.

### Localization

- All user-visible strings must be localized via `lang/es.json` and `lang/en.json`.
- Localization keys follow the pattern `masacre.category.key`
  (e.g., `masacre.Reputation`, `masacre.CombatSkill`).
- Spanish is the **primary** language; ensure Spanish translations are always present.

## Document Types (from system.json)

- **Actor types:** `character`, `alien`
- **Item types:** `weapon`, `rank`, `flashback`, `alienHability`, `equipment`,
  `resource`, `medal`

All types except `flashback` have a registered DataModel, sheet, and sheet template.
`flashback` remains declared in the manifest but has no dedicated implementation;
character flashbacks are stored in `system.flashbacks` instead. Do not assume a
`FlashbackDataModel` or `FlashbackSheet` exists.

## Key Architectural Notes

- `masacre.js` registers everything on the Foundry `Hooks.once("init", ...)` hook:
  document classes, data models, sheet classes, Handlebars helpers, and template preloads.
- The eight implemented actor/item sheets are registered as defaults for their
  respective types via `DocumentSheetConfig`, replacing the core V2 sheets.
- Custom Handlebars helpers: `eachProperty`, `concat`, `toLowerCase`, `toUpperCase`,
  `eq`, `times`. Partial templates load via `foundry.applications.handlebars.loadTemplates`.
- The character sheet initializes current weapon stats when weapons are added and
  enforces a single-rank constraint (deletes old ranks when a new one is added).
  Applying a rank updates actor/prototype-token images and synchronizes equipment
  and resources from `#`-separated names, searching world items before Item packs.
- `realizarTiradas.js` handles ability and casualty rolls. During combat, ability
  rolls also set initiative. Preserve casualty formula strings such as `2d6`.
- The `renderChatMessageHTML` hook uses native DOM listeners for the add-casualties
  button and updates both `system.deathAliens.current` and `.total`.
- The `combatRound` hook requests initiative resets when advancing a round.
- `modules/config.js` exports a `masacre` object with flashback configuration
  constants used by the system's `CONFIG.masacre` namespace.

## Compendium Safety

- `system.json` declares the Item pack `316-en-espanol` at `packs/316-en-espanol`.
  Keep the manifest declaration and the packaged directory consistent.
- The pack is a LevelDB database, not a collection of independently mergeable files.
  Foundry may change logs, manifests, and `CURRENT` merely by opening the pack.
  Inspect such changes before including them in a code commit.
- Close Foundry and back up the entire pack before copying, restoring, or resolving
  database conflicts. Do not edit binary files or combine LevelDB files from
  different revisions. Resolve conflicts using a complete, coherent database copy;
  ask which copy to preserve when the intended content is unclear.
- Do not delete or restore compendium files as routine Git cleanup. Preserve
  unrelated user changes and stage only files relevant to the requested task.

## Releases

- Keep `version`, `manifest`, and `download` in `system.json` aligned with the
  intended release tag. The current URLs target `v2.0.0/system.json` and
  `v2.0.0/masacre.zip` under GitHub release downloads.
- A Git commit or push does not publish release assets. When publishing a release,
  upload both `system.json` and `masacre.zip` to the matching tag and verify the
  manifest and download URLs work.
- Include runtime files and the complete compendium in the archive; omit
  development-only content such as `.git`, `node_modules`, and agent tooling.
