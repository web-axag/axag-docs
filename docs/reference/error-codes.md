---
id: error-codes
title: Error Codes Reference
sidebar_label: Error Codes
slug: /reference/error-codes
---

# Error Codes Reference

Complete reference of all AXAG error codes used in validation, runtime enforcement, and agent communication.

## Validation Error Codes

These codes are emitted by static validators and CI lint tools.

| Code | Severity | Description |
|------|----------|-------------|
| `AXAG-LINT-001` | Error | Missing `axag-intent` on annotated element |
| `AXAG-LINT-002` | Error | Missing `axag-entity` on annotated element |
| `AXAG-LINT-003` | Error | Missing `axag-action-type` on annotated element |
| `AXAG-LINT-004` | Error | Invalid `axag-action-type` value |
| `AXAG-LINT-005` | Error | Invalid `axag-risk-level` value |
| `AXAG-LINT-006` | Warning | High/critical risk missing `confirmation_required` |
| `AXAG-LINT-007` | Warning | Write/delete missing `axag-idempotent` declaration |
| `AXAG-LINT-008` | Error | Overlapping required and optional parameters |
| `AXAG-LINT-009` | Error | Invalid JSON in parameter attribute |
| `AXAG-LINT-010` | Warning | Intent not found in Semantic Manifest |
| `AXAG-LINT-011` | Warning | Missing `axag-scope` on tenant-sensitive action |
| `AXAG-LINT-012` | Error | `approval-required` without `approval-roles` |

## Runtime Error Codes

These codes are returned by AXAG-aware runtimes when contract violations occur.

| Code | Category | HTTP Status | Description |
|------|----------|-------------|-------------|
| `AXAG_MISSING_PARAM` | Parameter | 400 | Required parameter not provided |
| `AXAG_INVALID_TYPE` | Parameter | 400 | Parameter value has wrong type |
| `AXAG_OUT_OF_RANGE` | Constraint | 400 | Numeric value outside min/max bounds |
| `AXAG_INVALID_ENUM` | Constraint | 400 | Value not in allowed enum set |
| `AXAG_INVALID_FORMAT` | Constraint | 400 | Value doesn't match declared format |
| `AXAG_PRECONDITION_FAILED` | Precondition | 412 | Precondition check failed |
| `AXAG_CONFIRMATION_MISSING` | Safety | 428 | Confirmation required but not provided |
| `AXAG_APPROVAL_MISSING` | Safety | 428 | Approval required but not provided |
| `AXAG_APPROVAL_INVALID` | Safety | 403 | Approval from unauthorized role |
| `AXAG_SCOPE_VIOLATION` | Security | 403 | Operation outside declared scope |
| `AXAG_TENANT_BOUNDARY` | Security | 403 | Cross-tenant access attempt |
| `AXAG_ROLE_INSUFFICIENT` | Authorization | 403 | Caller lacks required role |
| `AXAG_INTENT_NOT_FOUND` | Routing | 404 | Requested intent not in manifest |
| `AXAG_VERSION_MISMATCH` | Compatibility | 409 | Consumer/manifest version incompatible |
| `AXAG_RATE_LIMITED` | Throttling | 429 | Too many requests for this intent |

## Error Response Format

```json
{
  "error": {
    "code": "AXAG_PRECONDITION_FAILED",
    "type": "precondition_error",
    "message": "Precondition not met: cart must have at least one item",
    "details": {
      "intent": "cart.begin_checkout",
      "failed_precondition": "cart must have at least one item",
      "suggestion": "Add items to cart using cart.add_item before beginning checkout"
    },
    "documentation_url": "https://axag.org/docs/reference/error-codes#AXAG_PRECONDITION_FAILED"
  }
}
```

## Agent Handling Guide

| Error Code | Agent Action |
|-----------|-------------|
| `AXAG_MISSING_PARAM` | Add the missing parameter and retry |
| `AXAG_INVALID_TYPE` | Fix the parameter type and retry |
| `AXAG_OUT_OF_RANGE` | Adjust value to within bounds and retry |
| `AXAG_PRECONDITION_FAILED` | Execute prerequisite action, then retry |
| `AXAG_CONFIRMATION_MISSING` | Request user confirmation, then retry with token |
| `AXAG_APPROVAL_MISSING` | Request approval from authorized role, then retry |
| `AXAG_SCOPE_VIOLATION` | Do not retry — operation is out of scope |
| `AXAG_TENANT_BOUNDARY` | Do not retry — security violation |
