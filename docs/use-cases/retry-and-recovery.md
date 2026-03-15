---
id: retry-and-recovery
title: Failure Recovery and Retry Flows
sidebar_label: Retry & Recovery
slug: /use-cases/retry-and-recovery
---

# Failure Recovery and Retry Flows

Agent-operated workflows will encounter failures — network timeouts, validation errors, rate limits, transient service outages. AXAG provides the semantic metadata agents need to decide whether to retry, how to recover, and when to escalate.

## Problem Statement

When an agent executes an operation and it fails, the agent needs to answer:

1. **Can I safely retry?** — Is the operation idempotent?
2. **What went wrong?** — Is this a transient error or a permanent failure?
3. **What are the preconditions?** — Do I need to re-establish state before retrying?
4. **Are there side effects?** — Has anything already happened that shouldn't repeat?
5. **Should I escalate?** — Is this a failure a human should handle?

Without AXAG, the agent has no structured way to answer these questions.

## Why Human-Only Semantics Fail Agents

When an operation fails in a human interface:
- A toast notification appears ("Something went wrong, try again")
- An error modal pops up with a generic message
- The page redirects to an error state

Agents cannot interpret these visual cues. They need machine-readable error semantics and retry guidance.

## AXAG Retry Metadata

### Idempotent Operations (Safe to Retry)

```html title="✅ Idempotent — safe to retry"
<button
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  axag-idempotent="true"
  axag-risk-level="none"
  axag-description="Search products — safe to retry on failure"
>Search</button>
```

When `axag-idempotent="true"`, the agent can safely retry without concern about duplicate side effects.

### Non-Idempotent Operations (Retry with Caution)

```html title="⚠️ Non-idempotent — do NOT retry blindly" showLineNumbers
<button
  axag-intent="order.place"
  axag-entity="order"
  axag-action-type="write"
  axag-idempotent="false"
  axag-risk-level="high"
  axag-confirmation-required="true"
  axag-side-effects='["payment_charged","inventory_deducted","confirmation_email_sent"]'
  axag-description="Place an order — do NOT retry blindly"
>Place Order</button>
```

When `axag-idempotent="false"` and side effects are declared, the agent knows:
- Retrying may cause duplicate charges
- It should check order status before retrying
- Escalation to a human may be safer than automatic retry

## Error Semantics

AXAG error codes provide structured failure information:

```json title="AXAG error response — structured failure info"
{
  "error": {
    "code": "AXAG-ERR-PRECONDITION",
    "message": "Precondition not met: cart must not be empty",
    "retryable": true,
    "recovery_action": "Ensure cart has items before placing order",
    "failed_precondition": "cart_not_empty"
  }
}
```

### Error Categories

| Error Code | Meaning | Retryable | Agent Action |
|-----------|---------|-----------|-------------|
| `AXAG-ERR-PRECONDITION` | Precondition not met | Yes (after fixing state) | Satisfy precondition, then retry |
| `AXAG-ERR-PARAMETER` | Invalid or missing parameter | Yes (with corrected params) | Fix parameters, then retry |
| `AXAG-ERR-UNAUTHORIZED` | Insufficient permissions | No | Escalate to human |
| `AXAG-ERR-RATE-LIMIT` | Rate limit exceeded | Yes (after delay) | Wait and retry with backoff |
| `AXAG-ERR-CONFLICT` | Concurrent modification | Yes (after refresh) | Refresh state, then retry |
| `AXAG-ERR-NOT-FOUND` | Entity does not exist | No | Report to user |
| `AXAG-ERR-SERVER` | Transient server error | Yes (with backoff) | Retry with exponential backoff |
| `AXAG-ERR-PERMANENT` | Permanent failure | No | Escalate to human |

## Recovery Flow Example

### Checkout with Automatic Recovery

```html title="3-step checkout with recovery annotations" showLineNumbers
<!-- Step 1: Validate Cart (idempotent, safe to retry) -->
<button
  axag-intent="cart.validate"
  axag-entity="cart"
  axag-action-type="read"
  axag-required-parameters='["cart_id"]'
  axag-idempotent="true"
  axag-postconditions='["cart_valid"]'
  axag-risk-level="none"
>Validate Cart</button>

<!-- Step 2: Reserve Inventory (idempotent with same cart_id) -->
<button
  axag-intent="inventory.reserve"
  axag-entity="inventory"
  axag-action-type="write"
  axag-required-parameters='["cart_id"]'
  axag-preconditions='["cart_valid"]'
  axag-postconditions='["inventory_reserved"]'
  axag-idempotent="true"
  axag-risk-level="low"
  axag-side-effects='["inventory_hold_created"]'
>Reserve Inventory</button>

<!-- Step 3: Process Payment (NOT idempotent) -->
<button
  axag-intent="payment.charge"
  axag-entity="payment"
  axag-action-type="write"
  axag-required-parameters='["cart_id","payment_method_id","amount"]'
  axag-preconditions='["inventory_reserved","payment_method_valid"]'
  axag-postconditions='["payment_processed"]'
  axag-idempotent="false"
  axag-risk-level="high"
  axag-confirmation-required="true"
  axag-side-effects='["payment_charged"]'
>Process Payment</button>
```

**Agent recovery logic:**
1. If Step 1 fails → retry immediately (idempotent read)
2. If Step 2 fails → retry (idempotent with same cart_id)
3. If Step 3 fails → **do NOT retry** — check payment status first, then decide

## Semantic Manifest with Retry Metadata

```json title="Manifest — payment.charge with retry metadata" showLineNumbers
{
  "intent": "payment.charge",
  "entity": "payment",
  "action_type": "write",
  "idempotent": false,
  "risk_level": "high",
  "side_effects": ["payment_charged"],
  "error_handling": {
    "retryable_errors": ["AXAG-ERR-RATE-LIMIT", "AXAG-ERR-SERVER"],
    "non_retryable_errors": ["AXAG-ERR-PARAMETER", "AXAG-ERR-UNAUTHORIZED"],
    "max_retries": 0,
    "recovery_hint": "Check payment status before retrying"
  }
}
```

## Generated MCP Tool

```json title="Tool — payment_charge (no auto-retry)" showLineNumbers
{
  "name": "payment_charge",
  "description": "Process payment — NOT idempotent, do not retry without checking status",
  "inputSchema": {
    "type": "object",
    "properties": {
      "cart_id": { "type": "string" },
      "payment_method_id": { "type": "string" },
      "amount": { "type": "number", "minimum": 0.01 }
    },
    "required": ["cart_id", "payment_method_id", "amount"]
  },
  "safety": {
    "risk_level": "high",
    "idempotent": false,
    "confirmation_required": true,
    "side_effects": ["payment_charged"],
    "retry_policy": "no_auto_retry"
  }
}
```

## Why Scraping Fails Here

When an agent scrapes a checkout page and encounters an error:
- It sees a toast saying "Payment failed, please try again"
- It cannot determine if the payment was partially processed
- It cannot tell if retrying will cause a double charge
- It has no structured error code to interpret

## How AXAG Eliminates Scraping

With AXAG:
- `axag-idempotent="false"` tells the agent: **do not retry blindly**
- `axag-side-effects='["payment_charged"]'` warns of irreversible consequences
- Structured error codes provide machine-readable failure categories
- Recovery hints guide the agent to safe next steps

## Next Steps

- [Accessibility-Aligned Patterns](/docs/use-cases/accessibility-patterns)
- [Error Semantics](/docs/specification/error-semantics)
- [Error Codes Reference](/docs/reference/error-codes)
