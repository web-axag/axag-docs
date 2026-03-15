---
id: missing-intent-detection
title: Missing Intent Detection
sidebar_label: Missing Intent Detection
slug: /validation/missing-intent-detection
---

# Missing Intent Detection

Missing intent detection identifies interactive UI elements that lack AXAG annotations — elements an agent cannot interpret semantically.

## Why It Matters

Every unannotated interactive element is a gap in the semantic contract. When an agent encounters a button, link, or form without `axag-intent`, it must fall back to:

- DOM scraping (brittle)
- Label inference (ambiguous)
- Visual layout parsing (fragile)

These are exactly the failure modes AXAG is designed to eliminate.

## What Counts as "Missing Intent"

An element has a missing intent if it:

1. Is an interactive HTML element (`<button>`, `<a>`, `<input type="submit">`, `<form>`)
2. Has a click handler, form action, or navigation target
3. Does **not** have an `axag-intent` attribute

### Elements That MUST Be Annotated

| Element | Condition | Required |
|---------|-----------|----------|
| `<button>` | Always | Yes |
| `<a>` with `href` | When performing an action (not just navigation) | Recommended |
| `<input type="submit">` | Always | Yes |
| `<form>` submit buttons | Always | Yes |
| Elements with `onclick` | Always | Yes |
| Elements with `role="button"` | Always | Yes |

### Elements That MAY Be Skipped

- Pure navigational links (`<a href="/about">`)
- Decorative elements
- Elements inside annotated parents (if context inheritance applies)

## Detection Rules

### AXAG-LINT-001: Missing Intent

```
Rule: AXAG-LINT-001
Severity: Error
Message: Interactive element missing axag-intent attribute
Fix: Add axag-intent with the semantic operation identifier
```

**Failing example:**
```html title="❌ No intent declared"
<!-- ❌ No intent declared -->
<button onclick="submitOrder()">Place Order</button>
```

**Passing example:**
```html title="✅ Intent declared"
<!-- ✅ Intent declared -->
<button
  onclick="submitOrder()"
  axag-intent="order.place"
  axag-entity="order"
  axag-action-type="write"
>Place Order</button>
```

### AXAG-LINT-001a: Missing Entity

```
Rule: AXAG-LINT-001a
Severity: Error
Message: Element has axag-intent but missing axag-entity
Fix: Add axag-entity with the domain object name
```

### AXAG-LINT-001b: Missing Action Type

```
Rule: AXAG-LINT-001b
Severity: Error
Message: Element has axag-intent but missing axag-action-type
Fix: Add axag-action-type with read, write, delete, or navigate
```

## Coverage Metrics

Track annotation coverage as a quality metric:

```
Annotation Coverage = (annotated interactive elements / total interactive elements) × 100
```

| Coverage Level | Percentage | Assessment |
|---------------|-----------|------------|
| None | 0% | No semantic contract |
| Minimal | 1–25% | Early adoption |
| Partial | 26–50% | In progress |
| Substantial | 51–75% | Good coverage |
| Comprehensive | 76–99% | Production-ready |
| Complete | 100% | Full semantic contract |

## Scanning Approach

A missing-intent scanner should:

1. Parse the HTML/JSX/TSX file
2. Identify all interactive elements
3. Check each for `axag-intent`
4. Report unannotated elements with file path and line number
5. Exclude elements marked with `axag-skip="true"` (opt-out)

### Opt-Out Mechanism

For elements that intentionally lack annotations (e.g., purely decorative interactions):

```html
<!-- Explicitly excluded from annotation requirements -->
<button axag-skip="true" onclick="toggleTheme()">🌙</button>
```

## CI Integration

```yaml
- name: Check for missing intents
  run: npx axag-lint --rules missing-intent --threshold 80 --format=github
```

The `--threshold` flag sets the minimum annotation coverage percentage. The build fails if coverage drops below this threshold.

## Next Steps

- [Unsafe Mutation Exposure Detection](/docs/validation/unsafe-mutation-detection)
- [Scope Mismatch Detection](/docs/validation/scope-mismatch-detection)
- [Remediation Guidance](/docs/validation/remediation-guidance)
