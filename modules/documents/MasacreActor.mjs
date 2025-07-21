export class MasacreActor extends Actor {
    //async applyDamage(damage) { // Omitted for brevity. }
  
    prepareDerivedData() {
      super.prepareDerivedData();
  
      // Clamp health within the appropriate range.
      //const { health } = this.system.resources;
      //health.value = Math.clamp(health.value, health.min, health.max);
    }
  }