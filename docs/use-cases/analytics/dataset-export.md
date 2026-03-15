---
id: dataset-export
title: "Analytics: Dataset Export"
sidebar_label: Dataset Export
slug: /use-cases/analytics/dataset-export
---

# Analytics: Dataset Export

## Problem Statement
Exporting raw datasets lets users download filtered data for external analysis. Exports may be large (millions of rows) and require async processing with size/row limits.

## Why Human-Only Semantics Fail
- "Export" buttons don't declare file format, row limits, or processing time
- Column selection is done via checkbox lists with no schema
- Large exports show progress bars with no structured status
- Download links expire without declaring TTL

## Why Scraping Fails Here
- Export triggers a server-side job, not a synchronous download
- Download URLs are signed and time-limited
- Large files require streaming — not available in DOM
- Column names in the UI may differ from the export output

## How AXAG Eliminates Scraping
`dataset.export` declares column selection, row limits, format options, and the async nature of the operation.

## Annotated UI Example
```html title="Analytics — dataset export (async)"
<button
  axag-intent="dataset.export"
  axag-entity="dataset"
  axag-action-type="read"
  axag-required-parameters='["dataset_id"]'
  axag-optional-parameters='["columns","filters","format","row_limit"]'
  axag-postconditions='["export job created","download link available when complete"]'
  axag-risk-level="none"
  axag-idempotent="false"
  axag-async="true"
  axag-scope="tenant"
  axag-description="Export a dataset as a downloadable file"
>Export Data</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — dataset.export" showLineNumbers
{
  "intent": "dataset.export",
  "entity": "dataset",
  "operation_id": "dataset_export",
  "action_type": "read",
  "async": true,
  "parameters": {
    "dataset_id": { "type": "string", "required": true },
    "columns": {
      "type": "array",
      "required": false,
      "items": { "type": "string" },
      "description": "Columns to include; defaults to all"
    },
    "filters": { "type": "object", "required": false },
    "format": {
      "type": "string",
      "required": false,
      "enum": ["csv","json","parquet"],
      "default": "csv"
    },
    "row_limit": {
      "type": "integer",
      "required": false,
      "minimum": 1,
      "maximum": 10000000,
      "default": 100000
    }
  },
  "postconditions": ["export job created", "download link available when complete"],
  "risk_level": "none",
  "idempotent": false,
  "scope": "tenant"
}
```

## Generated Tool Example
```json
{
  "tool_name": "dataset_export",
  "description": "Export a dataset as a downloadable file (async — returns job ID)",
  "input_schema": {
    "type": "object",
    "properties": {
      "dataset_id": { "type": "string" },
      "columns": { "type": "array", "items": { "type": "string" } },
      "filters": { "type": "object" },
      "format": { "type": "string", "enum": ["csv","json","parquet"], "default": "csv" },
      "row_limit": { "type": "integer", "minimum": 1, "maximum": 10000000, "default": 100000 }
    },
    "required": ["dataset_id"]
  },
  "safety": { "risk_level": "none", "idempotent": false, "async": true }
}
```

## Constraints & Safety Notes
- Read-only operation despite being async
- Row limit defaults to 100K, max 10M to prevent abuse
- `parquet` format is efficient for large datasets and agent consumption
- Download links from the completed job have a TTL (typically 24 hours)
- Scoped to tenant data
