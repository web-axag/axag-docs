---
id: constraints
title: Constraints
sidebar_label: Constraints
slug: /specification/constraints
---
# Constraints

Constraints govern valid inputs and execution conditions. They MUST be declared in annotations, not hidden in client-side validation logic.

## Value Constraints
Applied to individual parameters: type, format, range, pattern, enum, length.

## Relational Constraints
Relationships between parameters: mutual exclusion, conditional requirements, dependencies.

## Execution Constraints
State requirements: preconditions, rate limits, cooldown periods, temporal windows.

## Declaration Example
```html
<button
  axag-intent="booking.create"
  axag-entity="reservation"
  axag-action-type="create"
  axag-required-parameters='["check_in","check_out","guests"]'
  axag-constraints='{"check_out_after_check_in": "check_out > check_in", "max_guests": "guests <= 10"}'
  axag-preconditions='["room_available"]'
>
  Book Room
</button>
```
