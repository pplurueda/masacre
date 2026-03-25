import {masacre} from "../config.js"

export class AlienHabilitySheet extends ItemSheet {

    constructor(actor, options) {

        super(actor, options);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "alienHabilitySheet"],
            width: 850,
            height: 500
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/items/alienHabilitySheet.hbs`;
    } 

    getData() {
        const data = super.getData();        

        data.config = CONFIG.Masacre;
        
        return data;
    }
}