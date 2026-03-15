/**
 * Interactive Before/After Comparison Component
 *
 * Features:
 * - Toggle between Before / After / Side-by-Side / Pipeline views
 * - Animated transitions between views
 * - Metric counters with animated values
 * - Expandable migration checklist
 * - Color-coded diff-style indicators
 */

import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

/* ── Types ────────────────────────────────────────────────────── */

interface ComparisonItem {
  label: string;
  before: string;
  after: string;
  icon?: string;
}

interface PipelineStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  code?: string;
  lang?: string;
}

interface MetricItem {
  label: string;
  before: string | number;
  after: string | number;
  improvement: string;
  icon: string;
}

interface ChecklistItem {
  text: string;
  done?: boolean;
}

interface BeforeAfterInteractiveProps {
  /** Code to show in the "Before" panel */
  beforeCode: string;
  /** Code to show in the "After" panel */
  afterCode: string;
  /** Language for before code (e.g. 'python') */
  beforeLang?: string;
  /** Language for after code (e.g. 'html') */
  afterLang?: string;
  /** Title for the before panel */
  beforeTitle?: string;
  /** Title for the after panel */
  afterTitle?: string;
  /** Comparison metrics table data */
  comparisons?: ComparisonItem[];
  /** Pipeline / migration steps */
  pipeline?: PipelineStep[];
  /** Metric counters */
  metrics?: MetricItem[];
  /** Migration checklist */
  checklist?: ChecklistItem[];
}

type ViewMode = 'before' | 'after' | 'side-by-side' | 'pipeline';

/* ── Animated Counter ─────────────────────────────────────────── */

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const numMatch = value.match(/^(\d+)/);
  const [displayed, setDisplayed] = useState(0);
  const target = numMatch ? parseInt(numMatch[1], 10) : 0;

  useEffect(() => {
    if (!numMatch) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayed(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  if (!numMatch) return <span>{value}</span>;
  const rest = value.slice(numMatch[0].length);
  return <span>{displayed}{rest}{suffix}</span>;
}

/* ── Main Component ───────────────────────────────────────────── */

export default function BeforeAfterInteractive({
  beforeCode,
  afterCode,
  beforeLang = 'python',
  afterLang = 'html',
  beforeTitle = '❌ Before — Fragile Scraping',
  afterTitle = '✅ After — AXAG Semantic',
  comparisons = [],
  pipeline = [],
  metrics = [],
  checklist = [],
}: BeforeAfterInteractiveProps): React.ReactElement {
  const [view, setView] = useState<ViewMode>('side-by-side');
  const [checkState, setCheckState] = useState<boolean[]>(
    checklist.map((c) => c.done ?? false)
  );
  const [animateIn, setAnimateIn] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Trigger entrance animation once visible */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleCheck = (i: number) =>
    setCheckState((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const completedCount = checkState.filter(Boolean).length;

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${animateIn ? styles.animateIn : ''}`}
    >
      {/* ── View Mode Tabs ──────────────────────────────────── */}
      <div className={styles.tabs}>
        {(
          [
            { key: 'before', label: '❌ Before', icon: '🔴' },
            { key: 'after', label: '✅ After', icon: '🟢' },
            { key: 'side-by-side', label: '⚡ Compare', icon: '↔' },
            ...(pipeline.length > 0
              ? [{ key: 'pipeline', label: '🔄 Pipeline', icon: '🔄' }]
              : []),
          ] as { key: ViewMode; label: string; icon: string }[]
        ).map(({ key, label }) => (
          <button
            key={key}
            className={`${styles.tab} ${view === key ? styles.tabActive : ''}`}
            onClick={() => setView(key)}
            aria-pressed={view === key}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Code Panels ─────────────────────────────────────── */}
      <div className={styles.panels} data-view={view}>
        {(view === 'before' || view === 'side-by-side') && (
          <div className={`${styles.panel} ${styles.panelBefore}`}>
            <div className={styles.panelHeader}>
              <span className={styles.statusDot} data-status="bad" />
              <span className={styles.panelTitle}>{beforeTitle}</span>
              <span className={styles.langBadge}>{beforeLang.toUpperCase()}</span>
            </div>
            <pre className={styles.code}>
              <code>{beforeCode}</code>
            </pre>
          </div>
        )}

        {view === 'side-by-side' && (
          <div className={styles.arrowDivider} aria-hidden="true">
            <div className={styles.arrowLine} />
            <span className={styles.arrowIcon}>→</span>
            <div className={styles.arrowLine} />
          </div>
        )}

        {(view === 'after' || view === 'side-by-side') && (
          <div className={`${styles.panel} ${styles.panelAfter}`}>
            <div className={styles.panelHeader}>
              <span className={styles.statusDot} data-status="good" />
              <span className={styles.panelTitle}>{afterTitle}</span>
              <span className={styles.langBadge}>{afterLang.toUpperCase()}</span>
            </div>
            <pre className={styles.code}>
              <code>{afterCode}</code>
            </pre>
          </div>
        )}

        {/* ── Pipeline View ──────────────────────────────────── */}
        {view === 'pipeline' && (
          <div className={styles.pipelineContainer}>
            {pipeline.map((step, i) => (
              <div key={i} className={styles.pipelineStep}>
                <div className={styles.pipelineIcon}>{step.icon}</div>
                <div className={styles.pipelineContent}>
                  <div className={styles.pipelineNumber}>Step {step.step}</div>
                  <div className={styles.pipelineTitle}>{step.title}</div>
                  <div className={styles.pipelineDesc}>{step.description}</div>
                  {step.code && (
                    <pre className={styles.pipelineCode}>
                      <code>{step.code}</code>
                    </pre>
                  )}
                </div>
                {i < pipeline.length - 1 && (
                  <div className={styles.pipelineConnector}>▼</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Metrics Cards ───────────────────────────────────── */}
      {metrics.length > 0 && (
        <div className={styles.metricsSection}>
          <h3 className={styles.sectionTitle}>📊 Impact Metrics</h3>
          <div className={styles.metricsGrid}>
            {metrics.map((m, i) => (
              <div key={i} className={styles.metricCard}>
                <div className={styles.metricIcon}>{m.icon}</div>
                <div className={styles.metricLabel}>{m.label}</div>
                <div className={styles.metricValues}>
                  <span className={styles.metricBefore}>{m.before}</span>
                  <span className={styles.metricArrow}>→</span>
                  <span className={styles.metricAfter}>{m.after}</span>
                </div>
                <div className={styles.metricImprovement}>{m.improvement}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Comparison Table ────────────────────────────────── */}
      {comparisons.length > 0 && (
        <div className={styles.comparisonSection}>
          <h3 className={styles.sectionTitle}>⚖️ Feature Comparison</h3>
          <div className={styles.comparisonTable}>
            <div className={`${styles.compRow} ${styles.compHeader}`}>
              <div className={styles.compCell}>Aspect</div>
              <div className={`${styles.compCell} ${styles.compBefore}`}>
                Scraping
              </div>
              <div className={`${styles.compCell} ${styles.compAfter}`}>
                AXAG Semantic
              </div>
            </div>
            {comparisons.map((c, i) => (
              <div key={i} className={styles.compRow}>
                <div className={`${styles.compCell} ${styles.compLabel}`}>
                  {c.icon && <span className={styles.compIcon}>{c.icon}</span>}
                  {c.label}
                </div>
                <div className={`${styles.compCell} ${styles.compBefore}`}>
                  {c.before}
                </div>
                <div className={`${styles.compCell} ${styles.compAfter}`}>
                  {c.after}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Migration Checklist ──────────────────────────────── */}
      {checklist.length > 0 && (
        <div className={styles.checklistSection}>
          <h3 className={styles.sectionTitle}>
            ✅ Migration Checklist
            <span className={styles.checkProgress}>
              {completedCount}/{checklist.length}
            </span>
          </h3>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${(completedCount / checklist.length) * 100}%`,
              }}
            />
          </div>
          <ul className={styles.checklistList}>
            {checklist.map((item, i) => (
              <li
                key={i}
                className={`${styles.checklistItem} ${checkState[i] ? styles.checklistDone : ''}`}
                onClick={() => toggleCheck(i)}
                role="checkbox"
                aria-checked={checkState[i]}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCheck(i);
                  }
                }}
              >
                <span className={styles.checkbox}>
                  {checkState[i] ? '☑' : '☐'}
                </span>
                <span className={styles.checkText}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
