---
id: idempotency-side-effects
title: "Core Concept: Idempotency and Side Effects"
sidebar_label: Idempotency & Side Effects
slug: /concepts/idempotency-side-effects
---

# Idempotency and Side Effects

**Idempotency** indicates whether an operation can be safely repeated without unintended consequences. **Side effects** are observable changes produced by an operation beyond its primary result.

## Idempotency

| Declaration | Meaning |
|-------------|---------|
| `axag-idempotent="true"` | Safe to retry — repeated invocations produce the same result |
| `axag-idempotent="false"` | Not safe to retry — repeated invocations may cause duplicates or errors |

Examples:
- Product search → idempotent (searching twice returns the same results)
- Order creation → NOT idempotent (creating twice produces two orders)

## Side Effects

Side effects SHOULD be declared when an operation causes observable changes beyond its primary purpose:

```html
<button
  axag-intent="contact.merge"
  axag-side-effects='["opportunities_reassigned","notification_emails_sent","analytics_updated"]'
>
  Merge Contacts
</button>
```

This tells agents that merging contacts will also reassign opportunities, send notification emails, and update analytics — enabling informed decision-making.

## Next Steps

- [Role Awareness and Tenant Boundaries](/docs/concepts/role-awareness-tenant-boundaries)
- [Safety Boundaries](/docs/concepts/safety-boundaries)
