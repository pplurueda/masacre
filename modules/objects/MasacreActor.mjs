export class MasacreActor extends foundry.documents.Actor {
    //async applyDamage(damage) { // Omitted for brevity. }
  
    prepareDerivedData() {
      super.prepareDerivedData();

      this._prepareCharacterDerivedData();
    }

    _prepareCharacterDerivedData() {

      if (this.type == "character") {
        this.system.level = (this.system.combatSkill + this.system.nonCombatSkill) - 9;
        this.system.rank = this.items.find(i => i.type === "rank");
        this.system.weapons = this.items.filter(item => item.type === "weapon");
        this.system.equipment = this.items.filter(item => item.type === "equipment");
        this.system.resources = this.items.filter(item => item.type === "resource");
        this.system.medals = this.items.filter(item => item.type === "medal");

        let hp = 3;
        if(this.system.wounds.madeMess) hp--;
        if(this.system.wounds.crippled) hp--;
        if(this.system.wounds.death) hp--;
        
        this.system.hp.value = hp;
      }
      else if (this.type == "alien") {
        this.system.alienHabilities = this.items.filter(item => item.type === "alienHability");

        this.system.hp.value = this.system.hazardSheets.battle.value;
        this.system.hp.max = this.system.hazardSheets.battle.max;
      }
    }
  }
