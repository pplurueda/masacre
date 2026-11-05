import {masacre} from "../config.js"

export class ResourceSheet extends foundry.appv1.sheets.ItemSheet {

    constructor(actor, options) {

        super(actor, options);
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "resourceSheet"],
            width: 650,
            height: 650
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/items/resourceSheet.hbs`;
    } 

    async getData(options = {}) {
        const data = await super.getData(options);

        data.config = CONFIG.masacre;
        
        return data;
    }
}
