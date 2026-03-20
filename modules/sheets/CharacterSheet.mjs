import {masacre} from "../config.js"

export class CharacterSheet extends ActorSheet {

    constructor(actor, options) {

        super(actor, options);

        Hooks.on("createItem", this._itemCreated);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["masacre", "sheet", "characterSheet"],
            submitOnChange: true
        });
    }

    get template() {
        return `systems/masacre/templates/sheets/actors/characterSheetTMP.hbs`;
    } 

    activateListeners(html) {
     
        super.activateListeners(html);

        //html.find('.rollable').click(this._onRoll.bind(this));
        
        html.find('.itemControl').click(this._onItemControl.bind(this));

        //html.find('.condicionAplicada').click(this._condicionAplicada.bind(this));

        //html.find('.condicionEnergeticaAplicada').click(this._condicionEnergeticaAplicada.bind(this));

        //html.find('.equipoEquipado').click(this._itemEquipado.bind(this));
    }

    async getData() {
        const data = super.getData();        
        data.config = CONFIG.Masacre;

        const actor = data.actor;

        await this._createBrawlWeapon(actor);
        
        return data;
    }

    async _createBrawlWeapon(actor) {
     
        if(actor.items.some(i => i.type == "weapon" && i.name == game.i18n.format("masacre.character.brawl"))) return;

        const brawlWeapon = {
            name: game.i18n.format("masacre.character.brawl"), 
            type: "weapon",
            system: {
                cc: "1",
                cd: "0",
                ld: "0"          
            }
        };
        await actor.createEmbeddedDocuments("Item", [brawlWeapon]);
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

    async _itemCreated(item, options, userId) {
    
        if(item.actor === undefined) return;

        await item.actor.sheet._applyRank(item);
    }

    async _applyRank(rankCreated) {

        if(rankCreated.type != "rank") return;

        const actor = rankCreated.actor;

        const ranks = actor.items.filter(i => i.type == "rank" && i._id != rankCreated._id);

        ranks.forEach(async rank => {
            
            await actor.deleteEmbeddedDocuments("Item", [rank._id]);
        });
    }
}
