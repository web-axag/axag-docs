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
  axag-scope="catalog"
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
  "version": "1.0.0",
  "generated_at": "2026-03-14T00:00:00Z",
  "source": "product-search-page",
  "operations": [
    {
      "intent": "product.search",
      "entity": "product",
      "operation_id": "product_search",
      "description": "Search the product catalog by text query with optional filters",
      "action_type": "read",
      "parameters": {
        "query": {
          "type": "string",
          "required": true,
          "description": "Free-text search query for product name, description, or SKU"
        },
        "category": {
          "type": "string",
          "required": false,
          "description": "Filter by product category"
        },
        "price_min": {
          "type": "number",
          "required": false,
          "description": "Minimum price filter"
        },
        "price_max": {
          "type": "number",
          "required": false,
          "description": "Maximum price filter"
        }
      },
      "scope": "catalog",
      "risk_level": "none",
      "idempotent": true,
      "preconditions": [],
      "postconditions": [],
      "confirmation_required": false,
      "side_effects": []
    }
  ]
}
```

## Manifest Structure

Every Semantic Manifest contains:

| Field | Purpose |
|-------|---------|
| `version` | The AXAG specification version |
| `generated_at` | Timestamp of manifest generation |
| `source` | Identifier for the source page or component |
| `operations` | Array of annotated operation definitions |

Each operation contains the full semantic contract: intent, entity, parameters, constraints, safety metadata, and execution semantics.

## Generation Approaches

Manifests can be generated through:

1. **Build-time extraction** — A build plugin scans annotated HTML/JSX and outputs manifest JSON
2. **Runtime extraction** — A client-side script reads `axag-*` attributes from the live DOM
3. **Static analysis** — A linter or analyzer processes source files without rendering

The recommended approach is **build-time extraction** for production deployments.

## Next Steps

- [First Generated Tool](/docs/getting-started/first-generated-tool) — Map the manifest to an MCP tool
- [Manifest Schema](/docs/semantic-manifest/manifest-schema) — Full manifest schema reference
