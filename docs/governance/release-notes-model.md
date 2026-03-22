---
id: release-notes-model
title: Release Notes Model
sidebar_label: Release Notes Model
slug: /governance/release-notes-model
---

# Release Notes Model

Every AXAG specification release includes structured release notes that communicate changes clearly to all stakeholders.

## Release Note Structure

```markdown
# AXAG v0.2.0 Release Notes

**Release Date**: 2024-07-01
**Status**: Stable
**Previous Version**: 1.0.0

## Highlights
- Brief summary of the most important changes

## New Features
- Feature descriptions with links to documentation

## Breaking Changes
- ⚠️ List of breaking changes with migration guides

## Deprecations
- Features deprecated in this release with removal timeline

## Bug Fixes
- Validation and schema fixes

## Documentation
- New or updated documentation pages

## Migration Guide
- Step-by-step upgrade instructions
```

## Change Categories

| Category | Label | Description |
|----------|-------|-------------|
| New Feature | `feature` | New capability added |
| Breaking Change | `breaking` | Requires consumer changes |
| Deprecation | `deprecated` | Feature scheduled for removal |
| Bug Fix | `fix` | Correction to existing behavior |
| Documentation | `docs` | Documentation-only change |
| Internal | `internal` | Tooling, CI, build changes |

## Audience-Specific Sections

Release notes include audience-specific impact sections:

### For Annotation Authors
What annotations to update, new attributes available, deprecated attributes.

### For Agent Framework Developers
What manifest changes affect tool generation, new fields to consume, removed fields.

### For Platform/DevOps Teams
What CI rules changed, new validation requirements, infrastructure changes.

## Changelog

The project maintains a `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
# Changelog

## [Unreleased]

## [0.2.0] - 2024-07-01
### Added
- `axag-tenant-boundary` attribute for multi-tenant scoping
- New lint rule AXAG-LINT-013 for tenant boundary validation
### Changed
- `axag-side-effects` now supports structured array syntax
### Deprecated
- Plain string `axag-side-effects` (use structured format)
### Fixed
- Schema validation for nested parameter objects

## [1.0.0] - 2024-01-15
### Added
- Initial specification draft
- Core annotation attributes
- Semantic Manifest schema
- Tool generation mapping rules
```
