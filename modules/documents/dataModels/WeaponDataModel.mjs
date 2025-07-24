const { BooleanField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export class WeaponDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
          description: new StringField({ required: true, blank: true }),
          cc: new StringField({ required: true, blank: true }),
          cd: new StringField({ required: true, blank: true }),
          ld: new StringField({ required: true, blank: true }),          
        }
      };

    prepareDerivedData() {
      super.prepareDerivedData();
  
      // Determine the hero's current level.
      //this.level = Math.floor(this.progress / 5);
    }
}