import {Masacre} from './modules/config.js';

import {CharacterDataModel} from './modules/documents/dataModels/CharacterDataModel.mjs';
import {AlienDataModel} from './modules/documents/dataModels/AlienDataModel.mjs';
import {RankDataModel} from './modules/documents/dataModels/RankDataModel.mjs';

import {MasacreActor} from './modules/documents/MasacreActor.mjs';
import {MasacreItem} from './modules/documents/MasacreItem.mjs';

//import {MasacreCharacterSheet} from './modules/sheets/MasacreCharacterSheet.mjs';

async function preloadHandlebarsTemplates() {
    const paths = [];

    return(loadTemplates(paths))
}

Hooks.once("init", function(){

    CONFIG.Masacre = Masacre;
    CONFIG.debug.hooks = false;

    CONFIG.Actor.documentClass = MasacreActor;
    CONFIG.Actor.dataModels = {
        character: CharacterDataModel,
        alien: AlienDataModel
    };

    CONFIG.Item.documentClass = MasacreItem;
    CONFIG.Item.dataModels = {
        rank: RankDataModel
    };

    /* console.log("INIT");
    console.log(CONFIG);
    console.log(game.i18n.localize("masacre.name")); */

    //Items.unregisterSheet("core", ItemSheet);
    //Items.registerSheet("masacre", stormbringerItemSheet, { makeDefault: true });

    //Actors.unregisterSheet("core", ActorSheet);
    //Actors.registerSheet("masacre", MasacreCharacterSheet, { makeDefault: true });

    preloadHandlebarsTemplates();

    Handlebars.registerHelper('eachProperty', function(context, options) {
        
        var ret = "";
        var index = 0;

        for(var prop in context)
        {
            ret = ret + options.fn({propiedad:prop, valor:context[prop], indice:index});
            index++;
        }
        
        return ret; 
    });
});