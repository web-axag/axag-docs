---
id: axag-as-semantic-contract
title: AXAG as a Semantic Contract
sidebar_label: AXAG as Semantic Contract
slug: /intro/axag-as-semantic-contract
description: Understanding AXAG as a semantic interaction contract rather than simple metadata.
keywords: [semantic contract, interaction contract, annotation]
---

# AXAG as a Semantic Contract

AXAG is frequently described as an "annotation standard." While technically accurate, this description understates its purpose. AXAG is a **semantic interaction contract** — a binding declaration of what an interface element does, what it requires, and what it guarantees.

## Contract vs Metadata

| Aspect | Metadata | Contract |
|--------|----------|----------|
| **Purpose** | Describes an element | Governs interaction with an element |
| **Binding** | Informational | Operational |
| **Validation** | Optional | Required |
| **Drift** | Tolerated | Violation |
| **Consumer** | Documentation tools | Agent runtimes |
| **Failure mode** | Stale information | Broken agent behavior |

When AXAG annotations declare that an operation requires `cart_validated` as a precondition, that is not a suggestion — it is a contract. An agent runtime that ignores this precondition is violating the contract. A manifest that omits this precondition has drifted from the source of truth.

## Contract Dimensions

The AXAG semantic contract expresses these dimensions:

### Intent
What the interaction is trying to accomplish. Example: `checkout.begin`, `product.search`, `ticket.escalate`.

### Entity
The domain object being operated on. Example: `order`, `product`, `ticket`, `campaign`.

### Action Type
The classification of the operation: `read`, `create`, `mutate`, `delete`, `navigate`.

### Parameters
The inputs required and optional for the operation, with type information and validation rules.

### Constraints
Rules that govern valid inputs — value ranges, format requirements, mutual exclusions, conditional requirements.

### Preconditions
State that MUST be true before the operation can execute. Example: `cart_validated`, `user_authenticated`, `inventory_available`.

### Postconditions
State that WILL be true after successful execution. Example: `checkout_session_created`, `order_confirmed`.

### Scope
The boundary within which the operation operates: `user`, `tenant`, `organization`, `global`.

### Risk Level
The danger classification: `none`, `low`, `medium`, `high`, `critical`.

### Safety Boundaries
Confirmation requirements, approval gates, rate limits, and cooldown periods.

### Idempotency
Whether the operation is safe to repeat without unintended side effects.

### Side Effects
Observable changes that the operation produces beyond its primary result.

## The Contract Chain

AXAG annotations are the **source of truth** in a contract chain:

```
AXAG Annotations (source of truth)
    → Semantic Manifest (derived artifact)
    → MCP Tool Registry (generated surface)
    → Agent Runtime (consumer)
```

If the annotations change, the manifest MUST be regenerated. If the manifest changes, the tool registry MUST be regenerated. Drift between any layers in this chain is a **conformance violation**.

## Why "Contract" Matters

Calling AXAG a contract rather than metadata has practical consequences:

1. **Validation is mandatory** — Contracts must be validated. Metadata can be stale.
2. **Drift is a defect** — Contract drift is a bug, not technical debt.
3. **Breaking changes require migration** — Contract changes that break consumers require versioning and migration paths.
4. **Governance is required** — Contracts need ownership, review processes, and change control.

## Next Steps

- [Who Should Use AXAG](/docs/intro/who-should-use-axag)
- [Core Concepts: Semantic Contract](/docs/concepts/semantic-contract)
- [Specification Overview](/docs/specification/overview)
