# AGENTS.md — masacre (Foundry VTT v13 Game System)

## Project Overview

This is a **Foundry VTT v13 game system** implementing the tabletop RPG
**"3:16 Masacre en la Galaxia"** (3:16 Carnage Amongst the Stars).
It is written in plain JavaScript (ES Modules), uses Handlebars templates
for UI and LESS for styling. There is no build step, bundler, or transpiler.

- **Entry point:** `masacre.js` (registered via `system.json` as an ES module)
- **Foundry compatibility:** v13 only
- **Languages:** Spanish (primary) and English

## Build / Compile / Test Commands

There is **no build pipeline, test framework, or linter** configured in this project.

### CSS (LESS)

LESS files in `less/` are compiled to `masacre.css` at the project root.
The LESS files contain editor hints for the **VS Code "Easy LESS" extension**:

```
//main: ./masacre.less
//relativeUrls: true, out: ../masacre.css
```

If you modify any `.less` file, recompile by saving `less/masacre.less` with
Easy LESS enabled, or run manually:

```bash
npx lessc less/masacre.less masacre.css
```

### Running the System

Load Foundry VTT and select the "masacre" system. There is no standalone
dev server or hot-reload tooling. Refresh the Foundry browser tab after
changing `.js`/`.mjs`/`.hbs` files; recompile LESS after changing `.less` files.

### Tests

No test framework is configured. No test files exist.

### Linting

No ESLint or Prettier configuration exists. If adding linting in the future,
respect the existing code style documented below.

## Directory Structure

```
masacre.js                 # System entry point (hooks, registration)
system.json                # Foundry system manifest
masacre.css                # Compiled CSS (do not edit directly)
lang/                      # Localization (es.json, en.json)
less/                      # LESS source stylesheets
modules/
  config.js                # System constants (flashback states/types)
  utils.js                 # Utility functions (placeholder)
  dice.js                  # Dice logic (placeholder)
  dialog.js                # Dialog logic (placeholder)
  documents/dataModels/    # TypeDataModel subclasses for actors/items
  objects/                 # Custom Actor/Item document classes
  sheets/                  # ActorSheet/ItemSheet subclasses
  combat/                  # Combat logic (placeholder)
templates/
  sheets/actors/           # Actor sheet Handlebars templates
  sheets/items/            # Item sheet Handlebars templates
  partials/                # Reusable Handlebars partial templates
```

## Code Style

### Language and Modules

- **Plain JavaScript only** — no TypeScript, no JSDoc type annotations.
- All source files use **ES Module** syntax (`import`/`export`).
- `.mjs` extension for class-based module files, `.js` for config/utility files.

### Imports

- Always use **named imports**: `import { Foo } from './path.mjs';`
- Always include **explicit file extensions** (`.js` or `.mjs`).
- Use **relative paths** with `./` or `../` prefix.
- Foundry globals (`foundry`, `Hooks`, `CONFIG`, `Actors`, `Items`, etc.) are
  available globally — do not import them.

```javascript
import { masacre } from './modules/config.js';
import { CharacterDataModel } from './modules/documents/dataModels/CharacterDataModel.mjs';
```

### Naming Conventions

| Element              | Convention   | Examples                                      |
|----------------------|------------- |-----------------------------------------------|
| Classes              | PascalCase   | `CharacterSheet`, `MasacreActor`              |
| Class files          | PascalCase   | `CharacterSheet.mjs`, `WeaponDataModel.mjs`   |
| Utility/config files | camelCase    | `config.js`, `utils.js`                       |
| Variables/functions  | camelCase    | `combatSkill`, `preloadHandlebarsTemplates`   |
| Private methods      | `_` prefix   | `_prepareCharacterDerivedData`, `_onItemControl` |
| CSS classes          | kebab-case   | `character-sheet`, `stat-box`                 |
| Data model fields    | camelCase    | `combatSkill`, `nonCombatSkill`, `deathAliens` |

Some identifiers use **Spanish** terms (e.g., `listaArmas`, `datosBasicos`,
`puntosVida`). Follow the existing convention in each file.

### Foundry Class Patterns

**Data Models** extend `foundry.abstract.TypeDataModel` (or the project's
`ActorDataModel` base class). Define fields in a static `defineSchema()` method
and spread the parent schema:

```javascript
static defineSchema() {
    const fields = foundry.data.fields;
    return {
        ...super.defineSchema(),
        myField: new fields.NumberField({ initial: 0 }),
    };
}
```

**Document classes** (`MasacreActor`, `MasacreItem`) extend Foundry's `Actor`
and `Item`. Override `prepareDerivedData()` for computed values.

**Sheet classes** extend `ActorSheet` or `ItemSheet`. Use the static getter
`get defaultOptions()` with `foundry.utils.mergeObject(super.defaultOptions, {...})`.

### Handlebars Templates

- Use `{{localize "masacre.key"}}` for all user-facing strings. Add keys to
  both `lang/es.json` and `lang/en.json`.
- Reference partials with full system path:
  `{{> "systems/masacre/templates/partials/name.hbs"}}`
- Form inputs use `name="system.field.path"` for Foundry's automatic data binding.
- Templates live in `templates/sheets/` (full sheets) and `templates/partials/`
  (reusable fragments).

### LESS / CSS

- Main entry: `less/masacre.less` (imports all other files).
- One LESS file per sheet type (e.g., `charactersheetTMP.less`, `alienSheet.less`).
- Use kebab-case for CSS class names.
- The compiled output `masacre.css` should not be edited directly.

### Error Handling

- Minimal explicit error handling in the codebase.
- Use **guard clauses** for type checks and null checks:
  ```javascript
  if (this.type !== "character") return;
  if (item.actor === undefined) return;
  ```
- Do not add try/catch blocks unless interfacing with external APIs or async
  operations that may genuinely fail.

### Formatting

- **2-space indentation** in JavaScript files.
- Opening braces on the same line as the statement.
- Use `const` for values that are not reassigned; `let` when reassignment is needed.
- No semicolons are required (the codebase is inconsistent — some files use them,
  some omit them). Match the style of the file you are editing.

### Localization

- All user-visible strings must be localized via `lang/es.json` and `lang/en.json`.
- Localization keys follow the pattern `masacre.category.key`
  (e.g., `masacre.Reputation`, `masacre.CombatSkill`).
- Spanish is the **primary** language; ensure Spanish translations are always present.

## Document Types (from system.json)

- **Actor types:** `character`, `alien`
- **Item types:** `weapon`, `rank`, `flashback`

Each type should have a corresponding DataModel in `modules/documents/dataModels/`,
a sheet in `modules/sheets/`, and a template in `templates/sheets/`.

## Key Architectural Notes

- `masacre.js` registers everything on the Foundry `Hooks.once("init", ...)` hook:
  document classes, data models, sheet classes, Handlebars helpers, and template preloads.
- Custom Handlebars helpers: `eachProperty`, `concat`, `toLowerCase`, `toUpperCase`.
- The character sheet auto-creates a "Brawl" weapon on first render and enforces
  a single-rank constraint (deletes old rank when a new one is added).
- `modules/config.js` exports a `masacre` object with flashback configuration
  constants used by the system's `CONFIG.masacre` namespace.
