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
              state: new NumberField({ required: true, integer: true, min: 0, max: 2, initial: 1 })
            }),
            strength2: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              state: new NumberField({ required: true, integer: true, min: 0, max: 2, initial: 0 })
            }),
            strength3: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              state: new NumberField({ required: true, integer: true, min: 0, max: 2, initial: 0 })
            }),
            strength4: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              state: new NumberField({ required: true, integer: true, min: 0, max: 2, initial: 0 })
            }),
            strength5: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              state: new NumberField({ required: true, integer: true, min: 0, max: 2, initial: 0 })
            }),
            weakness1: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              state: new NumberField({ required: true, integer: true, min: 0, max: 2, initial: 1 })
            }),
            weakness2: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              state: new NumberField({ required: true, integer: true, min: 0, max: 2, initial: 0 })
            }),
            weakness3: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              state: new NumberField({ required: true, integer: true, min: 0, max: 2, initial: 0 })
            }),
            weakness4: new SchemaField({
              description: new StringField({ required: true, blank: true }),
              state: new NumberField({ required: true, integer: true, min: 0, max: 2, initial: 0 })
            }),
            weakness5: new SchemaField({
              description: new StringField({ required: true, blank: true, initial: "" }),
              state: new NumberField({ required: true, integer: true, min: 0, max: 2, initial: 0 })
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