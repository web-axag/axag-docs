---
id: order-tracking
title: "E-Commerce: Order Tracking"
sidebar_label: Order Tracking
slug: /use-cases/ecommerce/order-tracking
---

# E-Commerce: Order Tracking

## Problem Statement
After purchase, users need to track order status, estimated delivery, and shipment details. Agents must query order status without side-effects.

## Why Human-Only Semantics Fail
- Order status is displayed with icons and visual timelines, not structured data
- "Track Order" links open external carrier pages with different DOM structures
- Status labels ("Shipped", "In Transit", "Out for Delivery") are not standardized

## Why Scraping Fails Here
- External carrier tracking pages have completely different HTML
- Order pages require authentication cookies
- Status timeline components use canvas/SVG rendering
- Real-time updates via WebSocket don't reflect in static DOM

## How AXAG Eliminates Scraping
`order.track` is a read-only operation with a declared schema. Agents call the generated tool and receive structured status data.

## Annotated UI Example
```html
<button
  axag-intent="order.track"
  axag-entity="order"
  axag-action-type="read"
  axag-required-parameters='["order_id"]'
  axag-scope="user_orders"
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="Get the current status and tracking details for an order"
>Track Order</button>
```

## Semantic Manifest Excerpt
```json
{
  "intent": "order.track",
  "entity": "order",
  "operation_id": "order_track",
  "action_type": "read",
  "parameters": {
    "order_id": { "type": "string", "required": true }
  },
  "scope": "user_orders",
  "risk_level": "none",
  "idempotent": true
}
```

## Generated Tool Example
```json
{
  "tool_name": "order_track",
  "description": "Get the current status and tracking details for an order",
  "input_schema": {
    "type": "object",
    "properties": {
      "order_id": { "type": "string" }
    },
    "required": ["order_id"]
  },
  "safety": { "execution_type": "read", "risk_level": "none", "idempotent": true }
}
```

## Constraints & Safety Notes
- Read-only, no side-effects
- Scoped to `user_orders` — agents can only track orders belonging to the authenticated user
- No tenant-crossing: User A cannot track User B's order
