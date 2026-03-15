---
id: optional-fields
title: Optional Fields
sidebar_label: Optional Fields
slug: /specification/optional-fields
---

# Optional Fields

Optional fields extend the semantic contract with additional dimensions. They are RECOMMENDED for Full Conformance and MAY be included at any level.

## Parameter Fields
- `axag-optional-parameters` — Parameters that are accepted but not required
- `axag-parameter-*` attributes on input elements for detailed parameter metadata

## State Fields
- `axag-preconditions` — Required state before execution
- `axag-postconditions` — Guaranteed state after execution
- `axag-side-effects` — Observable changes

## Safety Fields
- `axag-confirmation-required`, `axag-confirmation-message`
- `axag-approval-required`, `axag-approval-roles`, `axag-approval-count`
- `axag-idempotent`
- `axag-rate-limit`, `axag-cooldown`

## Access Control Fields
- `axag-required-roles`
- `axag-role-escalation`
- `axag-cross-tenant`

## Workflow Fields
- `axag-workflow-id`, `axag-workflow-step`, `axag-workflow-total-steps`

## Visibility Fields
- `axag-visible`, `axag-operable`, `axag-operability-reason`
