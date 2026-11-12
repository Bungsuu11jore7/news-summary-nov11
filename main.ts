// news-summary-nov11 — news-summary-01 entry.
//
// Writes the summary of the world's news of Wednesday 11 November 2026
// (summary.txt, sitting next to this file) to $OUTPUT_DIR/entry.txt.
// Deterministic: the output is a byte-for-byte copy of the source, so
// every run produces identical bytes. No network access, stdlib only
// (Node 22).

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "summary.txt");
const outputDir = process.env.OUTPUT_DIR || "/output";
const outputPath = join(outputDir, "entry.txt");

if (!existsSync(source)) {
  throw new Error(
    `Missing summary: ${source} not found. ` +
      "summary.txt must sit next to main.ts.",
  );
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, outputPath);

// Verify the copy is byte-identical to the source.
const sourceBytes = readFileSync(source);
const outputBytes = readFileSync(outputPath);
if (!sourceBytes.equals(outputBytes)) {
  throw new Error(
    `Verification failed: ${outputPath} differs from ${source}.`,
  );
}

console.log(`Wrote ${outputPath} (${outputBytes.length} bytes, verified)`);
