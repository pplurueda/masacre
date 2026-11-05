import {masacre} from "../config.js"

export class AlienHabilitySheet extends foundry.appv1.sheets.ItemSheet {

    constructor(actor, options) {

        super(actor, options);
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "alienHabilitySheet"],
            width: 850,
            height: 500
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/items/alienHabilitySheet.hbs`;
    } 

    async getData(options = {}) {
        const data = await super.getData(options);

        data.config = CONFIG.masacre;
        
        return data;
    }
}
