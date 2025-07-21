import {Masacre} from "../config.js"

export class RankSheet extends ItemSheet {

    constructor(actor, options) {

        super(actor, options);

        //Hooks.on("createItem", this._itemCreado);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "rank"],
            width: "850"
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/items/rankSheet.hbs`;
    } 

    getData() {
        const data = super.getData();        

        data.config = CONFIG.Masacre;

        console.log(data.config);
        
        return data;
    }
}