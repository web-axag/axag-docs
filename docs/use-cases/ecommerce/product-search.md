---
id: product-search
title: "E-Commerce: Product Search"
sidebar_label: Product Search
slug: /use-cases/ecommerce/product-search
---

# E-Commerce: Product Search

## Problem Statement
Product search is the most common e-commerce interaction. Agents need to search product catalogs with structured queries, but current approaches require scraping search result DOM, parsing product cards, and extracting prices from formatted strings.

## Why Human-Only Semantics Fail
- Search inputs don't declare what entity they search
- Filter controls (price sliders, category dropdowns) don't declare parameter types or ranges
- Results are rendered as visual cards with no structured output contract
- Pagination controls don't declare total results or page boundaries

## Why Scraping Fails Here
- Product card HTML changes with every design iteration
- CSS class names are hashed by build tools
- Price formatting varies by locale ($19.99, €19,99, ¥1999)
- A/B tests alter result layout and card structure
- Lazy loading and infinite scroll make DOM parsing unreliable

## How AXAG Eliminates Scraping
Agents read the AXAG annotation and Semantic Manifest to discover `product.search` as a typed operation with declared parameters, then invoke the generated MCP tool directly.

## Annotated UI Example
```html title="Search button with AXAG annotations"
<button
  <!-- axag-highlight-start -->
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  <!-- axag-highlight-end -->
  axag-required-parameters='["query"]'
  axag-optional-parameters='["category","price_min","price_max","brand","sort_by","page","page_size"]'
  axag-scope="catalog"
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="Search the product catalog with text query and optional filters"
>Search Products</button>
```

## Semantic Manifest Excerpt
```json title="axag-manifest.json — product.search" showLineNumbers
{
  "intent": "product.search",
  "entity": "product",
  "operation_id": "product_search",
  "action_type": "read",
  "parameters": {
    "query": { "type": "string", "required": true },
    "category": { "type": "string", "required": false },
    "price_min": { "type": "number", "required": false, "minimum": 0 },
    "price_max": { "type": "number", "required": false, "minimum": 0 },
    "brand": { "type": "string", "required": false },
    "sort_by": { "type": "string", "required": false, "enum": ["relevance","price_asc","price_desc","newest","rating"] },
    "page": { "type": "number", "required": false, "minimum": 1 },
    "page_size": { "type": "number", "required": false, "minimum": 1, "maximum": 100 }
  },
  "scope": "catalog",
  "risk_level": "none",
  "idempotent": true
}
```

## Generated Tool Example
```json title="tools/product_search.json" showLineNumbers
{
  "tool_name": "product_search",
  "description": "Search the product catalog with text query and optional filters",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": { "type": "string" },
      "category": { "type": "string" },
      "price_min": { "type": "number", "minimum": 0 },
      "price_max": { "type": "number", "minimum": 0 },
      "sort_by": { "type": "string", "enum": ["relevance","price_asc","price_desc","newest","rating"] }
    },
    "required": ["query"]
  },
  "safety": { "execution_type": "read", "risk_level": "none", "idempotent": true }
}
```

## Testing Checklist
- [ ] Search with query-only returns results
- [ ] Search with filters narrows results correctly
- [ ] Empty query returns validation error
- [ ] Pagination works with page/page_size parameters
- [ ] Sort options produce correct ordering
