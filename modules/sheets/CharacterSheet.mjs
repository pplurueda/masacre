import {masacre} from "../config.js"

export class CharacterSheet extends ActorSheet {

    constructor(actor, options) {

        super(actor, options);

        Hooks.on("createItem", this._itemCreated);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "characterSheet"]
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/actors/characterSheet.hbs`;
    } 

    activateListeners(html) {
     
        super.activateListeners(html);

        //html.find('.rollable').click(this._onRoll.bind(this));
        
        html.find('.itemControl').click(this._onItemControl.bind(this));

        //html.find('.condicionAplicada').click(this._condicionAplicada.bind(this));

        //html.find('.condicionEnergeticaAplicada').click(this._condicionEnergeticaAplicada.bind(this));

        //html.find('.equipoEquipado').click(this._itemEquipado.bind(this));
    }

    async getData() {
        const data = super.getData();        
        data.config = CONFIG.Masacre;

        const actor = data.actor;

        //await this._createFlashbacks(actor);
        
        return data;
    }

    /* async _createFlashbacks(actor) {
     
        if(actor.system.flashbacks.length > 0) return;

        const itemData1 = {
            name: "Flashback 1", 
            type: "flashback",
            system: {
                state: game.i18n.format("masacre.character.flashbackEnabled"),
                type: game.i18n.format("masacre.character.flashbackTypeStrength")
            }
        };
        await actor.createEmbeddedDocuments("Item", [itemData1]);

        const itemData2 = {
            name: "Flashback 2", 
            type: "flashback",
            system: {
                state: game.i18n.format("masacre.character.flashbackDisabled"),
                type: game.i18n.format("masacre.character.flashbackTypeStrength")
            }
        };
        await actor.createEmbeddedDocuments("Item", [itemData2]);

        const itemData3 = {
            name: "Flashback 3", 
            type: "flashback",
            system: {
                state: game.i18n.format("masacre.character.flashbackDisabled"),
                type: game.i18n.format("masacre.character.flashbackTypeStrength")
            }
        };
        await actor.createEmbeddedDocuments("Item", [itemData3]);

        const itemData4 = {
            name: "Flashback 4", 
            type: "flashback",
            system: {
                state: game.i18n.format("masacre.character.flashbackDisabled"),
                type: game.i18n.format("masacre.character.flashbackTypeStrength")
            }
        };
        await actor.createEmbeddedDocuments("Item", [itemData4]);

        const itemData5 = {
            name: "Flashback 5", 
            type: "flashback",
            system: {
                state: game.i18n.format("masacre.character.flashbackDisabled"),
                type: game.i18n.format("masacre.character.flashbackTypeStrength")
            }
        };
        await actor.createEmbeddedDocuments("Item", [itemData5]);

        const itemData6 = {
            name: "Flashback 6", 
            type: "flashback",
            system: {
                state: game.i18n.format("masacre.character.flashbackEnabled"),
                type: game.i18n.format("masacre.character.flashbackTypeWeakness")
            }
        };
        await actor.createEmbeddedDocuments("Item", [itemData6]);

        const itemData7 = {
            name: "Flashback 7", 
            type: "flashback",
            system: {
                state: game.i18n.format("masacre.character.flashbackDisabled"),
                type: game.i18n.format("masacre.character.flashbackTypeWeakness")
            }
        };
        await actor.createEmbeddedDocuments("Item", [itemData7]);

        const itemData8 = {
            name: "Flashback 8", 
            type: "flashback",
            system: {
                state: game.i18n.format("masacre.character.flashbackDisabled"),
                type: game.i18n.format("masacre.character.flashbackTypeWeakness")
            }
        };
        await actor.createEmbeddedDocuments("Item", [itemData8]);

        const itemData9 = {
            name: "Flashback 9", 
            type: "flashback",
            system: {
                state: game.i18n.format("masacre.character.flashbackDisabled"),
                type: game.i18n.format("masacre.character.flashbackTypeWeakness")
            }
        };
        await actor.createEmbeddedDocuments("Item", [itemData9]);

        const itemData10 = {
            name: "Flashback 10", 
            type: "flashback",
            system: {
                state: game.i18n.format("masacre.character.flashbackDisabled"),
                description: game.i18n.format("masacre.character.flashbackHateHome"),
                type: game.i18n.format("masacre.character.flashbackTypeWeakness"),
                editable: false
            }
        };
        await actor.createEmbeddedDocuments("Item", [itemData10]);
    } */

    async _onItemControl(event) {

        event.preventDefault();

        const owner = this.actor;
        const a = event.currentTarget;
        const li = a.closest("li");

        const item = li.dataset.itemId ? owner.items.get(li.dataset.itemId) : null;

        switch(a.dataset.action) {
            case "edit":
                return item.sheet.render(true);
            case "delete":
                return item.delete();
        }
    }

    async _itemCreated(item, options, userId) {
    
        if(item.actor === undefined) return;

        await item.actor.sheet._applyRank(item);
    }

    async _applyRank(rankCreated) {

        if(rankCreated.type != "rank") return;

        const actor = rankCreated.actor;

        const ranks = actor.items.filter(i => i.type == "rank" && i._id != rankCreated._id);

        ranks.forEach(async rank => {
            
            await actor.deleteEmbeddedDocuments("Item", [rank._id]);
        });
    }
}