import {masacre} from "../config.js"
import {realizarTiradas} from "../documents/realizarTiradas.js"

export class MasacreActorSheet extends ActorSheet {

    constructor(actor, options) {

        super(actor, options);
    }

    async setInitiative(statValue) {
        if (game.combat) {
            
            const combatant = this.token?.combatant ?? game.combat.combatants.find(c => c.actor.id === this.actor.id);

            console.log(combatant);

            const dataset = {
                type: "initiative",
                value: statValue
            };

            console.log(dataset);

            const initiativeValue = await realizarTiradas.general.nuevaTirada(this, dataset);

            console.log(initiativeValue);

            if (combatant) await game.combat.setInitiative(combatant.id, initiativeValue);
        }
    }
}