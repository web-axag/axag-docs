---
id: opportunity-progression
title: "CRM: Opportunity Progression"
sidebar_label: Opportunity Progression
slug: /use-cases/crm/opportunity-progression
---

# CRM: Opportunity Progression

## Problem Statement
Moving a sales opportunity through pipeline stages (Prospecting → Qualification → Proposal → Negotiation → Closed Won/Lost) is a state-machine operation that requires specific fields at each stage transition.

## Why Human-Only Semantics Fail
- Pipeline boards use drag-and-drop to move deals between columns
- Required fields per stage are enforced at submit time, not declared upfront
- Stage-specific forms appear conditionally
- Win probability and amount fields don't declare their constraints

## Why Scraping Fails Here
- Kanban boards use complex virtual scrolling
- Drag-and-drop events don't produce standard form submissions
- Stage validation errors appear as toast notifications
- The pipeline is a single-page application with no URL changes per stage

## How AXAG Eliminates Scraping
`opportunity.advance_stage` declares the valid stage transitions, required fields per stage, and any approval requirements for high-value deals.

## Annotated UI Example
```html title="CRM — advance opportunity stage" showLineNumbers
<button
  axag-intent="opportunity.advance_stage"
  axag-entity="opportunity"
  axag-action-type="write"
  axag-required-parameters='["opportunity_id","target_stage"]'
  axag-optional-parameters='["amount","close_date","win_probability","notes"]'
  axag-preconditions='["opportunity must be in a valid predecessor stage","required stage fields must be populated"]'
  axag-postconditions='["opportunity moved to target stage","stage history updated"]'
  axag-risk-level="medium"
  axag-idempotent="true"
  axag-scope="tenant"
  axag-description="Advance an opportunity to the next pipeline stage"
>Move to Next Stage</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — opportunity.advance_stage" showLineNumbers
{
  "intent": "opportunity.advance_stage",
  "entity": "opportunity",
  "operation_id": "opportunity_advance_stage",
  "action_type": "write",
  "parameters": {
    "opportunity_id": { "type": "string", "required": true },
    "target_stage": {
      "type": "string",
      "required": true,
      "enum": ["prospecting","qualification","proposal","negotiation","closed_won","closed_lost"]
    },
    "amount": { "type": "number", "required": false, "minimum": 0 },
    "close_date": { "type": "string", "required": false, "format": "date" },
    "win_probability": { "type": "number", "required": false, "minimum": 0, "maximum": 100 },
    "notes": { "type": "string", "required": false }
  },
  "preconditions": [
    "opportunity must be in a valid predecessor stage",
    "required stage fields must be populated"
  ],
  "postconditions": [
    "opportunity moved to target stage",
    "stage history updated"
  ],
  "risk_level": "medium",
  "idempotent": true,
  "scope": "tenant"
}
```

## Generated Tool Example
```json title="Tool — opportunity_advance_stage"
{
  "tool_name": "opportunity_advance_stage",
  "description": "Advance an opportunity to the next pipeline stage",
  "input_schema": {
    "type": "object",
    "properties": {
      "opportunity_id": { "type": "string" },
      "target_stage": {
        "type": "string",
        "enum": ["prospecting","qualification","proposal","negotiation","closed_won","closed_lost"]
      },
      "amount": { "type": "number", "minimum": 0 },
      "close_date": { "type": "string", "format": "date" },
      "win_probability": { "type": "number", "minimum": 0, "maximum": 100 }
    },
    "required": ["opportunity_id", "target_stage"]
  },
  "safety": { "risk_level": "medium", "idempotent": true }
}
```

## Constraints & Safety Notes
- **Idempotent**: moving to the same stage twice is a no-op
- **Stage transitions are validated**: can't skip stages or move backwards without explicit `revert_stage` intent
- `closed_won` and `closed_lost` are terminal stages
- `win_probability` is bounded 0–100
- High-value deals (amount > threshold) may require manager approval via a separate `opportunity.approve` action
