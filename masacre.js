import {masacre} from './modules/config.js';

import {CharacterDataModel} from './modules/documents/dataModels/CharacterDataModel.mjs';
import {AlienDataModel} from './modules/documents/dataModels/AlienDataModel.mjs';
import {RankDataModel} from './modules/documents/dataModels/RankDataModel.mjs';
import {WeaponDataModel} from './modules/documents/dataModels/WeaponDataModel.mjs';
import {AlienHabilityDataModel} from './modules/documents/dataModels/AlienHabilityDataModel.mjs';
import {EquipmentDataModel} from './modules/documents/dataModels/EquipmentDataModel.mjs';

import {MasacreActor} from './modules/objects/MasacreActor.mjs';
import {MasacreItem} from './modules/objects/MasacreItem.mjs';

import {CharacterSheet} from './modules/sheets/CharacterSheet.mjs';
import {AlienSheet} from './modules/sheets/AlienSheet.mjs';

import {WeaponSheet} from './modules/sheets/WeaponSheet.mjs';
import {RankSheet} from './modules/sheets/RankSheet.mjs';
import {AlienHabilitySheet} from './modules/sheets/AlienHabilitySheet.mjs';
import {EquipmentSheet} from './modules/sheets/EquipmentSheet.mjs';

async function preloadHandlebarsTemplates() {
    const paths = [
        "systems/masacre/templates/partials/weaponItemPartial.hbs",
        "systems/masacre/templates/partials/weaponListPartial.hbs",
        "systems/masacre/templates/partials/flashbacksPartial.hbs",
        "systems/masacre/templates/partials/flashbackItemPartial.hbs",
        "systems/masacre/templates/partials/character-info.hbs",
        "systems/masacre/templates/partials/character-creatures-killed.hbs",
        "systems/masacre/templates/partials/character-health.hbs",
        "systems/masacre/templates/partials/character-once-per-planet.hbs",
        "systems/masacre/templates/partials/character-weapons.hbs",
        "systems/masacre/templates/partials/character-stats.hbs",
        "systems/masacre/templates/partials/character-qualities.hbs",
        "systems/masacre/templates/partials/character-flaws.hbs",
        "systems/masacre/templates/partials/character-rank-details.hbs"
    ];

    return(loadTemplates(paths))
}

Hooks.once("init", function(){

    CONFIG.masacre = masacre;
    CONFIG.debug.hooks = false;

    CONFIG.Actor.documentClass = MasacreActor;
    CONFIG.Actor.dataModels = {
        character: CharacterDataModel,
        alien: AlienDataModel        
    };

    CONFIG.Item.documentClass = MasacreItem;
    CONFIG.Item.dataModels = {
        rank: RankDataModel,
        weapon: WeaponDataModel,
        alienHability: AlienHabilityDataModel,
        equipment: EquipmentDataModel
    };

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("masacre", CharacterSheet, {makeDefault: true, types: ["character"]});
    Actors.registerSheet("masacre", AlienSheet, {makeDefault: true, types: ["alien"]});

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("masacre", RankSheet, {types: ["rank"]});
    Items.registerSheet("masacre", WeaponSheet, {types: ["weapon"]});
    Items.registerSheet("masacre", AlienHabilitySheet, {types: ["alienHability"]});
    Items.registerSheet("masacre", EquipmentSheet, {types: ["equipment"]});

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

        args.pop();
        return args.join('');
      });

    Handlebars.registerHelper('toLowerCase', function (str) {

        return str.toLowerCase();
    });

    Handlebars.registerHelper('toUpperCase', function (str) {
        
        return str.toUpperCase();
    });

    Handlebars.registerHelper('eq', function (a, b) {
        
        return a === b;
    });
});

Hooks.on("renderChatMessageHTML", (message, html, data) => {
    
    const button = html.querySelector('.add-casualties-btn');
    if (!button) return;
    
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        
        const actorId = button.dataset.actorId;
        const casualties = parseInt(button.dataset.casualties) || 0;
        
        const actor = game.actors.get(actorId);
        if (!actor) {
            ui.notifications.error("Actor not found");
            return;
        }
        
        const currentCasualties = actor.system.deathAliens.current || 0;
        const newCasualties = currentCasualties + casualties;
        
        await actor.update({ "system.deathAliens.current": newCasualties });
        
        ui.notifications.info(`${casualties} bajas añadidas. Total: ${newCasualties}`);
    });
});