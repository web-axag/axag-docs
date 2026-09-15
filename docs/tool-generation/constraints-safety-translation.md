---
id: constraints-safety-translation
title: Constraints and Safety Translation
sidebar_label: Constraints & Safety
slug: /tool-generation/constraints-safety-translation
---
# Constraints and Safety Translation

Safety metadata from the manifest translates to the tool's `metadata` object, enabling agent runtimes to enforce guardrails.

## Metadata Object
```json title="Tool metadata — high-risk write operation" showLineNumbers
{
  "metadata": {
    "action_type": "write",
    "risk_level": "high",
    "idempotent": false,
    "confirmation_required": true,
    "approval_required": false,
    "preconditions": ["cart_validated", "inventory_reserved"],
    "postconditions": ["checkout_session_created"],
    "side_effects": ["inventory_locked", "payment_hold_created"],
    "source_intent": "checkout.begin",
    "source_entity": "order"
  }
}
```

## Agent Runtime Enforcement

Agent runtimes consuming tools with safety metadata SHOULD:
1. Check preconditions before invocation
2. Request confirmation for operations where `confirmation_required` is true
3. Submit approval requests where `approval_required` is true
4. Respect rate limits enforced by the server (`axag-rate-limit` is advisory and not carried into the manifest)
5. Log side effects for audit trails
