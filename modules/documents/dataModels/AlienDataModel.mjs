import { ActorDataModel } from "./ActorDataModel.mjs";

const { BooleanField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export class AlienDataModel extends ActorDataModel {
  static defineSchema() {
    return {
      ... super.defineSchema(),
      alienSkill: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      description: new HTMLField({ required: false, initial: "" }),
      abilities: new HTMLField({ required: false, initial: "" })
    }
  };
}