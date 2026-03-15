---
id: determinism-and-trust
title: "Core Concept: Determinism and Trust"
sidebar_label: Determinism and Trust
slug: /concepts/determinism-and-trust
---

# Determinism and Trust

Agents require **deterministic** interactions — the same inputs with the same preconditions should produce the same outcomes. Trust in agent interactions is built on predictable behavior governed by explicit contracts.

## Why Determinism Matters

Non-deterministic interactions create:
- Unpredictable side effects
- Inconsistent operation outcomes
- Difficulty in debugging agent behavior
- Erosion of user trust in agent actions

## How AXAG Enables Determinism

1. **Typed parameters** — Agents know exact input requirements
2. **Explicit preconditions** — Agents verify state before execution
3. **Declared postconditions** — Agents verify expected outcomes
4. **Idempotency declarations** — Agents know if retry is safe
5. **Side effect declarations** — Agents assess full impact before execution

## Trust Model

Trust in AXAG is **contractual**: agents trust the semantic contract, and the contract is validated through CI, monitored for drift, and governed through change control.

## Next Steps

- [Safety Boundaries](/docs/concepts/safety-boundaries)
- [Idempotency and Side Effects](/docs/concepts/idempotency-side-effects)
