import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const HAIKU = [
  "Cursor blinks at three",
  "the breakpoint waits in the dark",
  "and the bug was me",
].join("\n") + "\n";

const outputPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, HAIKU, "utf8");

// Self-check: the entry must be exactly three non-empty lines,
// at most 200 characters in total, or the run is a failure.
const lines = HAIKU.trimEnd().split("\n");
if (lines.length !== 3 || lines.some((line) => line.trim().length === 0)) {
  throw new Error(`expected 3 non-empty lines, got ${lines.length}`);
}
if (HAIKU.length > 200) {
  throw new Error(`entry is ${HAIKU.length} characters, over the 200 limit`);
}
console.log(`wrote ${HAIKU.length} characters, ${lines.length} lines to ${outputPath}`);
