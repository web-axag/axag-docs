---
id: escalation
title: "Support: Ticket Escalation"
sidebar_label: Ticket Escalation
slug: /use-cases/support/escalation
---

# Support: Ticket Escalation

## Problem Statement
Escalating a support ticket transfers it to a higher-tier team with a reason and urgency level. This changes the ticket's priority, assignment, and SLA, and may notify management.

## Why Human-Only Semantics Fail
- "Escalate" buttons don't declare what team the ticket moves to
- Escalation reasons are free-text with no declared categories
- The impact on SLA (reset, tighten) is not communicated
- Manager notification is a hidden side-effect

## Why Scraping Fails Here
- Escalation dialogs are modal popups
- Team assignment logic is server-side
- Notification recipients are determined by business rules, not the DOM
- Escalation history is in a collapsible panel that may not be rendered

## How AXAG Eliminates Scraping
`ticket.escalate` declares the reason enum, target tier, and all side-effects (SLA update, notifications).

## Annotated UI Example
```html title="Support — ticket escalation ⚠️" showLineNumbers
<button
  axag-intent="ticket.escalate"
  axag-entity="ticket"
  axag-action-type="write"
  axag-required-parameters='["ticket_id","reason"]'
  axag-optional-parameters='["target_tier","urgency_override","notes"]'
  axag-preconditions='["ticket must be open","user must have escalation permission"]'
  axag-postconditions='["ticket escalated","SLA updated","manager notified"]'
  axag-risk-level="medium"
  axag-confirmation-required="true"
  axag-idempotent="false"
  axag-side-effects='["sla_update","manager_notification","assignment_change"]'
  axag-description="Escalate a support ticket to a higher-tier team"
>Escalate</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — ticket.escalate" showLineNumbers
{
  "intent": "ticket.escalate",
  "entity": "ticket",
  "action_type": "write",
  "operation_id": "ticket_escalate",
  "description": "Escalate a support ticket to a higher-tier team",
  "required_parameters": [
    { "name": "ticket_id", "type": "string" },
    {
      "name": "reason",
      "type": "string",
      "enum": [
        "customer_request",
        "technical_complexity",
        "sla_risk",
        "vip_customer",
        "unresolved",
        "other"
      ]
    }
  ],
  "optional_parameters": [
    {
      "name": "target_tier",
      "type": "string",
      "enum": ["tier_2", "tier_3", "engineering", "management"]
    },
    { "name": "urgency_override", "type": "string", "enum": ["high", "urgent", "critical"] },
    { "name": "notes", "type": "string", "maxLength": 2000 }
  ],
  "risk_level": "medium",
  "confirmation_required": true,
  "idempotent": false,
  "side_effects": ["sla_update", "manager_notification", "assignment_change"],
  "preconditions": ["ticket must be open", "user must have escalation permission"],
  "postconditions": ["ticket escalated", "SLA updated", "manager notified"]
}
```

## Generated Tool Example
```json
{
  "name": "ticket_escalate",
  "description": "Escalate a support ticket to a higher-tier team",
  "input_schema": {
    "type": "object",
    "properties": {
      "ticket_id": { "type": "string" },
      "reason": {
        "type": "string",
        "enum": [
          "customer_request",
          "technical_complexity",
          "sla_risk",
          "vip_customer",
          "unresolved",
          "other"
        ]
      },
      "target_tier": { "type": "string", "enum": ["tier_2", "tier_3", "engineering", "management"] },
      "urgency_override": { "type": "string", "enum": ["high", "urgent", "critical"] },
      "notes": { "type": "string", "maxLength": 2000 }
    },
    "required": ["ticket_id", "reason"]
  },
  "metadata": {
    "action_type": "write",
    "risk_level": "medium",
    "idempotent": false,
    "confirmation_required": true,
    "approval_required": false,
    "side_effects": ["sla_update", "manager_notification", "assignment_change"],
    "source_intent": "ticket.escalate",
    "source_entity": "ticket"
  }
}
```

## Constraints & Safety Notes
- **Confirmation required**: escalation notifies management and changes SLA
- **Not idempotent**: escalating twice creates two escalation events
- Requires `escalation_permission` — not all agents/users can escalate
- `urgency_override` can override the existing ticket priority
- Manager notification is an automatic side-effect that cannot be suppressed
