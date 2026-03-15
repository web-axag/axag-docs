---
id: actions
title: Actions
sidebar_label: Actions
slug: /specification/actions
---
# Actions

The `axag-action-type` attribute classifies the nature of an operation.

## Action Types

| Type | Semantic | Side Effects | Idempotent by Default |
|------|----------|-------------|----------------------|
| `read` | Retrieves data without modification | None | Yes |
| `create` | Creates a new entity instance | Entity creation | No |
| `mutate` | Modifies an existing entity | State change | Depends |
| `delete` | Removes an entity | Entity removal | Depends |
| `navigate` | Changes view context without data mutation | None | Yes |

## Rules

- `read` and `navigate` actions SHOULD have `axag-risk-level="none"` unless special circumstances apply
- `create`, `mutate`, and `delete` actions MUST declare `axag-risk-level`
- `delete` actions SHOULD have `axag-confirmation-required="true"` unless the deletion is trivially reversible
- `mutate` actions that produce financial impact SHOULD be classified as `high` or `critical` risk
