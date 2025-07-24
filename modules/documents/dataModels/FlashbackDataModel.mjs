const { BooleanField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export class FlashbackDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
          description: new StringField({ required: true, blank: true }),
          state: new StringField({ required: true, blank: true }),
          type: new StringField({ required: true, blank: true })        
        }
      };

    prepareDerivedData() {
      super.prepareDerivedData();
  
      // Determine the hero's current level.
      //this.level = Math.floor(this.progress / 5);
    }
}