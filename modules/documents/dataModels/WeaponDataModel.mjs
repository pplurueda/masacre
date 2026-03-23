const { BooleanField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export const WEAPON_STAT_VALUES = ["0", "1", "1d6", "1d10", "2d6", "2d10", "3d10", "1d100"];

export class WeaponDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
          description: new StringField({ required: true, blank: true }),
          cc: new StringField({ required: true, blank: true }),
          cd: new StringField({ required: true, blank: true }),
          ld: new StringField({ required: true, blank: true }),          
          ccmax: new StringField({ required: true, blank: true }),
          cdmax: new StringField({ required: true, blank: true }),
          ldmax: new StringField({ required: true, blank: true }),          
        }
      };

    prepareDerivedData() {
      super.prepareDerivedData();
  
      // Determine the hero's current level.
      //this.level = Math.floor(this.progress / 5);
    }
}