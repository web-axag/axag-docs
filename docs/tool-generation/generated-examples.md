---
id: generated-examples
title: Generated Tool Examples
sidebar_label: Generated Examples
slug: /tool-generation/generated-examples
---
# Generated Tool Examples

## Example 1: Product Search (Read)
```json title="product_search — Read / No Risk"
{
  "name": "product_search",
  "description": "Search the product catalog by text query with optional filters",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Search query text" },
      "category": { "type": "string", "description": "Category filter" },
      "price_min": { "type": "number", "minimum": 0, "description": "Minimum price" },
      "price_max": { "type": "number", "minimum": 0, "description": "Maximum price" },
      "sort_by": {
        "type": "string",
        "enum": ["relevance", "price_asc", "price_desc", "newest"],
        "description": "Sort order"
      }
    },
    "required": ["query"]
  },
  "metadata": {
    "action_type": "read",
    "risk_level": "none",
    "idempotent": true,
    "confirmation_required": false,
    "approval_required": false,
    "source_intent": "product.search",
    "source_entity": "product"
  }
}
```

## Example 2: Cart Add Item (Write)
```json title="cart_add_item — Write / Low Risk"
{
  "name": "cart_add_item",
  "description": "Add a product to the shopping cart",
  "input_schema": {
    "type": "object",
    "properties": {
      "product_id": { "type": "string", "description": "Product identifier" },
      "quantity": {
        "type": "number",
        "minimum": 1,
        "maximum": 99,
        "description": "Quantity to add"
      },
      "variant_id": { "type": "string", "description": "Product variant (size, color)" }
    },
    "required": ["product_id", "quantity"]
  },
  "metadata": {
    "action_type": "write",
    "risk_level": "low",
    "idempotent": false,
    "confirmation_required": false,
    "approval_required": false,
    "source_intent": "cart.add_item",
    "source_entity": "cart"
  }
}
```

## Example 3: Begin Checkout (Write, High Risk)
```json title="checkout_begin — Write / High Risk ⚠️" showLineNumbers
{
  "name": "checkout_begin",
  "description": "Start checkout for a validated cart and create a checkout session",
  "input_schema": {
    "type": "object",
    "properties": {
      "cart_id": { "type": "string" },
      "payment_method_id": { "type": "string" },
      "shipping_address_id": { "type": "string" }
    },
    "required": ["cart_id", "payment_method_id", "shipping_address_id"]
  },
  "metadata": {
    "action_type": "write",
    "risk_level": "high",
    "idempotent": false,
    "confirmation_required": true,
    "approval_required": false,
    "side_effects": ["inventory_locked", "payment_hold_created"],
    "preconditions": ["cart_validated", "inventory_reserved"],
    "postconditions": ["checkout_session_created"],
    "source_intent": "checkout.begin",
    "source_entity": "order"
  }
}
```

## Example 4: Account Delete (Critical)
```json title="account_delete — Delete / Critical Risk 🔴" showLineNumbers
{
  "name": "account_delete",
  "description": "Permanently delete user account and all associated data",
  "input_schema": {
    "type": "object",
    "properties": {
      "account_id": { "type": "string" },
      "confirmation_code": { "type": "string", "description": "User-provided confirmation code" }
    },
    "required": ["account_id", "confirmation_code"]
  },
  "metadata": {
    "action_type": "delete",
    "risk_level": "critical",
    "idempotent": false,
    "confirmation_required": true,
    "approval_required": true,
    "approval_roles": ["admin"],
    "side_effects": ["data_purged", "subscriptions_cancelled", "audit_log_created"],
    "source_intent": "account.delete",
    "source_entity": "account"
  }
}
```

## Example 5: Lead Create (CRM)
```json title="lead_create — CRM / Low Risk"
{
  "name": "lead_create",
  "description": "Create a new sales lead in the CRM",
  "input_schema": {
    "type": "object",
    "properties": {
      "first_name": { "type": "string" },
      "last_name": { "type": "string" },
      "email": { "type": "string", "format": "email" },
      "company": { "type": "string" },
      "source": { "type": "string", "enum": ["web", "referral", "event", "cold_call"] }
    },
    "required": ["first_name", "last_name", "email"]
  },
  "metadata": {
    "action_type": "write",
    "risk_level": "low",
    "idempotent": false,
    "confirmation_required": false,
    "approval_required": false,
    "source_intent": "lead.create",
    "source_entity": "lead"
  }
}
```

## Example 6: Campaign Schedule (Marketing)
```json title="campaign_schedule — Marketing / Medium Risk"
{
  "name": "campaign_schedule",
  "description": "Schedule a marketing campaign for future delivery",
  "input_schema": {
    "type": "object",
    "properties": {
      "campaign_id": { "type": "string" },
      "scheduled_at": { "type": "string", "format": "date-time" },
      "timezone": { "type": "string" }
    },
    "required": ["campaign_id", "scheduled_at"]
  },
  "metadata": {
    "action_type": "write",
    "risk_level": "medium",
    "idempotent": true,
    "confirmation_required": true,
    "approval_required": false,
    "preconditions": ["campaign_approved", "audience_configured"],
    "source_intent": "campaign.schedule",
    "source_entity": "campaign"
  }
}
```

## Example 7: Ticket Escalate (Support)
```json title="ticket_escalate — Support / Medium Risk"
{
  "name": "ticket_escalate",
  "description": "Escalate a support ticket to a higher tier",
  "input_schema": {
    "type": "object",
    "properties": {
      "ticket_id": { "type": "string" },
      "escalation_reason": { "type": "string" },
      "target_tier": { "type": "string", "enum": ["tier_2", "tier_3", "manager"] }
    },
    "required": ["ticket_id", "escalation_reason", "target_tier"]
  },
  "metadata": {
    "action_type": "write",
    "risk_level": "medium",
    "idempotent": false,
    "confirmation_required": false,
    "approval_required": false,
    "side_effects": ["notification_sent", "sla_timer_reset"],
    "source_intent": "ticket.escalate",
    "source_entity": "ticket"
  }
}
```

## Example 8: Report Generate (Analytics)
```json title="report_generate — Analytics / No Risk"
{
  "name": "report_generate",
  "description": "Generate an analytics report with specified parameters",
  "input_schema": {
    "type": "object",
    "properties": {
      "report_type": { "type": "string", "enum": ["revenue", "engagement", "retention", "funnel"] },
      "date_from": { "type": "string", "format": "date" },
      "date_to": { "type": "string", "format": "date" },
      "dimensions": { "type": "array", "items": { "type": "string" } },
      "format": { "type": "string", "enum": ["json", "csv", "pdf"] }
    },
    "required": ["report_type", "date_from", "date_to"]
  },
  "metadata": {
    "action_type": "read",
    "risk_level": "none",
    "idempotent": true,
    "confirmation_required": false,
    "approval_required": false,
    "source_intent": "report.generate",
    "source_entity": "report"
  }
}
```

## Example 9: Booking Cancel (Travel)
```json title="booking_cancel — Travel / High Risk ⚠️"
{
  "name": "booking_cancel",
  "description": "Cancel an existing travel booking",
  "input_schema": {
    "type": "object",
    "properties": {
      "booking_id": { "type": "string" },
      "cancellation_reason": { "type": "string" }
    },
    "required": ["booking_id"]
  },
  "metadata": {
    "action_type": "write",
    "risk_level": "high",
    "idempotent": true,
    "confirmation_required": true,
    "approval_required": false,
    "side_effects": ["refund_initiated", "inventory_released", "confirmation_email_sent"],
    "source_intent": "booking.cancel",
    "source_entity": "booking"
  }
}
```

## Example 10: Interview Schedule (Jobs)
```json title="interview_schedule — Jobs / Low Risk"
{
  "name": "interview_schedule",
  "description": "Schedule a job interview for a candidate",
  "input_schema": {
    "type": "object",
    "properties": {
      "candidate_id": { "type": "string" },
      "job_id": { "type": "string" },
      "interviewer_ids": { "type": "array", "items": { "type": "string" } },
      "scheduled_at": { "type": "string", "format": "date-time" },
      "duration_minutes": { "type": "number", "minimum": 15, "maximum": 240 }
    },
    "required": ["candidate_id", "job_id", "scheduled_at", "duration_minutes"]
  },
  "metadata": {
    "action_type": "write",
    "risk_level": "low",
    "idempotent": false,
    "confirmation_required": false,
    "approval_required": false,
    "side_effects": ["calendar_invites_sent", "candidate_notified"],
    "source_intent": "interview.schedule",
    "source_entity": "interview"
  }
}
```
