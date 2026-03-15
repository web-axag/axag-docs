---
id: ownership-model
title: Ownership Model
sidebar_label: Ownership Model
slug: /governance/ownership-model
---

# Ownership Model

AXAG annotations and Semantic Manifests are living artifacts that require clear ownership, maintenance responsibilities, and decision-making authority.

## Who Owns What

| Artifact | Owner | Reviewer | Consumer |
|----------|-------|----------|----------|
| AXAG Specification | Standards Body | Community | Everyone |
| AXAG Annotations (per page) | Feature Team | Platform Team | Agent Frameworks |
| Semantic Manifest | Platform Team | Security Team | Agent Runtime |
| Generated Tools | Platform Team | Feature Team | AI Agents |
| Validation Rules | Platform Team | All Teams | CI/CD Pipeline |

## Annotation Ownership

Annotations belong to the team that owns the feature:
- The **shopping cart** team owns `cart.*` annotations
- The **billing** team owns `billing.*` annotations
- The **admin** team owns `admin.*` annotations

### Responsibilities
- Keep annotations in sync with UI changes
- Update parameters when form fields change
- Review risk levels when business logic changes
- Respond to cross-reference validation failures

## Manifest Ownership

The Semantic Manifest is owned by the **platform/API team** because:
- It serves as the contract between UI and agents
- Changes affect all downstream consumers (tool generation, agent behavior)
- It requires coordination across feature teams
- Security review is mandatory for risk level changes

## Change Authority

### Who Can Change What

| Change Type | Who Can Propose | Who Approves |
|-------------|----------------|--------------|
| New annotation | Feature team | Platform team |
| Change risk level | Feature or Security | Security team |
| Add new entity | Feature team | Architecture team |
| Deprecate intent | Platform team | All consuming teams |
| Change safety boundary | Security team | Security + Platform |
| Schema version bump | Standards body | Governance committee |

## RACI Matrix

| Activity | Responsible | Accountable | Consulted | Informed |
|----------|------------|-------------|-----------|----------|
| Write annotations | Feature Dev | Feature Lead | Platform | Agent Teams |
| Review annotations | Platform | Platform Lead | Security | Feature |
| Generate manifest | Platform | Platform Lead | Feature | Agent Teams |
| Validate in CI | DevOps | Platform Lead | All | All |
| Security review | Security | Security Lead | Platform | Feature |
| Version release | Platform | Governance | All | All |
