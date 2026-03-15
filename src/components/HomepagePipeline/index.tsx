import React, { useState } from 'react';
import styles from './styles.module.css';

interface Stage {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  detail: string;
  code: string;
}

const stages: Stage[] = [
  {
    id: 'html',
    icon: '🏷️',
    title: 'HTML + AXAG',
    subtitle: 'Annotate',
    detail: 'Developers add axag-* attributes to existing HTML elements, declaring intent, parameters, safety rules, and constraints.',
    code: `<button
  axag-intent="order.place"
  axag-entity="order"
  axag-action-type="write"
  axag-risk-level="high"
  axag-confirmation-required="true"
>Place Order</button>`,
  },
  {
    id: 'manifest',
    icon: '📋',
    title: 'Semantic Manifest',
    subtitle: 'Generate',
    detail: 'A build step scans annotated HTML and produces a structured JSON manifest — the single source of truth for all agent-consumable operations.',
    code: `{
  "intent": "order.place",
  "entity": "order",
  "action_type": "write",
  "risk_level": "high",
  "confirmation_required": true
}`,
  },
  {
    id: 'tool',
    icon: '🔧',
    title: 'MCP Tool',
    subtitle: 'Map',
    detail: 'The manifest maps to MCP-compatible tool definitions with input schemas, safety metadata, and execution constraints.',
    code: `{
  "name": "order_place",
  "inputSchema": {
    "type": "object",
    "required": ["cart_id"]
  },
  "safety": {
    "risk_level": "high",
    "confirmation_required": true
  }
}`,
  },
  {
    id: 'agent',
    icon: '🤖',
    title: 'Agent Runtime',
    subtitle: 'Execute',
    detail: 'The agent discovers tools, validates preconditions, respects safety boundaries, and executes deterministically — no scraping needed.',
    code: `Agent: "Place order for cart_123"
→ Discovers: order_place tool
→ Validates: risk=high, needs confirm
→ Asks user: "Confirm order placement?"
→ Executes: POST /api/orders
→ Result: Order #4582 created ✓`,
  },
];

export default function HomepagePipeline(): JSX.Element {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  return (
    <section className={styles.pipeline}>
      <div className="container">
        <div className={styles.header}>
          <h2>How It Works</h2>
          <p>
            One annotation → one manifest → one tool → deterministic agent action.
            Click any stage to explore.
          </p>
        </div>

        <div className={styles.flow}>
          {stages.map((stage, index) => (
            <React.Fragment key={stage.id}>
              {/* Stage Node */}
              <div
                className={`${styles.stage} ${expandedStage === stage.id ? styles.stageExpanded : ''}`}
                onClick={() =>
                  setExpandedStage(expandedStage === stage.id ? null : stage.id)
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setExpandedStage(expandedStage === stage.id ? null : stage.id);
                  }
                }}
              >
                <div className={styles.stageIcon}>{stage.icon}</div>
                <div className={styles.stageTitle}>{stage.title}</div>
                <div className={styles.stageSubtitle}>{stage.subtitle}</div>

                {expandedStage === stage.id && (
                  <div className={styles.stageDetail}>
                    <p>{stage.detail}</p>
                    <pre className={styles.stageCode}>
                      <code>{stage.code}</code>
                    </pre>
                  </div>
                )}
              </div>

              {/* Connector */}
              {index < stages.length - 1 && (
                <div className={styles.arrow}>
                  <div className={styles.arrowLine} />
                  <div className={styles.arrowHead}>
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path d="M4 2 L12 8 L4 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {/* Animated pulse */}
                  <div className={styles.arrowPulse} style={{ animationDelay: `${index * 0.6}s` }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
