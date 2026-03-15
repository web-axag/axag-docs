---
id: parameters
title: Parameters
sidebar_label: Parameters
slug: /specification/parameters
---
# Parameters

Parameters are the inputs required and accepted by an AXAG-annotated operation.

## Declaration Methods

### On the action element:
```html
<button
  axag-intent="product.search"
  axag-required-parameters='["query"]'
  axag-optional-parameters='["category","price_min","price_max"]'
>Search</button>
```

### On individual input elements:
```html
<input
  axag-parameter="query"
  axag-parameter-type="string"
  axag-parameter-required="true"
  axag-parameter-description="Search query text"
  axag-parameter-min-length="1"
  axag-parameter-max-length="200"
/>
```

## Parameter Types
`string`, `number`, `boolean`, `date`, `datetime`, `enum`, `array`, `object`

## Parameter Constraints
- `axag-parameter-min` / `axag-parameter-max` — Numeric range
- `axag-parameter-min-length` / `axag-parameter-max-length` — String length
- `axag-parameter-pattern` — Regex validation
- `axag-parameter-enum` — Allowed values
- `axag-parameter-format` — Format hint (email, url, phone, date, etc.)
