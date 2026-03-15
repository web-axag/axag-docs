---
id: add-axag-to-page
title: "Tutorial: Add AXAG to a Page"
sidebar_label: Add AXAG to a Page
slug: /tutorials/add-axag-to-page
---

# Tutorial: Add AXAG to a Page

This step-by-step tutorial walks you through adding AXAG annotations to an existing web page.

## Prerequisites
- An existing HTML page with interactive elements
- Basic understanding of HTML attributes
- Familiarity with the [annotation attributes reference](/docs/reference/annotation-attributes)

## Step 1: Identify Annotatable Elements

Scan your page for elements that represent **agent-actionable operations**:
- Buttons that trigger actions (search, submit, delete)
- Links that perform state changes (not navigation links)
- Forms that submit data

**Not annotatable**: decorative elements, layout containers, navigation links to other pages.

## Step 2: Add Required Attributes

For each identified element, add the three required attributes:

```html
<!-- Before -->
<button onclick="searchProducts()">Search</button>

<!-- After -->
<button
  onclick="searchProducts()"
  <!-- axag-highlight-start -->
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  <!-- axag-highlight-end -->
>Search</button>
```

## Step 3: Add Parameters

Declare what inputs the action accepts:

```html
<button
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  <!-- axag-highlight-start -->
  axag-required-parameters='["query"]'
  axag-optional-parameters='["category","price_min","price_max"]'
  <!-- axag-highlight-end -->
>Search</button>
```

## Step 4: Add Description

```html
<button
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  axag-required-parameters='["query"]'
  axag-optional-parameters='["category","price_min","price_max"]'
  <!-- axag-highlight-next-line -->
  axag-description="Search the product catalog with text query and optional filters"
>Search</button>
```

## Step 5: Add Safety Metadata

For write/delete operations, add risk level and idempotency:

```html
<button
  axag-intent="cart.add_item"
  axag-entity="cart"
  axag-action-type="write"
  axag-required-parameters='["product_id","quantity"]'
  <!-- axag-highlight-start -->
  axag-risk-level="low"
  axag-idempotent="false"
  <!-- axag-highlight-end -->
  axag-description="Add a product to the shopping cart"
>Add to Cart</button>
```

## Step 6: Add Preconditions and Postconditions

For operations with prerequisites or guaranteed outcomes:

```html
<button
  axag-intent="cart.begin_checkout"
  axag-entity="cart"
  axag-action-type="write"
  axag-required-parameters='["cart_id"]'
  <!-- axag-highlight-start -->
  axag-preconditions='["cart must have at least one item"]'
  axag-postconditions='["checkout session created"]'
  <!-- axag-highlight-end -->
  axag-risk-level="medium"
  axag-confirmation-required="true"
  axag-idempotent="false"
  axag-description="Begin the checkout process"
>Checkout</button>
```

## Step 7: Validate

Run the AXAG validator to check your annotations:

```bash title="Validate annotations"
npx axag-validate --input src/my-page.html
```

## Complete Example

```html title="product-catalog.html" showLineNumbers
<!DOCTYPE html>
<html>
<body>
  <h1>Product Catalog</h1>

  <button
    axag-intent="product.search"
    axag-entity="product"
    axag-action-type="read"
    axag-required-parameters='["query"]'
    axag-optional-parameters='["category","sort_by"]'
    axag-risk-level="none"
    axag-idempotent="true"
    axag-description="Search products"
  >Search</button>

  <button
    axag-intent="cart.add_item"
    axag-entity="cart"
    axag-action-type="write"
    axag-required-parameters='["product_id","quantity"]'
    axag-risk-level="low"
    axag-idempotent="false"
    axag-description="Add item to cart"
  >Add to Cart</button>

  <button
    axag-intent="account.delete"
    axag-entity="account"
    axag-action-type="delete"
    axag-required-parameters='["account_id"]'
    axag-preconditions='["user must confirm deletion"]'
    axag-risk-level="critical"
    axag-confirmation-required="true"
    axag-idempotent="true"
    axag-description="Permanently delete the user account"
  >Delete Account</button>
</body>
</html>
```

## Next Steps
- [Generate a Semantic Manifest](/docs/tutorials/generate-semantic-manifest) from your annotations
- [Generate MCP Tools](/docs/tutorials/generate-mcp-tools) from the manifest
