---
id: report-generation
title: "Analytics: Report Generation"
sidebar_label: Report Generation
slug: /use-cases/analytics/report-generation
---

# Analytics: Report Generation

## Problem Statement
Generating reports involves selecting data sources, date ranges, metrics, and output format. Reports may take time to process (async) and produce downloadable files.

## Why Human-Only Semantics Fail
- Report builder UIs are multi-step wizards
- Available metrics depend on selected data sources
- Output format options (PDF, CSV, XLSX) aren't declared as parameters
- Processing time is shown with spinners, not structured status

## Why Scraping Fails Here
- Report generation is asynchronous — results aren't immediate
- Download links are temporary, signed URLs
- Complex reports trigger server-side processing jobs
- Progress indicators are JavaScript-driven animations

## How AXAG Eliminates Scraping
`report.generate` declares it as an async operation with a defined output format enum. Agents poll for completion using `report.status`.

## Annotated UI Example
```html title="Analytics — generate report (async)"
<button
  axag-intent="report.generate"
  axag-entity="report"
  axag-action-type="write"
  axag-required-parameters='["report_type","date_range"]'
  axag-optional-parameters='["metrics","dimensions","format","filters"]'
  axag-postconditions='["report generation job created"]'
  axag-risk-level="low"
  axag-idempotent="false"
  axag-async="true"
  axag-scope="tenant"
  axag-description="Generate an analytics report"
>Generate Report</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — report.generate" showLineNumbers
{
  "intent": "report.generate",
  "entity": "report",
  "operation_id": "report_generate",
  "action_type": "write",
  "async": true,
  "parameters": {
    "report_type": {
      "type": "string",
      "required": true,
      "enum": ["summary","detailed","comparison","trend"]
    },
    "date_range": {
      "type": "object",
      "required": true,
      "properties": {
        "start": { "type": "string", "format": "date" },
        "end": { "type": "string", "format": "date" }
      }
    },
    "metrics": { "type": "array", "required": false, "items": { "type": "string" } },
    "dimensions": { "type": "array", "required": false, "items": { "type": "string" } },
    "format": {
      "type": "string",
      "required": false,
      "enum": ["pdf","csv","xlsx","json"],
      "default": "json"
    },
    "filters": { "type": "object", "required": false }
  },
  "postconditions": ["report generation job created"],
  "risk_level": "low",
  "idempotent": false,
  "scope": "tenant"
}
```

## Generated Tool Example
```json
{
  "tool_name": "report_generate",
  "description": "Generate an analytics report (async — returns job ID)",
  "input_schema": {
    "type": "object",
    "properties": {
      "report_type": { "type": "string", "enum": ["summary","detailed","comparison","trend"] },
      "date_range": {
        "type": "object",
        "properties": {
          "start": { "type": "string", "format": "date" },
          "end": { "type": "string", "format": "date" }
        },
        "required": ["start", "end"]
      },
      "metrics": { "type": "array", "items": { "type": "string" } },
      "format": { "type": "string", "enum": ["pdf","csv","xlsx","json"], "default": "json" }
    },
    "required": ["report_type", "date_range"]
  },
  "safety": { "risk_level": "low", "idempotent": false, "async": true }
}
```

## Constraints & Safety Notes
- **Async operation**: returns a job ID, not the report itself
- Agent should poll `report.status` with the job ID to check completion
- Not idempotent — each call creates a new report job
- `json` is the preferred agent format; PDF/XLSX are for human consumption
- Scoped to tenant data only
