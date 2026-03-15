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
| `operation_id` | `tool_name` | Direct copy (snake_case) |
| `description` | `description` | Direct copy |
| `parameters` | `input_schema.properties` | Convert to JSON Schema properties |
| `parameters[x].required=true` | `input_schema.required` | Collect into required array |
| `parameters[x].type` | `input_schema.properties[x].type` | Direct copy |
| `parameters[x].enum` | `input_schema.properties[x].enum` | Direct copy |
| `parameters[x].minimum` | `input_schema.properties[x].minimum` | Direct copy |
| `parameters[x].maximum` | `input_schema.properties[x].maximum` | Direct copy |
| `parameters[x].format` | `input_schema.properties[x].format` | Direct copy |
| `parameters[x].default` | `input_schema.properties[x].default` | Direct copy |
| `risk_level` | `safety.risk_level` | Direct copy |
| `idempotent` | `safety.idempotent` | Direct copy |
| `confirmation_required` | `safety.confirmation_required` | Direct copy |
| `approval_required` | `safety.approval_required` | Direct copy |
| `preconditions` | `safety.preconditions` | Direct copy |
| `side_effects` | `safety.side_effects` | Direct copy |

## Tool Name Generation

```
tool_name = operation_id || (entity + "_" + action)
```

Examples:
- `product.search` → `product_search`
- `cart.add_item` → `cart_add_item`
- `billing.change_plan` → `billing_change_plan`

## Input Schema Generation

Parameters are converted from AXAG format to JSON Schema:

### AXAG Parameter Definition
```json
{
  "query": { "type": "string", "required": true },
  "price_max": { "type": "number", "required": false, "minimum": 0 }
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

Note: `required` is moved from individual parameters to the schema-level `required` array.

## Safety Metadata Generation

All safety-related manifest fields are grouped into a `safety` object on the tool:

```json
{
  "safety": {
    "execution_type": "write",
    "risk_level": "high",
    "idempotent": false,
    "confirmation_required": true,
    "approval_required": false,
    "preconditions": ["order must be within return window"],
    "side_effects": ["refund_processing", "inventory_update"]
  }
}
```

## Nested Object Handling

When a parameter has `type: "object"`, its `properties` are recursively converted:

### AXAG
```json
{
  "budget": {
    "type": "object",
    "required": true,
    "properties": {
      "amount": { "type": "number", "minimum": 0 },
      "currency": { "type": "string", "enum": ["USD","EUR"] }
    }
  }
}
```

### Generated
```json
{
  "budget": {
    "type": "object",
    "properties": {
      "amount": { "type": "number", "minimum": 0 },
      "currency": { "type": "string", "enum": ["USD","EUR"] }
    },
    "required": ["amount", "currency"]
  }
}
```

## Array Handling

When a parameter has `type: "array"`, the `items` schema is included:

### AXAG
```json
{
  "tags": {
    "type": "array",
    "required": false,
    "items": { "type": "string" }
  }
}
```

### Generated
```json
{
  "tags": {
    "type": "array",
    "items": { "type": "string" }
  }
}
```
