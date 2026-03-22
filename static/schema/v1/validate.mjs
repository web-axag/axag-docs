// Usage: node validate.mjs <manifest.json>
// Validates a manifest file against the AXAG Manifest JSON Schema.
import _Ajv from 'ajv';
import _addFormats from 'ajv-formats';
import { readFileSync } from 'fs';

const Ajv = _Ajv.default ?? _Ajv;
const addFormats = _addFormats.default ?? _addFormats;

const schema = JSON.parse(readFileSync(new URL('./axag-manifest.schema.json', import.meta.url), 'utf8'));
const manifestPath = process.argv[2];

if (!manifestPath) {
  console.error('Usage: node validate.mjs <manifest.json>');
  process.exit(2);
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);
const valid = validate(manifest);

if (valid) {
  console.log('✅ Manifest is valid');
  process.exit(0);
} else {
  console.log('❌ Validation errors:');
  validate.errors.forEach(e => console.log(`  - ${e.instancePath || '/'} ${e.message}`));
  process.exit(1);
}
