// Ridiculous at First Glance, Real by the Second — entry program.
// Writes one sentence (<=200 chars) pitching a bizarre startup idea
// that sounds absurd until you realise it would actually sell.
import { mkdirSync, writeFileSync } from "node:fs";

const PITCH =
  "We hire professional mourners to cry at your funeral rehearsal, so you can watch who actually shows up, hear what they would say, and rewrite your will before it is too late.";

// The gate requires 1-200 characters of UTF-8 text, one sentence, not
// only white space. Fail loudly here rather than shipping an invalid entry.
const chars = [...PITCH].length;
if (chars < 1 || chars > 200) {
  throw new Error(`pitch is ${chars} characters, must be 1-200`);
}
if (PITCH.trim() !== PITCH || (PITCH.match(/\./g) ?? []).length !== 1) {
  throw new Error("pitch must be exactly one sentence with no extra whitespace");
}

const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(out, { recursive: true });
writeFileSync(`${out}/entry.txt`, PITCH, "utf8");
