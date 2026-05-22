#!/usr/bin/env node
'use strict';

/**
 * Test runner — executes every *.js file in the tests/ directory.
 *
 * Run with:  node run-tests.js
 */

const { execFileSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

const testsDir = path.join(__dirname, 'tests');
const files    = fs.readdirSync(testsDir)
                   .filter(f => f.endsWith('.js'))
                   .sort();

let totalPassed = 0;
let totalFailed = 0;
let suitesFailed = 0;

for (const file of files) {
  const filePath = path.join(testsDir, file);
  console.log(`\n${'='.repeat(50)}`);
  console.log(`  ${file}`);
  console.log('='.repeat(50));

  try {
    const output = execFileSync(process.execPath, [filePath], { encoding: 'utf-8' });
    process.stdout.write(output);

    // Pick up the summary line "N tests: X passed, Y failed"
    const m = output.match(/(\d+) tests: (\d+) passed, (\d+) failed/);
    if (m) {
      totalPassed += Number(m[2]);
      totalFailed += Number(m[3]);
      if (Number(m[3]) > 0) suitesFailed++;
    }
  } catch (err) {
    // execFileSync throws when exit code != 0; stdout is still in err.stdout
    const out = err.stdout || '';
    process.stdout.write(out);
    if (err.stderr) process.stderr.write(err.stderr);

    const m = out.match(/(\d+) tests: (\d+) passed, (\d+) failed/);
    if (m) {
      totalPassed += Number(m[2]);
      totalFailed += Number(m[3]);
    }
    suitesFailed++;
  }
}

const total = totalPassed + totalFailed;
console.log(`\n${'═'.repeat(50)}`);
console.log(`  ${files.length} suites | ${total} tests: ${totalPassed} passed, ${totalFailed} failed`);
console.log('═'.repeat(50));
process.exitCode = suitesFailed > 0 ? 1 : 0;
