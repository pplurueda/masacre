const { BooleanField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export class ResourceDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
            description: new HTMLField({ required: true, blank: true }),
            uses: new NumberField({ required: true, initial:1, min: 1 }),
        }
      };
}
