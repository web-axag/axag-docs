---
id: campaign-creation
title: "Marketing: Campaign Creation"
sidebar_label: Campaign Creation
slug: /use-cases/marketing/campaign-creation
---

# Marketing: Campaign Creation

## Problem Statement
Creating a marketing campaign involves naming the campaign, selecting channels, defining audience segments, setting budgets, and configuring creative assets. This is a multi-field write operation with complex parameter schemas.

## Why Human-Only Semantics Fail
- Campaign creation forms span multiple tabs/steps
- Channel selection uses custom chip components
- Budget inputs don't declare currency or constraints
- Audience segment pickers are complex filter builders with no schema

## Why Scraping Fails Here
- Multi-tab forms don't exist as a single DOM snapshot
- Rich text editors for creative content use contenteditable or iframes
- Audience builder components are deeply nested interactive trees
- Draft save and publish are distinct actions but look like similar buttons

## How AXAG Eliminates Scraping
`campaign.create` declares the full parameter schema including nested objects for budget and audience. Agents construct a valid request without navigating form UIs.

## Annotated UI Example
```html title="Marketing — create campaign"
<button
  axag-intent="campaign.create"
  axag-entity="campaign"
  axag-action-type="write"
  axag-required-parameters='["name","channel","audience_segment_id","budget"]'
  axag-optional-parameters='["start_date","end_date","creative_asset_ids","tags"]'
  axag-preconditions='["user must have campaign_create permission"]'
  axag-postconditions='["campaign created in draft status"]'
  axag-risk-level="low"
  axag-idempotent="false"
  axag-description="Create a new marketing campaign"
>Create Campaign</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — campaign.create" showLineNumbers
{
  "intent": "campaign.create",
  "entity": "campaign",
  "operation_id": "campaign_create",
  "action_type": "write",
  "parameters": {
    "name": { "type": "string", "required": true, "maxLength": 200 },
    "channel": { "type": "string", "required": true, "enum": ["email","sms","push","social","display"] },
    "audience_segment_id": { "type": "string", "required": true },
    "budget": {
      "type": "object",
      "required": true,
      "properties": {
        "amount": { "type": "number", "minimum": 0 },
        "currency": { "type": "string", "enum": ["USD","EUR","GBP"] }
      }
    },
    "start_date": { "type": "string", "format": "date", "required": false },
    "end_date": { "type": "string", "format": "date", "required": false },
    "creative_asset_ids": { "type": "array", "required": false, "items": { "type": "string" } },
    "tags": { "type": "array", "required": false, "items": { "type": "string" } }
  },
  "preconditions": ["user must have campaign_create permission"],
  "postconditions": ["campaign created in draft status"],
  "risk_level": "low",
  "idempotent": false
}
```

## Generated Tool Example
```json title="Tool — campaign_create"
{
  "tool_name": "campaign_create",
  "description": "Create a new marketing campaign",
  "input_schema": {
    "type": "object",
    "properties": {
      "name": { "type": "string", "maxLength": 200 },
      "channel": { "type": "string", "enum": ["email","sms","push","social","display"] },
      "audience_segment_id": { "type": "string" },
      "budget": {
        "type": "object",
        "properties": {
          "amount": { "type": "number", "minimum": 0 },
          "currency": { "type": "string", "enum": ["USD","EUR","GBP"] }
        },
        "required": ["amount", "currency"]
      },
      "start_date": { "type": "string", "format": "date" },
      "end_date": { "type": "string", "format": "date" }
    },
    "required": ["name", "channel", "audience_segment_id", "budget"]
  },
  "safety": { "risk_level": "low", "idempotent": false }
}
```

## Constraints & Safety Notes
- Creates in **draft** status — not yet live
- Budget amount has minimum 0 constraint to prevent negative values
- Requires `campaign_create` permission
- Not idempotent — calling twice creates two campaigns
