---
id: manifest-schema
title: Manifest Schema
sidebar_label: Manifest Schema
slug: /semantic-manifest/manifest-schema
---
# Manifest Schema

The Semantic Manifest follows a structured JSON schema.

## Top-Level Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | `string` | Yes | AXAG specification version |
| `conformance_level` | `enum` | Yes | `basic`, `intermediate`, `full` |
| `generated_at` | `datetime` | Yes | ISO 8601 timestamp |
| `source` | `string` | Yes | Application or component identifier |
| `pages` | `Page[]` | Yes | Array of page definitions |

## Page Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `page_id` | `string` | Yes | Unique page identifier |
| `url_pattern` | `string` | No | URL pattern for the page |
| `operations` | `Operation[]` | Yes | Array of operation definitions |

## Operation Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `intent` | `string` | Yes | Semantic intent |
| `entity` | `string` | Yes | Domain entity |
| `operation_id` | `string` | Yes | Unique operation identifier |
| `description` | `string` | Yes | Human-readable description |
| `action_type` | `enum` | Yes | `read`, `create`, `mutate`, `delete`, `navigate` |
| `parameters` | `object` | Yes | Parameter definitions |
| `scope` | `string` | Intermediate+ | Operational boundary |
| `risk_level` | `enum` | Intermediate+ | Risk classification |
| `idempotent` | `boolean` | Full | Retry safety |
| `preconditions` | `string[]` | Full | Required state |
| `postconditions` | `string[]` | Full | Guaranteed state |
| `confirmation_required` | `boolean` | Full | Confirmation gate |
| `approval_required` | `boolean` | Full | Approval gate |
| `side_effects` | `string[]` | Full | Observable changes |
