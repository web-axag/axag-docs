---
id: returns
title: "E-Commerce: Returns & Refunds"
sidebar_label: Returns & Refunds
slug: /use-cases/ecommerce/returns
---

# E-Commerce: Returns & Refunds

## Problem Statement
Initiating a return involves selecting an order, choosing items, specifying a reason, and optionally uploading evidence. This is a destructive operation with financial side-effects (refund processing).

## Why Human-Only Semantics Fail
- Return forms are multi-step wizards with no declared state machine
- Reason dropdowns don't expose their enum values
- Return eligibility (within 30 days, unused, etc.) is visually indicated but not machine-readable
- Refund amount calculation is displayed but its formula is opaque

## Why Scraping Fails Here
- Multi-step return forms use SPA navigation
- Eligibility checks happen server-side; DOM only shows the result
- File upload components use custom dropzones
- Confirmation modals are dynamically rendered

## How AXAG Eliminates Scraping
`return.initiate` is annotated with preconditions (eligibility), required parameters (reason, items), risk level, and confirmation requirements. The agent can validate eligibility before attempting the action.

## Annotated UI Example
```html
<button
  axag-intent="return.initiate"
  axag-entity="return"
  axag-action-type="write"
  axag-required-parameters='["order_id","items","reason"]'
  axag-optional-parameters='["notes","evidence_urls"]'
  axag-preconditions='["order must be within return window","items must not be final-sale"]'
  axag-postconditions='["return request created","refund processing initiated"]'
  axag-risk-level="high"
  axag-confirmation-required="true"
  axag-idempotent="false"
  axag-side-effects='["refund_processing","inventory_update"]'
  axag-description="Initiate a return for one or more items from an order"
>Start Return</button>
```

## Semantic Manifest Excerpt
```json
{
  "intent": "return.initiate",
  "entity": "return",
  "operation_id": "return_initiate",
  "action_type": "write",
  "parameters": {
    "order_id": { "type": "string", "required": true },
    "items": {
      "type": "array",
      "required": true,
      "items": {
        "type": "object",
        "properties": {
          "item_id": { "type": "string" },
          "quantity": { "type": "integer", "minimum": 1 }
        }
      }
    },
    "reason": {
      "type": "string",
      "required": true,
      "enum": ["defective", "wrong_item", "not_as_described", "changed_mind", "other"]
    },
    "notes": { "type": "string", "required": false, "maxLength": 1000 },
    "evidence_urls": { "type": "array", "required": false, "items": { "type": "string" } }
  },
  "preconditions": ["order must be within return window", "items must not be final-sale"],
  "postconditions": ["return request created", "refund processing initiated"],
  "risk_level": "high",
  "confirmation_required": true,
  "idempotent": false,
  "side_effects": ["refund_processing", "inventory_update"]
}
```

## Generated Tool Example
```json
{
  "tool_name": "return_initiate",
  "description": "Initiate a return for one or more items from an order",
  "input_schema": {
    "type": "object",
    "properties": {
      "order_id": { "type": "string" },
      "items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "item_id": { "type": "string" },
            "quantity": { "type": "integer", "minimum": 1 }
          },
          "required": ["item_id", "quantity"]
        }
      },
      "reason": {
        "type": "string",
        "enum": ["defective","wrong_item","not_as_described","changed_mind","other"]
      },
      "notes": { "type": "string", "maxLength": 1000 }
    },
    "required": ["order_id", "items", "reason"]
  },
  "safety": {
    "risk_level": "high",
    "confirmation_required": true,
    "idempotent": false,
    "side_effects": ["refund_processing", "inventory_update"],
    "preconditions": ["order must be within return window", "items must not be final-sale"]
  }
}
```

## Constraints & Safety Notes
- **High risk**: triggers financial refund processing
- **Confirmation required**: agent MUST confirm with user before executing
- **Not idempotent**: submitting twice creates duplicate return requests
- Preconditions are machine-checkable: return window and final-sale status
- Reason enum ensures valid categorization
