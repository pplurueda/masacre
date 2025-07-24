import {Masacre} from './modules/config.js';

import {CharacterDataModel} from './modules/documents/dataModels/CharacterDataModel.mjs';
import {AlienDataModel} from './modules/documents/dataModels/AlienDataModel.mjs';
import {RankDataModel} from './modules/documents/dataModels/RankDataModel.mjs';
import {WeaponDataModel} from './modules/documents/dataModels/WeaponDataModel.mjs';

import {MasacreActor} from './modules/documents/MasacreActor.mjs';
import {MasacreItem} from './modules/documents/MasacreItem.mjs';

import {CharacterSheet} from './modules/sheets/CharacterSheet.mjs';
import {AlienSheet} from './modules/sheets/AlienSheet.mjs';

import {WeaponSheet} from './modules/sheets/WeaponSheet.mjs';
import {RankSheet} from './modules/sheets/RankSheet.mjs';

async function preloadHandlebarsTemplates() {
    const paths = [
        "systems/masacre/templates/partials/weaponItemPartial.hbs",
        "systems/masacre/templates/partials/weaponListPartial.hbs"
    ];

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
        rank: RankDataModel,
        weapon: WeaponDataModel
    };

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("masacre", CharacterSheet, {makeDefault: true, types: ["character"]});
    Actors.registerSheet("masacre", AlienSheet, {makeDefault: true, types: ["alien"]});

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("masacre", RankSheet, {types: ["rank"]});
    Items.registerSheet("masacre", WeaponSheet, {types: ["weapon"]});

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

    Handlebars.registerHelper('concat', function(...args) {
        // Remove last argument (Handlebars options object)
        args.pop();
        return args.join('');
      });
});