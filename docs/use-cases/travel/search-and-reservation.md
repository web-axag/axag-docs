---
id: search-and-reservation
title: "Travel: Search & Reservation"
sidebar_label: Search & Reservation
slug: /use-cases/travel/search-and-reservation
---

# Travel: Search & Reservation

## Problem Statement
Travel search involves querying availability across hotels, flights, or rental cars with dates, locations, guest counts, and preferences. Booking creates a reservation with financial commitment.

## Why Human-Only Semantics Fail
- Travel search forms have tightly coupled date pickers, location autocompletes, and guest counters
- Search results display pricing grids that vary by room type, fare class, etc.
- "Book Now" buttons don't declare the financial commitment amount
- Rate cards show "from $X" prices that differ from actual totals

## Why Scraping Fails Here
- Date pickers are calendar widgets with event-driven state
- Location autocompletes require typing and waiting for suggestions
- Pricing is dynamically calculated based on availability
- Booking requires session state (selected room, fare class, add-ons)
- Anti-bot protections on travel sites are extremely aggressive

## How AXAG Eliminates Scraping
`travel.search` and `travel.book` are separate intents. Search is read-only; booking is a write with financial side-effects and confirmation requirements.

## Annotated UI Example
```html title="Travel — search & book actions" showLineNumbers
<!-- Search -->
<button
  axag-intent="travel.search"
  axag-entity="travel_listing"
  axag-action-type="read"
  axag-required-parameters='["destination","check_in","check_out","guests"]'
  axag-optional-parameters='["property_type","price_max","amenities","sort_by"]'
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="Search for available travel accommodations"
>Search</button>

<!-- Book -->
<button
  axag-intent="travel.book"
  axag-entity="reservation"
  axag-action-type="write"
  axag-required-parameters='["listing_id","check_in","check_out","guests","payment_method_id"]'
  axag-optional-parameters='["special_requests","add_ons"]'
  axag-preconditions='["listing must be available for requested dates","payment method must be valid"]'
  axag-postconditions='["reservation created","payment authorized","confirmation email sent"]'
  axag-risk-level="critical"
  axag-confirmation-required="true"
  axag-approval-required="false"
  axag-idempotent="false"
  axag-side-effects='["payment_authorization","email_notification","availability_update"]'
  axag-description="Book a travel accommodation"
>Book Now</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — travel search + book" showLineNumbers
{
  "actions": [
    {
      "intent": "travel.search",
      "entity": "travel_listing",
      "action_type": "read",
      "parameters": {
        "destination": { "type": "string", "required": true },
        "check_in": { "type": "string", "required": true, "format": "date" },
        "check_out": { "type": "string", "required": true, "format": "date" },
        "guests": { "type": "integer", "required": true, "minimum": 1 },
        "property_type": { "type": "string", "required": false, "enum": ["hotel","apartment","villa","hostel"] },
        "price_max": { "type": "number", "required": false, "minimum": 0 },
        "amenities": { "type": "array", "required": false, "items": { "type": "string" } },
        "sort_by": { "type": "string", "required": false, "enum": ["price_asc","price_desc","rating","distance"] }
      },
      "risk_level": "none",
      "idempotent": true
    },
    {
      "intent": "travel.book",
      "entity": "reservation",
      "action_type": "write",
      "parameters": {
        "listing_id": { "type": "string", "required": true },
        "check_in": { "type": "string", "required": true, "format": "date" },
        "check_out": { "type": "string", "required": true, "format": "date" },
        "guests": { "type": "integer", "required": true, "minimum": 1 },
        "payment_method_id": { "type": "string", "required": true },
        "special_requests": { "type": "string", "required": false },
        "add_ons": { "type": "array", "required": false, "items": { "type": "string" } }
      },
      "preconditions": ["listing must be available for requested dates", "payment method must be valid"],
      "postconditions": ["reservation created", "payment authorized", "confirmation email sent"],
      "risk_level": "critical",
      "confirmation_required": true,
      "idempotent": false,
      "side_effects": ["payment_authorization", "email_notification", "availability_update"]
    }
  ]
}
```

## Constraints & Safety Notes
- **Search is safe**: read-only, idempotent, no risk
- **Booking is critical**: involves financial authorization
- Booking MUST require confirmation — agent cannot autonomously spend money
- `check_out` must be after `check_in`
- Booking is NOT idempotent — double-booking creates two reservations
