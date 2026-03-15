---
id: ticket-creation
title: "Support: Ticket Creation"
sidebar_label: Ticket Creation
slug: /use-cases/support/ticket-creation
---

# Support: Ticket Creation

## Problem Statement
Creating a support ticket involves categorizing the issue, providing a description, setting priority, and optionally attaching files. This is a write operation that triggers routing and SLA timers.

## Why Human-Only Semantics Fail
- Category dropdowns have nested hierarchies not reflected in the DOM
- Priority labels ("Urgent", "High") don't map to SLA definitions
- File attachment controls don't declare accepted types or size limits
- "Submit Ticket" doesn't declare the routing side-effects

## Why Scraping Fails Here
- Support portals are behind authentication
- Category trees are lazily loaded
- Rich text description fields use WYSIWYG editors
- Ticket confirmation pages are dynamically rendered

## How AXAG Eliminates Scraping
`ticket.create` declares categories as enums, priority levels with semantic meaning, and the side-effects of creation (routing, SLA timer start).

## Annotated UI Example
```html title="Support — create ticket"
<button
  axag-intent="ticket.create"
  axag-entity="ticket"
  axag-action-type="write"
  axag-required-parameters='["subject","description","category","priority"]'
  axag-optional-parameters='["attachment_urls","tags","cc_emails"]'
  axag-postconditions='["ticket created","routing rules applied","SLA timer started"]'
  axag-risk-level="low"
  axag-idempotent="false"
  axag-scope="tenant"
  axag-description="Create a new support ticket"
>Submit Ticket</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — ticket.create" showLineNumbers
{
  "intent": "ticket.create",
  "entity": "ticket",
  "operation_id": "ticket_create",
  "action_type": "write",
  "parameters": {
    "subject": { "type": "string", "required": true, "maxLength": 200 },
    "description": { "type": "string", "required": true, "maxLength": 10000 },
    "category": {
      "type": "string",
      "required": true,
      "enum": ["billing","technical","account","feature_request","bug_report","other"]
    },
    "priority": {
      "type": "string",
      "required": true,
      "enum": ["low","medium","high","urgent"]
    },
    "attachment_urls": { "type": "array", "required": false, "items": { "type": "string", "format": "uri" } },
    "tags": { "type": "array", "required": false, "items": { "type": "string" } },
    "cc_emails": { "type": "array", "required": false, "items": { "type": "string", "format": "email" } }
  },
  "postconditions": ["ticket created", "routing rules applied", "SLA timer started"],
  "risk_level": "low",
  "idempotent": false,
  "scope": "tenant"
}
```

## Generated Tool Example
```json title="Tool — ticket_create"
{
  "tool_name": "ticket_create",
  "description": "Create a new support ticket",
  "input_schema": {
    "type": "object",
    "properties": {
      "subject": { "type": "string", "maxLength": 200 },
      "description": { "type": "string", "maxLength": 10000 },
      "category": { "type": "string", "enum": ["billing","technical","account","feature_request","bug_report","other"] },
      "priority": { "type": "string", "enum": ["low","medium","high","urgent"] },
      "attachment_urls": { "type": "array", "items": { "type": "string", "format": "uri" } },
      "tags": { "type": "array", "items": { "type": "string" } }
    },
    "required": ["subject", "description", "category", "priority"]
  },
  "safety": { "risk_level": "low", "idempotent": false }
}
```

## Constraints & Safety Notes
- **Not idempotent**: duplicate submissions create duplicate tickets
- Low risk — creates a ticket but doesn't modify existing data
- SLA timer starts immediately upon creation based on priority level
- Routing rules assign the ticket to the appropriate team
- `urgent` priority may trigger immediate page/notification to on-call staff
