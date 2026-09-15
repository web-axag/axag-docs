---
id: manifest-schema
title: Manifest Schema
sidebar_label: Manifest Schema
slug: /semantic-manifest/manifest-schema
---
# Manifest Schema

The Semantic Manifest is validated by a JSON Schema published at [`/schema/v1.1/axag-manifest.schema.json`](pathname:///schema/v1.1/axag-manifest.schema.json). The [v1 schema](pathname:///schema/v1/axag-manifest.schema.json) stays published for existing manifests; v1.1 only adds values and remains backward compatible.

## Top-Level Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | `string` (semver) | Yes | AXAG specification version |
| `generated_at` | `date-time` | Yes | ISO 8601 timestamp |
| `source` | `Source` | Yes | Where the annotations were read from |
| `conformance` | `enum` | Yes | `basic`, `intermediate`, `full` |
| `actions` | `Action[]` | Yes | Operation definitions |

## Source Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | `uri` | No | Application URL |
| `paths` | `string[]` | No | Source paths scanned |
| `tool` | `string` | No | Generator name |
| `tool_version` | `string` | No | Generator version |

## Action Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `intent` | `string` | Yes | Semantic intent, `entity.verb` (`^[a-z_]+\.[a-z_]+$`) |
| `entity` | `string` | Yes | Domain entity (`^[a-z_]+$`) |
| `action_type` | `enum` | Yes | `read`, `write`, `delete`, `navigate` |
| `description` | `string` | Yes | Human-readable description |
| `operation_id` | `string` | No | Unique operation identifier |
| `required_parameters` | `Parameter[]` | No | Parameters that must be provided |
| `optional_parameters` | `Parameter[]` | No | Parameters that may be provided |
| `risk_level` | `enum` | No | `none`, `low`, `medium`, `high`, `critical` |
| `confirmation_required` | `boolean` | No | Human confirmation gate |
| `approval_required` | `boolean` | No | Role-based approval gate |
| `approval_roles` | `string[]` | No | Roles that can approve |
| `idempotent` | `boolean` | No | Retry safety |
| `scope` | `enum` | No | `public`, `user`, `tenant`, `global` (`public` added in 1.1) |
| `side_effects` | `string[]` | No | Observable changes |
| `preconditions` | `string[]` | No | Required state |
| `postconditions` | `string[]` | No | Guaranteed state |
| `element_selector` | `string` | No | CSS selector of the source element |
| `source_file` | `string` | No | File the annotation lives in |
| `source_line` | `integer` | No | Line in that file (1-based) |

## Parameter Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Parameter name |
| `type` | `enum` | Yes | `string`, `number`, `boolean`, `array`, `object` |
| `description` | `string` | No | Human-readable description |
| `enum` | `array` | No | Allowed values |
| `min` / `max` | `number` | No | Numeric bounds |
| `maxLength` | `integer` | No | Maximum string length |
| `format` | `enum` | No | `email`, `url`, `date`, `datetime`, `uuid` |
| `default` | any | No | Value used when omitted |

Which optional fields a manifest fills in determines its [conformance level](/docs/specification/conformance-levels).
