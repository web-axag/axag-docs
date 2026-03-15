---
id: agent-experience
title: "Core Concept: Agent Experience"
sidebar_label: Agent Experience
slug: /concepts/agent-experience
description: Agent Experience as a design discipline for treating AI agents as first-class interface consumers.
keywords: [agent experience, AX, core concept]
---

# Agent Experience

Agent Experience (AX) is the design discipline that ensures AI agents can discover, understand, and execute interface operations reliably. It is the agent-facing counterpart to User Experience (UX).

## Why a Separate Discipline?

Human users and AI agents consume interfaces through fundamentally different modalities:

| Dimension | Human User | AI Agent |
|-----------|-----------|----------|
| **Perception** | Visual (eyes scan layout) | Structural (reads metadata) |
| **Understanding** | Contextual (infers from surroundings) | Declarative (reads explicit contracts) |
| **Interaction** | Physical (click, type, drag) | Programmatic (invoke operations) |
| **Error recovery** | Intuitive (reads error messages) | Structured (parses error codes) |
| **Trust** | Experiential (learns through use) | Contractual (relies on declared guarantees) |

Designing for both modalities requires explicit attention to agent needs — just as accessibility requires explicit attention to the needs of users with disabilities.

## AX Design Principles

### 1. Declarative Over Inferential
Agents should read explicit declarations, not infer meaning from visual presentation.

### 2. Structured Over Unstructured
Operations should be defined with typed parameters, not loose text descriptions.

### 3. Safe By Default
Destructive operations should require explicit opt-in, not implicit trust.

### 4. Discoverable Over Hidden
Available operations should be cataloged in manifests, not hidden in navigation hierarchies.

### 5. Versioned Over Volatile
Semantic contracts should be versioned and governed, not changed without notice.

## Next Steps

- [Semantic Contract](/docs/concepts/semantic-contract)
- [Intent vs Presentation](/docs/concepts/intent-vs-presentation)
