#!/usr/bin/env python3
"""Write batch 4 of PHOTOS_RAW (r01–r10, s01–s09, s11, s13–s19) to src/photosRaw.js."""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "photosRaw.js"

# Batch 4 keys — rolls & sandwiches from user's PHOTOS_RAW paste.
PHOTOS = {
    # Parent agent: paste full base64 values here when resuming this subagent.
}

BATCH4_KEYS = [
    "r01", "r02", "r03", "r04", "r05", "r06", "r07", "r08", "r09", "r10",
    "s01", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "s11",
    "s13", "s14", "s15", "s16", "s17", "s18", "s19",
]


def load_existing() -> dict[str, str]:
    if not OUT.exists():
        return {}
    text = OUT.read_text(encoding="utf-8")
    existing: dict[str, str] = {}
    for m in re.finditer(r'\b([dhprs]\d{2}):\s*"([^"]+)"', text):
        existing[m.group(1)] = m.group(2)
    return existing


def write_photos_raw(photos: dict[str, str]) -> None:
    lines = ["export const PHOTOS_RAW = {"]
    for key in sorted(photos.keys()):
        lines.append(f'  {key}: "{photos[key]}",')
    lines.append("};")
    lines.append("")
    OUT.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    merged = load_existing()
    merged.update(PHOTOS)
    write_photos_raw(merged)

    written = [k for k in BATCH4_KEYS if k in PHOTOS]
    missing_batch4 = [k for k in BATCH4_KEYS if k not in merged]

    size = OUT.stat().st_size
    print(f"Wrote {OUT}")
    print(f"Keys in file: {len(merged)} ({', '.join(sorted(merged.keys()))})")
    print(f"Batch4 keys written this run: {len(written)} ({', '.join(written) or 'none'})")
    if missing_batch4:
        print(f"Batch4 keys still missing: {', '.join(missing_batch4)}")
    print(f"File size: {size} bytes")


if __name__ == "__main__":
    main()
