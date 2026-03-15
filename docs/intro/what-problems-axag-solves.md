---
id: what-problems-axag-solves
title: What Problems AXAG Solves
sidebar_label: What Problems AXAG Solves
slug: /intro/what-problems-axag-solves
description: AXAG solves the semantic gap between human interfaces and AI agent interaction through explicit annotation contracts.
keywords: [problems, scraping, semantic gap, solutions]
---

# What Problems AXAG Solves

AXAG addresses a specific class of problems that arise when AI agents attempt to interact with systems designed exclusively for human users.

## Problem 1: Semantic Opacity

**Human interfaces express meaning visually. Agents need meaning expressed declaratively.**

AXAG annotations attach machine-readable intent, entity type, action classification, parameters, and constraints to every interactive element.

## Problem 2: Scraping Fragility

**Screen scraping is the current dominant approach for agent–UI interaction. It is inherently brittle.**

AXAG replaces scraping with stable semantic contracts that survive DOM changes, CSS rehashing, layout restructuring, and localization updates.

## Problem 3: Safety Blindness

**Agents cannot distinguish between low-risk reads and high-risk mutations without explicit declarations.**

AXAG classifies every operation by risk level, declares confirmation and approval requirements, and specifies preconditions that must be satisfied before execution.

## Problem 4: Discovery Failure

**Agents cannot browse navigation menus or scan page layouts to discover available operations.**

The AXAG Semantic Manifest exposes all available operations as structured, queryable metadata — eliminating the need for visual discovery.

## Problem 5: Parameter Ambiguity

**Form fields, dropdowns, and input controls do not declare their semantic role to agents.**

AXAG parameter annotations declare field type, validation rules, required status, format constraints, and relationships between fields.

## Problem 6: Cross-Product Inconsistency

**Every product requires a custom scraper or integration. There is no universal interaction contract.**

AXAG is domain-agnostic. The same annotation vocabulary works across e-commerce, CRM, marketing, analytics, travel, support, and any other product category.

## Problem 7: Governance Vacuum

**Organizations have no standard way to govern, validate, version, or audit agent interaction semantics.**

AXAG provides conformance levels, validation rules, CI integration, and a governance model for controlling how interfaces expose operations to agents.

## The Core Thesis

> If an interface exposes operations to AI agents, the semantics of those operations MUST be explicit, validated, and governed — not inferred from visual presentation.

This is the problem space AXAG occupies. It is not a UI framework, not an API specification, and not a metadata format. It is a **semantic interaction contract standard**.

## Next Steps

- [AXAG as a Semantic Contract](/docs/intro/axag-as-semantic-contract)
- [Who Should Use AXAG](/docs/intro/who-should-use-axag)
- [Core Concepts](/docs/concepts/agent-experience)
