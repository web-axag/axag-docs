---
id: contradictory-annotation-detection
title: Contradictory Annotation Detection
sidebar_label: Contradictory Annotation Detection
slug: /validation/contradictory-annotation-detection
---

# Contradictory Annotation Detection

Contradictory annotations occur when two or more AXAG attributes on the same element express incompatible semantics. These contradictions create ambiguity for agents, which cannot determine the correct interpretation.

## Why It Matters

When an agent encounters contradictory annotations, it must either:
- Guess which attribute to trust (dangerous)
- Reject the operation entirely (safe but limits functionality)
- Ask for human clarification (possible but defeats automation)

None of these outcomes are acceptable in production. **Contradictions MUST be detected and resolved before deployment.**

## Common Contradictions

### 1. Risk Level vs Action Type

A `read` operation annotated with `high` risk:

```html title="❌ Contradictory — read with high risk"
<!-- ❌ Contradictory: reads are inherently safe -->
<button
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  axag-risk-level="high"
>Search</button>
```

**Rule:** `AXAG-LINT-010` — Read operations **SHOULD NOT** have risk level above `low`.

**Fix:**
```html title="✅ Fix — risk level matches action type"
<button
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  axag-risk-level="none"
>Search</button>
```

### 2. Idempotent vs Side Effects

An operation declared idempotent but with non-idempotent side effects:

```html title="❌ Contradictory — idempotent with non-idempotent side effects"
<!-- ❌ Contradictory: email_sent is not idempotent -->
<button
  axag-intent="order.place"
  axag-entity="order"
  axag-action-type="write"
  axag-idempotent="true"
  axag-side-effects='["email_sent","inventory_deducted"]'
  axag-risk-level="high"
>Place Order</button>
```

**Rule:** `AXAG-LINT-011` — Idempotent operations **MUST NOT** declare non-idempotent side effects.

**Fix:** Either mark as non-idempotent or ensure side effects are truly idempotent (e.g., "email_sent" becomes "email_queued_idempotent").

### 3. Confirmation Not Required on Destructive Actions

```html title="❌ Contradictory — delete without confirmation"
<!-- ❌ Contradictory: delete without confirmation -->
<button
  axag-intent="user.delete"
  axag-entity="user"
  axag-action-type="delete"
  axag-risk-level="critical"
  axag-confirmation-required="false"
>Delete User</button>
```

**Rule:** `AXAG-LINT-012` — Delete operations with risk level `high` or `critical` **MUST** require confirmation.

### 4. Approval Without Roles

```html
<!-- ❌ Contradictory: approval required but no roles specified -->
<button
  axag-intent="expense.approve"
  axag-entity="expense"
  axag-action-type="write"
  axag-approval-required="true"
  axag-risk-level="high"
>Approve</button>
```

**Rule:** `AXAG-LINT-013` — When `axag-approval-required="true"`, `axag-approval-roles` **MUST** be specified.

### 5. Preconditions Contradicting Action Type

```html
<!-- ❌ Contradictory: create with "entity must exist" precondition -->
<button
  axag-intent="product.create"
  axag-entity="product"
  axag-action-type="write"
  axag-preconditions='["product must exist"]'
>Create Product</button>
```

**Rule:** `AXAG-LINT-014` — Create operations **SHOULD NOT** require the target entity to already exist.

## Detection Rules Summary

| Rule | Contradiction | Severity |
|------|--------------|----------|
| `AXAG-LINT-010` | Read + high/critical risk | Warning |
| `AXAG-LINT-011` | Idempotent + non-idempotent side effects | Error |
| `AXAG-LINT-012` | Destructive + no confirmation (high/critical) | Error |
| `AXAG-LINT-013` | Approval required + no approval roles | Error |
| `AXAG-LINT-014` | Create + "must exist" precondition | Warning |
| `AXAG-LINT-015` | Navigate + side effects declared | Warning |
| `AXAG-LINT-016` | Non-tenant scope + tenant-only roles | Error |

## CI Integration

```yaml
# In your CI pipeline
- name: Check for contradictory annotations
  run: npx axag-lint --rules contradictions --format=github
```

## Next Steps

- [Missing Intent Detection](/docs/validation/missing-intent-detection)
- [Unsafe Mutation Exposure Detection](/docs/validation/unsafe-mutation-detection)
- [Common Validation Failures](/docs/validation/common-failures)
