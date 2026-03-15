---
id: runtime-consumption-patterns
title: Runtime Consumption Patterns
sidebar_label: Runtime Patterns
slug: /tool-generation/runtime-consumption-patterns
---
# Runtime Consumption Patterns

Agent runtimes consume MCP tool registries through standard patterns.

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
2. Check preconditions from `safety`
3. Request confirmation if `confirmation_required`
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
