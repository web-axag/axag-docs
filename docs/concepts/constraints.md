---
id: constraints
title: "Core Concept: Constraints"
sidebar_label: Constraints
slug: /concepts/constraints
---

# Constraints

Constraints are rules that govern valid inputs and valid execution conditions for an operation. In AXAG, constraints are declared as part of the semantic contract — not hidden in client-side validation logic.

## Types of Constraints

### Value Constraints
Rules about individual parameter values:
- Type constraints: `type: "string"`, `type: "number"`
- Format constraints: `format: "email"`, `format: "date"`
- Range constraints: `min: 0`, `max: 100`
- Enum constraints: `enum: ["draft", "published", "archived"]`
- Pattern constraints: `pattern: "^[A-Z]{2}[0-9]{6}$"`

### Relational Constraints
Rules about relationships between parameters:
- Mutual exclusion: `price_min` and `price_max` cannot be equal
- Conditional requirement: `shipping_address_id` is required when `delivery_method` is "ship"
- Dependency: `payment_method_id` requires `billing_address_id`

### Execution Constraints
Rules about when the operation can execute:
- Preconditions: State that must be true before execution
- Rate limits: Maximum invocation frequency
- Cooldown periods: Minimum time between invocations

## Why Declaring Constraints Matters

Validation rules that exist only in client-side JavaScript are invisible to agents. If a form requires an email format but only validates on blur, an agent has no way to know this until submission fails.

AXAG makes constraints part of the contract, enabling agents to construct valid inputs on the first attempt.

## Next Steps

- [Preconditions and Postconditions](/docs/concepts/preconditions-postconditions)
- [Safety Boundaries](/docs/concepts/safety-boundaries)
