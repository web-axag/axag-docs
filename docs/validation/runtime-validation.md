---
id: runtime-validation
title: Runtime Validation
sidebar_label: Runtime Validation
slug: /validation/runtime-validation
---

# Runtime Validation

Runtime validation ensures AXAG contracts are honored during agent execution. While static validation catches structural errors, runtime validation catches behavioral violations — an agent attempting an action without meeting preconditions, exceeding parameter constraints, or violating safety boundaries.

## Runtime Validation Points

### Pre-Execution Validation
Before executing a tool call, the runtime validates:
- **Required parameters**: All required parameters are present and non-null
- **Type constraints**: Parameter values match declared types
- **Range constraints**: Numeric values are within `minimum`/`maximum` bounds
- **Enum constraints**: String values are from declared enum sets
- **Format constraints**: Values match declared formats (email, date, URI)
- **Preconditions**: Declared preconditions are checked (where machine-checkable)

### Execution-Time Validation
During execution, the runtime enforces:
- **Confirmation gate**: If `confirmation_required=true`, ensure user confirmation was obtained
- **Approval gate**: If `approval_required=true`, verify approval token from authorized role
- **Scope boundary**: Ensure the operation stays within declared scope (tenant, user, etc.)
- **Idempotency check**: For non-idempotent operations, warn if duplicate detected

### Post-Execution Validation
After execution, the runtime verifies:
- **Postconditions**: Declared postconditions are met (where verifiable)
- **Side-effects**: Declared side-effects occurred as expected
- **Error semantics**: Error responses follow the declared error schema

## Implementation Pattern

```typescript title="AXAGRuntimeValidator — interface" showLineNumbers
interface AXAGRuntimeValidator {
  validatePreExecution(
    toolCall: ToolCall,
    manifest: ManifestAction
  ): ValidationResult;

  validateConfirmation(
    toolCall: ToolCall,
    confirmationToken: string | null
  ): ValidationResult;

  validateApproval(
    toolCall: ToolCall,
    approvalToken: string | null,
    approverRole: string
  ): ValidationResult;

  validatePostExecution(
    toolCall: ToolCall,
    result: ExecutionResult,
    manifest: ManifestAction
  ): ValidationResult;
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}
```

## Error Response Format

When runtime validation fails, the error response follows a standard format:

```json title="Validation error response"
{
  "error": {
    "code": "AXAG_VALIDATION_ERROR",
    "type": "precondition_failed",
    "message": "Precondition not met: cart must have at least one item",
    "details": {
      "intent": "cart.begin_checkout",
      "failed_precondition": "cart must have at least one item",
      "suggestion": "Add items to cart before beginning checkout"
    }
  }
}
```

## Common Runtime Validation Errors

| Error Code | Type | Description |
|-----------|------|-------------|
| `AXAG_MISSING_PARAM` | `parameter_error` | Required parameter not provided |
| `AXAG_INVALID_TYPE` | `parameter_error` | Parameter value has wrong type |
| `AXAG_OUT_OF_RANGE` | `constraint_error` | Numeric value outside min/max |
| `AXAG_INVALID_ENUM` | `constraint_error` | Value not in allowed enum set |
| `AXAG_PRECONDITION_FAILED` | `precondition_error` | Precondition check failed |
| `AXAG_CONFIRMATION_MISSING` | `safety_error` | Confirmation required but not provided |
| `AXAG_APPROVAL_MISSING` | `safety_error` | Approval required but not provided |
| `AXAG_SCOPE_VIOLATION` | `security_error` | Operation outside declared scope |
| `AXAG_TENANT_BOUNDARY` | `security_error` | Cross-tenant access attempt |
| `AXAG_ROLE_INSUFFICIENT` | `authorization_error` | Caller lacks required role |
