---
id: entities
title: Entities
sidebar_label: Entities
slug: /specification/entities
---

# Entities

An entity is the domain object that an AXAG-annotated operation acts upon. Entities are declared via the `axag-entity` attribute.

## Naming Conventions

- Entity names MUST be lowercase, singular nouns: `product`, `order`, `ticket`, `campaign`
- Compound entities use underscore separation: `shopping_cart`, `user_profile`, `tenant_settings`
- Entity names SHOULD match the domain model used by the application's backend

## Common Entities by Domain

| Domain | Entities |
|--------|----------|
| E-Commerce | `product`, `cart`, `order`, `payment`, `shipment`, `return` |
| CRM | `lead`, `contact`, `opportunity`, `account`, `pipeline` |
| Marketing | `campaign`, `audience`, `experiment`, `template` |
| Support | `ticket`, `agent`, `knowledge_article`, `escalation` |
| Travel | `flight`, `hotel`, `booking`, `itinerary`, `reservation` |
| Analytics | `report`, `dashboard`, `dataset`, `metric`, `alert` |
| Jobs | `job`, `application`, `candidate`, `interview` |

## Entity Relationships

When operations span multiple entities, use the primary entity in `axag-entity` and declare related entities in parameters or side effects.
