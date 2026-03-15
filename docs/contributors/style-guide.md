---
id: style-guide
title: Style Guide
sidebar_label: Style Guide
slug: /contributors/style-guide
---

# Style Guide

This guide defines the writing, formatting, and annotation conventions for all AXAG documentation and specification content.

---

## Writing Conventions

### Voice and Tone

- **Active voice** preferred: "The agent reads the manifest" not "The manifest is read by the agent"
- **Second person** for guides and tutorials: "You annotate the button..."
- **Third person** for specification text: "The implementation MUST include..."
- **Present tense** for describing behaviour: "The tool validates parameters"
- Keep sentences **short and clear** — aim for ≤25 words per sentence

### Terminology

Use these terms consistently:

| Preferred Term | Avoid |
|----------------|-------|
| annotation | tag, decorator, markup |
| intent | action name, function name |
| entity | object, resource, model |
| semantic manifest | schema file, config file |
| MCP tool | function, endpoint, API |
| agent | bot, AI, automation |
| risk level | danger level, severity |
| precondition | prerequisite, guard |
| postcondition | result, outcome |
| confirmation | prompt, dialog |
| approval | sign-off, authorisation |

### Normative Language (RFC 2119)

Use these keywords precisely and in **uppercase bold** when stating requirements:

- **MUST** — absolute requirement
- **MUST NOT** — absolute prohibition
- **SHOULD** — recommended but not required
- **SHOULD NOT** — discouraged but not prohibited
- **MAY** — truly optional

Example:
> Every annotated element **MUST** include `axag-intent`, `axag-entity`, and `axag-action-type`.

---

## Formatting Conventions

### Headings

- Use sentence case: "How to annotate a button" not "How To Annotate A Button"
- H1 (`#`) — page title only (one per page, matches frontmatter `title`)
- H2 (`##`) — major sections
- H3 (`###`) — subsections
- Avoid H4+ unless absolutely necessary

### Code Blocks

- Always include the language identifier:
  ````
  ```html
  <button axag-intent="product.search">Search</button>
  ```
  ````
- Use `html` for annotation examples
- Use `json` for manifests and tool schemas
- Use `typescript` or `javascript` for code
- Use `bash` for terminal commands

### Attribute Formatting

- Reference AXAG attributes with backticks and the `axag-` prefix: `axag-intent`
- Reference values with backticks: `"product.search"`, `"read"`, `"high"`
- Use dot notation for intents: `entity.action` (e.g., `product.search`)
- Use snake_case for parameter names: `product_id`, `date_range_start`

### Tables

Use tables for structured comparisons:

```markdown
| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `axag-intent` | string | Yes | Semantic intent identifier |
```

### Admonitions

Use Docusaurus admonitions for callouts:

```markdown
:::tip
Helpful tip here.
:::

:::warning
Important warning here.
:::

:::danger
Critical safety information here.
:::

:::info
Additional context here.
:::

:::note
Side note here.
:::
```

### Lists

- Use bullet lists for unordered items
- Use numbered lists for sequential steps
- Keep list items parallel in structure

---

## Annotation Conventions

### Intent Naming

- Format: `entity.action` in lowercase snake_case
- Entity is singular: `product.search` not `products.search`
- Action is a verb: `search`, `create`, `update`, `delete`, `submit`
- Use domain-specific verbs when clearer: `advance_stage`, `schedule`, `escalate`

### Entity Naming

- Singular lowercase: `product`, `user`, `ticket`
- No prefixes or suffixes: `product` not `ProductEntity` or `tbl_product`
- Match domain language, not database names

### Parameter Naming

- snake_case: `product_id`, `start_date`, `page_size`
- Include the entity prefix for IDs: `product_id` not `id`
- Use `_id` suffix for identifiers: `cart_id`, `user_id`
- Use descriptive names: `date_range_start` not `ds`

### Risk Level Assignment

| Scenario | Risk Level |
|----------|-----------|
| Read-only queries, searches, lists | `none` |
| Creating non-critical records | `low` |
| Updating records, state transitions | `medium` |
| Financial transactions, bulk operations | `high` |
| Permanent deletions, admin operations | `critical` |

---

## Documentation Page Structure

### Specification Pages

1. Title and frontmatter
2. Brief description (1-2 sentences)
3. Schema / attribute table
4. Detailed explanation
5. Examples (annotated HTML + manifest + generated tool)
6. Edge cases / caveats

### Use-Case Pages

1. Title and frontmatter
2. Problem statement
3. Why human-only semantics fail agents
4. AXAG-annotated UI example
5. Resulting semantic manifest excerpt
6. Generated MCP tool
7. Safety and constraints notes

### Tutorial Pages

1. Title and frontmatter
2. What you'll learn
3. Prerequisites
4. Step-by-step instructions (numbered)
5. Verification / testing
6. Next steps

---

## File Naming

- Use kebab-case for file names: `multi-step-workflows.md`
- Use `.md` for pure Markdown
- Use `.mdx` for pages that import React components
- Match the `id` in frontmatter to the filename (without extension)

## Frontmatter Template

```yaml
---
id: page-id
title: Page Title
sidebar_label: Sidebar Label
slug: /section/page-id
---
```

---

## Commit Messages

Follow conventional commits:

```
type(scope): description

docs(use-cases): add travel domain examples
fix(spec): correct risk level table
feat(components): add SchemaFieldTable component
chore(deps): update docusaurus to 3.6.1
```

Types: `docs`, `fix`, `feat`, `chore`, `refactor`, `test`, `ci`
