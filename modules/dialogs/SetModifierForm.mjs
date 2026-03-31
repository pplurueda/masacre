export class SetModifierForm extends FormApplication {

  constructor(data, options) {
    super(data, options);
    this._resolve = null;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "set-modifier-form",
      template: "systems/masacre/templates/dialogs/setModifierSheet.hbs",
      title: game.i18n.localize("masacre.dialog.setModifier"),
      classes: ["masacre", "set-modifier-dialog"],
      width: 400,
      height: "auto"
    });
  }

  getData() {
    return {
      description: this.object.description,
      value: this.object.value
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".modifier-btn").click(this._onModifierClick.bind(this));
  }

  _onModifierClick(event) {
    event.preventDefault();
    const modifier = parseInt(event.currentTarget.dataset.modifier);
    const resolve = this._resolve;
    this._resolve = null;
    resolve(modifier);
    this.close();
  }

  static async prompt(data) {
    return new Promise((resolve) => {
      const form = new SetModifierForm(data);
      form._resolve = resolve;
      form.render(true);
    });
  }

  async close(options) {
    if (this._resolve) {
      this._resolve(0);
      this._resolve = null;
    }
    return super.close(options);
  }
}
