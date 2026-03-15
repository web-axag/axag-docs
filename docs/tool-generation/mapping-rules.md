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
| `operation_id` | `tool_name` | Direct mapping |
| `description` | `description` | Direct mapping |
| `parameters` | `input_schema.properties` | Transform to JSON Schema |
| Required parameter names | `input_schema.required` | Extract required field names |
| `action_type` | `safety.execution_type` | Direct mapping |
| `risk_level` | `safety.risk_level` | Direct mapping |
| `confirmation_required` | `safety.confirmation_required` | Direct mapping |
| `idempotent` | `safety.idempotent` | Direct mapping |

## Parameter Transformation

Manifest parameters transform to JSON Schema properties:

**Manifest parameter:**
```json title="Manifest parameter definition"
{
  "cart_id": {
    "type": "string",
    "required": true,
    "description": "The cart identifier"
  }
}
```

**Generated JSON Schema property:**
```json title="Generated JSON Schema"
{
  "cart_id": {
    "type": "string",
    "description": "The cart identifier"
  }
}
```

> `"cart_id"` is added to the `"required"` array in the generated `inputSchema`.

## Tool Name Generation

Tool names are derived from the `intent` field:
- Replace `.` with `_`
- Convert to snake_case
- Example: `checkout.begin` → `begin_checkout` (verb-first for action clarity)

## Complete Example

**Manifest Operation:**
```json title="Semantic Manifest — product.search" showLineNumbers
{
  "intent": "product.search",
  "entity": "product",
  "operation_id": "product_search",
  "description": "Search the product catalog",
  "action_type": "read",
  "parameters": {
    "query": { "type": "string", "required": true, "description": "Search query" },
    "category": { "type": "string", "required": false, "description": "Category filter" }
  },
  "scope": "catalog",
  "risk_level": "none",
  "idempotent": true
}
```

**Generated MCP Tool:**
```json title="Generated MCP tool — product_search" showLineNumbers
{
  "tool_name": "product_search",
  "description": "Search the product catalog",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Search query" },
      "category": { "type": "string", "description": "Category filter" }
    },
    "required": ["query"]
  },
  "safety": {
    "execution_type": "read",
    "risk_level": "none",
    "idempotent": true,
    "confirmation_required": false
  }
}
```

## Next Steps

- [Tool Signatures](/docs/tool-generation/tool-signatures)
- [Generated Examples](/docs/tool-generation/generated-examples)
