---
id: input-schema-translation
title: Input Schema Translation
sidebar_label: Input Schema
slug: /tool-generation/input-schema-translation
---
# Input Schema Translation

Manifest parameters translate to JSON Schema within the MCP tool's `input_schema`.

## Type Mapping

| AXAG Parameter Type | JSON Schema Type |
|--------------------|-----------------|
| `string` | `"type": "string"` |
| `number` | `"type": "number"` |
| `boolean` | `"type": "boolean"` |
| `date` | `"type": "string", "format": "date"` |
| `datetime` | `"type": "string", "format": "date-time"` |
| `enum` | `"type": "string", "enum": [...]` |
| `array` | `"type": "array", "items": {...}` |
| `object` | `"type": "object", "properties": {...}` |

## Constraint Translation

| AXAG Constraint | JSON Schema |
|----------------|-------------|
| `min` | `"minimum"` |
| `max` | `"maximum"` |
| `min_length` | `"minLength"` |
| `max_length` | `"maxLength"` |
| `pattern` | `"pattern"` |
| `format` | `"format"` |
| `enum` | `"enum"` |
