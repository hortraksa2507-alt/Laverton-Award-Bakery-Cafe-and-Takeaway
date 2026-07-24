#!/usr/bin/env python3
"""Write batch 1 of PHOTOS_RAW sweets keys to src/photosRaw.js."""

from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "photosRaw.js"
TRANSCRIPT_ROOT = Path("/tmp/cursor/cloud-agent-transcripts")

# Sweets photo keys — batch 1
PHOTOS = {
    "d01": "UklGRmgFAABXRUJQVlA4IFwFAACwJQCdASp4AHgAPt1iqE2opaOiLBSs+RAbiWMAzbi9jnM0/nMSBKjO/8qEX6y501xwJw2UtQTz+60zepxU9Js4II7YnK5gl0rMS5Q6o/uuitKKcFUUSm5npGXuPcC0tRhEGTVUJNLcVCR1ET3z5NF9/1pShqXL21jt8l/rnb4w/+b9u07O/a8aJDgkTrEswWZ+LvLNrL3yqnjidI3E5FpVIQ249KaWrU1PhNrrbHmfh1pINaesNnM/52U/UjtDGST675qGTzCRWXFOhh4Y/R8JSb9fhPHXiFs2/mALo3j6scp52CIy5wtvDeZyhpdaFJlXYQ3bik95Qywm4cFrW2hGTFvUMxYY4U+1H8n43zRasqferEE1bHEJkwheOWzei6uYnbmKH3RIaFAD4obldBRjmZYibf4AAP7NBuW7tdGwPitnBpvIqMbqM0ENJ6/h/QJ0LG07gJgo03DwUqFRIO24nVvW7u/HDhxySqxlTYhA6NEUh6+TIis1Vur3loS5rANUEa/hcA46zgY/EKONFa8g9gCjrJoynbIoAN/qCASlK6n1ChQDBGh74IRgs/35IU8KHx8uSDX93lkS54LW8JdAioibrBtBqtw61LP81cuZ3tSVbcWIOcvlGo8ySvarMOEsrzNEFth29XXo3QUm6vflPLPa07+wTWjQuEu6ldgp+PpkeZnMlnr02oCjYSJUoiCPLxpI3NBmu4cpGpstsdlkDny6OpbhNqfOPLIfkK9UW8f9bdqXz/f00pJH8LyjSea1Y1M9tEqy++NTr8ZdsoBfTwU6WV4U4AiJDXyVwC/fxJ4h7bKB4/H6CS0MjIqNRoM6t0BclkKv4vC1RKMzvlMddyrofe0wMblZ+/nin7ZCdbjTCzLcrAHmFHVLYGfjiG9CoIV7xKa2gGiaHTMBCVbsx3UU/P5fdcP2BI5Z/e5QZowRWmhA+S8UoY2s7L1kXS/v8sjmcHSg/7EkL5haYTME0ZssC1aUBNo47OzeHHhieAfSUEujVdFI4eQRGdM3b57TxWv80zC+mL2XMx/rYXhZmBsVvEf1/gcJEWXtsOVRpebS2tg+2brqyyt3AS9RirG8N8+yVeezPnBKcV4lXaNZmWgLdDwyBQV05Wn9NSoXiJpDAMikxRG+VjXtLPcltNC1kZMEOzhX031Peyy1UtuMvjFLXg8lk2K4IQNzihWmjpG1EVhfFoAPZSkQo3E7YVdloTay7ZG8ZhKJyVQ9KzpGjN11khg9f1JWBY/sOQDPqnDOvpnpVEjXIcoSs1ZQcBvHK/C7+YgYXEWfI0GM43xHbzGGAJxr48Lv3f+oV9Y4L/9SJDOc8grsfKXZwrvsT6/qxfVJ2Pd4zyIdQez5JL+vDWLChZSAKP2T64kXIQB82evsa6lrLrhiO2bAvb3zP0JJ3t5M5gTceSCICYN1BRH1AOrTXqHFMC4AL1FU7yynnqP6PkphYIbJJgfCmZ5nWpYZJSUQjWJasIvUdRrbfHz64rbUgRs2WOOAdGNu4TPVE4Np3AsLogRR8+/sK9cBQSAeYNDcNeFuesc0HHlPJlBOn0xuKtUv/vDmoK47ym3i2SXjdaUnj94tZbJk3YI4yfneDoOhtovuRjorM/x+EoSexWKyruRJReiZrNjbW1cTZbcTCWTPW92QTflJmaI0elka++YfaO1jRkr8hbUQPsEYs6tdJoUTo/KHdaoH0bhU4ME9PmqBoeYaasny7zcRC6duPl9vHDrMoAq46pzjt1xPKAp9KKM3XtmQFOSB85ari+mrLQ/bhyyL8gJaY+Yrw+Llr1fsDc16GN5EdC6drjEqedy8znL6qJQK7AAA",
}

BATCH1_KEYS = [
    "d01", "d08", "d09", "d10", "d11", "d12", "d13", "d14",
    "d17", "d18", "d19", "d20",
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
    from_transcript = extract_from_transcripts(BATCH1_KEYS)
    merged.update(from_transcript)
    merged.update(PHOTOS)
    write_photos_raw(merged)

    missing_batch1 = [k for k in BATCH1_KEYS if k not in merged]

    size = OUT.stat().st_size
    print(f"Wrote {OUT}")
    print(f"Keys in file: {len(merged)} ({', '.join(sorted(merged.keys()))})")
    print(f"Batch1 keys present: {len(BATCH1_KEYS) - len(missing_batch1)} / {len(BATCH1_KEYS)}")
    if missing_batch1:
        print(f"Batch1 keys still missing: {', '.join(missing_batch1)}")
    print(f"File size: {size} bytes")


if __name__ == "__main__":
    main()
