const { BooleanField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export class EquipmentDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
            description: new StringField({ required: true, blank: true }),
            uses: new NumberField({ required: true, initial:0, min: 0 }),
        }
      };
}
