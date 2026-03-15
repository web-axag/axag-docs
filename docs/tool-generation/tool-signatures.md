---
id: tool-signatures
title: Tool Signatures
sidebar_label: Tool Signatures
slug: /tool-generation/tool-signatures
---
# Tool Signatures

Each MCP tool has a signature consisting of: name, description, input schema, and safety metadata.

## Signature Components

```json title="MCP tool signature — product_search" showLineNumbers
{
  "tool_name": "product_search",
  "description": "Search the product catalogue",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Search query" }
    },
    "required": ["query"]
  },
  "safety": {
    "execution_type": "read",
    "risk_level": "none",
    "idempotent": true,
    "confirmation_required": false,
    "approval_required": false
  }
}
```

## Naming Conventions
- Tool names MUST be unique within a tool registry
- Tool names SHOULD use snake_case
- Tool names SHOULD be verb_noun or noun_verb format
