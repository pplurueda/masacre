const { BooleanField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export class AlienHabilityDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
            description: new StringField({ required: true, blank: true }),
        }
      };
}
