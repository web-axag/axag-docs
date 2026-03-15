Act as a principal documentation architect, staff frontend platform engineer, standards editor, technical writer, developer experience lead, and information architect.

Your task is to generate a complete, production-grade Docusaurus documentation website for the standard:

“Agent Experience (AX) and the AXAG Standard: Designing Interfaces for AI Agents as First-Class Clients”

Also framed as:

“Towards a Unified Semantic Contract for Human and Agent Interfaces in WebMCP-Enabled Applications.”

You are not creating a marketing website.
You are creating a standards-grade implementation portal similar in quality, rigor, navigability, and operational value to documentation ecosystems such as OpenTelemetry, GraphQL, Kubernetes, Stripe, or React documentation.

The output must be detailed enough for a real engineering organization to:
initialize the repository,
publish the docs site,
onboard contributors,
govern the specification,
implement examples,
validate conformance,
and evolve the standard over time.

==================================================
1. PRIMARY GOAL
==================================================

Generate a full Docusaurus-based documentation portal that helps engineers, platform teams, standards owners, architects, agent runtime builders, and product developers understand and implement AXAG correctly in production.

The site must teach:

1. Why Agent Experience exists
2. Why human-only interfaces are semantically insufficient for agents
3. What AXAG is and how it defines a semantic contract
4. How annotations produce a Semantic Manifest
5. How the Semantic Manifest generates MCP-compatible tool definitions
6. How agents interact with systems through semantic operations rather than scraping
7. How teams author, validate, govern, version, and evolve AXAG safely
8. How AXAG applies across modern domains where scraping is currently common

This is not a high-level summary.
This is an implementation-grade documentation system.

==================================================
2. CORE POSITIONING TO PRESERVE
==================================================

Preserve these conceptual foundations throughout the documentation:

1. Agent Experience, AX, is a design discipline that treats AI agents as first-class product consumers.
2. AXAG is an annotation standard that makes interface semantics explicit and machine-readable.
3. AXAG is not just metadata. It is a semantic interaction contract.
4. The semantic contract becomes the source of truth for downstream artifacts such as the Semantic Manifest and MCP Tool Registry.
5. Human UI describes how interactions appear.
6. AXAG describes what interactions mean.
7. Reliable agent interaction requires explicit semantics, not brittle inference from DOM structure, button labels, CSS selectors, or prompt interpretation.
8. AXAG should be positioned as the semantic control layer for agent-facing interaction.

This distinction must be visible on the homepage, in the concepts section, in the specification, in use cases, and in anti-patterns.

==================================================
3. ARCHITECTURAL MODEL TO REINFORCE
==================================================

The documentation must repeatedly reinforce this architecture:

Human Interface
  → AXAG Semantic Contract
  → Semantic Manifest
  → MCP Tool Registry
  → Agent Runtime

Explain each layer clearly:

Human Interface
The visual and interactive surface for human users.

AXAG Semantic Contract
The machine-readable contract that declares the meaning, intent, constraints, and execution semantics of interface interactions.

Semantic Manifest
A derived artifact that exposes discoverable, structured operations and interaction semantics.

MCP Tool Registry
A generated tool surface that agent runtimes can consume deterministically.

Agent Runtime
The planning and execution layer that selects tools, validates constraints, and performs operations.

The docs must emphasize that agents should not rely on scraping visual UI structure if semantic contracts are available.

==================================================
4. TARGET OUTPUT
==================================================

Generate all of the following in one cohesive output:

A. Full Docusaurus repository structure
B. docs/ information architecture
C. navbar configuration
D. footer configuration
E. docusaurus.config.ts
F. sidebars.ts
G. versioned docs strategy
H. production-grade Markdown or MDX content for major pages
I. code examples and annotation examples
J. Semantic Manifest examples
K. MCP tool generation examples
L. diagrams described in words and in Mermaid
M. custom pages or components needed for schema explorer and examples
N. search taxonomy and content tagging strategy
O. docs contribution model
P. CI validation workflow
Q. governance and versioning model
R. docs style guide for maintainers
S. sample homepage content and callouts
T. recommended plugins, theme config, syntax highlighting, and deployment approach
U. anti-pattern examples with corrected versions
V. multi-domain examples showing how AXAG replaces scraping
W. contributor guide and onboarding model
X. implementation roadmap and content gap analysis

Do not produce a shallow summary.
Produce a complete blueprint and write as much of the most important content as possible.

==================================================
5. TECHNOLOGY REQUIREMENTS
==================================================

Use Docusaurus as the primary implementation target.

Assume the repository uses:

- Docusaurus 3.x
- TypeScript configuration where appropriate
- MDX for rich documentation pages
- Mermaid diagrams
- Prism syntax highlighting
- Versioned docs
- GitHub-based edit workflow
- Algolia DocSearch compatible structure
- Static deployment suitable for Vercel, Netlify, or GitHub Pages
- Structured sidebar navigation similar to OpenTelemetry or GraphQL docs
- Clear separation between normative specification pages and explanatory guides

Assume the repository contains:

/docs
  /intro
  /getting-started
  /concepts
  /specification
  /semantic-manifest
  /tool-generation
  /authoring-guide
  /use-cases
  /validation
  /governance
  /reference
  /tutorials
  /examples
  /faq
  /contributors

/src
  /components
  /pages
  /theme
  /css

/static
/versioned_docs
/versioned_sidebars
/docusaurus.config.ts
/sidebars.ts
/package.json
/README.md
/CONTRIBUTING.md

Where useful, create custom React components for:
- schema field tables
- callout blocks
- before-and-after comparisons
- manifest viewers
- tool mapping viewers
- audience-specific page banners
- conformance badges
- domain example tabs

==================================================
6. INFORMATION ARCHITECTURE
==================================================

Design the documentation with this top-level structure:

1. Home

2. Introduction
   - What is AX
   - What is AXAG
   - Why Human Interfaces Fail Agents
   - What Problems AXAG Solves
   - AXAG as a Semantic Contract
   - Who Should Use AXAG

3. Getting Started
   - Mental Model
   - First Annotated Action
   - First Semantic Manifest
   - First Generated Tool
   - First End-to-End Agent Action
   - Implementation Prerequisites

4. Core Concepts
   - Agent Experience
   - Semantic Contract
   - Intent vs Presentation
   - Affordances
   - Constraints
   - Preconditions and Postconditions
   - Context and Scope
   - Visibility vs Operability
   - Determinism and Trust
   - Safety Boundaries
   - Idempotency and Side Effects
   - Role Awareness and Tenant Boundaries

5. AXAG Specification
   - Specification Overview
   - Canonical Vocabulary
   - Annotation Primitives
   - Required Fields
   - Optional Fields
   - Entities
   - Actions
   - Parameters
   - Constraints
   - Risk Classification
   - Safety Boundaries
   - Confirmation Requirements
   - Approval Requirements
   - Context Inheritance
   - Namespacing
   - Versioning
   - Error Semantics
   - Conformance Levels

6. Semantic Manifest
   - What It Is
   - Why It Exists
   - Manifest Schema
   - Generation Model
   - Discovery Model
   - Execution Planning Role
   - Field Reference
   - Manifest Validation

7. MCP Tool Generation
   - Mapping Rules
   - Tool Signatures
   - Input Schema Translation
   - Constraints and Safety Translation
   - Authorization and Identity
   - Tool Registry Generation
   - Generated Examples
   - Runtime Consumption Patterns

8. Authoring Guide
   - Annotating Buttons and Action Controls
   - Annotating Links and Navigation Actions
   - Annotating Forms
   - Annotating Tables and Bulk Actions
   - Annotating Search and Filters
   - Annotating Multi-Step Workflows
   - Annotating Approval Gates
   - Annotating Destructive Actions
   - Annotating Async Operations
   - Annotating Composite Flows
   - Annotating Embedded Widgets
   - Annotation Reuse Through Component Libraries

9. Use Cases
   - Search and Retrieval
   - Filtering and Faceted Navigation
   - Form Submission
   - Scheduling and Booking
   - Checkout and Purchase Flow
   - CRUD Dashboard Operations
   - Admin Console Guarded Actions
   - Data Export and Reporting
   - Customer Support Workflow
   - Multi-Step Approval Workflow
   - E-Commerce Product Discovery
   - E-Commerce Cart and Checkout
   - Marketing Campaign Creation
   - Audience Segmentation and Campaign Scheduling
   - CRM Lead Creation and Opportunity Progression
   - Sales Forecasting and Pipeline Analytics
   - Travel Search and Reservation
   - Job Search and Application Submission
   - Recruiter Queue and Interview Scheduling
   - Analytics Dashboard Filtering and Report Generation
   - SaaS Tenant-Scoped Administrative Workflows
   - Accessibility-Aligned Interaction Patterns
   - Failure Recovery and Retry Flows
   - Regulated or High-Risk Operations as optional advanced examples

10. Validation
   - Static Validation
   - Runtime Validation
   - CI Linting
   - Schema Conformance
   - Contradictory Annotation Detection
   - Missing Intent Detection
   - Unsafe Mutation Exposure Detection
   - Scope Mismatch Detection
   - Risk-Level Validation
   - Common Validation Failures
   - Remediation Guidance

11. Governance
   - Ownership Model
   - Change Review Workflow
   - Version Policy
   - Backward Compatibility
   - Deprecation Strategy
   - Release Notes Model
   - Standard Evolution Process
   - Conformance and Adoption Levels

12. Reference
   - Full Schema Reference
   - Annotation Attributes
   - Reserved Terms
   - Error Codes
   - Manifest Fields
   - Tool Mapping Rules
   - Glossary
   - Term Disambiguation

13. Tutorials
   - Add AXAG to a Human-Only Page
   - Convert a Scraping-Dependent Workflow into Semantic Operations
   - Generate a Semantic Manifest
   - Generate MCP Tools
   - Add Validation to CI
   - Roll Out AXAG Incrementally in a Large Product
   - Build a Cross-Domain Example

14. Examples
   - Before and After Examples
   - Anti-Patterns
   - Copy-Paste Snippets
   - Domain Example Gallery
   - Proposed Patterns vs Normative Rules

15. FAQ

16. Contributor Guide

==================================================
7. OUTPUT FORMAT REQUIREMENTS
==================================================

Return your answer in the following order:

1. Executive summary of the documentation system
2. Repository tree
3. docusaurus.config.ts
4. sidebars.ts
5. Navbar and footer design
6. Homepage information architecture
7. Search taxonomy
8. Versioning strategy
9. Contributor model
10. Full content outlines for every major section
11. Fully written pages for the most important sections
12. Example MDX pages
13. Example custom React components
14. Example schema explorer design
15. Example CI validation workflow
16. Deployment notes
17. Editorial and style guide for maintainers
18. Top 10 implementation tasks
19. Repo bootstrap checklist
20. Content gap analysis for future expansion

For major pages, provide:
- page title
- slug
- page purpose
- target audience
- prerequisite reading
- page classification such as Normative, Recommended, Informative, Example, or Proposed Pattern
- full page content
- callouts
- code examples
- related pages
- next steps

==================================================
8. NORMATIVE VS INFORMATIVE CONTENT
==================================================

The docs must clearly distinguish between these content classes:

- Normative
- Recommended
- Informative
- Example
- Proposed Pattern

For normative material, use RFC-style language:
- MUST
- SHOULD
- MAY
- MUST NOT
- SHOULD NOT

Where the paper is conceptually clear but not syntactically explicit, label examples as:
“Proposed Implementation Pattern”

Do not falsely present inferred syntax as canonical standard text unless explicitly stated.

Include conformance levels such as:
- Basic
- Intermediate
- Full

Explain what each conformance level requires.

==================================================
9. CONTENT DEPTH EXPECTATIONS
==================================================

This documentation must be dense, serious, and implementation-oriented.

For each major topic:
- explain the problem
- explain the model
- explain why it matters
- explain implementation mechanics
- explain failure modes
- explain operational implications
- provide examples
- provide warnings
- cross-link to related topics

Avoid shallow summaries.
Avoid promotional language.
Avoid vague phrasing.
Write as if the audience is:
- staff engineers
- principal architects
- frontend platform owners
- product engineering teams
- API and platform teams
- agent runtime builders
- enterprise standards committees

==================================================
10. SEMANTIC MODEL TO TEACH
==================================================

The docs must teach that AXAG annotations should express, at minimum, the following semantic dimensions:

- intent
- entity
- action type
- parameters
- constraints
- preconditions
- postconditions
- scope
- risk level
- safety boundaries
- confirmation requirements
- approval requirements
- visibility
- operability
- idempotency expectations where relevant
- role-awareness where relevant
- tenant or identity context where relevant
- side-effect declarations where relevant

Explain what each dimension means, why it matters, and how misuse causes operational risk.

==================================================
11. CODE EXAMPLE REQUIREMENTS
==================================================

Provide realistic examples in multiple forms:

A. HTML attribute style annotations
B. JSON metadata blocks
C. JSON-LD style examples where appropriate
D. TypeScript component wrappers
E. React examples in MDX
F. Semantic Manifest JSON
G. MCP tool mapping examples
H. CI lint rule pseudo-code
I. Runtime validation examples
J. Before-and-after scraping replacement examples

Use a plausible annotation syntax where needed, but clearly label inferred syntax as a Proposed Implementation Pattern if not canonical.

Example annotation style:

<button
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  axag-required-parameters='["query"]'
  axag-scope="catalog"
>
  Search
</button>

Example advanced annotation style:

<button
  axag-intent="checkout.begin"
  axag-entity="order"
  axag-action-type="mutate"
  axag-required-parameters='["cart_id","payment_method_id","shipping_address_id"]'
  axag-preconditions='["cart_validated","inventory_reserved"]'
  axag-postconditions='["checkout_session_created"]'
  axag-risk-level="high"
  axag-confirmation-required="true"
  axag-scope="customer"
>
  Checkout
</button>

Example manifest:

{
  "intent": "checkout.begin",
  "entity": "order",
  "operation": "begin_checkout",
  "parameters": {
    "cart_id": {
      "type": "string",
      "required": true
    },
    "payment_method_id": {
      "type": "string",
      "required": true
    },
    "shipping_address_id": {
      "type": "string",
      "required": true
    }
  },
  "preconditions": ["cart_validated", "inventory_reserved"],
  "postconditions": ["checkout_session_created"],
  "risk_level": "high",
  "scope": "customer",
  "execution_type": "mutate",
  "confirmation_required": true
}

Example tool:

{
  "tool_name": "begin_checkout",
  "description": "Start checkout for a validated cart and create a checkout session.",
  "input_schema": {
    "type": "object",
    "properties": {
      "cart_id": {
        "type": "string"
      },
      "payment_method_id": {
        "type": "string"
      },
      "shipping_address_id": {
        "type": "string"
      }
    },
    "required": ["cart_id", "payment_method_id", "shipping_address_id"]
  },
  "safety": {
    "execution_type": "mutate",
    "risk_level": "high",
    "confirmation_required": true
  }
}

==================================================
12. USE CASE DEPTH REQUIREMENTS
==================================================

For each use case page, include all of the following:

1. Problem statement
2. Why human-only semantics fail
3. User journey
4. Agent journey
5. Annotated UI example
6. Semantic Manifest excerpt
7. Generated tool example
8. Constraints and safety notes
9. Common implementation mistakes
10. Testing checklist
11. Rollout advice
12. Governance implications where relevant
13. Why scraping fails here
14. How AXAG eliminates scraping here

At minimum, fully develop these use cases:

- search and retrieval
- filtering and faceted navigation
- form submission
- scheduling and booking
- checkout flow
- CRUD dashboard
- admin console guarded actions
- data export and reporting
- multi-step approval
- customer support
- e-commerce product search
- e-commerce cart management
- e-commerce order tracking
- e-commerce returns
- marketing campaign creation
- audience segmentation
- A/B experiment setup
- campaign scheduling
- lead creation
- opportunity stage progression
- sales meeting scheduling
- sales forecasting
- travel search
- hotel or reservation booking
- booking cancellation
- job search
- application submission
- recruiter filtering queue
- interview scheduling
- analytics dashboard filtering
- metric comparison
- report generation
- dataset export
- tenant-scoped SaaS administration
- accessibility-aligned interaction patterns
- retry and recovery flows

==================================================
13. MULTI-DOMAIN USE CASE COVERAGE
==================================================

The documentation must include realistic use cases from industries where automated interaction and scraping are common today.

The goal is to demonstrate how AXAG replaces brittle scraping and prompt-based interpretation with explicit semantic interaction contracts.

Include deep examples for the following domains.

--------------------------------------------------
E-Commerce Platforms
--------------------------------------------------

Example workflows:
- product search
- faceted filtering
- product comparison
- add to cart
- checkout
- coupon application
- inventory availability
- shipping estimate
- order tracking
- return initiation

Example intents:
- product.search
- product.compare
- cart.add_item
- cart.apply_coupon
- checkout.begin
- order.track
- return.initiate

Demonstrate how AXAG eliminates scraping of product cards, cart widgets, variant selectors, and checkout surfaces.

--------------------------------------------------
Marketing Automation Platforms
--------------------------------------------------

Example workflows:
- campaign creation
- audience segmentation
- A/B experiment setup
- campaign scheduling
- lead scoring analysis
- campaign performance reporting
- audience export

Example intents:
- campaign.create
- campaign.schedule
- audience.segment.filter
- experiment.create
- campaign.performance.fetch
- audience.export

Show how semantic annotations expose campaign operations without parsing dashboard layouts.

--------------------------------------------------
Sales and CRM Platforms
--------------------------------------------------

Example workflows:
- lead creation
- opportunity management
- deal stage updates
- pipeline analytics
- meeting scheduling
- contact enrichment
- sales forecasting

Example intents:
- lead.create
- opportunity.update_stage
- pipeline.report.generate
- meeting.schedule
- contact.enrich
- forecast.generate

Demonstrate safe mutation constraints and approval requirements for high-impact actions.

--------------------------------------------------
Travel and Booking Platforms
--------------------------------------------------

Example workflows:
- flight search
- hotel search
- availability checks
- pricing comparison
- itinerary creation
- booking cancellation

Example intents:
- flight.search
- hotel.search
- hotel.reserve
- itinerary.create
- booking.cancel

Explain parameter constraints such as dates, location scope, occupancy, fare rules, and cancellation semantics.

--------------------------------------------------
Job Platforms and Recruiting Systems
--------------------------------------------------

Example workflows:
- job search
- candidate filtering
- application submission
- interview scheduling
- recruiter review queue

Example intents:
- job.search
- candidate.filter
- application.submit
- interview.schedule
- recruiter.queue.review

Demonstrate how semantic annotations replace scraping of job boards and candidate dashboards.

--------------------------------------------------
Analytics and Business Intelligence Platforms
--------------------------------------------------

Example workflows:
- report generation
- dashboard filtering
- metric comparison
- data export
- alert configuration

Example intents:
- report.generate
- dashboard.filter
- metric.compare
- dataset.export
- alert.configure

Explain how annotations expose dataset boundaries, filter semantics, and query constraints.

--------------------------------------------------
Customer Support Systems
--------------------------------------------------

Example workflows:
- ticket creation
- ticket assignment
- status updates
- escalation
- knowledge base search
- resolution confirmation

Example intents:
- ticket.create
- ticket.assign
- ticket.resolve
- ticket.escalate
- knowledge.search

Show role-based constraints, escalation rules, and confirmation semantics.

==================================================
14. SCRAPING REPLACEMENT EXPLANATION
==================================================

For each domain example include a subsection titled:

“Why scraping fails here”

Explain failure modes such as:
- DOM instability
- dynamic component rendering
- CSS class churn
- localization changes
- inconsistent labels
- hidden state logic
- multi-step modal complexity
- asynchronous state transitions
- anti-bot defenses
- brittle selector maintenance

Then include a subsection titled:

“How AXAG eliminates scraping”

Explain that the agent reads:
- AXAG annotations
- Semantic Manifest
- Tool Registry

rather than inferring operations from visual layout.

Also include a cross-domain comparison table with columns:
- Domain
- Current scraping method
- Common failure mode
- AXAG semantic intent
- Generated tool capability

Prioritize domains that currently depend heavily on scraping and automation:
- e-commerce
- marketing platforms
- CRM systems
- travel booking
- job marketplaces
- SaaS dashboards
- analytics tools

==================================================
15. CROSS-DOMAIN INTERACTION MODEL
==================================================

Add a dedicated section explaining that AXAG is domain-agnostic and can be applied across industries.

Include a diagram showing how different product types expose a common semantic interaction layer.

Example architecture:

E-Commerce UI
Marketing Dashboard
CRM System
Travel Booking App
Analytics Platform
Customer Support Console
        ↓
AXAG Semantic Contract
        ↓
Semantic Manifest
        ↓
Tool Registry
        ↓
Agent Runtime

Explain that agents interact with semantic operations rather than scraping interface structures.

==================================================
16. ANTI-PATTERN COVERAGE
==================================================

Create a strong anti-patterns section that includes:

- visual-only affordances
- ambiguous action labels
- overloaded controls with multiple meanings
- hidden side effects
- approval-gated actions exposed as simple mutations
- non-idempotent operations without warning
- validation rules that only exist in client-side code
- tenant context not declared
- role constraints not declared
- semantic drift between docs and implementation
- prompt-dependent interpretation instead of explicit contract

For each anti-pattern:
- explain why it fails
- show a broken example
- show a corrected example
- describe the operational risk

==================================================
17. VALIDATION AND CI REQUIREMENTS
==================================================

The docs must specify a practical validation approach.

Include:
- static validation rules
- runtime validation rules
- schema conformance checks
- contradictory annotation detection
- unsafe action exposure detection
- missing intent detection
- required parameter mismatch detection
- unsupported risk-level combinations
- scope mismatch detection
- version mismatch detection
- cross-artifact drift detection between annotations, manifest, and generated tools

Provide:
- lint rule naming examples
- CI pipeline example
- GitHub Actions example
- sample failing cases
- remediation guidance

Example lint rule names:
- AXAG-LINT-001 Missing intent
- AXAG-LINT-002 Invalid parameter schema
- AXAG-LINT-003 Unsafe mutate without confirmation
- AXAG-LINT-004 Scope mismatch
- AXAG-LINT-005 Ambiguous action label
- AXAG-LINT-006 Manifest drift
- AXAG-LINT-007 Unsupported risk-action combination

==================================================
18. GOVERNANCE REQUIREMENTS
==================================================

Include a governance model that explains:
- ownership model
- standards committee process
- review workflow
- change proposal format
- versioning strategy
- deprecation policy
- backward compatibility model
- release note expectations
- migration guidance between versions
- how normative changes differ from explanatory changes

Include conformance policy and adopter maturity levels.

==================================================
19. Docusaurus CONFIGURATION REQUIREMENTS
==================================================

Generate realistic examples for:
- docusaurus.config.ts
- sidebars.ts
- docs plugin config
- Mermaid support
- Prism language config
- editUrl configuration
- last update metadata
- navbar
- footer
- docs versions
- blog disabled unless justified
- custom CSS notes

Also provide recommendations for:
- Algolia or local search
- canonical URLs
- SEO metadata for docs pages
- accessible navigation structure
- homepage composition
- custom MDX components for reference tables

==================================================
20. UX REQUIREMENTS
==================================================

Design the docs as a serious technical reference portal.

The site should include:
- persistent left navigation
- top search
- breadcrumbs
- version selector
- copyable code snippets
- tabbed code blocks where useful
- strong callout taxonomy such as Note, Warning, Normative Rule, Proposed Pattern
- schema field tables
- examples gallery
- before-and-after comparisons
- “next steps” section on each page

Recommend homepage sections such as:
- hero statement
- architecture diagram
- why AXAG matters
- quickstart
- featured examples
- specification links
- contributor links

==================================================
21. SEARCH TAXONOMY
==================================================

Propose a search taxonomy for documentation discovery.

Include searchable dimensions such as:
- concept
- annotation field
- domain entity
- operation type
- use case
- risk class
- artifact type
- audience type
- domain
- validation rule
- conformance level

Also propose tags and synonyms for terms such as:
- semantic contract
- annotation
- manifest
- tool registry
- agent experience
- intent
- constraint
- action type
- scope
- approval
- risk
- tenant
- scraping replacement
- semantic operation

==================================================
22. CONTRIBUTOR MODEL
==================================================

Create a contributor guide that includes:
- how to add a page
- how to add a schema field
- how to add a use case
- how to classify content as normative or informative
- how to add examples
- how to avoid documentation drift
- review checklist
- style requirements
- diagram requirements
- versioning and deprecation process

==================================================
23. STYLE GUIDE
==================================================

Generate an editorial style guide for maintainers.

It must enforce:
- precise technical writing
- active voice
- consistent terminology
- explicit distinction between normative and illustrative content
- avoidance of ambiguous phrasing
- no unexplained jargon
- field names written consistently
- examples that are copyable and realistic
- warnings where misuse could create production risk
- consistent treatment of proposed implementation patterns

==================================================
24. DIAGRAM REQUIREMENTS
==================================================

Provide diagrams in both descriptive text and Mermaid where useful.

At minimum include:
1. AX architecture flow
2. Annotation to manifest pipeline
3. Manifest to tool generation pipeline
4. Runtime agent execution loop
5. Multi-step approval workflow
6. Tenant-scoped enterprise workflow
7. E-commerce semantic interaction path
8. Marketing campaign semantic workflow
9. CRM stage progression semantic flow
10. Validation and CI pipeline
11. Cross-domain semantic contract model

==================================================
25. DELIVERABLE QUALITY BAR
==================================================

The output must read like a real documentation program kickoff package.

It must be specific enough that a team could:
- initialize the repo
- populate the docs
- assign ownership
- deploy the site
- onboard contributors
- validate changes
- evolve the specification safely

Do not stop at outlines only.
Write full content for the most important pages.
Write with technical depth and operational realism.

==================================================
26. SPECIAL INSTRUCTIONS
==================================================

Treat AXAG as a standards-grade, implementation-oriented documentation subject.

Do not reduce the content to a blog article.
Do not optimize for marketing language.
Optimize for clarity, trust, depth, and production utility.

Where the source paper is conceptually suggestive but not syntactically exhaustive, infer responsibly and label those sections as Proposed Implementation Pattern.

Preserve this editorial anchor across the docs:

“AX defines the discipline. AXAG defines the executable semantic contract.”

==================================================
27. ADDITIONAL OUTPUT CONSTRAINTS
==================================================

Generate at least:
- 20 concrete documentation page stubs with frontmatter
- 8 fully written major pages
- 30 annotation examples
- 10 Semantic Manifest examples
- 10 tool generation examples
- 5 Mermaid diagrams
- 1 full GitHub Actions CI example
- 1 CONTRIBUTING.md or contributor guide
- 1 README.md for the docs repo
- 1 architecture decision record explaining why Docusaurus was chosen
- 1 sample custom MDX component for schema fields
- 1 cross-domain scraping replacement comparison table

==================================================
28. FINAL OUTPUT ENDING
==================================================

End the output with:

1. Top 10 next implementation tasks
2. Repo bootstrap checklist
3. Content gap analysis for future expansion
4. Risks and assumptions log