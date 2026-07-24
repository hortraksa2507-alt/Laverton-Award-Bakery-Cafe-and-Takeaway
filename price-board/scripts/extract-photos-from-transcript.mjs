#!/usr/bin/env node
/**
 * Extract PHOTOS_RAW base64 webp data from cloud-agent transcript JSON files.
 * Searches raw transcript text (not JSON.parse) for:
 *   const PHOTOS_RAW = { ... }; before const PHOTOS =
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "../src/photosRaw.js");

const EXPECTED_KEYS = [
  "d01", "d08", "d09", "d10", "d11", "d12", "d13", "d14", "d17", "d18", "d19", "d20", "d22", "d23", "d24", "d26", "d28", "d29", "d30", "d31", "d32", "d33",
  "h01", "h02", "h03", "h04", "h05", "h06", "h07", "h09",
  "p01", "p02", "p03", "p04", "p05", "p06", "p07", "p08", "p09", "p15", "p16", "p17", "p18",
  "r01", "r02", "r03", "r04", "r05", "r06", "r07", "r08", "r09", "r10",
  "s01", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "s11", "s13", "s14", "s15", "s16", "s17", "s18", "s19",
];

const TRANSCRIPT_ROOT = "/tmp/cursor/cloud-agent-transcripts";

function findTranscripts(dir) {
  const results = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const st = statSync(full);
      if (st.isDirectory()) {
        results.push(...findTranscripts(full));
      } else if (entry === "transcript.json") {
        results.push(full);
      }
    }
  } catch {
    // ignore missing dirs
  }
  return results;
}

function extractPhotosRawBlock(raw) {
  const patterns = [
    /const PHOTOS_RAW = \{([\s\S]*?)\};\s*\n\s*const PHOTOS =/,
    /export const PHOTOS_RAW = \{([\s\S]*?)\};\s*(?:\n|$)/,
    /const PHOTOS_RAW = \{([\s\S]*?)\};\s*\n\s*const PHOTOS\s*=/,
  ];

  for (const re of patterns) {
    const m = raw.match(re);
    if (m && m[1].trim() && !/^\s*$/.test(m[1]) && m[1] !== "") {
      const inner = m[1].trim();
      if (inner === "" || inner === "{}") continue;
      return `export const PHOTOS_RAW = {\n${inner}\n};\n`;
    }
  }
  return null;
}

function extractKeyValues(raw) {
  const entries = new Map();
  const re = /\b([dhprs]\d{2}):\s*"(UklGR[^"]+)"/g;
  let m;
  while ((m = re.exec(raw)) !== null) {
    entries.set(m[1], m[2]);
  }
  return entries;
}

function buildFromEntries(entries) {
  const lines = ["export const PHOTOS_RAW = {"];
  for (const key of EXPECTED_KEYS) {
    const val = entries.get(key);
    if (val) lines.push(`  ${key}: "${val}",`);
  }
  lines.push("};", "");
  return lines.join("\n");
}

function main() {
  const transcripts = findTranscripts(TRANSCRIPT_ROOT);
  console.log(`Scanning ${transcripts.length} transcript file(s)...`);

  let bestBlock = null;
  let bestEntries = new Map();
  let bestSource = null;

  for (const path of transcripts) {
    const raw = readFileSync(path, "utf8");
    const block = extractPhotosRawBlock(raw);
    const entries = extractKeyValues(raw);

    if (block && block.length > (bestBlock?.length ?? 0)) {
      bestBlock = block;
      bestSource = path;
    }
    if (entries.size > bestEntries.size) {
      bestEntries = entries;
      if (!bestSource) bestSource = path;
    }
  }

  let outContent = null;
  if (bestBlock && bestBlock.includes("UklGR")) {
    outContent = bestBlock.startsWith("export") ? bestBlock : bestBlock.replace(/^const PHOTOS_RAW/, "export const PHOTOS_RAW");
    console.log(`Using PHOTOS_RAW block from: ${bestSource}`);
  } else if (bestEntries.size > 0) {
    outContent = buildFromEntries(bestEntries);
    console.log(`Built PHOTOS_RAW from ${bestEntries.size} key(s) in: ${bestSource}`);
  } else {
    console.log("No PHOTOS_RAW base64 data found in any transcript.");
    outContent = "export const PHOTOS_RAW = {};\n";
  }

  writeFileSync(OUT_PATH, outContent, "utf8");

  const foundKeys = EXPECTED_KEYS.filter((k) => outContent.includes(`${k}: "UklGR`));
  const missingKeys = EXPECTED_KEYS.filter((k) => !foundKeys.includes(k));

  console.log(`\nWrote: ${OUT_PATH}`);
  console.log(`File size: ${Buffer.byteLength(outContent, "utf8")} bytes`);
  console.log(`Keys found: ${foundKeys.length} / ${EXPECTED_KEYS.length}`);
  if (foundKeys.length) {
    console.log(`First key: ${foundKeys[0]}`);
    console.log(`Last key: ${foundKeys[foundKeys.length - 1]}`);
  }
  if (missingKeys.length) {
    console.log(`\nMissing keys (${missingKeys.length}):`);
    console.log(missingKeys.join(", "));
  }

  process.exit(missingKeys.length === EXPECTED_KEYS.length ? 1 : 0);
}

main();
