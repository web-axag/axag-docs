---
id: risk-classification
title: Risk Classification
sidebar_label: Risk Classification
slug: /specification/risk-classification
---
# Risk Classification

Every mutating operation MUST declare a risk level. Risk classification drives safety requirements.

| Level | Description | Required Safety |
|-------|-------------|----------------|
| `none` | No risk (reads, navigation) | None |
| `low` | Easily reversible (cart operations) | None required, logging recommended |
| `medium` | State changes requiring attention | Confirmation recommended |
| `high` | Financial or significant data impact | Confirmation MUST be required |
| `critical` | Irreversible, high-impact operations | Confirmation AND approval MUST be required |

## Classification Guidelines

- **Payment processing** → `high`
- **Account deletion** → `critical`
- **Profile update** → `medium`
- **Adding bookmark** → `low`
- **Searching products** → `none`

Implementations MUST NOT classify a `delete` action as `none` risk unless the deletion is trivially reversible (e.g., removing an unsaved draft).
