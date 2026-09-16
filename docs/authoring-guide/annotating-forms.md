---
id: annotating-forms
title: Annotating Forms
sidebar_label: Forms
slug: /authoring-guide/annotating-forms
---
# Annotating Forms

Annotate the form once. Its parameters come from the controls it already has: names, `required`, input types, constraints and labels. You only add AXAG attributes for what the markup can't say.

## A form with no parameter attributes

```html title="Lead creation form" showLineNumbers
<form axag="write:lead.create!low?idempotent=false&scope=tenant" axag-description="Create a new sales lead">
  <label for="first-name">First name</label>
  <input id="first-name" name="first_name" required maxlength="80">
  <label for="last-name">Last name</label>
  <input id="last-name" name="last_name" required maxlength="80">
  <label for="email">Work email</label>
  <input id="email" name="email" type="email" required>
  <label for="source">Lead source</label>
  <select id="source" name="source">
    <option value="web">Web</option>
    <option value="referral">Referral</option>
    <option value="event">Event</option>
  </select>
  <button type="submit">Create lead</button>
</form>
```

Generated manifest action:

```json title="axag-manifest.json — lead.create"
{
  "intent": "lead.create",
  "entity": "lead",
  "action_type": "write",
  "operation_id": "lead_create",
  "description": "Create a new sales lead",
  "required_parameters": [
    { "name": "first_name", "type": "string", "maxLength": 80, "description": "First name", "source": "harvested:html" },
    { "name": "last_name", "type": "string", "maxLength": 80, "description": "Last name", "source": "harvested:html" },
    { "name": "email", "type": "string", "format": "email", "description": "Work email", "source": "harvested:html" }
  ],
  "optional_parameters": [
    { "name": "source", "type": "string", "enum": ["web", "referral", "event"], "description": "Lead source", "source": "harvested:html" }
  ],
  "risk_level": "low",
  "idempotent": false,
  "scope": "tenant"
}
```

See [Schema Harvesting](/docs/semantic-manifest/schema-harvesting) for the full mapping from HTML to parameters.

## Where to put the annotation

- **On the `<form>`** — the usual choice.
- **On the submit button** — a `<button type="submit">` or `<input type="submit">` uses the form it belongs to, including through `form="form-id"`.
- **On anything else** — point it at the form with `axag-params-from="#form-id"`.

## Adding what the markup can't say

Use `axag-parameter-*` on a control to override what was harvested, or give a control without a `name` a parameter name:

```html title="Overrides on a control"
<input name="annual_revenue" inputmode="numeric"
  axag-parameter-type="number"
  axag-parameter-min="0"
  axag-parameter-description="Estimated annual revenue in USD">
```

If a backend schema already defines the parameters, bind it instead of repeating them. See [Bind Zod or OpenAPI Schemas](/docs/tutorials/bind-schemas).

## Key Rules
- Every control that is submitted SHOULD have a `name` (or `axag-parameter`); controls without one are reported as **AXAG-LINT-029**.
- Every control SHOULD have a `<label>`, `aria-label` or `aria-labelledby`; a placeholder is not a label (**AXAG-LINT-032**). The label becomes the parameter description agents read.
- Name radio and checkbox groups with a `<fieldset>` and `<legend>`, or `role="radiogroup"` with a label.
- Parameters declared on the annotation (`axag-required-parameters` or `req=`/`opt=` in the macro) take precedence over harvested ones, so use them only when the form doesn't reflect the real contract.
- Hidden, disabled and file inputs are not harvested.
