---
id: conformance-levels
title: Conformance Levels
sidebar_label: Conformance Levels
slug: /specification/conformance-levels
---
# Conformance Levels

AXAG defines three conformance levels that represent progressive implementation maturity.

## Basic Conformance
**Minimum viable annotation.** Required fields: `axag-intent`, `axag-entity`, `axag-action-type`.

Suitable for: initial adoption, proof of concept, internal tooling.

## Intermediate Conformance
**Production-ready annotation.** Adds: `axag-required-parameters`, `axag-scope`, `axag-risk-level`, `axag-description`.

Suitable for: production deployments, external-facing products, agent-accessible interfaces.

## Full Conformance
**Enterprise-grade annotation.** Adds all applicable optional dimensions: preconditions, postconditions, side effects, confirmation, approval, idempotency, roles, rate limits.

Suitable for: regulated industries, high-trust agent interactions, enterprise standards compliance.

## Claiming Conformance
Every Semantic Manifest declares its conformance level in the `conformance` field. Generators compute it from the metadata the actions actually declare, so a claim can't exceed what the annotations support:
```json
{
  "version": "1.1.0",
  "conformance": "intermediate",
  "actions": []
}
```

The CLI's `axag-cli validate --level` flag accepts the same names. The earlier `A`, `AA`, `AAA` names are still accepted and map to `basic`, `intermediate`, `full`.
