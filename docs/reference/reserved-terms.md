---
id: reserved-terms
title: Reserved Terms
sidebar_label: Reserved Terms
slug: /reference/reserved-terms
---

# Reserved Terms

The following terms are reserved in the AXAG specification. Custom annotations MUST NOT use these names for different purposes.

## Reserved Attribute Prefixes

All attributes starting with `axag-` are reserved by the AXAG specification:

- `axag-intent`
- `axag-entity`
- `axag-action-type`
- `axag-description`
- `axag-risk-level`
- `axag-idempotent`
- `axag-required-parameters`
- `axag-optional-parameters`
- `axag-preconditions`
- `axag-postconditions`
- `axag-side-effects`
- `axag-confirmation-required`
- `axag-approval-required`
- `axag-approval-roles`
- `axag-scope`
- `axag-tenant-boundary`
- `axag-async`

Custom extensions MUST use the `axag-x-` prefix:

```html
axag-x-my-custom-attribute="value"
```

## Reserved Action Types

| Value | Meaning |
|-------|---------|
| `read` | Query, search, list, get, view — no state change |
| `write` | Create, update, submit, schedule — state change |
| `delete` | Remove, cancel, deactivate — destructive state change |

## Reserved Risk Levels

| Value | Meaning |
|-------|---------|
| `none` | No risk — read-only operations |
| `low` | Minimal risk — easily reversible |
| `medium` | Moderate risk — may require confirmation |
| `high` | Significant risk — MUST require confirmation |
| `critical` | Maximum risk — MUST require confirmation AND approval |

## Reserved Scope Values

| Value | Meaning |
|-------|---------|
| `public` | No authentication required |
| `user` | Scoped to the authenticated user |
| `tenant` | Scoped to the user's organization |
| `global` | Cross-tenant, typically admin-only |

## Reserved Manifest Fields

These field names are reserved in the Semantic Manifest JSON:

- `version`, `entities`, `metadata`
- `name`, `description`, `actions`
- `intent`, `operation_id`, `action_type`
- `parameters`, `type`, `required`, `enum`, `minimum`, `maximum`, `format`, `default`
- `preconditions`, `postconditions`, `side_effects`
- `risk_level`, `idempotent`, `confirmation_required`, `approval_required`, `approval_roles`
- `scope`, `tenant_boundary`, `async`

## Reserved Error Codes

All error codes starting with `AXAG_` are reserved:

- `AXAG_VALIDATION_ERROR`
- `AXAG_MISSING_PARAM`
- `AXAG_INVALID_TYPE`
- `AXAG_OUT_OF_RANGE`
- `AXAG_INVALID_ENUM`
- `AXAG_PRECONDITION_FAILED`
- `AXAG_CONFIRMATION_MISSING`
- `AXAG_APPROVAL_MISSING`
- `AXAG_SCOPE_VIOLATION`
- `AXAG_TENANT_BOUNDARY`
- `AXAG_ROLE_INSUFFICIENT`

## Reserved Lint Rule IDs

All IDs matching `AXAG-LINT-XXX` are reserved. Custom rules should use `AXAG-CUSTOM-XXX`.
