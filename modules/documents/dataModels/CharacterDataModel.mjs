import { ActorDataModel } from "./ActorDataModel.mjs";

const { BooleanField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

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
          nonCombatSkill: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
        }
      };

    prepareDerivedData() {
      super.prepareDerivedData();
  
      // Determine the hero's current level.
      //this.level = Math.floor(this.progress / 5);
    }
}