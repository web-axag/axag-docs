---
id: annotation-primitives
title: Annotation Primitives
sidebar_label: Annotation Primitives
slug: /specification/annotation-primitives
---

# Annotation Primitives

Annotation primitives are the atomic units from which AXAG semantic contracts are composed. Every annotation consists of one or more primitives attached to an HTML element.

## Primitive Categories

### 1. Identity Primitives
Declare what the operation is:
- `axag-intent` — The semantic purpose
- `axag-entity` — The domain object
- `axag-action-type` — The operation classification

### 2. Interface Primitives
Declare what the operation requires:
- `axag-required-parameters` — Mandatory inputs
- `axag-optional-parameters` — Optional inputs
- Parameter detail attributes on input elements

### 3. State Primitives
Declare preconditions and postconditions:
- `axag-preconditions` — Required state before execution
- `axag-postconditions` — Guaranteed state after execution
- `axag-side-effects` — Observable changes

### 4. Safety Primitives
Declare risk and authorization:
- `axag-risk-level` — Danger classification
- `axag-confirmation-required` — Confirmation gate
- `axag-approval-required` — Approval gate
- `axag-idempotent` — Retry safety

### 5. Context Primitives
Declare operational boundaries:
- `axag-scope` — Boundary level
- `axag-required-roles` — Role constraints
- `axag-tenant-context` — Tenant isolation

## Composition Rules

Primitives compose according to these rules:

1. **Identity is mandatory** — Every annotated element MUST have at least `axag-intent`, `axag-entity`, and `axag-action-type`
2. **Safety follows action type** — Mutating actions SHOULD declare risk level
3. **Context is inheritable** — Child elements inherit parent context primitives
4. **Parameters are element-scoped** — Parameter detail attributes attach to input elements

## Next Steps

- [Required Fields](/docs/specification/required-fields)
- [Optional Fields](/docs/specification/optional-fields)
