/**
 * Custom CodeBlock wrapper — adds language badges, enhanced styling,
 * and auto-line-numbers for code blocks with ≥ 8 lines.
 *
 * Wraps the default Docusaurus CodeBlock with a containing <div> that
 * carries the language label and optional filename title.
 */

import React from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import type { WrapperProps } from '@docusaurus/types';
import type CodeBlockType from '@theme/CodeBlock';

type Props = WrapperProps<typeof CodeBlockType>;

/* Human-friendly labels for Prism language identifiers */
const LANGUAGE_LABELS: Record<string, string> = {
  html: 'HTML',
  xml: 'XML',
  json: 'JSON',
  json5: 'JSON5',
  jsonc: 'JSONC',
  yaml: 'YAML',
  yml: 'YAML',
  bash: 'Bash',
  sh: 'Shell',
  shell: 'Shell',
  zsh: 'Zsh',
  typescript: 'TypeScript',
  ts: 'TypeScript',
  javascript: 'JavaScript',
  js: 'JavaScript',
  jsx: 'JSX',
  tsx: 'TSX',
  css: 'CSS',
  scss: 'SCSS',
  python: 'Python',
  py: 'Python',
  markdown: 'Markdown',
  md: 'Markdown',
  mdx: 'MDX',
  sql: 'SQL',
  graphql: 'GraphQL',
  diff: 'Diff',
  http: 'HTTP',
  markup: 'HTML',
  plaintext: 'Text',
  text: 'Text',
  mermaid: 'Mermaid',
};

/* Language → accent colour mapping (CSS custom properties) */
const LANGUAGE_COLORS: Record<string, string> = {
  html: '#e34f26',
  xml: '#e34f26',
  json: '#f5a623',
  yaml: '#cb171e',
  yml: '#cb171e',
  bash: '#4eaa25',
  sh: '#4eaa25',
  shell: '#4eaa25',
  typescript: '#3178c6',
  ts: '#3178c6',
  javascript: '#f7df1e',
  js: '#f7df1e',
  jsx: '#61dafb',
  tsx: '#3178c6',
  css: '#264de4',
  python: '#3776ab',
  py: '#3776ab',
  markdown: '#083fa1',
  md: '#083fa1',
  diff: '#41b883',
  sql: '#e38c00',
};

export default function CodeBlockWrapper(props: Props): React.ReactElement {
  const { children, ...rest } = props;

  // Extract language from the code block metadata
  const language =
    (rest as Record<string, unknown>).language as string | undefined;
  const title = (rest as Record<string, unknown>).title as string | undefined;
  const metastring = (rest as Record<string, unknown>).metastring as
    | string
    | undefined;

  // Determine the display label and accent colour
  const lang = language?.toLowerCase() || '';
  const label = LANGUAGE_LABELS[lang] || (lang ? lang.toUpperCase() : '');
  const accent = LANGUAGE_COLORS[lang] || '#6b7280';

  // Skip wrapping for mermaid diagrams — they render as SVG, not code
  if (lang === 'mermaid') {
    return <CodeBlock {...rest}>{children}</CodeBlock>;
  }

  // Count lines to decide whether to auto-add line numbers
  let lineCount = 0;
  if (typeof children === 'string') {
    lineCount = children.split('\n').length;
  }

  // Auto-enable line numbers for blocks with ≥ 8 lines (unless explicitly set)
  const showLineNumbers =
    (rest as Record<string, unknown>).showLineNumbers !== undefined
      ? (rest as Record<string, unknown>).showLineNumbers
      : lineCount >= 8;

  return (
    <div
      className={`axag-code-block axag-code-block--${lang || 'plain'}`}
      style={{ '--axag-code-accent': accent } as React.CSSProperties}
    >
      {/* Language badge */}
      {label && !title && (
        <div className="axag-code-block__badge" aria-hidden="true">
          <span
            className="axag-code-block__badge-dot"
            style={{ backgroundColor: accent }}
          />
          {label}
        </div>
      )}

      {/* File-tab title (uses the `title="..."` prop) */}
      {title && (
        <div className="axag-code-block__title" aria-label={`File: ${title}`}>
          <span className="axag-code-block__title-icon">📄</span>
          {title}
          {label && (
            <span
              className="axag-code-block__title-lang"
              style={{ color: accent }}
            >
              {label}
            </span>
          )}
        </div>
      )}

      <CodeBlock {...rest} showLineNumbers={showLineNumbers as boolean}>
        {children}
      </CodeBlock>
    </div>
  );
}
