import {WEAPON_STAT_VALUES} from "../documents/dataModels/WeaponDataModel.mjs"

export class MasacreItem extends Item {
    prepareData() {

        super.prepareData();
    }

    prepareBaseData() {
    }

    prepareDerivedData() {

        const itemData = this;
        const systemData = itemData.system;

        this._getWeaponMaxStats();
    }

    async _getWeaponMaxStats() {
        await this._getWeaponMaxStatValue("cc");
        await this._getWeaponMaxStatValue("cd");
        await this._getWeaponMaxStatValue("ld");
    }

    async _getWeaponMaxStatValue(stat) {
        
        if(this.type !== "weapon") return;

        const currentValue = this.system[stat] || "-";
        let currentIndex = WEAPON_STAT_VALUES.indexOf(currentValue);
        
        if (currentIndex === -1) currentIndex = 0;

        const maxField = `${stat}max`;
        
        let maxIndex = Math.min(currentIndex + 2, WEAPON_STAT_VALUES.length - 1);

        this.system[maxField] = WEAPON_STAT_VALUES[maxIndex];
    }
  }