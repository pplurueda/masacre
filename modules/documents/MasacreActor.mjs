export class MasacreActor extends Actor {
    //async applyDamage(damage) { // Omitted for brevity. }
  
    prepareDerivedData() {
      super.prepareDerivedData();
  
      this.system.rank = this.items.find(item => item.type == "rank");
    }
  }