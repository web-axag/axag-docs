---
id: generate-mcp-tools
title: "Tutorial: Generate MCP Tools"
sidebar_label: Generate MCP Tools
slug: /tutorials/generate-mcp-tools
---

# Tutorial: Generate MCP Tools

This tutorial shows how to generate Model Context Protocol (MCP) tool definitions from an AXAG Semantic Manifest.

## Prerequisites
- A valid `axag-manifest.json` (see [Generate Semantic Manifest](/docs/tutorials/generate-semantic-manifest))
- Node.js 18+

## Step 1: Generate Tool Definitions

```bash title="Generate MCP tools from manifest"
npx axag generate-tools --manifest axag-manifest.json --output tools/
```

This produces individual tool files:

```bash title="Generated tool files"
tools/
├── product_search.json
├── cart_add_item.json
├── cart_begin_checkout.json
├── account_delete.json
└── index.json          # Registry of all tools
```

## Step 2: Review a Generated Tool

```json title="tools/product_search.json" showLineNumbers
{
  "tool_name": "product_search",
  "description": "Search the product catalog",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": { "type": "string" },
      "category": { "type": "string" },
      "price_min": { "type": "number", "minimum": 0 },
      "price_max": { "type": "number", "minimum": 0 }
    },
    "required": ["query"]
  },
  "safety": {
    "execution_type": "read",
    "risk_level": "none",
    "idempotent": true
  }
}
```

## Step 3: Register Tools with MCP Server

```typescript title="server.ts" showLineNumbers
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import toolRegistry from "./tools/index.json";

const server = new Server({
  name: "my-axag-server",
  version: "1.0.0",
});

// Register all generated tools
for (const tool of toolRegistry.tools) {
  server.addTool({
    name: tool.tool_name,
    description: tool.description,
    inputSchema: tool.input_schema,
    handler: async (params) => {
      // Route to your API based on tool_name
      return await apiRouter.handle(tool.tool_name, params);
    },
  });
}
```

## Step 4: Test with an Agent

```typescript title="agent-client.ts"
// Agent discovers and uses the tool
const tools = await mcpClient.listTools();
const searchTool = tools.find(t => t.name === "product_search");

const result = await mcpClient.callTool("product_search", {
  query: "wireless headphones",
  price_max: 100,
});

console.log(result); // Structured product data
```

## Step 5: Safety-Aware Execution

For tools with safety metadata, implement gates:

```typescript title="safe-execution.ts" showLineNumbers
async function safeToolCall(toolName, params) {
  const tool = toolRegistry.tools.find(t => t.tool_name === toolName);

  // Check confirmation requirement
  if (tool.safety.confirmation_required) {
    const confirmed = await promptUser(
      `This action requires confirmation: ${tool.description}. Proceed?`
    );
    if (!confirmed) return { error: "User declined confirmation" };
  }

  // Check approval requirement
  if (tool.safety.approval_required) {
    const approval = await requestApproval(tool.safety.approval_roles);
    if (!approval) return { error: "Approval not granted" };
  }

  return await mcpClient.callTool(toolName, params);
}
```

## Next Steps
- [Add Validation to CI](/docs/tutorials/add-validation-to-ci)
- Review the [Tool Mapping Rules Reference](/docs/reference/tool-mapping-rules)
