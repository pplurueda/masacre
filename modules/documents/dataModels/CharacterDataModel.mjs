import { ActorDataModel } from "./ActorDataModel.mjs";

const { BooleanField, HTMLField, NumberField, SchemaField, StringField, ArrayField } = foundry.data.fields;

export class CharacterDataModel extends ActorDataModel {
    static defineSchema() {
        return {
          ... super.defineSchema(),
          reputation: new StringField({ required: true, blank: true }),
          deathAliens: new SchemaField({
            current: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            total: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
          }),
          wounds: new SchemaField({
            madeMess: new BooleanField({ required: true, initial: false }),
            crippled: new BooleanField({ required: true, initial: false }),
            death: new BooleanField({ required: true, initial: false })
          }),
          combatSkill: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
          nonCombatSkill: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
          mandelBriteArmorUsed: new BooleanField({ required: true, initial: false }),
          combatDrugUsed: new BooleanField({ required: true, initial: false }),
          flashbacks: new SchemaField({
            strength1: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              editable: new BooleanField({ required: true, initial: true }),
              state: new StringField({ required: true, blank: true, initial: game.i18n.format("masacre.character.flashbackEnabled")})
            }),
            strength2: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              editable: new BooleanField({ required: true, initial: true }),
              state: new StringField({ required: true, blank: true, initial: game.i18n.format("masacre.character.flashbackDisabled")})
            }),
            strength3: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              editable: new BooleanField({ required: true, initial: true }),
              state: new StringField({ required: true, blank: true, initial: game.i18n.format("masacre.character.flashbackDisabled")})
            }),
            strength4: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              editable: new BooleanField({ required: true, initial: true }),
              state: new StringField({ required: true, blank: true, initial: game.i18n.format("masacre.character.flashbackDisabled")})
            }),
            strength5: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              editable: new BooleanField({ required: true, initial: true }),
              state: new StringField({ required: true, blank: true, initial: game.i18n.format("masacre.character.flashbackDisabled")})
            }),
            weakness1: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              editable: new BooleanField({ required: true, initial: true }),
              state: new StringField({ required: true, blank: true, initial: game.i18n.format("masacre.character.flashbackEnabled")})
            }),
            weakness2: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              editable: new BooleanField({ required: true, initial: true }),
              state: new StringField({ required: true, blank: true, initial: game.i18n.format("masacre.character.flashbackDisabled")})
            }),
            weakness3: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              editable: new BooleanField({ required: true, initial: true }),
              state:new StringField({ required: true, blank: true, initial: game.i18n.format("masacre.character.flashbackDisabled")})
            }),
            weakness4: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              editable: new BooleanField({ required: true, initial: true }),
              state:new StringField({ required: true, blank: true, initial: game.i18n.format("masacre.character.flashbackDisabled")})
            }),
            weakness5: new SchemaField({
              description: new StringField({ required: true, blank: true, initial: game.i18n.format("masacre.character.flashbackHateHome")}),
              editable: new BooleanField({ required: true, initial: false}),
              state:new StringField({ required: true, blank: true, initial: game.i18n.format("masacre.character.flashbackDisabled")})
            })
          })
        }
      };

    prepareDerivedData() {
      super.prepareDerivedData();
  
      // Determine the hero's current level.
      //this.level = Math.floor(this.progress / 5);
    }
}