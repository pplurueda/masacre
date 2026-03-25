export class CombatInitiative extends Combat {
  
    _getInitiativeFormula(combatant) {
  
        const actor = combatant.actor;

        console.log(actor);

        if (!actor) return "0";
        if (actor.type === "character") {

            console.log("Character initiative");
            return "1d10";
        }
        else if (actor.type === "alien") {
            console.log("Alien initiative");
            return "1d20";
        }

        console.log("Unknown initiative");
        return "0";
    }
}
