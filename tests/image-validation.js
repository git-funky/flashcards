'use strict';

/**
 * Image validation tests
 *
 * Run with:  node tests/image-validation.js
 *
 * Parses every `image:` path out of data/words.js and verifies that the
 * corresponding file actually exists in the images/ directory.
 */

const fs   = require('fs');
const path = require('path');

// -- Resolve paths relative to the project root (one level up from tests/) ---
const root      = path.resolve(__dirname, '..');
const wordsFile = path.join(root, 'data', 'words.js');

// -- Parse image paths from words.js ------------------------------------------
// Each entry looks like:  image: "images/foo.jpg"
const wordsSource = fs.readFileSync(wordsFile, 'utf-8');
const imagePathRe = /image:\s*["']([^"']+)["']/g;

const entries = [];
let m;
while ((m = imagePathRe.exec(wordsSource)) !== null) {
  entries.push(m[1]);
}

if (entries.length === 0) {
  console.error('No image paths found in data/words.js -- check the regex.');
  process.exit(1);
}

// -- Test harness -------------------------------------------------------------
let passed = 0;
let failed = 0;

function assert(description, ok) {
  if (ok) {
    console.log(`  ✓  ${description}`);
    passed++;
  } else {
    console.error(`  ✗  ${description}`);
    failed++;
  }
}

// -- Tests --------------------------------------------------------------------
console.log('\n-- Image paths in data/words.js --');

for (const imgPath of entries) {
  const abs = path.join(root, imgPath);
  assert(imgPath, fs.existsSync(abs));
}

// Also check for duplicate image paths (two words sharing the same file)
console.log('\n-- Duplicate image paths --');
const seen   = new Set();
const unique = new Set();
for (const p of entries) {
  if (seen.has(p)) unique.add(p);
  seen.add(p);
}
if (unique.size === 0) {
  assert('no duplicate image paths', true);
} else {
  for (const dup of unique) {
    assert(`duplicate: ${dup}`, false);
  }
}

// -- Summary ------------------------------------------------------------------
console.log(`\n${'─'.repeat(40)}`);
console.log(`${passed + failed} tests: ${passed} passed, ${failed} failed`);
console.log('─'.repeat(40));
process.exitCode = failed > 0 ? 1 : 0;
