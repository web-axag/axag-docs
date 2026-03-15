---
id: review-checklist
title: Review Checklist
sidebar_label: Review Checklist
slug: /contributors/review-checklist
---

# Review Checklist

Use this checklist when reviewing pull requests to the AXAG documentation.

---

## General

- [ ] PR description clearly explains the change
- [ ] Related issue is linked
- [ ] Branch is up-to-date with `main`
- [ ] CI checks pass (build, lint, validate)

## Content Quality

- [ ] Content is technically accurate
- [ ] Writing follows the [Style Guide](/docs/contributors/style-guide)
- [ ] Normative language (MUST, SHOULD, MAY) used correctly per RFC 2119
- [ ] No spelling or grammar errors
- [ ] No broken links
- [ ] Appropriate use of admonitions (tip, warning, danger, info, note)

## Annotation Examples

- [ ] All examples include required attributes (`axag-intent`, `axag-entity`, `axag-action-type`)
- [ ] Intent names follow `entity.action` convention
- [ ] Parameter names use snake_case
- [ ] Risk levels are appropriate for the action type
- [ ] Constraints use valid JSON Schema patterns
- [ ] Preconditions and postconditions are realistic
- [ ] Side effects are documented where applicable
- [ ] `axag-idempotent` is set correctly

## JSON Examples

- [ ] All JSON is valid (parseable)
- [ ] Manifest excerpts match the annotation they describe
- [ ] Generated tool examples match the manifest they derive from
- [ ] `inputSchema` uses correct JSON Schema types
- [ ] Required fields in schema match `axag-required-parameters`

## Page Structure

- [ ] Frontmatter includes `id`, `title`, `sidebar_label`, `slug`
- [ ] `id` matches filename (without extension)
- [ ] Page follows the appropriate template (spec, use-case, tutorial, etc.)
- [ ] All expected sections are present
- [ ] Heading hierarchy is correct (H1 → H2 → H3, no skipping)

## Navigation

- [ ] Sidebar entry added in `sidebars.ts`
- [ ] Slug is correct and follows conventions
- [ ] Cross-references link to the right pages
- [ ] No orphaned pages (every page reachable from sidebar)

## MDX Components

- [ ] Component imports are correct (if `.mdx` file)
- [ ] Components render correctly in dev server
- [ ] No missing required props
- [ ] Component usage follows established patterns

## Use-Case Specific

- [ ] Problem statement is clear and domain-specific
- [ ] "Why agents fail" section explains scraping limitations
- [ ] Annotated UI example is realistic
- [ ] Manifest excerpt matches the annotation
- [ ] Generated MCP tool matches the manifest
- [ ] Safety section covers risk, preconditions, postconditions, side effects

## Specification Changes

- [ ] RFC document provided for new attributes or changes
- [ ] Backward compatibility impact assessed
- [ ] Schema reference updated
- [ ] Glossary updated if new terms introduced
- [ ] Version policy followed

---

## Review Decision Guide

| Situation | Action |
|-----------|--------|
| Minor typo or formatting fix | Approve with suggestion |
| Content is correct but could be clearer | Request changes (non-blocking) |
| Missing required sections | Request changes (blocking) |
| Invalid JSON or annotation examples | Request changes (blocking) |
| New attribute without RFC | Request changes (blocking) |
| Breaking change without deprecation plan | Request changes (blocking) |
