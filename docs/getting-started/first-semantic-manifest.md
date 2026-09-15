---
id: first-semantic-manifest
title: Your First Semantic Manifest
sidebar_label: First Semantic Manifest
slug: /getting-started/first-semantic-manifest
description: Generate your first Semantic Manifest from AXAG annotations.
keywords: [semantic manifest, generation, quickstart]
---

# Your First Semantic Manifest

The Semantic Manifest is a JSON document generated from AXAG annotations. It catalogs every annotated operation with full parameter schemas, constraints, and safety metadata.

## From Annotation to Manifest

Given the annotation from the previous step:

```html title="Annotated search button (from previous step)"
<button
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  axag-required-parameters='["query"]'
  axag-optional-parameters='["category","price_min","price_max"]'
  axag-scope="public"
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="Search the product catalog by text query with optional filters"
>
  Search
</button>
```

The generated Semantic Manifest entry is:

```json title="axag-manifest.json — generated output" showLineNumbers
{
  "version": "1.1.0",
  "generated_at": "2026-09-14T00:00:00.000Z",
  "source": {
    "paths": ["src"],
    "tool": "axag-cli",
    "tool_version": "1.0.2"
  },
  "conformance": "intermediate",
  "actions": [
    {
      "intent": "product.search",
      "entity": "product",
      "action_type": "read",
      "operation_id": "product_search",
      "description": "Search the product catalog by text query with optional filters",
      "required_parameters": [
        { "name": "query", "type": "string" }
      ],
      "optional_parameters": [
        { "name": "category", "type": "string" },
        { "name": "price_min", "type": "string" },
        { "name": "price_max", "type": "string" }
      ],
      "risk_level": "none",
      "idempotent": true,
      "scope": "public",
      "source_file": "src/pages/search.html",
      "source_line": 1
    }
  ]
}
```

## Manifest Structure

Every Semantic Manifest contains:

| Field | Purpose |
|-------|---------|
| `version` | The AXAG specification version the manifest conforms to |
| `generated_at` | Timestamp of manifest generation |
| `source` | Where the annotations were read from, and the tool that read them |
| `conformance` | `basic`, `intermediate`, or `full` — computed from the declared metadata |
| `actions` | Array of annotated operation definitions, sorted by intent |

Each action contains the full semantic contract: intent, entity, parameters, safety metadata, and the source location it came from.

:::tip Parameter types
Parameters listed by name (`'["query"]'`) are typed as `string`. To declare types and constraints, use the object form: `axag-required-parameters='[{"name":"price_min","type":"number","min":0}]'`.
:::

## Generation Approaches

Manifests can be generated through:

1. **Build-time extraction** — A build plugin scans annotated HTML/JSX and outputs manifest JSON
2. **Runtime extraction** — A client-side script reads `axag-*` attributes from the live DOM
3. **Static analysis** — A linter or analyzer processes source files without rendering

The recommended approach is **build-time extraction** for production deployments.

## Next Steps

- [First Generated Tool](/docs/getting-started/first-generated-tool) — Map the manifest to an MCP tool
- [Manifest Schema](/docs/semantic-manifest/manifest-schema) — Full manifest schema reference
