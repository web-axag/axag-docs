---
id: static-validation
title: Static Validation
sidebar_label: Static Validation
slug: /validation/static-validation
---

# Static Validation

Static validation checks AXAG annotations at build time — before the page is served. This catches errors early, prevents invalid annotations from reaching production, and integrates with CI/CD pipelines.

## What Static Validation Checks

### Structural Validation
- All `axag-intent` values follow the `entity.action` naming convention
- Required attributes (`axag-intent`, `axag-entity`, `axag-action-type`) are present
- JSON attribute values (`axag-required-parameters`, `axag-optional-parameters`) are valid JSON
- Enum values for `axag-action-type`, `axag-risk-level` are from the allowed set

### Semantic Validation
- `axag-required-parameters` and `axag-optional-parameters` don't overlap
- `axag-confirmation-required="true"` is set when `axag-risk-level` is `high` or `critical`
- `axag-approval-required="true"` has a corresponding `axag-approval-roles`
- `axag-idempotent` is declared for all write/delete operations
- `axag-scope` is declared for tenant-sensitive operations

### Cross-Reference Validation
- All intents referenced in annotations exist in the Semantic Manifest
- Parameter names in annotations match the manifest parameter definitions
- Entity names are consistent between annotations and manifest

## Validation Tool Example

```bash title="Static validation output"
# Run static validation
npx axag-lint src --manifest axag-manifest.json

# Output
✓ 47 annotations found
✓ All structural checks passed
✓ All semantic checks passed
✗ 2 cross-reference warnings:
  - src/components/Cart.tsx:42 — intent "cart.remove_item" not in manifest
  - src/pages/Admin.tsx:108 — parameter "user_role" not declared in manifest
```

## Integration with Build Tools

`@axag/compiler` reads annotations during the build and fails it on error diagnostics, so a broken annotation never reaches a deploy. See [Build-Time Compilation](/docs/tool-generation/build-time-compilation).

### Vite
```typescript title="vite.config.ts"
import { defineConfig } from 'vite';
import axag from '@axag/compiler/vite';

export default defineConfig({
  plugins: [axag({ failOnError: true })],
});
```

### webpack
```javascript title="webpack.config.js"
const axag = require('@axag/compiler/webpack').default;

module.exports = {
  plugins: [axag({ failOnError: true })],
};
```

Rollup, Rspack and esbuild import from `@axag/compiler/rollup`, `/rspack` and `/esbuild`.

## Lint Rules

`axag-lint` ships 35 rules, grouped by what they protect:

| Rules | Cover |
|-------|-------|
| 001–003, 034–035 | Identity: intent, entity and action type present and correctly shaped |
| 004–005 | Enum values |
| 006–007, 023–026 | Safety: risk, confirmation, approval, idempotency |
| 008–009 | Parameters |
| 010 | Cross-reference against a generated manifest |
| 011, 018–022 | Scope and tenancy |
| 012–016 | Contradictions between attributes |
| 017 | Unsafe mutations |
| 027–028 | Macro syntax and macro/longhand conflicts |
| 029–032 | Harvesting: unnamed controls, schema drift, accessible names, labels |
| 033 | Annotations that exist only at runtime |

Each has a default severity you can change per project. See [CI/CD Linting](/docs/validation/ci-linting) for the configuration file, and the [axag-lint README](https://www.npmjs.com/package/@web-axag/axag-lint) for the full list.

## Project-Specific Severities

Rules are turned up, down or off per project rather than rewritten:

```json title=".axaglintrc.json"
{
  "rules": {
    "AXAG-LINT-024": "error",
    "AXAG-LINT-025": "off"
  }
}
```

Domain rules of your own — "every billing action must be high risk or above" — aren't part of the linter yet; today that check belongs in a CI script over the generated manifest, which is JSON:

```bash title="A domain rule over the manifest"
npx axag generate src --manifest axag-manifest.json
node -e "const m=require('./axag-manifest.json');\
  const bad=m.actions.filter(a=>['billing','payment','refund'].includes(a.entity) && !['high','critical'].includes(a.risk_level));\
  if (bad.length) { console.error('Financial actions below high risk:', bad.map(a=>a.intent)); process.exit(1); }"
```
