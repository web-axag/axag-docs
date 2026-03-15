---
id: preconditions-postconditions
title: "Core Concept: Preconditions and Postconditions"
sidebar_label: Preconditions & Postconditions
slug: /concepts/preconditions-postconditions
---

# Preconditions and Postconditions

**Preconditions** declare what state MUST be true before an operation can execute. **Postconditions** declare what state WILL be true after successful execution.

## Preconditions

Examples:
- `cart_validated` — The cart must be validated before checkout
- `user_authenticated` — The user must be logged in
- `inventory_reserved` — Inventory must be reserved before payment

Preconditions enable agents to:
1. Check whether execution is safe before invoking
2. Identify what steps must be completed first
3. Plan multi-step workflows automatically

## Postconditions

Examples:
- `checkout_session_created` — A checkout session will exist after execution
- `ticket_assigned` — The ticket will be assigned to an agent
- `order_confirmed` — The order will be in confirmed status

Postconditions enable agents to:
1. Verify operation success
2. Chain operations by using postconditions as preconditions for subsequent steps
3. Report expected outcomes to users

## Workflow Chaining

Preconditions and postconditions enable automatic workflow planning:

```
validate_cart → postcondition: cart_validated
reserve_inventory → precondition: cart_validated → postcondition: inventory_reserved
begin_checkout → precondition: cart_validated, inventory_reserved → postcondition: checkout_session_created
```

An agent can automatically determine the correct execution order.

## Next Steps

- [Context and Scope](/docs/concepts/context-and-scope)
- [Safety Boundaries](/docs/concepts/safety-boundaries)
