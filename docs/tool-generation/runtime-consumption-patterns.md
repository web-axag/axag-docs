---
id: runtime-consumption-patterns
title: Runtime Consumption Patterns
sidebar_label: Runtime Patterns
slug: /tool-generation/runtime-consumption-patterns
---
# Runtime Consumption Patterns

Agent runtimes consume MCP tool registries through standard patterns.

## Registration Lifecycle

A page's tools are not a fixed list. What an agent may invoke depends on the route, the user's role and what is on screen, so registration is scoped to the UI that owns each action:

1. Register with an `AbortSignal` belonging to the component, route or dialog
2. Abort it when that UI goes away — WebMCP has no `unregisterTool`
3. Unregister an action whose control becomes disabled, hidden, inert or detached
4. Register it again when the control becomes operable

See [Agent Runtime](/docs/frameworks/runtime) for the implementation, and [Visibility vs Operability](/docs/concepts/visibility-vs-operability) for why this matters: a tool that outlives its control promises something the UI is refusing.

## Discovery Pattern
1. Fetch tool registry from known endpoint
2. Index tools by name, entity, and action type
3. Cache registry with TTL based on `generated_at` timestamp

## Selection Pattern
1. Parse user intent
2. Match against available tool descriptions
3. Rank by relevance
4. Select best matching tool

## Invocation Pattern
1. Validate parameters against `input_schema`
2. Check preconditions from `metadata`
3. Request confirmation if `confirmation_required` — enforced on the server as well, since an agent in the page can bypass client checks
4. Submit approval if `approval_required`
5. Execute tool
6. Validate postconditions
7. Return results

## Error Handling Pattern
1. Parameter validation failure → report missing/invalid parameters
2. Precondition failure → report unmet preconditions
3. Confirmation rejected → abort
4. Rate limited → retry with backoff
5. Execution failure → report error with code
