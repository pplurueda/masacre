export class MasacreActor extends Actor {
    //async applyDamage(damage) { // Omitted for brevity. }
  
    prepareDerivedData() {
      super.prepareDerivedData();

      this._prepareCharacterDerivedData();
    }

    _prepareCharacterDerivedData() {
      if (this.type !== "character") return;

      const rank = this.items.find(i => i.type === "rank");

      this.system.rank = rank;
      this.system.weapons = this.items.filter(item => item.type === "weapon");

      // Parse equipment from rank (split by #)
      if (rank?.system?.equipment) {
        this.system.equipment = rank.system.equipment.split('#').map(s => s.trim()).filter(Boolean);
      } else {
        this.system.equipment = [];
      }

      console.log("Derived data for character prepared:", {
        rank: this.system.rank,
        weapons: this.system.weapons,
        equipment: this.system.equipment
      });
    }
  }