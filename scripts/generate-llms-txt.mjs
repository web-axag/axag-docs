#!/usr/bin/env node

/**
 * Generate llms.txt and llms-full.txt.
 *
 * An agent that lands on this site should be able to read the standard without
 * rendering it. `llms.txt` is the map — every page, one line each, in the order
 * the sidebar presents them. `llms-full.txt` is the whole thing as plain text,
 * for a model that would rather read once than crawl 140 pages.
 *
 * Both are generated from the docs themselves, so they can't drift.
 *
 * Usage: node scripts/generate-llms-txt.mjs
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const SITE = 'https://axag.org';
const DOCS_BASE = '/docs';
const DOCS_DIR = join(process.cwd(), 'docs');
const SIDEBAR = join(process.cwd(), 'sidebars.ts');
const OUT_DIR = join(process.cwd(), 'static');

/* ─── Read every doc, keyed by its id ─────────── */

function docFiles(dir) {
  return readdirSync(dir).flatMap(entry => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return docFiles(full);
    return ['.md', '.mdx'].includes(extname(full)) ? [full] : [];
  });
}

function frontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { data: {}, body: source };

  const data = {};
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([a-z_]+):\s*(.*)$/i);
    if (!field) continue;
    data[field[1]] = field[2].trim().replace(/^["']|["']$/g, '');
  }
  return { data, body: source.slice(match[0].length) };
}

const docs = new Map();
for (const file of docFiles(DOCS_DIR)) {
  const { data, body } = frontmatter(readFileSync(file, 'utf-8'));
  const relative = file.slice(DOCS_DIR.length + 1).replace(/\.mdx?$/, '');
  const id = data.id ? relative.replace(/[^/]+$/, data.id) : relative;
  docs.set(id, {
    id,
    title: data.title || data.sidebar_label || id,
    description: data.description || '',
    url: SITE + DOCS_BASE + (data.slug || `/${id}`),
    body,
  });
}

/* ─── Follow the sidebar, so the order is the one readers see ─── */

function sidebarSections() {
  const source = readFileSync(SIDEBAR, 'utf-8');
  const sections = [];
  let current;

  for (const line of source.split('\n')) {
    const label = line.match(/label:\s*'([^']+)'/);
    if (label) {
      current = { label: label[1], ids: [] };
      sections.push(current);
      continue;
    }
    const id = line.match(/^\s*'([a-z0-9-]+(?:\/[a-z0-9-]+)*)',?\s*$/);
    if (id && current) current.ids.push(id[1]);
  }
  return sections.filter(section => section.ids.length > 0);
}

const sections = sidebarSections();
const listed = new Set(sections.flatMap(section => section.ids));
const missing = [...docs.keys()].filter(id => !listed.has(id));
if (missing.length > 0) sections.push({ label: 'Other pages', ids: missing });

/* ─── llms.txt: the map ───────────────────────── */

const summary =
  'AXAG (Agent Experience Accessibility Guidelines) is a standard for annotating web UIs so AI agents can ' +
  'discover and invoke what a page does, instead of scraping it. Authors add `axag-*` attributes to existing ' +
  'HTML; tooling turns those into a Semantic Manifest and MCP or WebMCP tools an agent runtime can register.';

const index = [
  '# AXAG — Agent Experience Accessibility Guidelines',
  '',
  `> ${summary}`,
  '',
  'Key ideas: an **intent** (`entity.verb`) names what an action does; **risk level**, **confirmation** and',
  '**approval** describe how dangerous it is; **parameters** come from the form the action submits. A page',
  'annotated this way produces a manifest that is the same whether it was read at build time or in the browser.',
  '',
  `The whole specification as one file: ${SITE}/llms-full.txt`,
  `Machine-readable manifest schema: ${SITE}/schema/v1.1/axag-manifest.schema.json`,
  '',
];

for (const section of sections) {
  index.push(`## ${section.label}`, '');
  for (const id of section.ids) {
    const doc = docs.get(id);
    if (!doc) continue;
    index.push(`- [${doc.title}](${doc.url})${doc.description ? `: ${doc.description}` : ''}`);
  }
  index.push('');
}

writeFileSync(join(OUT_DIR, 'llms.txt'), index.join('\n'));

/* ─── llms-full.txt: everything, as plain text ── */

/** MDX machinery a reader doesn't need: imports, exports and component tags. */
function toPlainText(body) {
  return body
    .replace(/^import\s.+?;?\s*$/gm, '')
    .replace(/^export\s.+?;?\s*$/gm, '')
    .replace(/<\/?[A-Z][\w.]*(\s[^>]*)?\/?>/g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^#\s+.+$/m, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const full = [
  '# AXAG — Agent Experience Accessibility Guidelines',
  '',
  `> ${summary}`,
  '',
  `Source: ${SITE}  ·  Generated from the documentation, in sidebar order.`,
  '',
];

for (const section of sections) {
  full.push('', `# ${section.label}`, '');
  for (const id of section.ids) {
    const doc = docs.get(id);
    if (!doc) continue;
    full.push(`## ${doc.title}`, '', `Source: ${doc.url}`, '', toPlainText(doc.body), '');
  }
}

writeFileSync(join(OUT_DIR, 'llms-full.txt'), full.join('\n'));

const pages = sections.reduce((total, section) => total + section.ids.filter(id => docs.has(id)).length, 0);
const size = (name) => `${(statSync(join(OUT_DIR, name)).size / 1024).toFixed(0)} KB`;
console.log(`llms.txt       ${pages} pages in ${sections.length} sections (${size('llms.txt')})`);
console.log(`llms-full.txt  full text (${size('llms-full.txt')})`);
