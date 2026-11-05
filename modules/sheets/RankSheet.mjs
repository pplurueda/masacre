import {masacre} from "../config.js"

export class RankSheet extends foundry.appv1.sheets.ItemSheet {

    constructor(actor, options) {

        super(actor, options);

        //Hooks.on("createItem", this._itemCreado);
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "rankSheet"],
            width: 550,
            height: 850
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/items/rankSheet.hbs`;
    } 

    async getData(options = {}) {
        const context = await super.getData(options);

        context.config = CONFIG.masacre;
        context.item = this.item;
        context.system = this.item.system;
        context.owner = this.item.isOwner;
        context.editable = this.isEditable;
        
        return context;
    }
}
