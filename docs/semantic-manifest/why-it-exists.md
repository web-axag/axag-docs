---
id: why-it-exists
title: Why the Semantic Manifest Exists
sidebar_label: Why It Exists
slug: /semantic-manifest/why-it-exists
---
# Why the Semantic Manifest Exists

The manifest exists because AXAG annotations are scattered across HTML elements throughout an application. Agents need a single, queryable document to discover all available operations.

## Problems Without a Manifest
1. Agents would need to parse every page's DOM to find annotations
2. No consolidated view of available operations
3. No validation checkpoint between annotations and tool generation
4. No versioned artifact for change tracking

## The Manifest as Bridge
```
Annotations (scattered) → Manifest (consolidated) → Tools (consumable)
```

The manifest consolidates, normalizes, and structures all annotation data into a single document that agent runtimes and toolchains can consume efficiently.
