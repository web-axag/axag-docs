---
id: visibility-vs-operability
title: "Core Concept: Visibility vs Operability"
sidebar_label: Visibility vs Operability
slug: /concepts/visibility-vs-operability
---

# Visibility vs Operability

**Visibility** means an agent can discover an operation exists. **Operability** means an agent can invoke it.

An operation can be:
- Visible and operable — Discoverable and executable
- Visible but not operable — Discoverable but gated (e.g., requires approval)
- Not visible — Hidden from the agent entirely

This distinction prevents agents from assuming that discovery implies permission.

## Declaring Operability

```html
<button
  axag-intent="user.delete"
  axag-entity="user"
  axag-action-type="delete"
  axag-visible="true"
  axag-operable="false"
  axag-operability-reason="Requires admin approval"
  axag-approval-required="true"
  axag-approval-roles='["admin"]'
>
  Delete User
</button>
```

This tells the agent: you can see this operation exists, but you cannot execute it without admin approval.

## Next Steps

- [Determinism and Trust](/docs/concepts/determinism-and-trust)
- [Safety Boundaries](/docs/concepts/safety-boundaries)
