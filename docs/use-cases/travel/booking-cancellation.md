---
id: booking-cancellation
title: "Travel: Booking Cancellation"
sidebar_label: Booking Cancellation
slug: /use-cases/travel/booking-cancellation
---

# Travel: Booking Cancellation

## Problem Statement
Cancelling a travel booking involves verifying the cancellation policy, calculating any penalties, and processing refunds. This is a destructive operation with financial implications.

## Why Human-Only Semantics Fail
- Cancellation policies are displayed as text paragraphs, not structured data
- Penalty amounts are calculated dynamically based on timing
- "Cancel Booking" doesn't declare whether refunds are automatic
- Free cancellation deadlines are shown as human-readable dates, not machine-checkable

## Why Scraping Fails Here
- Cancellation flows are behind authentication
- Policy text uses natural language without structured fields
- Penalty calculations require server-side computation
- Confirmation dialogs are JavaScript modals, not navigable pages

## How AXAG Eliminates Scraping
`booking.cancel` declares the operation's risk level, refund behavior, preconditions, and required confirmation.

## Annotated UI Example
```html title="Travel — booking cancellation ⚠️" showLineNumbers
<button
  axag-intent="booking.cancel"
  axag-entity="reservation"
  axag-action-type="delete"
  axag-required-parameters='["reservation_id"]'
  axag-optional-parameters='["reason"]'
  axag-preconditions='["reservation must exist","reservation must not be checked-in"]'
  axag-postconditions='["reservation cancelled","refund processed per cancellation policy"]'
  axag-risk-level="high"
  axag-confirmation-required="true"
  axag-idempotent="true"
  axag-side-effects='["refund_processing","availability_release","cancellation_email"]'
  axag-description="Cancel an existing travel reservation"
>Cancel Booking</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — booking.cancel" showLineNumbers
{
  "intent": "booking.cancel",
  "entity": "reservation",
  "operation_id": "booking_cancel",
  "action_type": "delete",
  "parameters": {
    "reservation_id": { "type": "string", "required": true },
    "reason": {
      "type": "string",
      "required": false,
      "enum": ["change_of_plans","found_better_deal","emergency","other"]
    }
  },
  "preconditions": [
    "reservation must exist",
    "reservation must not be checked-in"
  ],
  "postconditions": [
    "reservation cancelled",
    "refund processed per cancellation policy"
  ],
  "risk_level": "high",
  "confirmation_required": true,
  "idempotent": true,
  "side_effects": ["refund_processing", "availability_release", "cancellation_email"]
}
```

## Generated Tool Example
```json title="Tool — booking_cancel"
{
  "tool_name": "booking_cancel",
  "description": "Cancel an existing travel reservation",
  "input_schema": {
    "type": "object",
    "properties": {
      "reservation_id": { "type": "string" },
      "reason": { "type": "string", "enum": ["change_of_plans","found_better_deal","emergency","other"] }
    },
    "required": ["reservation_id"]
  },
  "safety": {
    "risk_level": "high",
    "confirmation_required": true,
    "idempotent": true,
    "side_effects": ["refund_processing", "availability_release", "cancellation_email"]
  }
}
```

## Constraints & Safety Notes
- **High risk**: triggers refund/financial processing
- **Confirmation required**: agent MUST confirm with user
- **Idempotent**: cancelling an already-cancelled booking is a no-op
- Refund amount depends on timing relative to the cancellation policy window
- Reason is optional but helps with analytics
