---
id: sales-forecasting
title: "CRM: Sales Forecasting"
sidebar_label: Sales Forecasting
slug: /use-cases/crm/sales-forecasting
---

# CRM: Sales Forecasting

## Problem Statement
Generating a sales forecast aggregates pipeline data by period, stage, team, or product line. This is a read-only analytical operation with complex filter parameters.

## Why Human-Only Semantics Fail
- Forecast dashboards display charts that agents cannot parse
- Filter controls don't declare available dimensions or date ranges
- "Export" buttons produce files in undeclared formats
- Drill-down interactions are click-based with no declared navigation model

## Why Scraping Fails Here
- Charts render as SVG/Canvas — no textual data in the DOM
- Filters reload the page asynchronously
- Data tables are paginated with lazy loading
- Export downloads trigger browser file-save dialogs

## How AXAG Eliminates Scraping
`forecast.generate` declares the filter parameters, output format options, and scope boundaries. Agents get structured forecast data.

## Annotated UI Example
```html title="CRM — generate forecast"
<button
  axag-intent="forecast.generate"
  axag-entity="forecast"
  axag-action-type="read"
  axag-required-parameters='["period"]'
  axag-optional-parameters='["team_id","product_line","stage_filter","format"]'
  axag-scope="tenant"
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="Generate a sales forecast for the specified period"
>Generate Forecast</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — forecast.generate" showLineNumbers
{
  "intent": "forecast.generate",
  "entity": "forecast",
  "operation_id": "forecast_generate",
  "action_type": "read",
  "parameters": {
    "period": {
      "type": "string",
      "required": true,
      "enum": ["current_quarter","next_quarter","current_year","custom"]
    },
    "team_id": { "type": "string", "required": false },
    "product_line": { "type": "string", "required": false },
    "stage_filter": {
      "type": "array",
      "required": false,
      "items": {
        "type": "string",
        "enum": ["prospecting","qualification","proposal","negotiation","closed_won"]
      }
    },
    "format": {
      "type": "string",
      "required": false,
      "enum": ["json","csv","pdf"],
      "default": "json"
    }
  },
  "scope": "tenant",
  "risk_level": "none",
  "idempotent": true
}
```

## Generated Tool Example
```json
{
  "tool_name": "forecast_generate",
  "description": "Generate a sales forecast for the specified period",
  "input_schema": {
    "type": "object",
    "properties": {
      "period": { "type": "string", "enum": ["current_quarter","next_quarter","current_year","custom"] },
      "team_id": { "type": "string" },
      "product_line": { "type": "string" },
      "stage_filter": {
        "type": "array",
        "items": { "type": "string", "enum": ["prospecting","qualification","proposal","negotiation","closed_won"] }
      },
      "format": { "type": "string", "enum": ["json","csv","pdf"], "default": "json" }
    },
    "required": ["period"]
  },
  "safety": { "risk_level": "none", "idempotent": true }
}
```

## Constraints & Safety Notes
- Read-only, no side-effects
- Scoped to tenant — cannot access other organizations' pipeline data
- `custom` period type would require additional `start_date`/`end_date` parameters
- CSV/PDF formats are for human consumption; JSON is the agent-preferred format
