---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ
slug: /faq
---

# Frequently Asked Questions

## General

### What does AXAG stand for?

**Agent Context Annotation Guidelines.** AXAG is a semantic annotation standard that makes web UIs machine-readable so AI agents can operate them without scraping.

### How is AXAG different from WCAG?

WCAG makes UIs accessible to *humans* with disabilities. AXAG makes UIs accessible to *AI agents*. WCAG uses ARIA roles and labels; AXAG uses semantic annotations like `axag-intent`, `axag-entity`, and `axag-action-type`. They are complementary — a page can (and should) have both.

### Do I need to change my existing UI framework?

No. AXAG annotations are HTML data attributes that layer on top of any framework — React, Angular, Vue, Svelte, plain HTML. No structural changes needed.

### Is AXAG an official W3C standard?

Not yet. AXAG is a proposed community standard currently at **v1.0.0**. The goal is to evolve it through community adoption and eventually pursue formal standardisation.

---

## Annotations

### What is the minimum viable annotation?

Every annotated element needs at least:
- `axag-intent` — the semantic intent (e.g., `product.search`)
- `axag-entity` — the domain entity (e.g., `product`)
- `axag-action-type` — the operation type (`read`, `write`, or `delete`)

### How do I annotate a multi-step workflow?

Use a separate annotation on each step's submit/action element. Include `axag-preconditions` to encode step ordering (e.g., `"previous step completed"`). See [Multi-Step Workflows](/docs/authoring-guide/annotating-multi-step-workflows).

### Can I annotate dynamically rendered components?

Yes. Annotations are HTML attributes, so they work on dynamically rendered DOM just as well. For React, you can spread AXAG attributes onto elements or wrap them in a reusable component. See [Annotation Reuse](/docs/authoring-guide/annotation-reuse).

### What if an action has no clear entity?

Every action operates on *something*. If it seems entity-less, you may be looking at a composite flow. Break it down. For utility operations (e.g., "export current view"), the entity is the thing being exported (e.g., `report`, `dataset`).

---

## Semantic Manifest

### What is the relationship between annotations and the manifest?

Annotations live *in the HTML*. A semantic manifest is a JSON document *generated from* annotations that describes all available intents, entities, parameters, and constraints for a page or application. Agents consume the manifest, not the raw HTML.

### Where should I host my manifest?

Recommended discovery methods (in priority order):
1. **Well-known URL:** `/.well-known/axag-manifest.json`
2. **HTTP header:** `X-AXAG-Manifest: <url>`
3. **HTML meta tag:** `<meta name="axag-manifest" content="<url>">`

### Can I have multiple manifests?

Yes. Large applications may publish one manifest per section or per page. Agents can discover the relevant manifest through the above discovery mechanisms.

---

## Tool Generation

### How are MCP tools generated from the manifest?

Each intent in the manifest maps to one MCP tool:
- `intent` → tool `name` (dots replaced with underscores)
- `parameters` → `inputSchema`
- `constraints` → JSON Schema validations (`enum`, `minimum`, `maximum`, etc.)
- `risk_level`, `confirmation_required` → tool metadata

See [Mapping Rules](/docs/tool-generation/mapping-rules).

### Do generated tools handle authentication?

Tools include `axag-required-roles` and `axag-scope` metadata so the MCP runtime can enforce authorization. Actual credential handling is the responsibility of the MCP server and the agent framework.

### Can I customize generated tool names?

The default mapping is `entity_action` (e.g., `product_search`). You can override this in your tool generation pipeline configuration, but the default naming convention is strongly recommended for consistency.

---

## Validation

### What validation tools are available?

- **Static validation:** JSON Schema validation of annotation attributes
- **CI linting:** `npx axag-lint` with rules like `AXAG-LINT-001` (missing intent)
- **Runtime validation:** Parameter validation at agent invocation time

See the [Validation](/docs/validation/static-validation) section.

### How do I add AXAG validation to CI?

Add `npx axag-lint --format=github` to your CI pipeline. It checks all HTML/JSX/TSX files for annotation completeness and schema conformance. See [Add Validation to CI](/docs/tutorials/add-validation-to-ci).

---

## Safety & Risk

### How does risk classification work?

Four levels:
| Level | Meaning | Agent behaviour |
|-------|---------|-----------------|
| `none` | No risk (reads) | Execute freely |
| `low` | Low risk (simple writes) | Execute with logging |
| `medium` | Moderate risk (state changes) | Require confirmation |
| `high` | High risk (payments, deletions) | Require confirmation + review |
| `critical` | Critical (irreversible) | Require multi-party approval |

### What happens if an agent ignores safety metadata?

The safety metadata is advisory. Well-behaved agent frameworks (e.g., MCP-compliant servers) will enforce it. Non-compliant agents may ignore it, which is why AXAG also recommends server-side enforcement of preconditions.

---

## Governance

### Who owns the AXAG standard?

Currently maintained by the community. The governance model follows an open RFC process. See [Ownership Model](/docs/governance/ownership-model).

### How do I propose a change?

1. Open an issue describing the change
2. Create an RFC document following the template
3. Submit a PR and go through the review process

See [Change Review Workflow](/docs/governance/change-review-workflow).

### How is backward compatibility maintained?

AXAG follows semantic versioning. New attributes are additive (non-breaking). Removed or renamed attributes go through a deprecation cycle with at least one minor version of deprecation warnings. See [Backward Compatibility](/docs/governance/backward-compatibility).

---

## Contributing

### How can I contribute?

- Add new use-case domain examples
- Improve documentation
- Write tutorials
- Report issues and propose RFCs
- Build tooling (linters, generators, IDE plugins)

See the [Contributor Guide](/docs/contributors/guide).

### What style conventions should I follow?

See the [Style Guide](/docs/contributors/style-guide) for terminology, formatting, and annotation conventions.
