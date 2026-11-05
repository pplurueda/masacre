import {WEAPON_STAT_VALUES} from "../documents/dataModels/WeaponDataModel.mjs"

export class MasacreItem extends foundry.documents.Item {
    prepareData() {

        super.prepareData();
    }

    prepareBaseData() {
    }

    prepareDerivedData() {
        super.prepareDerivedData();

        const itemData = this;
        const systemData = itemData.system;

        this._getWeaponMaxStats();
    }

    _getWeaponMaxStats() {
        this._getWeaponMaxStatValue("cc");
        this._getWeaponMaxStatValue("cd");
        this._getWeaponMaxStatValue("ld");
    }

    _getWeaponMaxStatValue(stat) {
        
        if(this.type !== "weapon") return;

        const currentValue = this.system[stat] || "-";
        let currentIndex = WEAPON_STAT_VALUES.indexOf(currentValue);
        
        if (currentIndex === -1) currentIndex = 0;

        const maxField = `${stat}max`;
        
        let maxIndex = Math.min(currentIndex + 2, WEAPON_STAT_VALUES.length - 1);

        this.system[maxField] = WEAPON_STAT_VALUES[maxIndex];
    }
  }
