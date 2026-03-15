---
id: manifest-validation
title: Manifest Validation
sidebar_label: Manifest Validation
slug: /semantic-manifest/manifest-validation
---
# Manifest Validation

Manifests MUST be validated before consumption by agent runtimes.

## Validation Checks

1. **Schema conformance** — Manifest matches the expected JSON schema
2. **Required field presence** — All required fields for the declared conformance level are present
3. **Value validity** — Enum values are from the allowed set
4. **Parameter consistency** — Required parameters have definitions
5. **Safety consistency** — High/critical risk operations have confirmation requirements
6. **Drift detection** — Manifest matches current annotation source (when possible)

## Validation in CI

```yaml
# Example CI step
- name: Validate AXAG Manifest
  run: npx axag-cli validate --manifest ./public/axag-manifest.json --level intermediate
```

## Common Validation Failures

| Failure | Cause | Fix |
|---------|-------|-----|
| Missing required fields | Annotations incomplete | Add missing `axag-*` attributes |
| Invalid enum value | Typo in action type or risk level | Use values from canonical vocabulary |
| Parameter mismatch | Manifest lists parameters not in annotations | Regenerate manifest from source |
| Safety violation | High-risk mutation without confirmation | Add `axag-confirmation-required="true"` |
