const { BooleanField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export class MedalDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
            description: new StringField({ required: true, blank: true }),
            bars: new NumberField({ required: true, blank: false, initial: 0, min: 0 })
        }
      };
}
