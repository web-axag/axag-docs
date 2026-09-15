---
id: campaign-scheduling
title: "Marketing: Campaign Scheduling"
sidebar_label: Campaign Scheduling
slug: /use-cases/marketing/campaign-scheduling
---

# Marketing: Campaign Scheduling

## Problem Statement
Scheduling a campaign to go live involves setting a date/time, timezone, and optionally configuring send-time optimization. This transitions a campaign from draft to scheduled — a state change with real-world consequences.

## Why Human-Only Semantics Fail
- Date/time pickers don't declare their timezone handling
- "Schedule" vs "Send Now" buttons don't declare the difference in side-effects
- Send-time optimization toggles don't declare what they enable
- The state transition (draft → scheduled) is implicit

## Why Scraping Fails Here
- Calendar/date pickers are complex widgets that differ across libraries
- Timezone dropdowns contain 400+ options rendered lazily
- Scheduling confirmation modals appear conditionally
- Time validation (can't schedule in the past) happens client-side

## How AXAG Eliminates Scraping
`campaign.schedule` declares the exact parameters (campaign_id, send_at, timezone), preconditions (must be in draft with approved creative), and side-effects (messages will be sent at the scheduled time).

## Annotated UI Example
```html title="Marketing — schedule campaign ⚠️" showLineNumbers
<button
  axag-intent="campaign.schedule"
  axag-entity="campaign"
  axag-action-type="write"
  axag-required-parameters='["campaign_id","send_at","timezone"]'
  axag-optional-parameters='["send_time_optimization"]'
  axag-preconditions='["campaign must be in draft status","creative must be approved"]'
  axag-postconditions='["campaign status changed to scheduled","messages queued for delivery"]'
  axag-risk-level="high"
  axag-confirmation-required="true"
  axag-idempotent="true"
  axag-side-effects='["message_delivery_queued"]'
  axag-description="Schedule a campaign for delivery at a specific date and time"
>Schedule Campaign</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — campaign.schedule" showLineNumbers
{
  "intent": "campaign.schedule",
  "entity": "campaign",
  "action_type": "write",
  "operation_id": "campaign_schedule",
  "description": "Schedule a campaign for delivery at a specific date and time",
  "required_parameters": [
    { "name": "campaign_id", "type": "string" },
    { "name": "send_at", "type": "string", "format": "datetime" },
    { "name": "timezone", "type": "string" }
  ],
  "optional_parameters": [{ "name": "send_time_optimization", "type": "boolean", "default": false }],
  "risk_level": "high",
  "confirmation_required": true,
  "idempotent": true,
  "side_effects": ["message_delivery_queued"],
  "preconditions": ["campaign must be in draft status", "creative must be approved"],
  "postconditions": ["campaign status changed to scheduled", "messages queued for delivery"]
}
```

## Generated Tool Example
```json title="Tool — campaign_schedule"
{
  "name": "campaign_schedule",
  "description": "Schedule a campaign for delivery at a specific date and time",
  "input_schema": {
    "type": "object",
    "properties": {
      "campaign_id": { "type": "string" },
      "send_at": { "type": "string", "format": "date-time" },
      "timezone": { "type": "string" },
      "send_time_optimization": { "type": "boolean", "default": false }
    },
    "required": ["campaign_id", "send_at", "timezone"]
  },
  "metadata": {
    "action_type": "write",
    "risk_level": "high",
    "idempotent": true,
    "confirmation_required": true,
    "approval_required": false,
    "side_effects": ["message_delivery_queued"],
    "source_intent": "campaign.schedule",
    "source_entity": "campaign"
  }
}
```

## Constraints & Safety Notes
- **High risk**: scheduling triggers message delivery to potentially millions of recipients
- **Confirmation required**: agent MUST get user approval
- **Idempotent**: re-scheduling with the same parameters is safe (updates the schedule)
- `send_at` must be in the future; past dates are rejected
- Preconditions ensure the campaign is review-ready before scheduling
