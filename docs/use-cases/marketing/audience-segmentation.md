---
id: audience-segmentation
title: "Marketing: Audience Segmentation"
sidebar_label: Audience Segmentation
slug: /use-cases/marketing/audience-segmentation
---

# Marketing: Audience Segmentation

## Problem Statement
Building audience segments involves composing filter rules (demographics, behavior, purchase history) into reusable groups. This is a complex query-builder interaction.

## Why Human-Only Semantics Fail
- Filter builders use drag-and-drop with nested AND/OR logic
- Condition types vary per field (equals, contains, greater-than, between)
- Segment preview counts are calculated server-side
- The composition model (union, intersection, exclusion) is purely visual

## Why Scraping Fails Here
- Query builders render as dynamic nested trees
- Each filter row is a separate component instance
- Drag-and-drop reordering doesn't change the DOM in a parseable way
- Preview data requires API calls that scrapers can't trigger

## How AXAG Eliminates Scraping
`audience.create_segment` declares a structured filter schema that agents compose programmatically. No visual interaction required.

## Annotated UI Example
```html title="Marketing — create audience segment"
<button
  axag-intent="audience.create_segment"
  axag-entity="audience_segment"
  axag-action-type="write"
  axag-required-parameters='["name","rules"]'
  axag-optional-parameters='["description","tags"]'
  axag-risk-level="none"
  axag-idempotent="false"
  axag-description="Create a reusable audience segment with filter rules"
>Save Segment</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — audience.create_segment" showLineNumbers
{
  "intent": "audience.create_segment",
  "entity": "audience_segment",
  "operation_id": "audience_create_segment",
  "action_type": "write",
  "parameters": {
    "name": { "type": "string", "required": true, "maxLength": 100 },
    "rules": {
      "type": "object",
      "required": true,
      "properties": {
        "operator": { "type": "string", "enum": ["AND", "OR"] },
        "conditions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "field": { "type": "string" },
              "operator": { "type": "string", "enum": ["equals","not_equals","contains","gt","lt","between","in"] },
              "value": {}
            }
          }
        }
      }
    },
    "description": { "type": "string", "required": false },
    "tags": { "type": "array", "required": false, "items": { "type": "string" } }
  },
  "risk_level": "none",
  "idempotent": false
}
```

## Generated Tool Example
```json title="Tool — audience_create_segment"
{
  "tool_name": "audience_create_segment",
  "description": "Create a reusable audience segment with filter rules",
  "input_schema": {
    "type": "object",
    "properties": {
      "name": { "type": "string", "maxLength": 100 },
      "rules": {
        "type": "object",
        "properties": {
          "operator": { "type": "string", "enum": ["AND","OR"] },
          "conditions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "field": { "type": "string" },
                "operator": { "type": "string", "enum": ["equals","not_equals","contains","gt","lt","between","in"] },
                "value": {}
              },
              "required": ["field","operator","value"]
            }
          }
        },
        "required": ["operator","conditions"]
      }
    },
    "required": ["name","rules"]
  },
  "safety": { "risk_level": "none", "idempotent": false }
}
```

## Constraints & Safety Notes
- No risk — segments are metadata, not user-affecting actions
- Rules use a composable AND/OR model with typed conditions
- Field names in conditions reference the data model (e.g., `age`, `purchase_count`, `last_active`)
