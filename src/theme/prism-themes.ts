/**
 * Custom Prism themes for AXAG documentation.
 *
 * Light: "AXAG Light" — inspired by VS Code Light+ with AXAG accent colours
 * Dark:  "AXAG Dark"  — inspired by VS Code Dark+ / One Dark Pro
 *
 * Both themes give special emphasis to HTML attributes (where axag-* lives)
 * and provide clear differentiation between tags, attributes, values, and comments.
 */

import type { PrismTheme } from 'prism-react-renderer';

/* ─── AXAG Light Theme ─────────────────────────────────────────────── */

export const axagLight: PrismTheme = {
  plain: {
    color: '#24292f',
    backgroundColor: '#f6f8fa',
  },
  styles: [
    /* ── Comments ────────────────────────── */
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#6a737d', fontStyle: 'italic' as const },
    },

    /* ── Punctuation & operators ─────────── */
    {
      types: ['punctuation'],
      style: { color: '#6a737d' },
    },
    {
      types: ['operator'],
      style: { color: '#d73a49' },
    },

    /* ── Namespace ───────────────────────── */
    {
      types: ['namespace'],
      style: { opacity: 0.8 },
    },

    /* ── HTML/XML tags ───────────────────── */
    {
      types: ['tag'],
      style: { color: '#22863a' },
    },

    /* ── Attribute names (axag-* live here) */
    {
      types: ['attr-name'],
      style: { color: '#6f42c1', fontWeight: 'bold' as const },
    },

    /* ── Attribute values / strings ──────── */
    {
      types: ['attr-value', 'string', 'char'],
      style: { color: '#032f62' },
    },

    /* ── Numbers ─────────────────────────── */
    {
      types: ['number'],
      style: { color: '#005cc5' },
    },

    /* ── Booleans, null, constants ────────── */
    {
      types: ['boolean', 'constant'],
      style: { color: '#005cc5' },
    },

    /* ── Keywords ─────────────────────────── */
    {
      types: ['keyword'],
      style: { color: '#d73a49', fontWeight: 'bold' as const },
    },

    /* ── Built-ins, class names ───────────── */
    {
      types: ['builtin', 'class-name'],
      style: { color: '#6f42c1' },
    },

    /* ── Functions ────────────────────────── */
    {
      types: ['function'],
      style: { color: '#6f42c1' },
    },

    /* ── Properties (JSON keys) ──────────── */
    {
      types: ['property'],
      style: { color: '#005cc5' },
    },

    /* ── Regex, important, variable ──────── */
    {
      types: ['regex', 'important', 'variable'],
      style: { color: '#e36209' },
    },

    /* ── Selectors (CSS) ─────────────────── */
    {
      types: ['selector'],
      style: { color: '#22863a' },
    },

    /* ── Inserted (diff) ─────────────────── */
    {
      types: ['inserted'],
      style: { color: '#22863a', backgroundColor: '#f0fff4' },
    },

    /* ── Deleted (diff) ──────────────────── */
    {
      types: ['deleted'],
      style: { color: '#b31d28', backgroundColor: '#ffeef0' },
    },

    /* ── Shell commands ──────────────────── */
    {
      types: ['symbol'],
      style: { color: '#e36209' },
    },

    /* ── Template strings ────────────────── */
    {
      types: ['template-string'],
      style: { color: '#032f62' },
    },

    /* ── YAML / frontmatter keys ─────────── */
    {
      types: ['atrule'],
      style: { color: '#d73a49' },
    },
  ],
};

/* ─── AXAG Dark Theme ──────────────────────────────────────────────── */

export const axagDark: PrismTheme = {
  plain: {
    color: '#e1e4e8',
    backgroundColor: '#1e1e2e',
  },
  styles: [
    /* ── Comments ────────────────────────── */
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#6a9955', fontStyle: 'italic' as const },
    },

    /* ── Punctuation & operators ─────────── */
    {
      types: ['punctuation'],
      style: { color: '#808080' },
    },
    {
      types: ['operator'],
      style: { color: '#d4d4d4' },
    },

    /* ── Namespace ───────────────────────── */
    {
      types: ['namespace'],
      style: { opacity: 0.8 },
    },

    /* ── HTML/XML tags ───────────────────── */
    {
      types: ['tag'],
      style: { color: '#569cd6' },
    },

    /* ── Attribute names (axag-* live here) */
    {
      types: ['attr-name'],
      style: { color: '#9cdcfe', fontWeight: 'bold' as const },
    },

    /* ── Attribute values / strings ──────── */
    {
      types: ['attr-value', 'string', 'char'],
      style: { color: '#ce9178' },
    },

    /* ── Numbers ─────────────────────────── */
    {
      types: ['number'],
      style: { color: '#b5cea8' },
    },

    /* ── Booleans, null, constants ────────── */
    {
      types: ['boolean', 'constant'],
      style: { color: '#569cd6' },
    },

    /* ── Keywords ─────────────────────────── */
    {
      types: ['keyword'],
      style: { color: '#c586c0', fontWeight: 'bold' as const },
    },

    /* ── Built-ins, class names ───────────── */
    {
      types: ['builtin', 'class-name'],
      style: { color: '#4ec9b0' },
    },

    /* ── Functions ────────────────────────── */
    {
      types: ['function'],
      style: { color: '#dcdcaa' },
    },

    /* ── Properties (JSON keys) ──────────── */
    {
      types: ['property'],
      style: { color: '#9cdcfe' },
    },

    /* ── Regex, important, variable ──────── */
    {
      types: ['regex', 'important', 'variable'],
      style: { color: '#d7ba7d' },
    },

    /* ── Selectors (CSS) ─────────────────── */
    {
      types: ['selector'],
      style: { color: '#d7ba7d' },
    },

    /* ── Inserted (diff) ─────────────────── */
    {
      types: ['inserted'],
      style: { color: '#b5cea8', backgroundColor: 'rgba(0, 64, 0, 0.3)' },
    },

    /* ── Deleted (diff) ──────────────────── */
    {
      types: ['deleted'],
      style: { color: '#ce9178', backgroundColor: 'rgba(64, 0, 0, 0.3)' },
    },

    /* ── Shell commands ──────────────────── */
    {
      types: ['symbol'],
      style: { color: '#d7ba7d' },
    },

    /* ── Template strings ────────────────── */
    {
      types: ['template-string'],
      style: { color: '#ce9178' },
    },

    /* ── YAML / frontmatter keys ─────────── */
    {
      types: ['atrule'],
      style: { color: '#c586c0' },
    },
  ],
};
