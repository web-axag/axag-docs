---
id: execution-planning-role
title: Execution Planning Role
sidebar_label: Execution Planning
slug: /semantic-manifest/execution-planning-role
---
# Execution Planning Role

The manifest enables agent runtimes to plan multi-step workflows by analyzing operation preconditions and postconditions.

## Workflow Planning

Given operations with declared pre/postconditions, an agent can automatically determine execution order:

```
validate_cart       → post: cart_validated
reserve_inventory   → pre: cart_validated → post: inventory_reserved
begin_checkout      → pre: cart_validated, inventory_reserved → post: checkout_session_created
process_payment     → pre: checkout_session_created → post: payment_processed
confirm_order       → pre: payment_processed → post: order_confirmed
```

The agent constructs a dependency graph and executes operations in the correct sequence.

## Conflict Detection
The manifest also enables agents to detect conflicting operations — for example, two operations that both modify the same entity with incompatible postconditions.
