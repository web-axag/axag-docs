---
id: annotation-attributes
title: Annotation Attributes Reference
sidebar_label: Annotation Attributes
slug: /reference/annotation-attributes
---

# Annotation Attributes Reference

Complete reference for all `axag-*` HTML attributes with usage examples.

## axag-intent

**Type**: `string`  
**Required**: MUST  
**Pattern**: `^[a-z_]+\.[a-z_]+$`

Canonical identifier for the action's intent. Uses `entity.action` naming convention.

```html title="axag-intent — entity.action format"
axag-intent="product.search"
axag-intent="cart.add_item"
axag-intent="order.track"
axag-intent="account.delete"
```

## axag-entity

**Type**: `string`  
**Required**: MUST  
**Pattern**: `^[a-z_]+$`

The entity this action operates on.

```html title="axag-entity — domain entity names"
axag-entity="product"
axag-entity="cart"
axag-entity="user"
axag-entity="billing"
```

## axag-action-type

**Type**: `enum`  
**Required**: MUST  
**Values**: `read`, `write`, `delete`

```html title="axag-action-type — operation classification"
axag-action-type="read"    <!-- Query, search, list, get, view -->
axag-action-type="write"   <!-- Create, update, submit, schedule -->
axag-action-type="delete"  <!-- Remove, cancel, deactivate -->
```

## axag-description

**Type**: `string`  
**Required**: SHOULD  

Human-readable description of what the action does. Used in generated tool descriptions.

```html title="axag-description — human-readable action summary"
axag-description="Search the product catalog with text query and optional filters"
```

## axag-risk-level

**Type**: `enum`  
**Required**: SHOULD  
**Values**: `none`, `low`, `medium`, `high`, `critical`

| Level | Criteria | Example |
|-------|----------|---------|
| `none` | Read-only, no side-effects | Search, list, view |
| `low` | Write with reversible effects | Create draft, add to cart |
| `medium` | Write with moderate consequences | Submit form, update record |
| `high` | Write with significant consequences | Delete data, process refund |
| `critical` | Write with financial/security/legal impact | Billing change, disable MFA |

## axag-idempotent

**Type**: `boolean`  
**Required**: SHOULD (for write/delete)

Whether calling the operation twice with the same parameters produces the same result.

```html title="axag-idempotent — safe to retry?"
axag-idempotent="true"   <!-- Update status, set value, soft delete -->
axag-idempotent="false"  <!-- Create record, add to cart, send email -->
```

## axag-required-parameters

**Type**: `JSON string[]`  
**Required**: SHOULD

```html title="axag-required-parameters"
axag-required-parameters='["product_id","quantity"]'
```

## axag-optional-parameters

**Type**: `JSON string[]`  
**Required**: MAY

```html title="axag-optional-parameters"
axag-optional-parameters='["variant_id","gift_wrap"]'
```

## axag-preconditions

**Type**: `JSON string[]`  
**Required**: MAY

```html title="axag-preconditions — what must be true before execution"
axag-preconditions='["product must be in stock","user must be authenticated"]'
```

## axag-postconditions

**Type**: `JSON string[]`  
**Required**: MAY

```html title="axag-postconditions — guaranteed state after execution"
axag-postconditions='["item added to cart","cart total updated"]'
```

## axag-confirmation-required

**Type**: `boolean`  
**Required**: MUST (when risk_level is high or critical)

```html title="axag-confirmation-required — user must confirm"
axag-confirmation-required="true"
```

## axag-approval-required

**Type**: `boolean`  
**Required**: MUST (when approval gate exists)

```html title="axag-approval-required — needs human approval gate"
axag-approval-required="true"
```

## axag-approval-roles

**Type**: `JSON string[]`  
**Required**: MUST (when approval-required is true)

```html title="axag-approval-roles — who can approve"
axag-approval-roles='["super_admin","security_admin"]'
```

## axag-side-effects

**Type**: `JSON string[]`  
**Required**: SHOULD (for write/delete with external effects)

```html title="axag-side-effects — external consequences"
axag-side-effects='["email_notification","inventory_update","refund_processing"]'
```

## axag-scope

**Type**: `enum`  
**Required**: SHOULD  
**Values**: `public`, `user`, `tenant`, `global`

```html title="axag-scope — visibility boundary"
axag-scope="tenant"
```

## axag-tenant-boundary

**Type**: `enum`  
**Required**: SHOULD (for tenant-scoped operations)  
**Values**: `strict`, `relaxed`

```html title="axag-tenant-boundary — cross-tenant enforcement"
axag-tenant-boundary="strict"
```

## axag-async

**Type**: `boolean`  
**Required**: MAY

```html title="axag-async — long-running operation"
axag-async="true"
```
