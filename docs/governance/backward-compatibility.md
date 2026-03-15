---
id: backward-compatibility
title: Backward Compatibility
sidebar_label: Backward Compatibility
slug: /governance/backward-compatibility
---

# Backward Compatibility

AXAG takes backward compatibility seriously. Agents consuming AXAG manifests must be able to rely on stable contracts. This page defines what constitutes a breaking change and how backward compatibility is maintained.

## What Is a Breaking Change

A change is **breaking** if it causes existing, conformant consumers to fail:

| Change | Breaking? | Reason |
|--------|-----------|--------|
| Add optional field to manifest | No | Consumers ignore unknown fields |
| Add new enum value | No | Consumers should handle unknown values gracefully |
| Remove a required field | **Yes** | Consumers depend on it |
| Rename a field | **Yes** | Consumers reference old name |
| Change field type | **Yes** | Consumers parse with old type |
| Remove an enum value | **Yes** | Consumers may send removed value |
| Change `axag-intent` format | **Yes** | All intent parsing breaks |
| Add new required field | **Yes** | Existing manifests become invalid |
| Change risk level semantics | **Yes** | Safety behavior changes |

## Non-Breaking Changes

These changes are always safe:
- Adding new optional `axag-*` attributes
- Adding new optional fields to manifest actions
- Adding new lint rules as warnings (not errors)
- Adding new conformance level criteria
- Adding new entity types
- Adding new use case documentation

## Compatibility Matrix

| Consumer Version | Manifest 0.1.x | Manifest 0.2.x | Manifest 1.0.x |
|-----------------|----------------|----------------|----------------|
| Agent v0.1.x | ✅ Full | ⚠️ Partial | ❌ Incompatible |
| Agent v0.2.x | ✅ Full | ✅ Full | ❌ Incompatible |
| Agent v1.0.x | ✅ Full | ✅ Full | ✅ Full |

## Robustness Principle

Agents consuming AXAG manifests SHOULD follow Postel's Law:

> Be conservative in what you send, be liberal in what you accept.

- **Producers** (annotation authors): Follow the spec strictly
- **Consumers** (agents): Handle unknown fields gracefully, don't fail on extra data
