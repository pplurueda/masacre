import {Masacre} from "../config.js"

export class CharacterSheet extends ActorSheet {

    constructor(actor, options) {

        super(actor, options);

        Hooks.on("createItem", this._itemCreated);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "actor"],
            width: "850"
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/actors/${this.actor.type}Sheet.hbs`;
    } 

    getData() {
        const data = super.getData();        

        data.config = CONFIG.Masacre;
        
        
        return data;
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