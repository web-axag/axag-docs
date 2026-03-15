---
id: anti-patterns
title: Anti-Patterns
sidebar_label: Anti-Patterns
slug: /examples/anti-patterns
---

# Anti-Patterns

These are common mistakes when annotating with AXAG. Each anti-pattern shows what NOT to do and the correct approach.

## 1. Presentation-Coupled Intent

❌ **Wrong**: Intent describes HOW it looks, not WHAT it does
```html
<button axag-intent="red_button.click" axag-entity="red_button" axag-action-type="write">
  Delete
</button>
```

✅ **Correct**: Intent describes the semantic action
```html
<button axag-intent="account.delete" axag-entity="account" axag-action-type="delete">
  Delete
</button>
```

**Why**: Intents must be presentation-independent. "Red button click" is meaningless to an agent.

## 2. Missing Risk Level on Destructive Action

❌ **Wrong**: Delete with no risk metadata
```html
<button axag-intent="user.delete" axag-entity="user" axag-action-type="delete">
  Delete User
</button>
```

✅ **Correct**: Explicit risk level and confirmation
```html
<button axag-intent="user.delete" axag-entity="user" axag-action-type="delete"
  axag-risk-level="high" axag-confirmation-required="true" axag-idempotent="true">
  Delete User
</button>
```

**Why**: Without risk metadata, an agent may execute destructive actions without safeguards.

## 3. Overlapping Required and Optional Parameters

❌ **Wrong**: Same parameter in both lists
```html
<button axag-required-parameters='["email","name"]'
        axag-optional-parameters='["email","phone"]'>
```

✅ **Correct**: Each parameter in exactly one list
```html
<button axag-required-parameters='["email","name"]'
        axag-optional-parameters='["phone"]'>
```

**Why**: A parameter is either required or optional — never both.

## 4. Using camelCase in Intent Names

❌ **Wrong**: camelCase
```html
<button axag-intent="productSearch" axag-entity="product">
```

✅ **Correct**: `entity.action` with snake_case
```html
<button axag-intent="product.search" axag-entity="product">
```

**Why**: Intent naming convention is `entity.action` with snake_case for consistency and machine parsing.

## 5. Missing Idempotency Declaration

❌ **Wrong**: Write action with no idempotency information
```html
<button axag-intent="cart.add_item" axag-entity="cart" axag-action-type="write">
```

✅ **Correct**: Explicit idempotency
```html
<button axag-intent="cart.add_item" axag-entity="cart" axag-action-type="write"
  axag-idempotent="false">
```

**Why**: Agents need to know if retrying a failed operation is safe.

## 6. Annotating Non-Actionable Elements

❌ **Wrong**: Annotating a heading
```html
<h1 axag-intent="product.view" axag-entity="product" axag-action-type="read">
  Product Details
</h1>
```

✅ **Correct**: Only annotate actionable elements
```html
<h1>Product Details</h1>
<!-- Annotations go on buttons, links, or form submits -->
```

**Why**: Headings, labels, and display elements don't represent agent-invocable actions.

## 7. Hardcoded Entity IDs in Annotations

❌ **Wrong**: Embedding specific IDs
```html
<button axag-intent="order.track" axag-required-parameters='["order_12345"]'>
```

✅ **Correct**: Declaring parameter names, not values
```html
<button axag-intent="order.track" axag-required-parameters='["order_id"]'>
```

**Why**: Annotations declare the parameter schema, not instance data.

## 8. Approval Without Approval Roles

❌ **Wrong**: Approval required but no roles specified
```html
<button axag-intent="billing.change_plan" axag-approval-required="true">
```

✅ **Correct**: Approval with designated roles
```html
<button axag-intent="billing.change_plan" axag-approval-required="true"
  axag-approval-roles='["billing_admin","super_admin"]'>
```

**Why**: Without roles, the runtime can't validate who is authorized to approve.

## 9. Using `write` for Read-Only Operations

❌ **Wrong**: Search marked as write
```html
<button axag-intent="product.search" axag-action-type="write">
```

✅ **Correct**: Search is a read
```html
<button axag-intent="product.search" axag-action-type="read">
```

**Why**: Incorrect action types break safety analysis — writes trigger confirmation logic that reads don't need.

## 10. Ignoring Scope on Tenant-Sensitive Operations

❌ **Wrong**: Admin action with no scope
```html
<button axag-intent="admin.list_users" axag-entity="user" axag-action-type="read">
```

✅ **Correct**: Explicit tenant scope
```html
<button axag-intent="admin.list_users" axag-entity="user" axag-action-type="read"
  axag-scope="tenant" axag-tenant-boundary="strict">
```

**Why**: Without scope, agents may attempt cross-tenant access.

## 11. Vague or Missing Description

❌ **Wrong**: No description or generic description
```html
<button axag-intent="report.generate" axag-description="Click to do something">
```

✅ **Correct**: Specific, actionable description
```html
<button axag-intent="report.generate"
  axag-description="Generate an analytics report for the specified date range and metrics">
```

**Why**: Descriptions are used by agents to determine when to invoke a tool. Vague descriptions lead to incorrect tool selection.
