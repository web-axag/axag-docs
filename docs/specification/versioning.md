---
id: versioning
title: Specification Versioning
sidebar_label: Versioning
slug: /specification/versioning
---
# Specification Versioning

The AXAG specification follows semantic versioning: `MAJOR.MINOR.PATCH`.

## Version Rules
- **MAJOR** — Breaking changes to normative requirements
- **MINOR** — New optional fields or conformance requirements
- **PATCH** — Clarifications, typo fixes, informative content updates

## Annotation Versioning
Annotations MAY declare the specification version they conform to:
```html
<button axag-version="1.0.0" axag-intent="product.search" ...>Search</button>
```

## Backward Compatibility
- MINOR versions MUST be backward-compatible with the same MAJOR version
- Deprecated attributes MUST remain valid for at least one MINOR version after deprecation
- Deprecation MUST be declared via `axag-deprecated="true"` and `axag-deprecated-replacement`
