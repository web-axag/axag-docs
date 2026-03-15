---
id: unsafe-mutation-detection
title: Unsafe Mutation Exposure Detection
sidebar_label: Unsafe Mutation Detection
slug: /validation/unsafe-mutation-detection
---

# Unsafe Mutation Exposure Detection

Unsafe mutation exposure occurs when a write, delete, or mutate operation is annotated without adequate safety metadata — exposing the operation to unchecked agent execution.

## Why It Matters

When an agent discovers a mutation operation without safety constraints, it may:

- Execute destructive actions without confirmation
- Trigger financial transactions without approval
- Modify shared state without tenant boundaries
- Invoke non-idempotent operations multiple times

These scenarios represent **real production risk**.

## What Constitutes "Unsafe Exposure"

A mutation is considered unsafely exposed when any of these conditions are true:

| Condition | Risk |
|-----------|------|
| `action-type` is `write` or `delete` but no `risk-level` | Agent cannot assess risk |
| `risk-level` is `high` or `critical` but `confirmation-required` is `false` or missing | Dangerous action without human check |
| `action-type` is `delete` but no `preconditions` | No guard against invalid deletion |
| `action-type` is `write` with financial side effects but no `approval-required` | Financial risk without governance |
| `idempotent` is `false` or missing with no `side-effects` declaration | Agent cannot predict consequences |
| `scope` is missing on tenant-sensitive mutations | Cross-tenant data corruption risk |

## Detection Rules

### AXAG-LINT-003: Unsafe Mutate Without Confirmation

```
Rule: AXAG-LINT-003
Severity: Error
Message: Mutation operation with risk-level high/critical lacks confirmation requirement
Fix: Add axag-confirmation-required="true"
```

**Failing example:**
```html title="❌ Unsafe — no confirmation on critical delete"
<button
  axag-intent="account.delete"
  axag-entity="account"
  axag-action-type="delete"
  axag-risk-level="critical"
>Delete Account</button>
```

**Passing example:**
```html title="✅ Safe — full safety metadata" showLineNumbers
<button
  axag-intent="account.delete"
  axag-entity="account"
  axag-action-type="delete"
  axag-risk-level="critical"
  axag-confirmation-required="true"
  axag-preconditions='["no active subscriptions"]'
  axag-postconditions='["account deactivated","data retention started"]'
  axag-idempotent="true"
>Delete Account</button>
```

### AXAG-LINT-008: Delete Without Preconditions

```
Rule: AXAG-LINT-008
Severity: Warning
Message: Delete operation has no preconditions declared
Fix: Add axag-preconditions with state requirements
```

### AXAG-LINT-009: Financial Mutation Without Approval

```
Rule: AXAG-LINT-009
Severity: Error
Message: Mutation with financial side effects lacks approval requirement
Fix: Add axag-approval-required="true" and axag-approval-roles
```

**Example — financial mutation:**
```html
<button
  axag-intent="refund.process"
  axag-entity="refund"
  axag-action-type="write"
  axag-required-parameters='["order_id","amount"]'
  axag-risk-level="high"
  axag-side-effects='["payment_refund","accounting_adjustment"]'
  axag-confirmation-required="true"
  axag-approval-required="true"
  axag-approval-roles='["finance_manager"]'
  axag-scope="tenant"
  axag-idempotent="true"
>Process Refund</button>
```

### AXAG-LINT-017: Missing Side Effects Declaration

```
Rule: AXAG-LINT-017
Severity: Warning
Message: Non-idempotent mutation has no side-effects declared
Fix: Add axag-side-effects listing observable state changes
```

## Risk-Level Enforcement Matrix

| Action Type | Minimum Required Safety Metadata |
|------------|----------------------------------|
| `read` | None (risk should be `none` or `low`) |
| `write` (low risk) | `risk-level` |
| `write` (medium risk) | `risk-level`, `confirmation-required` |
| `write` (high risk) | `risk-level`, `confirmation-required`, `preconditions` |
| `delete` | `risk-level`, `confirmation-required`, `preconditions` |
| `delete` (critical) | All of above + `approval-required`, `approval-roles` |

## CI Integration

```yaml
- name: Check for unsafe mutations
  run: npx axag-lint --rules unsafe-mutations --format=github
```

## Next Steps

- [Scope Mismatch Detection](/docs/validation/scope-mismatch-detection)
- [Risk-Level Validation](/docs/validation/risk-level-validation)
- [Remediation Guidance](/docs/validation/remediation-guidance)
