---
id: safety-boundaries
title: Safety Boundaries
sidebar_label: Safety Boundaries
slug: /specification/safety-boundaries
---
# Safety Boundaries (Specification)

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
| `create` | `low` | Recommended for `high`+ | For regulated operations |
| `mutate` | `low` | Required for `high`+ | For high-impact changes |
| `delete` | `medium` | Required | Recommended |
