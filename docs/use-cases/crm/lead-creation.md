---
id: lead-creation
title: "CRM: Lead Creation"
sidebar_label: Lead Creation
slug: /use-cases/crm/lead-creation
---

# CRM: Lead Creation

## Problem Statement
Creating a lead in a CRM captures contact information, source, and initial qualification data. This is a standard write operation, but CRM forms often have dozens of optional fields, custom fields, and auto-population logic.

## Why Human-Only Semantics Fail
- CRM forms have 20+ fields with no declaration of which are required
- Custom fields are tenant-specific and not discoverable from the DOM
- Auto-population (company lookup from email domain) is invisible to scrapers
- Duplicate detection happens server-side; the form doesn't communicate it

## Why Scraping Fails Here
- CRM UIs vary massively between tenants (Salesforce, HubSpot, custom)
- Custom fields add dynamic form rows
- Inline validation messages are transient DOM elements
- OAuth-protected pages block unauthenticated scrapers

## How AXAG Eliminates Scraping
`lead.create` declares the full field schema, required/optional distinctions, and any duplicate-detection behavior. Agents submit structured data directly.

## Annotated UI Example
```html title="CRM — lead creation button" showLineNumbers
<button
  axag-intent="lead.create"
  axag-entity="lead"
  axag-action-type="write"
  axag-required-parameters='["first_name","last_name","email"]'
  axag-optional-parameters='["company","phone","source","notes","custom_fields"]'
  axag-postconditions='["lead created","assignment rules triggered"]'
  axag-risk-level="low"
  axag-idempotent="false"
  axag-scope="tenant"
  axag-description="Create a new lead in the CRM"
>Create Lead</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — lead.create" showLineNumbers
{
  "intent": "lead.create",
  "entity": "lead",
  "action_type": "write",
  "operation_id": "lead_create",
  "description": "Create a new lead in the CRM",
  "required_parameters": [
    { "name": "first_name", "type": "string" },
    { "name": "last_name", "type": "string" },
    { "name": "email", "type": "string", "format": "email" }
  ],
  "optional_parameters": [
    { "name": "company", "type": "string" },
    { "name": "phone", "type": "string" },
    {
      "name": "source",
      "type": "string",
      "enum": ["website", "referral", "event", "cold_outreach", "partner", "other"]
    },
    { "name": "notes", "type": "string", "maxLength": 5000 },
    { "name": "custom_fields", "type": "object" }
  ],
  "risk_level": "low",
  "idempotent": false,
  "scope": "tenant",
  "postconditions": ["lead created", "assignment rules triggered"]
}
```

## Generated Tool Example
```json title="Tool — lead_create" showLineNumbers
{
  "name": "lead_create",
  "description": "Create a new lead in the CRM",
  "input_schema": {
    "type": "object",
    "properties": {
      "first_name": { "type": "string" },
      "last_name": { "type": "string" },
      "email": { "type": "string", "format": "email" },
      "company": { "type": "string" },
      "phone": { "type": "string" },
      "source": {
        "type": "string",
        "enum": ["website", "referral", "event", "cold_outreach", "partner", "other"]
      },
      "notes": { "type": "string", "maxLength": 5000 },
      "custom_fields": { "type": "object" }
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

## Constraints & Safety Notes
- **Not idempotent**: duplicate submissions create duplicate leads
- **Scoped to tenant**: agent cannot create leads in other tenants
- `custom_fields` is a flexible object for tenant-specific extensions
- Post-creation side-effect: assignment rules may auto-assign the lead to a sales rep
