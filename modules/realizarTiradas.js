export const realizarTiradas = {};

realizarTiradas.actor = {

    async initiative(actor, dataset) {

        const rollResult = await this.hability(actor, {
            ...dataset,
            type: "hability"
        });

        console.log(rollResult);

        let value = 0;

        if(rollResult <= dataset.value) {
            value = rollResult;
        } 
        else {
            value = rollResult - 10;
        }

        if (actor?.sheet?.setInitiative) {
            await actor.sheet.setInitiative(value);
            return;
        }

        if (!game.combat) return;

        const combatant = game.combat.combatants.find(c => c.actor?.id === actor.id);
        if (combatant) await game.combat.setInitiative(combatant.id, value);
    },

    async hability(actor, dataset) {

        if(dataset.type != "hability") return;

        let roll = new Roll("1d10");
        await roll.evaluate();

        let rollResult = roll.total;

        const success = parseInt(dataset.value) >= rollResult;

        const miDataset = {
            actorId: actor.id,
            actorImagen: actor.img,
            actorName: actor.name,
            actorRankName: actor.system.rank?.name || "",
            stat: dataset.stat,
            description: dataset.description,
            value: parseInt(dataset.value),
            result: rollResult,
            success: success
        };

        const plantillaChat = await renderTemplate("systems/masacre/templates/messages/rollHabilityResult.hbs", miDataset);

        ChatMessage.create(
            {
                type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                speaker: 
                {
                    token: actor.token,
                    actor: actor.id
                },
                content: plantillaChat,
                roll: roll
            });

        return rollResult;
    }
}

realizarTiradas.item = {

    async bajas(actor, dataset) {

        if(dataset.type != "bajas") return;
        if(dataset.value === "0" || dataset.value === undefined)  return;

        let roll = new Roll(dataset.value);
        await roll.evaluate();

        let rollResult = roll.total;

        const miDataset = {
            actorId: actor.id,
            actorImagen: actor.img,
            weaponImage: dataset.image,
            stat: dataset.stat,
            weapon: dataset.weapon,
            value: parseInt(dataset.value),
            result: rollResult
        };

        const plantillaChat = await renderTemplate("systems/masacre/templates/messages/rollCasualtiesResult.hbs", miDataset);

        ChatMessage.create(
            {
                type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                speaker: 
                {
                    token: actor.token,
                    actor: actor.id
                },
                content: plantillaChat,
                roll: roll
            });
    },
}

realizarTiradas.general = {

    async nuevaTirada(actor, dataset) {

        switch(dataset.type) {
            case "bajas":
                await realizarTiradas.item.bajas(actor, dataset);
                break;
            case "hability":
                if (game.combat)
                    await realizarTiradas.actor.initiative(actor, dataset);
                else
                    await realizarTiradas.actor.hability(actor, dataset);
                break;
            // case "initiative":
            //     await realizarTiradas.actor.initiative(actor, dataset);
            //     break;
            default:
                console.error("Tipo de tirada no reconocido");
                throw new Error("Tipo de tirada no reconocido");
        };
    }
}