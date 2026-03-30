import {masacre} from "../config.js"
import {realizarTiradas} from "../realizarTiradas.js"

export class MasacreActorSheet extends ActorSheet {

    constructor(actor, options) {

        super(actor, options);
    }

    async getData() {
        
        const data = super.getData();        
        
        data.config = CONFIG.Masacre;
        data.isGM = game.user.isGM;

        return data;
    }

    activateListeners(html) {
     
        super.activateListeners(html);

        html.find('.rollable').click(this._onRoll.bind(this));
    }

    async setInitiative(initiativeValue) {
        if (game.combat) {
            
            const combatant = this.token?.combatant ?? game.combat.combatants.find(c => c.actor.id === this.actor.id);

            if (combatant) await game.combat.setInitiative(combatant.id, initiativeValue);
        }
    }

    async _onRoll(event) {

        event.preventDefault();

        const element = event.currentTarget;
        const dataset = element.dataset;   

        console.log("Rollable clicked:", dataset);

        await realizarTiradas.general.nuevaTirada(this.actor, dataset);        
    }
}