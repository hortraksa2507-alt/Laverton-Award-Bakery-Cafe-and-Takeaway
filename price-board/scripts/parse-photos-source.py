#!/usr/bin/env python3
"""Parse PHOTOS_RAW from scripts/photos-source.js into src/photosRaw.js."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "photos-source.js"
OUT = ROOT / "src" / "photosRaw.js"

_KEY_RE = re.compile(r'\b([dhprs]\d{2}):\s*"(UklGR[A-Za-z0-9+/=]+)"')


def main() -> None:
    if not SRC.exists():
        print(f"Missing {SRC} — paste PHOTOS_RAW from the original component first.")
        return
    text = SRC.read_text(encoding="utf-8")
    photos = dict(_KEY_RE.findall(text))
    if not photos:
        print("No photo keys found in source file.")
        return
    lines = ["export const PHOTOS_RAW = {"]
    for k in sorted(photos.keys()):
        lines.append(f'  {k}: "{photos[k]}",')
    lines.append("};")
    lines.append("")
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {len(photos)} keys to {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
