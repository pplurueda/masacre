const { BooleanField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export class RankDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
          value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
          description: new HTMLField({ required: true, blank: true }),
          quote: new HTMLField({ required: true, blank: true }),
          responsibility: new HTMLField({ required: false, blank: true }),
          equipment: new StringField({ required: false, blank: true }),
          resources: new StringField({ required: false, blank: true }),
        }
      };

    prepareDerivedData() {
      super.prepareDerivedData();
  
      // Determine the hero's current level.
      //this.level = Math.floor(this.progress / 5);
    }
  }