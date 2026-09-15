#!/usr/bin/env node

/**
 * AXAG Example Validator
 *
 * Validates all JSON code blocks in documentation files
 * to ensure they are valid JSON. Also checks that AXAG
 * annotation examples include required attributes.
 *
 * Usage:
 *   node scripts/validate-axag-examples.mjs
 *   node scripts/validate-axag-examples.mjs --strict
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const DOCS_DIR = join(process.cwd(), 'docs');
const REQUIRED_ATTRIBUTES = ['axag-intent', 'axag-entity', 'axag-action-type'];
const STRICT_MODE = process.argv.includes('--strict');

// Keep in step with @axag/core's vocabulary and static/schema/v1.1.
const ALLOWED_VALUES = {
  'axag-action-type': ['read', 'write', 'delete', 'navigate'],
  'axag-risk-level': ['none', 'low', 'medium', 'high', 'critical'],
  'axag-scope': ['public', 'user', 'tenant', 'global'],
  'axag-tenant-boundary': ['strict', 'relaxed'],
};

let totalFiles = 0;
let totalJsonBlocks = 0;
let totalHtmlBlocks = 0;
let jsonErrors = 0;
let htmlWarnings = 0;
let passed = 0;
let schemaChecked = 0;

const schema = JSON.parse(readFileSync(join(process.cwd(), 'static/schema/v1.1/axag-manifest.schema.json'), 'utf-8'));
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validateManifest = ajv.compile(schema);
const validateAction = ajv.compile({ ...schema, $id: undefined, ...schema.definitions.Action, definitions: schema.definitions });
const TOOL_METADATA_REQUIRED = [
  'action_type', 'risk_level', 'idempotent', 'confirmation_required', 'approval_required', 'source_intent', 'source_entity',
];

/** Schema-check blocks that are a whole manifest, a whole action, or a whole tool. Excerpts are skipped. */
function schemaErrors(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return [];
  if ('version' in value && 'actions' in value && 'generated_at' in value) {
    schemaChecked++;
    return validateManifest(value) ? [] : validateManifest.errors.map(e => `${e.instancePath} ${e.message}`);
  }
  if (typeof value.intent === 'string' && 'action_type' in value && 'required_parameters' in value) {
    schemaChecked++;
    return validateAction(value) ? [] : validateAction.errors.map(e => `${e.instancePath} ${e.message}`);
  }
  if (typeof value.name === 'string' && value.input_schema && Object.keys(value.metadata ?? {}).length > 0) {
    schemaChecked++;
    const missing = TOOL_METADATA_REQUIRED.filter(k => !(k in value.metadata));
    return missing.length ? [`/metadata missing ${missing.join(', ')}`] : [];
  }
  if (Array.isArray(value.actions)) return value.actions.flatMap(schemaErrors);
  if (Array.isArray(value.tools)) return value.tools.flatMap(schemaErrors);
  return [];
}

function getFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getFiles(fullPath));
    } else if (['.md', '.mdx'].includes(extname(fullPath))) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractCodeBlocks(content, lang) {
  // Allow a title or other meta after the language: ```json title="..."
  const regex = new RegExp('```' + lang + '(?:[ \\t][^\\n]*)?\\n([\\s\\S]*?)```', 'g');
  const blocks = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    blocks.push({
      code: match[1].trim(),
      index: match.index,
    });
  }
  return blocks;
}

function getLineNumber(content, index) {
  return content.substring(0, index).split('\n').length;
}

function validateJsonBlock(code, file, line) {
  try {
    const errors = schemaErrors(JSON.parse(code));
    if (errors.length > 0) {
      console.error(`❌ Schema violation in ${file}:${line}`);
      for (const err of errors.slice(0, 5)) console.error(`   ${err}`);
      jsonErrors++;
      return false;
    }
    passed++;
    return true;
  } catch (e) {
    console.error(`❌ Invalid JSON in ${file}:${line}`);
    console.error(`   ${e.message}`);
    jsonErrors++;
    return false;
  }
}

function validateHtmlBlock(code, file, line) {
  const hasAxag = code.includes('axag-');
  if (!hasAxag) return true; // Not an AXAG annotation

  for (const [attr, allowed] of Object.entries(ALLOWED_VALUES)) {
    for (const match of code.matchAll(new RegExp(`${attr}="([^"]*)"`, 'g'))) {
      if (allowed.includes(match[1])) continue;
      const level = STRICT_MODE ? '❌' : '⚠️';
      console.warn(`${level} Invalid ${attr}="${match[1]}" in ${file}:${line}`);
      console.warn(`   Allowed: ${allowed.join(', ')}`);
      htmlWarnings++;
    }
  }

  const missing = REQUIRED_ATTRIBUTES.filter(attr => !code.includes(attr));
  if (missing.length > 0) {
    const level = STRICT_MODE ? '❌' : '⚠️';
    console.warn(`${level} Missing required attributes in ${file}:${line}`);
    console.warn(`   Missing: ${missing.join(', ')}`);
    htmlWarnings++;
    if (STRICT_MODE) return false;
  }
  return true;
}

function validateFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const relativePath = filePath.replace(process.cwd() + '/', '');

  const jsonBlocks = extractCodeBlocks(content, 'json');
  const htmlBlocks = extractCodeBlocks(content, 'html');

  totalJsonBlocks += jsonBlocks.length;
  totalHtmlBlocks += htmlBlocks.length;

  for (const block of jsonBlocks) {
    const line = getLineNumber(content, block.index);
    validateJsonBlock(block.code, relativePath, line);
  }

  for (const block of htmlBlocks) {
    const line = getLineNumber(content, block.index);
    validateHtmlBlock(block.code, relativePath, line);
  }
}

// Main
console.log('🔍 AXAG Example Validator');
console.log(`   Mode: ${STRICT_MODE ? 'strict' : 'standard'}`);
console.log(`   Directory: ${DOCS_DIR}\n`);

const files = getFiles(DOCS_DIR);
totalFiles = files.length;

for (const file of files) {
  validateFile(file);
}

console.log('\n📊 Results:');
console.log(`   Files scanned:     ${totalFiles}`);
console.log(`   JSON blocks:       ${totalJsonBlocks} (${jsonErrors} errors)`);
console.log(`   HTML blocks:       ${totalHtmlBlocks} (${htmlWarnings} warnings)`);
console.log(`   JSON blocks valid: ${passed}/${totalJsonBlocks}`);
console.log(`   Schema-checked:    ${schemaChecked} manifests, actions and tools`);

if (jsonErrors > 0 || (STRICT_MODE && htmlWarnings > 0)) {
  console.log('\n❌ Validation failed');
  process.exit(1);
} else {
  console.log('\n✅ All examples valid');
  process.exit(0);
}
