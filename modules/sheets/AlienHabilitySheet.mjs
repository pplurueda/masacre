import {masacre} from "../config.js"

export class AlienHabilitySheet extends ItemSheet {

    constructor(actor, options) {

        super(actor, options);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "alienHability"],
            width: 500,
            height: 300
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/items/weaponSheet.hbs`;
    } 

    activateListeners(html) {
        super.activateListeners(html);

        html.find('[data-action="cycle-stat"]').click(this._onCycleStat.bind(this));
    }

    getData() {
        const data = super.getData();        

        data.config = CONFIG.Masacre;
        
        return data;
    }
}