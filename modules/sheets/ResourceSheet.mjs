import {masacre} from "../config.js"

export class ResourceSheet extends ItemSheet {

    constructor(actor, options) {

        super(actor, options);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "resourceSheet"],
            width: 650,
            height: 650
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/items/resourceSheet.hbs`;
    } 

    getData() {
        const data = super.getData();        

        data.config = CONFIG.Masacre;
        
        return data;
    }
}
