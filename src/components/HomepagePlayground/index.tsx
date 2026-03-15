import React, { useState, useCallback, useMemo } from 'react';
import styles from './styles.module.css';

const DEFAULT_HTML = `<button
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  axag-required-parameters='["query"]'
  axag-optional-parameters='["category","price_min","price_max"]'
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="Search the product catalogue"
>
  Search Products
</button>`;

interface ParsedAnnotation {
  intent?: string;
  entity?: string;
  actionType?: string;
  requiredParameters?: string[];
  optionalParameters?: string[];
  riskLevel?: string;
  idempotent?: boolean;
  description?: string;
  confirmationRequired?: boolean;
  approvalRequired?: boolean;
  approvalRoles?: string[];
  preconditions?: string[];
  postconditions?: string[];
  sideEffects?: string[];
  scope?: string;
  requiredRoles?: string[];
  constraints?: string;
}

function parseAxagAttributes(html: string): ParsedAnnotation {
  const result: ParsedAnnotation = {};

  const attrMap: Record<string, keyof ParsedAnnotation> = {
    'axag-intent': 'intent',
    'axag-entity': 'entity',
    'axag-action-type': 'actionType',
    'axag-risk-level': 'riskLevel',
    'axag-description': 'description',
    'axag-scope': 'scope',
    'axag-constraints': 'constraints',
  };

  const boolMap: Record<string, keyof ParsedAnnotation> = {
    'axag-idempotent': 'idempotent',
    'axag-confirmation-required': 'confirmationRequired',
    'axag-approval-required': 'approvalRequired',
  };

  const arrayMap: Record<string, keyof ParsedAnnotation> = {
    'axag-required-parameters': 'requiredParameters',
    'axag-optional-parameters': 'optionalParameters',
    'axag-approval-roles': 'approvalRoles',
    'axag-preconditions': 'preconditions',
    'axag-postconditions': 'postconditions',
    'axag-side-effects': 'sideEffects',
    'axag-required-roles': 'requiredRoles',
  };

  // Parse string attributes
  for (const [attr, key] of Object.entries(attrMap)) {
    const match = html.match(new RegExp(`${attr}=["']([^"']*)["']`));
    if (match) {
      (result as any)[key] = match[1];
    }
  }

  // Parse boolean attributes
  for (const [attr, key] of Object.entries(boolMap)) {
    const match = html.match(new RegExp(`${attr}=["']([^"']*)["']`));
    if (match) {
      (result as any)[key] = match[1] === 'true';
    }
  }

  // Parse array attributes (JSON arrays in single quotes)
  for (const [attr, key] of Object.entries(arrayMap)) {
    const match = html.match(new RegExp(`${attr}='(\\[.*?\\])'`));
    if (match) {
      try {
        (result as any)[key] = JSON.parse(match[1]);
      } catch {
        // skip invalid JSON
      }
    }
  }

  return result;
}

function generateManifest(parsed: ParsedAnnotation): object | null {
  if (!parsed.intent) return null;

  const manifest: any = {
    $schema: 'https://axag.dev/schema/v1/manifest.json',
    intent: parsed.intent,
  };

  if (parsed.entity) manifest.entity = parsed.entity;
  if (parsed.actionType) manifest.action_type = parsed.actionType;
  if (parsed.description) manifest.description = parsed.description;

  if (parsed.requiredParameters || parsed.optionalParameters) {
    manifest.parameters = {};
    if (parsed.requiredParameters) manifest.parameters.required = parsed.requiredParameters;
    if (parsed.optionalParameters) manifest.parameters.optional = parsed.optionalParameters;
  }

  if (parsed.riskLevel) manifest.risk_level = parsed.riskLevel;
  if (parsed.idempotent !== undefined) manifest.idempotent = parsed.idempotent;
  if (parsed.confirmationRequired !== undefined) manifest.confirmation_required = parsed.confirmationRequired;
  if (parsed.approvalRequired !== undefined) manifest.approval_required = parsed.approvalRequired;
  if (parsed.approvalRoles) manifest.approval_roles = parsed.approvalRoles;
  if (parsed.preconditions) manifest.preconditions = parsed.preconditions;
  if (parsed.postconditions) manifest.postconditions = parsed.postconditions;
  if (parsed.sideEffects) manifest.side_effects = parsed.sideEffects;
  if (parsed.scope) manifest.scope = parsed.scope;
  if (parsed.requiredRoles) manifest.required_roles = parsed.requiredRoles;

  return manifest;
}

function generateMCPTool(parsed: ParsedAnnotation): object | null {
  if (!parsed.intent) return null;

  const toolName = parsed.intent.replace(/\./g, '_');
  const tool: any = {
    name: toolName,
    description: parsed.description || `Execute ${parsed.intent}`,
    inputSchema: {
      type: 'object',
      properties: {},
      required: [] as string[],
    },
  };

  // Build properties from parameters
  const allParams = [
    ...(parsed.requiredParameters || []),
    ...(parsed.optionalParameters || []),
  ];

  for (const param of allParams) {
    tool.inputSchema.properties[param] = {
      type: 'string',
      description: `The ${param.replace(/_/g, ' ')}`,
    };
  }

  if (parsed.requiredParameters) {
    tool.inputSchema.required = parsed.requiredParameters;
  }

  // Safety metadata
  const safety: any = {};
  if (parsed.riskLevel) safety.risk_level = parsed.riskLevel;
  if (parsed.idempotent !== undefined) safety.idempotent = parsed.idempotent;
  if (parsed.confirmationRequired !== undefined) safety.confirmation_required = parsed.confirmationRequired;
  if (parsed.approvalRequired !== undefined) safety.approval_required = parsed.approvalRequired;
  if (parsed.sideEffects) safety.side_effects = parsed.sideEffects;

  if (Object.keys(safety).length > 0) {
    tool.safety = safety;
  }

  return tool;
}

type TabId = 'manifest' | 'mcp-tool';

export default function HomepagePlayground(): JSX.Element {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [activeTab, setActiveTab] = useState<TabId>('manifest');

  const parsed = useMemo(() => parseAxagAttributes(html), [html]);
  const manifest = useMemo(() => generateManifest(parsed), [parsed]);
  const mcpTool = useMemo(() => generateMCPTool(parsed), [parsed]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtml(e.target.value);
  }, []);

  const outputJson = activeTab === 'manifest' ? manifest : mcpTool;
  const attributeCount = Object.keys(parsed).filter(k => (parsed as any)[k] !== undefined).length;

  return (
    <section className={styles.playground}>
      <div className="container">
        <div className={styles.header}>
          <h2>Try It Live</h2>
          <p>
            Edit the HTML below — watch the Semantic Manifest and MCP Tool
            generate in real time.
          </p>
        </div>

        <div className={styles.editorContainer}>
          {/* Left Panel — HTML Editor */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelDot} style={{ background: '#ef4444' }} />
              <span className={styles.panelDot} style={{ background: '#f59e0b' }} />
              <span className={styles.panelDot} style={{ background: '#22c55e' }} />
              <span className={styles.panelTitle}>index.html</span>
              <span className={styles.badge}>
                {attributeCount} attribute{attributeCount !== 1 ? 's' : ''} detected
              </span>
            </div>
            <textarea
              className={styles.codeEditor}
              value={html}
              onChange={handleChange}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>

          {/* Connector Arrow */}
          <div className={styles.connector}>
            <div className={styles.connectorArrow}>
              <svg width="40" height="24" viewBox="0 0 40 24">
                <defs>
                  <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--ifm-color-primary)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--ifm-color-primary)" />
                  </linearGradient>
                </defs>
                <path d="M0 12 L30 12 M24 6 L32 12 L24 18" stroke="url(#arrowGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className={styles.connectorLabel}>generates</span>
          </div>

          {/* Right Panel — Output */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelDot} style={{ background: '#ef4444' }} />
              <span className={styles.panelDot} style={{ background: '#f59e0b' }} />
              <span className={styles.panelDot} style={{ background: '#22c55e' }} />
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${activeTab === 'manifest' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('manifest')}
                >
                  Manifest
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'mcp-tool' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('mcp-tool')}
                >
                  MCP Tool
                </button>
              </div>
            </div>
            <pre className={styles.codeOutput}>
              <code>
                {outputJson
                  ? JSON.stringify(outputJson, null, 2)
                  : '// Add axag-intent to see output'}
              </code>
            </pre>
          </div>
        </div>

        <p className={styles.hint}>
          💡 Try changing <code>axag-action-type</code> to <code>"write"</code> and
          adding <code>axag-risk-level="high"</code> — watch the safety metadata appear.
        </p>
      </div>
    </section>
  );
}
