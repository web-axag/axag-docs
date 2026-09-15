---
id: mapping-rules
title: Tool Generation Mapping Rules
sidebar_label: Mapping Rules
slug: /tool-generation/mapping-rules
description: Rules for mapping Semantic Manifest operations to MCP tool definitions.
keywords: [MCP, tool generation, mapping]
---

# Mapping Rules

This section defines the rules for transforming Semantic Manifest operations into MCP-compatible tool definitions.

## Core Mapping

| Manifest Field | MCP Tool Field | Transformation |
|---------------|---------------|----------------|
| `intent` | `name` | `.` → `_` |
| `description` | `description` | Direct mapping |
| `required_parameters`, `optional_parameters` | `input_schema.properties` | Transform to JSON Schema |
| `required_parameters[].name` | `input_schema.required` | Collect names |
| `action_type` | `metadata.action_type` | Direct mapping |
| `risk_level` | `metadata.risk_level` | Direct mapping |
| `confirmation_required` | `metadata.confirmation_required` | Direct mapping |
| `idempotent` | `metadata.idempotent` | Direct mapping |

The full table, including scope, roles and conditions, is in the [Tool Mapping Rules Reference](/docs/reference/tool-mapping-rules).

## Parameter Transformation

Manifest parameters transform to JSON Schema properties:

**Manifest parameter:**
```json title="Manifest parameter definition"
{ "required_parameters": [{ "name": "cart_id", "type": "string", "description": "The cart identifier" }] }
```

**Generated JSON Schema property:**
```json title="Generated JSON Schema"
{ "cart_id": { "type": "string", "description": "The cart identifier" } }
```

> `"cart_id"` is added to the `"required"` array of the generated `input_schema` because it is a required parameter.

## Tool Name Generation

Tool names are derived from the `intent` field by replacing `.` with `_`:
- `product.search` → `product_search`
- `checkout.begin` → `checkout_begin`

## Complete Example

**Manifest Operation:**
```json title="Semantic Manifest — product.search" showLineNumbers
{
  "intent": "product.search",
  "entity": "product",
  "action_type": "read",
  "operation_id": "product_search",
  "description": "Search the product catalog",
  "required_parameters": [{ "name": "query", "type": "string", "description": "Search query" }],
  "optional_parameters": [
    { "name": "category", "type": "string", "description": "Category filter" }
  ],
  "risk_level": "none",
  "idempotent": true,
  "scope": "public"
}
```

**Generated MCP Tool:**
```json title="Generated MCP tool — product_search" showLineNumbers
{
  "name": "product_search",
  "description": "Search the product catalog",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Search query" },
      "category": { "type": "string", "description": "Category filter" }
    },
    "required": ["query"]
  },
  "metadata": {
    "action_type": "read",
    "risk_level": "none",
    "idempotent": true,
    "confirmation_required": false,
    "approval_required": false,
    "source_intent": "product.search",
    "source_entity": "product"
  }
}
```

## Next Steps

- [Tool Signatures](/docs/tool-generation/tool-signatures)
- [Generated Examples](/docs/tool-generation/generated-examples)
