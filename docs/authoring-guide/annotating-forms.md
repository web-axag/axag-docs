---
id: annotating-forms
title: Annotating Forms
sidebar_label: Forms
slug: /authoring-guide/annotating-forms
---
# Annotating Forms

Forms require annotations on both the submission action and individual input fields.

## Form-Level Annotation
```html title="Lead creation form — full annotation" showLineNumbers
<form axag-intent="lead.create" axag-entity="lead" axag-action-type="create" axag-scope="organization">
  <input axag-parameter="first_name" axag-parameter-type="string" axag-parameter-required="true" />
  <input axag-parameter="last_name" axag-parameter-type="string" axag-parameter-required="true" />
  <input axag-parameter="email" axag-parameter-type="string" axag-parameter-required="true"
    axag-parameter-format="email" />
  <select axag-parameter="source" axag-parameter-type="enum"
    axag-parameter-enum='["web","referral","event"]' axag-parameter-required="false">
    <option value="web">Web</option>
    <option value="referral">Referral</option>
    <option value="event">Event</option>
  </select>
  <button type="submit" axag-risk-level="low" axag-description="Create a new sales lead">
    Create Lead
  </button>
</form>
```

## Key Rules
- The `<form>` element carries intent, entity, and action type
- Each `<input>`, `<select>`, and `<textarea>` carries parameter metadata
- The submit button carries risk level and description
- Validation rules on inputs MUST match declared parameter constraints
