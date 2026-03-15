---
id: common-failures
title: Common Validation Failures
sidebar_label: Common Failures
slug: /validation/common-failures
---

# Common Validation Failures

This page catalogs the most frequent AXAG validation failures, their causes, and how to fix them.

## Structural Failures

### 1. Missing Required Attributes

**Error**: `AXAG-LINT-001: Element has axag-* attributes but is missing axag-intent`

**Cause**: An element has some `axag-*` attributes but is missing one of the three required attributes (`axag-intent`, `axag-entity`, `axag-action-type`).

**Fix**: Add the missing attribute.
```html title="❌ Missing required attributes → ✅ Fix"
<!-- ❌ Bad -->
<button axag-entity="product" axag-action-type="read">Search</button>

<!-- ✅ Good -->
<button axag-intent="product.search" axag-entity="product" axag-action-type="read">Search</button>
```

### 2. Invalid JSON in Attributes

**Error**: `AXAG-LINT-009: Invalid JSON in axag-required-parameters`

**Cause**: JSON array/object attributes use single quotes or have syntax errors.

**Fix**: Use valid JSON with proper quoting.
```html title="❌ Invalid JSON quotes → ✅ Fix"
<!-- ❌ Bad: single quotes -->
<button axag-required-parameters="['query', 'page']">Search</button>

<!-- ✅ Good: double quotes (attribute in single quotes) -->
<button axag-required-parameters='["query", "page"]'>Search</button>
```

### 3. Invalid Enum Values

**Error**: `AXAG-LINT-004: Invalid axag-action-type value "update"`

**Cause**: Using a value not in the allowed enum set.

**Fix**: Use one of the allowed values.
```html title="❌ Invalid enum value → ✅ Fix"
<!-- ❌ Bad -->
<button axag-action-type="update">Save</button>

<!-- ✅ Good -->
<button axag-action-type="write">Save</button>
```

## Semantic Failures

### 4. Missing Safety Metadata

**Error**: `AXAG-LINT-006: Element with risk_level "high" is missing confirmation_required`

**Cause**: High or critical risk operations should require confirmation.

**Fix**: Add `axag-confirmation-required="true"`.
```html title="❌ Missing safety metadata → ✅ Fix"
<!-- ❌ Bad -->
<button axag-intent="account.delete" axag-risk-level="high">Delete</button>

<!-- ✅ Good -->
<button axag-intent="account.delete" axag-risk-level="high"
        axag-confirmation-required="true">Delete</button>
```

### 5. Overlapping Parameters

**Error**: `AXAG-LINT-008: Parameter "email" appears in both required and optional`

**Cause**: A parameter name exists in both `axag-required-parameters` and `axag-optional-parameters`.

**Fix**: Move the parameter to the correct list — it's either required or optional, not both.

### 6. Missing Idempotency Declaration

**Error**: `AXAG-LINT-007: Write action missing axag-idempotent declaration`

**Cause**: All write and delete operations should declare whether they're idempotent.

**Fix**: Add `axag-idempotent="true"` or `axag-idempotent="false"`.

### 7. Approval Without Roles

**Error**: `AXAG-LINT-012: axag-approval-required is true but axag-approval-roles is missing`

**Cause**: Declaring an operation requires approval without specifying who can approve.

**Fix**: Add `axag-approval-roles` with the list of authorized roles.

## Cross-Reference Failures

### 8. Intent Not in Manifest

**Error**: `AXAG-LINT-010: Intent "cart.remove_item" not found in manifest`

**Cause**: An annotation references an intent that doesn't exist in the Semantic Manifest.

**Fix**: Either add the intent to the manifest, or fix the typo in the annotation.

### 9. Parameter Mismatch

**Error**: Parameter "user_role" in annotation not declared in manifest for intent "user.create"

**Cause**: The annotation references a parameter that the manifest doesn't define.

**Fix**: Synchronize parameters between annotations and manifest.

## Manifest Failures

### 10. Invalid Intent Format

**Error**: Intent "productSearch" does not match pattern `^[a-z_]+\.[a-z_]+$`

**Cause**: Intent must use `entity.action` format with snake_case.

**Fix**: Rename to `product.search`.
