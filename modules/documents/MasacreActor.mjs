export class MasacreActor extends Actor {
    //async applyDamage(damage) { // Omitted for brevity. }
  
    prepareDerivedData() {
      super.prepareDerivedData();

      this._prepareCharacterDerivedData();
    }

    async _prepareCharacterDerivedData() {

      if (this.type !== "character") return;

      this.system.rank = this.items.find(item => item.type == "rank");
      this.system.weapons = this.items.filter(item => item.type == "weapon");
      this.system.flashbacks = this.items.filter(item => item.type == "flashback");
    }
  }