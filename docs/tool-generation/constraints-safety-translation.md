---
id: constraints-safety-translation
title: Constraints and Safety Translation
sidebar_label: Constraints & Safety
slug: /tool-generation/constraints-safety-translation
---
# Constraints and Safety Translation

Safety metadata from the manifest translates to the tool's `safety` object, enabling agent runtimes to enforce guardrails.

## Safety Object
```json title="Safety object — high-risk mutating operation" showLineNumbers
{
  "safety": {
    "execution_type": "mutate",
    "risk_level": "high",
    "idempotent": false,
    "confirmation_required": true,
    "approval_required": false,
    "preconditions": ["cart_validated", "inventory_reserved"],
    "postconditions": ["checkout_session_created"],
    "side_effects": ["inventory_locked", "payment_hold_created"],
    "rate_limit": "10/minute"
  }
}
```

## Agent Runtime Enforcement

Agent runtimes consuming tools with safety metadata SHOULD:
1. Check preconditions before invocation
2. Request confirmation for operations where `confirmation_required` is true
3. Submit approval requests where `approval_required` is true
4. Respect rate limits
5. Log side effects for audit trails
