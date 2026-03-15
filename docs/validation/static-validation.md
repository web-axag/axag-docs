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
npx axag-validate --input src/ --manifest axag-manifest.json

# Output
✓ 47 annotations found
✓ All structural checks passed
✓ All semantic checks passed
✗ 2 cross-reference warnings:
  - src/components/Cart.tsx:42 — intent "cart.remove_item" not in manifest
  - src/pages/Admin.tsx:108 — parameter "user_role" not declared in manifest
```

## Integration with Build Tools

### Webpack Plugin
```javascript title="webpack.config.js — AXAG plugin"
// webpack.config.js
const AXAGValidatePlugin = require('axag-validate-webpack');

module.exports = {
  plugins: [
    new AXAGValidatePlugin({
      manifestPath: './axag-manifest.json',
      failOnError: true,
      failOnWarning: false,
    }),
  ],
};
```

### Vite Plugin
```typescript title="vite.config.ts — AXAG plugin"
// vite.config.ts
import { axagValidate } from 'axag-validate-vite';

export default {
  plugins: [
    axagValidate({
      manifestPath: './axag-manifest.json',
      strict: true,
    }),
  ],
};
```

## Lint Rules

Static validation includes a set of named lint rules:

| Rule ID | Description | Severity |
|---------|------------|----------|
| `AXAG-LINT-001` | Missing `axag-intent` on annotated element | Error |
| `AXAG-LINT-002` | Missing `axag-entity` on annotated element | Error |
| `AXAG-LINT-003` | Missing `axag-action-type` on annotated element | Error |
| `AXAG-LINT-004` | Invalid `axag-action-type` value | Error |
| `AXAG-LINT-005` | Invalid `axag-risk-level` value | Error |
| `AXAG-LINT-006` | Missing confirmation for high/critical risk | Warning |
| `AXAG-LINT-007` | Missing `axag-idempotent` on write/delete action | Warning |
| `AXAG-LINT-008` | Overlapping required and optional parameters | Error |
| `AXAG-LINT-009` | Invalid JSON in parameter attributes | Error |
| `AXAG-LINT-010` | Intent not found in manifest | Warning |
| `AXAG-LINT-011` | Missing `axag-scope` on tenant-sensitive action | Warning |
| `AXAG-LINT-012` | `axag-approval-required` without `axag-approval-roles` | Error |

## Custom Rules

Teams can define custom lint rules for domain-specific requirements:

```json
{
  "customRules": [
    {
      "id": "AXAG-CUSTOM-001",
      "description": "All financial operations must have risk_level >= high",
      "selector": "[axag-entity='billing'],[axag-entity='payment'],[axag-entity='refund']",
      "assert": { "axag-risk-level": ["high", "critical"] },
      "severity": "error"
    }
  ]
}
```
