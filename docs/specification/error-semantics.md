---
id: error-semantics
title: Error Semantics
sidebar_label: Error Semantics
slug: /specification/error-semantics
---
# Error Semantics

AXAG defines error codes and semantics for annotation validation and runtime execution failures.

## Validation Error Codes

| Code | Name | Description |
|------|------|-------------|
| `AXAG-001` | Missing Intent | `axag-intent` not declared |
| `AXAG-002` | Missing Entity | `axag-entity` not declared |
| `AXAG-003` | Missing Action Type | `axag-action-type` not declared |
| `AXAG-004` | Invalid Action Type | Value not in allowed enum |
| `AXAG-005` | Invalid Risk Level | Value not in allowed enum |
| `AXAG-006` | Unsafe Mutation | Mutating action without risk declaration |
| `AXAG-007` | Missing Confirmation | High/critical risk without confirmation requirement |
| `AXAG-008` | Parameter Mismatch | Required parameters not matching input elements |
| `AXAG-009` | Scope Mismatch | Child scope less restrictive than parent |
| `AXAG-010` | Manifest Drift | Annotation changed without manifest regeneration |

## Runtime Error Codes

| Code | Name | Description |
|------|------|-------------|
| `AXAG-R001` | Precondition Not Met | Required precondition is false |
| `AXAG-R002` | Confirmation Rejected | User declined confirmation |
| `AXAG-R003` | Approval Pending | Awaiting required approvals |
| `AXAG-R004` | Rate Limited | Invocation frequency exceeded |
| `AXAG-R005` | Role Unauthorized | Invoking role not in required roles |
