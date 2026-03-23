const { BooleanField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export class RankDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
          value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
          description: new StringField({ required: true, blank: true }),
          quote: new StringField({ required: true, blank: true }),
          responsibility: new HTMLField({ required: false, blank: true, initial: "" }),
          equipment: new HTMLField({ required: false, blank: true, initial: "" }),
          resources: new HTMLField({ required: false, blank: true, initial: "" }),
        }
      };

    prepareDerivedData() {
      super.prepareDerivedData();
  
      // Determine the hero's current level.
      //this.level = Math.floor(this.progress / 5);
    }
  }