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

const DOCS_DIR = join(process.cwd(), 'docs');
const REQUIRED_ATTRIBUTES = ['axag-intent', 'axag-entity', 'axag-action-type'];
const STRICT_MODE = process.argv.includes('--strict');

let totalFiles = 0;
let totalJsonBlocks = 0;
let totalHtmlBlocks = 0;
let jsonErrors = 0;
let htmlWarnings = 0;
let passed = 0;

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
  const regex = new RegExp('```' + lang + '\\n([\\s\\S]*?)```', 'g');
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
    JSON.parse(code);
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

if (jsonErrors > 0 || (STRICT_MODE && htmlWarnings > 0)) {
  console.log('\n❌ Validation failed');
  process.exit(1);
} else {
  console.log('\n✅ All examples valid');
  process.exit(0);
}
