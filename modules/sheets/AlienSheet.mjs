import {masacre} from "../config.js"
import {MasacreActorSheet } from "./MasacreActorSheet.mjs";

export class AlienSheet extends MasacreActorSheet {

    constructor(actor, options) {

        super(actor, options);

        Hooks.on("createItem", this._itemCreated);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "alienSheet"],
            width: 950,
            height: 650
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/actors/alienSheet.hbs`;
    } 

    activateListeners(html) {
     
        super.activateListeners(html);

        html.find('.itemControl').click(this._onItemControl.bind(this));

        html.find('.alien-hability-name-toggle').click(this._onAlienHabilityNameToggle.bind(this));
    }

    getData() {
        const data = super.getData();        

        data.config = CONFIG.Masacre;
        
        
        return data;
    }

    async _onItemControl(event) {

        event.preventDefault();

        const owner = this.actor;
        const a = event.currentTarget;
        const li = a.closest("li");

        const item = li.dataset.itemId ? owner.items.get(li.dataset.itemId) : null;

        switch(a.dataset.action) {
            case "edit":
                return item.sheet.render(true);
            case "delete":
                return item.delete();
        }
    }

    _onAlienHabilityNameToggle(event) {
        event.preventDefault();
        event.stopPropagation();

        const element = event.currentTarget;
        const itemId = element.dataset.itemId;
        
        const descriptionElement = this.element.find(`.alien-hability-description[data-item-id="${itemId}"]`);
        
        if (descriptionElement.length) {
            const isVisible = descriptionElement.css('display') !== 'none';
            descriptionElement.css('display', isVisible ? 'none' : 'block');
        }
    }

    async _itemCreated(item, options, userId) {
    
        if(item.actor === undefined) return;
    }
}
