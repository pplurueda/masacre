export const realizarTiradas = {};

realizarTiradas.actor = {

    async hability(actor, dataset) {

        if(dataset.type != "hability") return;

        console.log(dataset);

        let roll = new Roll("1d10");
        await roll.evaluate();

        let rollResult = roll.total;

        const success = dataset.value >= rollResult;

        const miDataset = {
            actorId: actor.id,
            actorImagen: actor.img,
            actorName: actor.name,
            actorRankName: actor.system.rank.name,
            stat: dataset.stat,
            description: dataset.description,
            value: dataset.value,
            result: rollResult,
            success: success
        };

        console.log(miDataset);

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
            value: dataset.value,
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
                realizarTiradas.item.bajas(actor, dataset);
                break;
            case "hability":
                realizarTiradas.actor.hability(actor, dataset);
                break;
            default:
                console.error("Tipo de tirada no reconocido");
                throw new Error("Tipo de tirada no reconocido");
        };
    }
}