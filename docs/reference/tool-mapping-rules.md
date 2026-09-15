---
id: tool-mapping-rules
title: Tool Mapping Rules Reference
sidebar_label: Tool Mapping Rules
slug: /reference/tool-mapping-rules
---

# Tool Mapping Rules Reference

Complete reference for mapping AXAG Semantic Manifest actions to MCP tool definitions.

## Mapping Table

| Manifest Field | MCP Tool Field | Transformation |
|---------------|---------------|----------------|
| `intent` | `name` | Replace `.` with `_` |
| `description` | `description` | Direct copy |
| `required_parameters[]` | `input_schema.properties` + `input_schema.required` | One property per parameter; names collected into `required` |
| `optional_parameters[]` | `input_schema.properties` | One property per parameter |
| `parameter.min` / `max` | `properties[x].minimum` / `maximum` | Renamed to JSON Schema keywords |
| `parameter.format` | `properties[x].format` | `url` → `uri`, `datetime` → `date-time`; others copied |
| `parameter.type`, `enum`, `minLength`, `maxLength`, `pattern`, `default`, `items`, `properties`, `description` | Same name | Direct copy |
| `action_type` | `metadata.action_type` | Direct copy |
| `risk_level` | `metadata.risk_level` | Direct copy, `none` when absent |
| `idempotent` | `metadata.idempotent` | Direct copy, `false` when absent |
| `confirmation_required` | `metadata.confirmation_required` | Direct copy, `false` when absent |
| `approval_required` | `metadata.approval_required` | Direct copy, `false` when absent |
| `approval_roles`, `async`, `scope`, `tenant_boundary`, `required_roles`, `side_effects`, `preconditions`, `postconditions` | `metadata.*` | Copied when present and non-empty |
| `intent`, `entity` | `metadata.source_intent`, `metadata.source_entity` | Direct copy |

## Tool Name Generation

```
name = intent.replaceAll(".", "_")
```

Examples:
- `product.search` → `product_search`
- `cart.add_item` → `cart_add_item`
- `checkout.begin` → `checkout_begin`

## Input Schema Generation

### Manifest parameters
```json
{
  "required_parameters": [{ "name": "query", "type": "string" }],
  "optional_parameters": [{ "name": "price_max", "type": "number", "min": 0 }]
}
```

### Generated JSON Schema
```json
{
  "type": "object",
  "properties": {
    "query": { "type": "string" },
    "price_max": { "type": "number", "minimum": 0 }
  },
  "required": ["query"]
}
```

## Metadata Generation

Safety and scope fields are grouped into `metadata` on the tool:

```json
{
  "metadata": {
    "action_type": "write",
    "risk_level": "high",
    "idempotent": false,
    "confirmation_required": true,
    "approval_required": false,
    "preconditions": ["cart_validated"],
    "side_effects": ["inventory_locked"],
    "source_intent": "checkout.begin",
    "source_entity": "order"
  }
}
```

## Nested Object Handling

`properties` on an `object` parameter is JSON Schema and is copied into the tool unchanged, including any nested `required` list:

### Manifest
```json
{
  "required_parameters": [
    {
      "name": "budget",
      "type": "object",
      "properties": {
        "amount": { "type": "number", "minimum": 0 },
        "currency": { "type": "string", "enum": ["USD", "EUR"] }
      }
    }
  ]
}
```

### Generated
```json
{
  "budget": {
    "type": "object",
    "properties": {
      "amount": { "type": "number", "minimum": 0 },
      "currency": { "type": "string", "enum": ["USD", "EUR"] }
    }
  }
}
```

## Array Handling

`items` on an `array` parameter is copied the same way:

### Manifest
```json
{ "optional_parameters": [{ "name": "tags", "type": "array", "items": { "type": "string" } }] }
```

### Generated
```json
{ "tags": { "type": "array", "items": { "type": "string" } } }
```

## Registry

`generateToolRegistry` wraps the tools with `schema_version`, `generated_at` and `source_manifest`. See [Tool Registry Generation](/docs/tool-generation/tool-registry-generation).
