export const realizarTiradas = {};

realizarTiradas.actor = {

    // async habilidad(actor, dataset) {

    //     if (dataset.tipo != "habilidad")  return;
                
    //     let tirada = new Roll("1d100");
    //     await tirada.evaluate();

    //     let tiradaResultado = tirada.total;

    //     let habilidadesTipo = _obtenerHabilidadesTipo(dataset.tipohabilidad, actor);

    //     let habilidadLanzada = habilidadesTipo.find(h => h.clave === dataset.clave);

    //     let exito = (tiradaResultado <= habilidadLanzada.habilidad.total);

    //     let critico = (tiradaResultado <= (habilidadLanzada.habilidad.total / 10.0));

    //     let pifia = (habilidadLanzada.habilidad.total < 50) ? (tiradaResultado >= 99) : (tiradaResultado == 100);

    //     const miDataset = {
    //         imagen: actor.img,
    //         critico: critico,
    //         pifia: pifia,
    //         exito: exito,
    //         resultadoTirada: tiradaResultado,
    //         habilidadNombre: dataset.nombre,
    //         habilidadTotal: habilidadLanzada.habilidad.total
    //     };

    //     const plantillaChat = await renderTemplate("systems/stormbringer/templates/messages/rollHabilityResult.hbs", miDataset);

    //     ChatMessage.create(
    //         {
    //             type: CONST.CHAT_MESSAGE_TYPES.ROLL,
    //             speaker: 
    //             {
    //                 token: actor.token,
    //                 actor: actor.id
    //             },
    //             content: plantillaChat,
    //             roll: tirada
    //         });
    // },

    //     if (dataset.tipo != "habilidadCombateDefensa")  return;
            
    //     let tirada = new Roll("1d100");
    //     await tirada.evaluate();

    //     let tiradaResultado = tirada.total;

    //     let habilidadesTipo = _obtenerHabilidadesTipo(dataset.tipohabilidad, actor);

    //     let habilidadLanzada = habilidadesTipo.find(h => h.clave === dataset.clave);

    //     let exito = (tiradaResultado <= habilidadLanzada.habilidad.totalParada);

    //     let critico = (tiradaResultado <= (habilidadLanzada.habilidad.totalParada / 10.0));

    //     let pifia = (habilidadLanzada.habilidad.totalParada < 50) ? (tiradaResultado >= 99) : (tiradaResultado == 100);

    //     const miDataset = {
    //         imagen: actor.img,
    //         critico: critico,
    //         pifia: pifia,
    //         exito: exito,
    //         resultadoTirada: tiradaResultado,
    //         habilidadNombre: dataset.nombre,
    //         habilidadTotal: habilidadLanzada.habilidad.totalParada
    //     };

    //     const plantillaChat = await renderTemplate("systems/stormbringer/templates/messages/rollHabilityResult.hbs", miDataset);

    //     ChatMessage.create({
    //         type: CONST.CHAT_MESSAGE_TYPES.ROLL,
    //         speaker: 
    //         {
    //             token: actor.token,
    //             actor: actor.id
    //         },
    //         content: plantillaChat,
    //         roll: tirada
    //     });
}

realizarTiradas.item = {

    async bajas(actor, dataset) {

        console.log(dataset);

        if(dataset.type != "bajas") return;
        if(dataset.value === "" || dataset.value === undefined || dataset.value === "-")  return;

        let roll = new Roll(dataset.value);
        await roll.evaluate();

        let rollResult = roll.total;

        const miDataset = {
            actorImagen: actor.img,
            weaponImage: dataset.image,
            stat: dataset.stat,
            weapon: dataset.weapon,
            value: dataset.value,
            result: rollResult
        };

        console.log(miDataset);

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
            default:
                console.error("Tipo de tirada no reconocido");
                throw new Error("Tipo de tirada no reconocido");
        };
    }
}