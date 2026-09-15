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
  "action_type": "read",
  "operation_id": "dataset_export",
  "description": "Export a dataset as a downloadable file",
  "required_parameters": [{ "name": "dataset_id", "type": "string" }],
  "optional_parameters": [
    {
      "name": "columns",
      "type": "array",
      "description": "Columns to include; defaults to all",
      "items": { "type": "string" }
    },
    { "name": "filters", "type": "object" },
    { "name": "format", "type": "string", "enum": ["csv", "json", "parquet"], "default": "csv" },
    { "name": "row_limit", "type": "integer", "min": 1, "max": 10000000, "default": 100000 }
  ],
  "risk_level": "none",
  "idempotent": false,
  "async": true,
  "scope": "tenant",
  "postconditions": ["export job created", "download link available when complete"]
}
```

## Generated Tool Example
```json
{
  "name": "dataset_export",
  "description": "Export a dataset as a downloadable file (async — returns job ID)",
  "input_schema": {
    "type": "object",
    "properties": {
      "dataset_id": { "type": "string" },
      "columns": { "type": "array", "items": { "type": "string" } },
      "filters": { "type": "object" },
      "format": { "type": "string", "enum": ["csv", "json", "parquet"], "default": "csv" },
      "row_limit": { "type": "integer", "minimum": 1, "maximum": 10000000, "default": 100000 }
    },
    "required": ["dataset_id"]
  },
  "metadata": {
    "action_type": "read",
    "risk_level": "none",
    "idempotent": false,
    "confirmation_required": false,
    "approval_required": false,
    "async": true,
    "source_intent": "dataset.export",
    "source_entity": "dataset"
  }
}
```

## Constraints & Safety Notes
- Read-only operation despite being async
- Row limit defaults to 100K, max 10M to prevent abuse
- `parquet` format is efficient for large datasets and agent consumption
- Download links from the completed job have a TTL (typically 24 hours)
- Scoped to tenant data
