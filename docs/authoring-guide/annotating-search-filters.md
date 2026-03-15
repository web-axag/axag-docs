---
id: annotating-search-filters
title: Annotating Search and Filters
sidebar_label: Search & Filters
slug: /authoring-guide/annotating-search-filters
---
# Annotating Search and Filters

Search and filter controls combine read operations with multiple optional parameters.

```html title="Search with filters — form-level annotation" showLineNumbers
<div axag-intent="product.search" axag-entity="product" axag-action-type="read" axag-scope="catalog">
  <input axag-parameter="query" axag-parameter-type="string" axag-parameter-required="true" />
  <select axag-parameter="category" axag-parameter-type="enum" axag-parameter-required="false"
    axag-parameter-enum='["electronics","clothing","home"]'>
    <option value="">All Categories</option>
  </select>
  <input axag-parameter="price_min" axag-parameter-type="number" axag-parameter-min="0" />
  <input axag-parameter="price_max" axag-parameter-type="number" axag-parameter-min="0" />
  <button axag-risk-level="none" axag-idempotent="true">Search</button>
</div>
```
