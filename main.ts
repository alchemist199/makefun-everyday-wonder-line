// Everyday Wonder: one sentence, at most 200 characters, written to /output/entry.txt.
// The moment: a ceiling fan that keeps turning after being switched off,
// stirring air nobody asked for anymore, like a thought finishing itself.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "I switched the ceiling fan off, but the blades kept turning, stirring air the room no longer needed, like a thought finishing itself.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const localDir = join(process.cwd(), "output");

function writeEntry(dir: string, text: string): string {
  const outPath = join(dir, "entry.txt");
  mkdirSync(dir, { recursive: true });
  writeFileSync(outPath, text, "utf8");
  return outPath;
}

function main(): void {
  const text = SENTENCE.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  let outPath: string;
  try {
    outPath = writeEntry(outDir, text);
  } catch {
    outPath = writeEntry(localDir, text);
  }
  console.log(`wrote ${text.length} characters to ${outPath}`);
}

main();
