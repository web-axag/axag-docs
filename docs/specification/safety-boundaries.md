---
id: safety-boundaries
title: Safety Boundaries
sidebar_label: Safety Boundaries
slug: /specification/safety-boundaries
---
# Safety Boundaries (Specification)

Safety boundaries are declared in the annotation and enforced in two places: the agent runtime in the page, and the server that receives the call. A declaration alone constrains nothing — an agent holding the page's credentials can call the API directly — so an implementation MUST enforce `confirmation_required`, `approval_required`, `required_roles` and `tenant_boundary` on the server for any action at `high` risk or above. The page's enforcement is what gives a person the chance to refuse; see [Safety Enforcers](/docs/frameworks/safety).

Safety boundaries define the guardrails around operation execution. This section defines the normative requirements for safety declarations.

## Confirmation Requirements
Operations with `risk_level` of `high` or `critical` MUST declare `axag-confirmation-required="true"`.

## Approval Requirements
Operations that require multi-party authorization MUST declare `axag-approval-required="true"` with `axag-approval-roles` and `axag-approval-count`.

## Rate Limits
Operations subject to rate limiting SHOULD declare `axag-rate-limit` using the format `{count}/{period}` (e.g., `100/hour`, `10/minute`).

## Cooldown Periods
Operations that require a minimum interval between invocations SHOULD declare `axag-cooldown` using duration format (e.g., `60s`, `5m`, `1h`).

## Safety Matrix

| Action Type | Minimum Risk | Confirmation | Approval |
|------------|-------------|-------------|---------|
| `read` | `none` | No | No |
| `navigate` | `none` | No | No |
| `write` | `low` | Required for `high`+ | For regulated or high-impact changes |
| `delete` | `medium` | Required | Recommended |
