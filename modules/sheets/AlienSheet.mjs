import {Masacre} from "../config.js"

export class AlienSheet extends ActorSheet {

    constructor(actor, options) {

        super(actor, options);

        Hooks.on("createItem", this._itemCreated);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "alienSheet"]
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/actors/alienSheet.hbs`;
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
}
