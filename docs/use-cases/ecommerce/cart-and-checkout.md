---
id: cart-and-checkout
title: "E-Commerce: Cart & Checkout"
sidebar_label: Cart & Checkout
slug: /use-cases/ecommerce/cart-and-checkout
---

# E-Commerce: Cart & Checkout

## Problem Statement
Adding items to a cart and beginning checkout are high-intent, multi-step flows. Agents must be able to add items (write), view the cart (read), update quantities (write), remove items (write), and initiate checkout (write with side-effects).

## Why Human-Only Semantics Fail
- "Add to Cart" buttons don't declare which product ID, variant, or quantity they affect
- Checkout flows are multi-step wizards with no declared state machine
- Shipping/payment forms don't expose their parameter schemas to machines
- "Place Order" has financial side-effects that no DOM attribute communicates

## Why Scraping Fails Here
- Cart state is stored in cookies/session, not in the DOM
- Quantity controls use custom components with inconsistent selectors
- Checkout steps load dynamically via SPA navigation
- Payment forms are in iframes from third-party providers
- Anti-bot protections specifically target checkout scrapers

## How AXAG Eliminates Scraping
AXAG annotates each cart and checkout operation with intent, parameters, preconditions, and risk level. The generated tools are safe, typed, and declare side-effects explicitly.

## Annotated UI Example
```html title="Cart & Checkout actions" showLineNumbers
<!-- Add to Cart -->
<button
  <!-- axag-highlight-start -->
  axag-intent="cart.add_item"
  axag-entity="cart"
  axag-action-type="write"
  <!-- axag-highlight-end -->
  axag-required-parameters='["product_id","quantity"]'
  axag-optional-parameters='["variant_id"]'
  axag-preconditions='["product must be in stock"]'
  axag-postconditions='["cart updated with new item"]'
  axag-risk-level="low"
  axag-idempotent="false"
  axag-description="Add a product to the shopping cart"
>Add to Cart</button>

<!-- Begin Checkout -->
<button
  <!-- axag-highlight-start -->
  axag-intent="cart.begin_checkout"
  axag-entity="cart"
  axag-action-type="write"
  <!-- axag-highlight-end -->
  axag-required-parameters='["cart_id"]'
  axag-optional-parameters='["shipping_method","promo_code"]'
  axag-preconditions='["cart must have at least one item","user must be authenticated"]'
  axag-postconditions='["checkout session created","inventory reserved for 15 minutes"]'
  <!-- axag-highlight-start -->
  axag-risk-level="medium"
  axag-confirmation-required="true"
  <!-- axag-highlight-end -->
  axag-idempotent="false"
  axag-side-effects='["inventory_reservation","price_lock"]'
  axag-description="Begin the checkout process for the current cart"
>Proceed to Checkout</button>
```

## Semantic Manifest Excerpt
```json title="axag-manifest.json — cart actions" showLineNumbers
{
  "actions": [
    {
      "intent": "cart.add_item",
      "entity": "cart",
      "action_type": "write",
      "operation_id": "cart_add_item",
      "description": "Add a product to the shopping cart",
      "required_parameters": [
        { "name": "product_id", "type": "string" },
        { "name": "quantity", "type": "integer", "min": 1, "max": 99 }
      ],
      "optional_parameters": [{ "name": "variant_id", "type": "string" }],
      "risk_level": "low",
      "idempotent": false,
      "preconditions": ["product must be in stock"],
      "postconditions": ["cart updated with new item"]
    },
    {
      "intent": "cart.begin_checkout",
      "entity": "cart",
      "action_type": "write",
      "operation_id": "cart_begin_checkout",
      "description": "Begin the checkout process for the current cart",
      "required_parameters": [{ "name": "cart_id", "type": "string" }],
      "optional_parameters": [
        { "name": "shipping_method", "type": "string" },
        { "name": "promo_code", "type": "string" }
      ],
      "risk_level": "medium",
      "confirmation_required": true,
      "idempotent": false,
      "side_effects": ["inventory_reservation", "price_lock"],
      "preconditions": ["cart must have at least one item", "user must be authenticated"],
      "postconditions": ["checkout session created", "inventory reserved for 15 minutes"]
    }
  ]
}
```

## Generated Tool Examples
```json
{
  "name": "cart_add_item",
  "description": "Add a product to the shopping cart",
  "input_schema": {
    "type": "object",
    "properties": {
      "product_id": { "type": "string" },
      "quantity": { "type": "integer", "minimum": 1, "maximum": 99 },
      "variant_id": { "type": "string" }
    },
    "required": ["product_id", "quantity"]
  },
  "metadata": {
    "action_type": "write",
    "risk_level": "low",
    "idempotent": false,
    "confirmation_required": false,
    "approval_required": false,
    "preconditions": ["product must be in stock"],
    "source_intent": "cart.add_item",
    "source_entity": "cart"
  }
}
```

## Constraints & Safety Notes
- `cart.begin_checkout` requires confirmation because it reserves inventory
- Quantity is bounded to 1–99 to prevent abuse
- Cart operations are NOT idempotent — adding twice doubles the quantity
- `cart_begin_checkout` side-effects (inventory reservation, price lock) are time-bounded (15 min)
