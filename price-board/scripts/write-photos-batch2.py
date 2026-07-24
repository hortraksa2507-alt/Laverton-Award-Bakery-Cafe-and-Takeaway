#!/usr/bin/env python3
"""Write batch 2 of PHOTOS_RAW (d22, d23, d24, d26, d28–d33) to src/photosRaw.js."""

from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "photosRaw.js"
TRANSCRIPT_ROOT = Path("/tmp/cursor/cloud-agent-transcripts")

# Batch 2 keys — sweets/drinks from user's PHOTOS_RAW paste.
PHOTOS = {
    # Parent agent: paste full base64 values here when resuming this subagent.
}

BATCH2_KEYS = [
    "d22", "d23", "d24", "d26", "d28", "d29", "d30", "d31", "d32", "d33",
]

_KEY_RE = re.compile(r'\b([dhprs]\d{2}):\s*"(UklGR[^"]+)"')
_UNQUOTED_RE = re.compile(r'\n(d\d{2}):\s*(UklGR[A-Za-z0-9+/=]+)')


def extract_from_transcripts(keys: list[str]) -> dict[str, str]:
    """Pull base64 values from cloud-agent transcript JSON (raw + parsed)."""
    found: dict[str, str] = {}
    if not TRANSCRIPT_ROOT.exists():
        return found

    for path in TRANSCRIPT_ROOT.rglob("transcript.json"):
        raw = path.read_text(encoding="utf-8", errors="replace")
        for key in keys:
            if key in found:
                continue
            for pat in (
                rf'\\"{key}\\":\\s*\\"(UklGR[A-Za-z0-9+/=]+)\\"',
                rf'"{key}":\s*"(UklGR[^"]+)"',
                rf'\b{key}:\s*"(UklGR[^"]+)"',
                rf'\n{key}:\s*(UklGR[A-Za-z0-9+/=]+)',
            ):
                m = re.search(pat, raw)
                if m and len(m.group(1)) > len(found.get(key, "")):
                    found[key] = m.group(1)

        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            continue

        def walk(obj: object) -> None:
            if isinstance(obj, str):
                for mm in _KEY_RE.finditer(obj):
                    k, v = mm.group(1), mm.group(2)
                    if k in keys and len(v) > len(found.get(k, "")):
                        found[k] = v
                for mm in _UNQUOTED_RE.finditer(obj):
                    k, v = mm.group(1), mm.group(2)
                    if k in keys and len(v) > len(found.get(k, "")):
                        found[k] = v
            elif isinstance(obj, dict):
                for v in obj.values():
                    walk(v)
            elif isinstance(obj, list):
                for v in obj:
                    walk(v)

        walk(data)

    return found


def load_existing() -> dict[str, str]:
    if not OUT.exists():
        return {}
    text = OUT.read_text(encoding="utf-8")
    existing: dict[str, str] = {}
    for m in _KEY_RE.finditer(text):
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
    from_transcript = extract_from_transcripts(BATCH2_KEYS)
    merged.update(from_transcript)
    merged.update(PHOTOS)
    write_photos_raw(merged)

    written = [k for k in BATCH2_KEYS if k in PHOTOS or k in from_transcript]
    missing_batch2 = [k for k in BATCH2_KEYS if k not in merged]

    size = OUT.stat().st_size
    print(f"Wrote {OUT}")
    print(f"Keys in file: {len(merged)} ({', '.join(sorted(merged.keys()))})")
    print(f"Batch2 keys written this run: {len(written)} ({', '.join(written) or 'none'})")
    if missing_batch2:
        print(f"Batch2 keys still missing: {', '.join(missing_batch2)}")
    print(f"File size: {size} bytes")


if __name__ == "__main__":
    main()
