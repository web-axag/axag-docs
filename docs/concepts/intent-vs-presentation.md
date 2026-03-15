---
id: intent-vs-presentation
title: "Core Concept: Intent vs Presentation"
sidebar_label: Intent vs Presentation
slug: /concepts/intent-vs-presentation
---

# Intent vs Presentation

**Presentation** describes how an interaction appears to human users. **Intent** describes what the interaction means semantically.

| Aspect | Presentation | Intent |
|--------|-------------|--------|
| Button text | "Submit" | `order.create` |
| Visual state | Grayed-out button | `precondition: cart_validated` |
| Color coding | Red button | `risk_level: high` |
| Position | Below the form | `action_type: mutate` |

AXAG captures intent. CSS captures presentation. Both are necessary; only intent is machine-readable.

## Why This Distinction Matters

An agent cannot:
- See that a button is red (and infer it's dangerous)
- See that a button is grayed out (and infer a precondition)
- See that a button is at the bottom of a form (and infer it submits the form)

AXAG makes all of this explicit through declarations rather than visual cues.

## Next Steps

- [Affordances](/docs/concepts/affordances)
- [Constraints](/docs/concepts/constraints)
