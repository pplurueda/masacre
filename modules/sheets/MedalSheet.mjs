import {masacre} from "../config.js"

export class MedalSheet extends ItemSheet {

    constructor(actor, options) {

        super(actor, options);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "medalSheet"],
            width: 700,
            height: 650
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/items/medalSheet.hbs`;
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find('[data-action="cycle-bars"]').click(this._onCycleBars.bind(this));
    }

    getData() {
        const data = super.getData();

        data.config = CONFIG.Masacre;

        return data;
    }

    async _onCycleBars(event) {
        event.preventDefault();

        const element = event.currentTarget;
        const direction = element.dataset.direction;
        const currentBars = this.item.system.bars ?? 0;

        const newBars = direction === "up"
            ? currentBars + 1
            : Math.max(0, currentBars - 1);

        await this.item.update({ "system.bars": newBars });
    }
}
