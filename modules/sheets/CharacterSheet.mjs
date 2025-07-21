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
        return `systems/masacre/templates/sheets/actors/characterSheet.hbs`;
    } 

    activateListeners(html) {
     
        super.activateListeners(html);

        //html.find('.rollable').click(this._onRoll.bind(this));
        
        html.find('.itemControl').click(this._onItemControl.bind(this));º

        //html.find('.condicionAplicada').click(this._condicionAplicada.bind(this));

        //html.find('.condicionEnergeticaAplicada').click(this._condicionEnergeticaAplicada.bind(this));

        //html.find('.equipoEquipado').click(this._itemEquipado.bind(this));
    }

    getData() {
        const data = super.getData();        

        data.config = CONFIG.Masacre;
        
        
        return data;
    }

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