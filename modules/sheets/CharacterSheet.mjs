import {masacre} from "../config.js"
import {realizarTiradas} from "../documents/realizarTiradas.js"
import {WEAPON_STAT_VALUES} from "../documents/dataModels/WeaponDataModel.mjs"
import {MasacreActorSheet} from "./MasacreActorSheet.mjs";

export class CharacterSheet extends MasacreActorSheet {

    constructor(actor, options) {

        super(actor, options);

        Hooks.on("createItem", this._itemCreated);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "characterSheet"],
            submitOnChange: true,
            width: 1200,
            height: 650
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/actors/characterSheet.hbs`;
    } 

    activateListeners(html) {
     
        super.activateListeners(html);

        html.find('.upgrade-icon').click(this._onUpgradeWeaponStat.bind(this));
        
        html.find('.itemControl').click(this._onItemControl.bind(this));

        html.find('.tri-state-toggle').click(this._onTriStateToggle.bind(this));

        html.find('.weapon-name-toggle').click(this._onWeaponNameToggle.bind(this));

        html.find('.equipment-name-toggle').click(this._onEquipmentNameToggle.bind(this));

        html.find('.resource-name-toggle').click(this._onResourceNameToggle.bind(this));

        html.find('.resource-used-toggle').change(this._onResourceUsedToggle.bind(this));
    }

    async getData() {
        
        const data = super.getData();        

        return data;
    }

    async _onItemControl(event) {

        event.preventDefault();

        const owner = this.actor;
        const a = event.currentTarget;
        const li = a.closest("li");

        const item = li.dataset.itemId ? owner.items.get(li.dataset.itemId) : null;

        switch(a.dataset.action) {
            case "info":
                return this._showItemInfo(item);
            case "edit":
                return item.sheet.render(true);
            case "delete":
                return item.delete();
        }
    }

    async _showItemInfo(item) {
        if (!item) return;
        
        const templateMap = {
            "weapon": "systems/masacre/templates/messages/weaponInfo.hbs",
            "equipment": "systems/masacre/templates/messages/equipmentInfo.hbs",
            "resource": "systems/masacre/templates/messages/resourceInfo.hbs"
        };
        
        const template = templateMap[item.type];
        if (!template) return;
        
        const templateData = { item: item.toObject() };
        const content = await renderTemplate(template, templateData);
        
        await ChatMessage.create({
            type: CONST.CHAT_MESSAGE_TYPES.OTHER,
            speaker: {
                actor: this.actor.id,
                alias: this.actor.name
            },
            content: content
        });
    }

    async _itemCreated(item, options, userId) {
    
        if(item.actor === undefined) return;

        await item.actor.sheet._addWeapon(item);
        await item.actor.sheet._applyRank(item);
    }

    async _addWeapon(weaponCreated) {

        if(weaponCreated.type != "weapon") return;

        const actor = weaponCreated.actor;

        weaponCreated.update({
            "system.cccurrent": weaponCreated.system.cc,
            "system.cdcurrent": weaponCreated.system.cd,
            "system.ldcurrent": weaponCreated.system.ld
        });
    }

    async _applyRank(rankCreated) {

        if(rankCreated.type != "rank") return;

        const actor = rankCreated.actor;

        const ranks = actor.items.filter(i => i.type == "rank" && i._id != rankCreated._id);

        ranks.forEach(async rank => {
            
            await actor.deleteEmbeddedDocuments("Item", [rank._id]);
        });

        await actor.update({ img: rankCreated.img });
        await actor.update({ "prototypeToken.texture.src": rankCreated.img });

        await this._syncRankEquipment();

        await this._syncRankResources();
    }

    async _syncRankEquipment() {

        if (!this.actor.system.rank?.system?.equipment) return;

        const raw = this.actor.system.rank.system.equipment;
     
        const names = raw.split("#").map(n => n.trim().toUpperCase()).filter(n => n.length > 0);

        const existingNames = this.actor.items
            .filter(i => i.type === "equipment")
            .map(i => i.name.toUpperCase());

        const itemsToCreate = [];

        for (const name of names) {
          
          if (existingNames.includes(name)) continue;

          const worldItem = game.items.find(i => i.type === "equipment" && i.name.toUpperCase() === name);          

          if (worldItem) {
            itemsToCreate.push(worldItem.toObject());
          }
        }

        if (itemsToCreate.length > 0) {
          await this.actor.createEmbeddedDocuments("Item", itemsToCreate);
        
        }
    }

    async _syncRankResources() {

        if (!this.actor.system.rank?.system?.resources) return;

        const raw = this.actor.system.rank.system.resources;
     
        const names = raw.split("#").map(n => n.trim().toUpperCase()).filter(n => n.length > 0);

        const existingNames = this.actor.items
            .filter(i => i.type === "resource")
            .map(i => i.name.toUpperCase());

        const itemsToCreate = [];

        for (const name of names) {
          
          if (existingNames.includes(name)) continue;

          const worldItem = game.items.find(i => i.type === "resource" && i.name.toUpperCase() === name);          

          if (worldItem) {
            itemsToCreate.push(worldItem.toObject());
          }
        }

        if (itemsToCreate.length > 0) {
          await this.actor.createEmbeddedDocuments("Item", itemsToCreate);
        
        }
    }

    async _onTriStateToggle(event) {
        event.preventDefault();

        const element = event.currentTarget;
        const field = element.dataset.field;
        const currentState = parseInt(element.dataset.state) || 0;
        const newState = (currentState + 1) % 3;

        await this.actor.update({ [field]: newState });
    }

    async _onRollHability(event) {
        event.preventDefault();
        event.stopPropagation();

        const element = event.currentTarget;
        const dataset = element.dataset;       
    }

    async _onUpgradeWeaponStat(event) {
        event.preventDefault();
        event.stopPropagation();

        const element = event.currentTarget;
        const itemId = element.dataset.id;
        const stat = element.dataset.stat;

        const item = this.actor.items.find(i => i._id === itemId);
        if (!item) return;

        const currentField = `${stat}current`;
        const maxField = `${stat}max`;
        
        const currentValue = item.system[currentField] || "-";

        if (currentValue == "-") return;

        const maxValue = item.system[maxField] || "-";
        
        let currentIndex = WEAPON_STAT_VALUES.indexOf(currentValue);
        const maxIndex = WEAPON_STAT_VALUES.indexOf(maxValue);

        if (currentIndex === -1) currentIndex = 0;

        if (currentIndex === maxIndex) return;

        const newIndex = currentIndex + 1;
        const newValue = WEAPON_STAT_VALUES[newIndex];

        console.log({
            item,
            currentField,
            maxField,
            currentValue,
            maxValue,
            currentIndex,
            maxIndex,
            newIndex,
            newValue
        });

        await item.update({ [`system.${currentField}`]: newValue });
    }

    _onWeaponNameToggle(event) {
        event.preventDefault();
        event.stopPropagation();

        const element = event.currentTarget;
        const itemId = element.dataset.itemId;
        
        const descriptionElement = this.element.find(`.weapon-description[data-item-id="${itemId}"]`);
        
        if (descriptionElement.length) {
            const isVisible = descriptionElement.css('display') !== 'none';
            descriptionElement.css('display', isVisible ? 'none' : 'block');
        }
    }

    _onEquipmentNameToggle(event) {
        event.preventDefault();
        event.stopPropagation();

        const element = event.currentTarget;
        const itemId = element.dataset.itemId;
        
        const descriptionElement = this.element.find(`.equipment-description[data-item-id="${itemId}"]`);
        
        if (descriptionElement.length) {
            const isVisible = descriptionElement.css('display') !== 'none';
            descriptionElement.css('display', isVisible ? 'none' : 'block');
        }
    }

    _onResourceNameToggle(event) {
        event.preventDefault();
        event.stopPropagation();

        const element = event.currentTarget;
        const itemId = element.dataset.itemId;
        
        const descriptionElement = this.element.find(`.resource-description[data-item-id="${itemId}"]`);
        
        if (descriptionElement.length) {
            const isVisible = descriptionElement.css('display') !== 'none';
            descriptionElement.css('display', isVisible ? 'none' : 'block');
        }
    }

    async _onResourceUsedToggle(event) {
        const element = event.currentTarget;
        const itemId = element.dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (!item) return;

        await item.update({ "system.used": element.checked });
    }

    async _onUpgradeStat(event) {
        event.preventDefault();
        event.stopPropagation();

        const element = event.currentTarget;
        const itemId = element.dataset.itemId;
        const stat = element.dataset.stat;

        const item = this.actor.items.get(itemId);
        if (!item) return;

        const currentField = `${stat}current`;
        const maxField = `${stat}max`;
        
        const currentValue = item.system[currentField] || "-";
        const maxValue = item.system[stat] || "-";
        
        let currentIndex = WEAPON_STAT_VALUES.indexOf(currentValue);
        const maxIndex = WEAPON_STAT_VALUES.indexOf(maxValue);
        
        if (currentIndex === -1) {
            currentIndex = 0;
        }

        let newIndex = currentIndex + 1;
        
        if (newIndex > maxIndex) {
            newIndex = maxIndex;
        }

        const newValue = WEAPON_STAT_VALUES[newIndex];

        await item.update({ [`system.${currentField}`]: newValue });
    }
}
