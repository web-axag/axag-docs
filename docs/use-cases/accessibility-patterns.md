---
id: accessibility-patterns
title: Accessibility-Aligned Interaction Patterns
sidebar_label: Accessibility Patterns
slug: /use-cases/accessibility-patterns
---

# Accessibility-Aligned Interaction Patterns

AXAG and WCAG are complementary standards. WCAG makes interfaces accessible to humans with disabilities. AXAG makes interfaces accessible to AI agents. This page explains how they work together and demonstrates patterns that satisfy both.

## Problem Statement

Modern web applications must serve three audiences simultaneously:
1. **Sighted users** — who interact through visual UI
2. **Users with disabilities** — who rely on assistive technology (screen readers, keyboard navigation)
3. **AI agents** — who need machine-readable semantic contracts

Most teams treat these as separate concerns. This leads to:
- ARIA labels that describe visual appearance, not semantic intent
- Agent integrations built on fragile DOM scraping
- Accessibility and agent support drifting out of sync

## Why Human-Only Semantics Fail Agents

ARIA attributes describe **how** an element appears to assistive technology. AXAG describes **what** an element does semantically.

| ARIA | AXAG | Purpose |
|------|------|---------|
| `aria-label="Search products"` | `axag-intent="product.search"` | ARIA describes UI label; AXAG declares operation intent |
| `role="button"` | `axag-action-type="read"` | ARIA declares UI role; AXAG declares operation type |
| `aria-expanded="true"` | `axag-preconditions='["filter panel open"]'` | ARIA describes UI state; AXAG declares operational precondition |
| `aria-describedby="help-text"` | `axag-description="Search the product catalogue"` | ARIA links to UI text; AXAG provides machine-readable description |

An agent that reads ARIA labels can infer that a button is labeled "Search products" but cannot determine:
- What parameters the search accepts
- What entity is being searched
- What risk level applies
- Whether the operation is idempotent

## Combined ARIA + AXAG Pattern

```html title="Combined ARIA + AXAG — accessible to all audiences" showLineNumbers
<button
  role="button"
  aria-label="Search products"
  aria-describedby="search-help"
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  axag-required-parameters='["query"]'
  axag-optional-parameters='["category","price_min","price_max"]'
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="Search the product catalogue by keyword"
>
  🔍 Search
</button>
<span id="search-help" class="sr-only">Enter keywords to search products</span>
```

This element is accessible to:
- **Sighted users** — visible search button with icon
- **Screen readers** — `aria-label` provides spoken description
- **AI agents** — `axag-*` attributes provide full semantic contract

## Semantic Manifest Excerpt

```json title="Manifest — with accessibility metadata"
{
  "intent": "product.search",
  "entity": "product",
  "action_type": "read",
  "description": "Search the product catalogue by keyword",
  "parameters": {
    "required": ["query"],
    "optional": ["category", "price_min", "price_max"]
  },
  "risk_level": "none",
  "idempotent": true,
  "accessibility": {
    "aria_label": "Search products",
    "keyboard_shortcut": "Ctrl+K"
  }
}
```

## Generated MCP Tool

```json title="MCP tool — product_search"
{
  "name": "product_search",
  "description": "Search the product catalogue by keyword",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Search keywords" },
      "category": { "type": "string" },
      "price_min": { "type": "number", "minimum": 0 },
      "price_max": { "type": "number", "minimum": 0 }
    },
    "required": ["query"]
  }
}
```

## Keyboard-Accessible Form with AXAG

```html title="Keyboard-accessible form with AXAG + ARIA" showLineNumbers
<form>
  <label for="ticket-subject">Subject</label>
  <input id="ticket-subject" name="subject" type="text" required
         aria-required="true" />

  <label for="ticket-description">Description</label>
  <textarea id="ticket-description" name="description" required
            aria-required="true"></textarea>

  <label for="ticket-priority">Priority</label>
  <select id="ticket-priority" name="priority" aria-label="Select priority">
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>

  <button type="submit"
    aria-label="Submit support ticket"
    axag-intent="ticket.create"
    axag-entity="ticket"
    axag-action-type="write"
    axag-required-parameters='["subject","description","priority"]'
    axag-risk-level="low"
    axag-idempotent="false"
    axag-side-effects='["ticket_created","support_team_notified"]'
    axag-description="Create a new support ticket"
  >Submit Ticket</button>
</form>
```

## Design Principles

1. **ARIA for humans, AXAG for agents** — never substitute one for the other
2. **Consistent labeling** — `aria-label` and `axag-description` should describe the same action, but from different perspectives
3. **Keyboard operability implies agent operability** — if an action is keyboard-accessible, it should also be AXAG-annotated
4. **Progressive enhancement** — add AXAG to existing accessible components without breaking ARIA

## Why Scraping Fails Here

Screen-reader-optimized sites often use:
- Visually hidden text (`sr-only` classes) that scrapers miss
- `aria-live` regions that change dynamically
- Focus management that scrapers cannot follow
- `role` attributes that describe UI patterns, not business operations

An agent scraping an accessible site might read `aria-label="Submit"` but cannot determine what entity is being submitted, what parameters are required, or whether the action needs confirmation.

## How AXAG Eliminates Scraping

With AXAG annotations alongside ARIA, the agent reads the semantic contract directly. It doesn't need to:
- Parse `aria-label` text for intent
- Traverse the DOM for form fields
- Infer parameters from `<input>` element names
- Guess risk level from button color or CSS class

## Next Steps

- [Failure Recovery and Retry Flows](/docs/use-cases/retry-and-recovery)
- [Enterprise Multi-Step Approval](/docs/use-cases/enterprise/multi-step-approval)
- [Annotating Forms](/docs/authoring-guide/annotating-forms)
