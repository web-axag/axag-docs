---
id: dashboard-filtering
title: "Analytics: Dashboard Filtering"
sidebar_label: Dashboard Filtering
slug: /use-cases/analytics/dashboard-filtering
---

# Analytics: Dashboard Filtering

## Problem Statement
Analytics dashboards let users filter data by date range, dimensions, metrics, and segments. Agents need to read filtered data programmatically without interacting with visual filter controls.

## Why Human-Only Semantics Fail
- Filter panels use date pickers, dropdowns, and multi-selects
- Available dimensions/metrics aren't declared — they depend on the dataset
- Dashboard state is stored in the URL query string or session, not the DOM
- "Apply Filters" triggers a re-render, not a navigable form submission

## Why Scraping Fails Here
- Dashboard charts render as Canvas/SVG — data is not in the DOM
- Filter state is managed in JavaScript memory
- Real-time dashboards update via WebSocket
- Each visualization library (D3, Chart.js, Highcharts) has different DOM output

## How AXAG Eliminates Scraping
`dashboard.filter` declares available filter parameters, valid date ranges, and output format. Agents get structured data instead of parsing chart SVGs.

## Annotated UI Example
```html title="Analytics — dashboard filter"
<button
  axag-intent="dashboard.filter"
  axag-entity="dashboard"
  axag-action-type="read"
  axag-required-parameters='["dashboard_id"]'
  axag-optional-parameters='["date_range","dimensions","metrics","segment_id","granularity"]'
  axag-scope="tenant"
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="Retrieve filtered dashboard data"
>Apply Filters</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — dashboard.filter" showLineNumbers
{
  "intent": "dashboard.filter",
  "entity": "dashboard",
  "action_type": "read",
  "operation_id": "dashboard_filter",
  "description": "Retrieve filtered dashboard data",
  "required_parameters": [{ "name": "dashboard_id", "type": "string" }],
  "optional_parameters": [
    {
      "name": "date_range",
      "type": "object",
      "properties": {
        "start": { "type": "string", "format": "date" },
        "end": { "type": "string", "format": "date" }
      }
    },
    { "name": "dimensions", "type": "array", "items": { "type": "string" } },
    { "name": "metrics", "type": "array", "items": { "type": "string" } },
    { "name": "segment_id", "type": "string" },
    {
      "name": "granularity",
      "type": "string",
      "enum": ["hourly", "daily", "weekly", "monthly", "quarterly", "yearly"]
    }
  ],
  "risk_level": "none",
  "idempotent": true,
  "scope": "tenant"
}
```

## Generated Tool Example
```json
{
  "name": "dashboard_filter",
  "description": "Retrieve filtered dashboard data",
  "input_schema": {
    "type": "object",
    "properties": {
      "dashboard_id": { "type": "string" },
      "date_range": {
        "type": "object",
        "properties": {
          "start": { "type": "string", "format": "date" },
          "end": { "type": "string", "format": "date" }
        }
      },
      "dimensions": { "type": "array", "items": { "type": "string" } },
      "metrics": { "type": "array", "items": { "type": "string" } },
      "granularity": {
        "type": "string",
        "enum": ["hourly", "daily", "weekly", "monthly", "quarterly", "yearly"]
      }
    },
    "required": ["dashboard_id"]
  },
  "metadata": {
    "action_type": "read",
    "risk_level": "none",
    "idempotent": true,
    "confirmation_required": false,
    "approval_required": false,
    "source_intent": "dashboard.filter",
    "source_entity": "dashboard"
  }
}
```

## Constraints & Safety Notes
- Read-only, no side-effects
- Scoped to tenant — users can only access their organization's dashboards
- Available dimensions and metrics depend on the specific dashboard/dataset
- Granularity affects data aggregation level
