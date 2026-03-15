---
id: required-fields
title: Required Fields
sidebar_label: Required Fields
slug: /specification/required-fields
---

# Required Fields

At minimum (Basic Conformance), every AXAG-annotated element MUST include:

1. **`axag-intent`** — The semantic intent in `entity.verb` format (e.g., `product.search`, `order.create`)
2. **`axag-entity`** — The domain entity being operated on (e.g., `product`, `order`, `ticket`)
3. **`axag-action-type`** — The operation classification (`read`, `create`, `mutate`, `delete`, `navigate`)

At Intermediate Conformance, these additional fields are REQUIRED:

4. **`axag-required-parameters`** — JSON array of required parameter names
5. **`axag-scope`** — The operational boundary
6. **`axag-risk-level`** — The risk classification
7. **`axag-description`** — Human-readable operation description

Implementations that claim conformance at a given level MUST include all fields required at that level and all lower levels.
