import {masacre} from "../config.js"

export class EquipmentSheet extends foundry.appv1.sheets.ItemSheet {

    constructor(actor, options) {

        super(actor, options);
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "equipmentSheet"],
            width: 850,
            height: 500
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/items/equipmentSheet.hbs`;
    } 

    async getData(options = {}) {
        const data = await super.getData(options);

        data.config = CONFIG.masacre;
        
        return data;
    }
}
