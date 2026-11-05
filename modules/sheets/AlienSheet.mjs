import {masacre} from "../config.js"
import {MasacreActorSheet } from "./MasacreActorSheet.mjs";

export class AlienSheet extends MasacreActorSheet {

    constructor(actor, options) {

        super(actor, options);

        Hooks.on("createItem", this._itemCreated);
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
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

    async getData(options = {}) {
        
        const data = await super.getData(options);
        
        return data;
    }

    async _onItemControl(event) {

        event.preventDefault();

        const owner = this.actor;
        const a = event.currentTarget;
        const li = a.closest("li");

        const item = li.dataset.itemId ? owner.items.get(li.dataset.itemId) : null;

        switch(a.dataset.action) {
            case "info":
                return this._showItemInfo(item);
            case "edit":
                return item.sheet.render(true);
            case "delete":
                return item.delete();
        }
    }

    async _showItemInfo(item) {
        if (!item) return;
        
        const template = "systems/masacre/templates/messages/alienHabilityInfo.hbs";
        
        const templateData = { item: item.toObject() };
        const content = await foundry.applications.handlebars.renderTemplate(template, templateData);
        
        await foundry.documents.ChatMessage.create({
            style: CONST.CHAT_MESSAGE_STYLES.OTHER,
            speaker: {
                actor: this.actor.id,
                alias: this.actor.name
            },
            content: content
        });
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
