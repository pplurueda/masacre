import {masacre} from "../config.js"
import {WEAPON_STAT_VALUES} from "../documents/dataModels/WeaponDataModel.mjs"

export class WeaponSheet extends ItemSheet {

    constructor(actor, options) {

        super(actor, options);

        //Hooks.on("createItem", this._itemCreado);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "weaponSheet"],
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

    async _onCycleStat(event) {
        event.preventDefault();

        const element = event.currentTarget;
        const stat = element.dataset.stat;
        const direction = element.dataset.direction;

        const currentValue = this.item.system[stat] || "-";
        
        let currentIndex = WEAPON_STAT_VALUES.indexOf(currentValue);
        
        if (currentIndex === -1) {
            currentIndex = 0;
        }

        let newIndex;
        if (direction === "up") {
            newIndex = (currentIndex + 1) % WEAPON_STAT_VALUES.length;
        } else {
            newIndex = (currentIndex - 1 + WEAPON_STAT_VALUES.length) % WEAPON_STAT_VALUES.length;
        }

        const newValue = WEAPON_STAT_VALUES[newIndex];

        console.log({
            stat,
            direction,
            currentValue,
            currentIndex,
            newIndex,
            newValue
        });

        await this.item.update({ [`system.${stat}`]: newValue });
    }
}