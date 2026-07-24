#!/usr/bin/env python3
"""Write batch 3 of PHOTOS_RAW (h01–h07, h09, p01–p09, p15–p18) to src/photosRaw.js."""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "photosRaw.js"

# Batch 3 keys — hot food & pies from user's PHOTOS_RAW paste.
PHOTOS = {
    # Parent agent: paste full base64 values here when resuming this subagent.
}

BATCH3_KEYS = [
    "h01", "h02", "h03", "h04", "h05", "h06", "h07", "h09",
    "p01", "p02", "p03", "p04", "p05", "p06", "p07", "p08", "p09",
    "p15", "p16", "p17", "p18",
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

    written = [k for k in BATCH3_KEYS if k in PHOTOS]
    missing_batch3 = [k for k in BATCH3_KEYS if k not in merged]

    size = OUT.stat().st_size
    print(f"Wrote {OUT}")
    print(f"Keys in file: {len(merged)} ({', '.join(sorted(merged.keys()))})")
    print(f"Batch3 keys written this run: {len(written)} ({', '.join(written) or 'none'})")
    if missing_batch3:
        print(f"Batch3 keys still missing: {', '.join(missing_batch3)}")
    print(f"File size: {size} bytes")


if __name__ == "__main__":
    main()
