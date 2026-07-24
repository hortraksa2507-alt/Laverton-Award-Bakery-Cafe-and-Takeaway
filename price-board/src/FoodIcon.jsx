import { C, I, ICONS, CAT_FALLBACK } from "./menuConstants.js";
import { PHOTOS_RAW } from "./photosRaw.js";

export const PHOTOS = Object.assign({}, PHOTOS_RAW, {
  d02: PHOTOS_RAW.d01, d03: PHOTOS_RAW.d01, d04: PHOTOS_RAW.d01,
  p10: PHOTOS_RAW.p04, p11: PHOTOS_RAW.p01, p12: PHOTOS_RAW.p03,
  p13: PHOTOS_RAW.p07, p14: PHOTOS_RAW.p02,
  s10: PHOTOS_RAW.s16, s12: PHOTOS_RAW.s14,
});

function specFor(item) {
  return ICONS[item?.id] || CAT_FALLBACK[item?.cat] || ["default"];
}

function renderKind(kind, p) {
  switch (kind) {
    case "pie":
      return (
        <>
          <ellipse cx="24" cy="34" rx="16" ry="5" fill={I.dark} opacity="0.25" />
          <path d="M8 32 Q24 10 40 32 L37 38 Q24 24 11 38 Z" fill={I.pastry} stroke={I.crust} strokeWidth="1.2" />
          <path d="M12 30 Q24 18 36 30" fill="none" stroke={I.crust} strokeWidth="1" opacity="0.6" />
          <ellipse cx="24" cy="30" rx="10" ry="4" fill={p[0] || I.meat} opacity="0.85" />
          <path d="M18 26 L22 22 M26 21 L30 25 M32 27 L35 23" stroke={I.cream} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        </>
      );
    case "pieSmall":
      return (
        <>
          <ellipse cx="24" cy="33" rx="11" ry="4" fill={I.dark} opacity="0.2" />
          <path d="M13 31 Q24 16 35 31 L33 35 Q24 25 15 35 Z" fill={I.pastry} stroke={I.crust} strokeWidth="1" />
          <ellipse cx="24" cy="29" rx="7" ry="3" fill={p[0] || I.meat} opacity="0.9" />
        </>
      );
    case "sroll":
      return (
        <>
          <rect x="10" y="18" width="28" height="14" rx="7" fill={I.pastry} stroke={I.crust} strokeWidth="1.2" />
          <path d="M14 22 Q24 16 34 22" fill="none" stroke={I.crust} strokeWidth="1.5" />
          <path d="M14 26 Q24 32 34 26" fill="none" stroke={I.crust} strokeWidth="1.5" />
          <ellipse cx="12" cy="25" rx="3" ry="4" fill={I.meat} />
          <ellipse cx="36" cy="25" rx="3" ry="4" fill={I.meat} />
          <path d="M16 20 Q24 24 32 20" fill="none" stroke={I.dark} strokeWidth="0.8" opacity="0.4" />
        </>
      );
    case "sandwich":
      return (
        <>
          <rect x="9" y="14" width="30" height="7" rx="2.5" fill={I.bread} stroke={I.crust} strokeWidth="0.8" />
          <rect x="9" y="21" width="30" height="5" rx="1.5" fill={p[0] || I.ham} />
          <rect x="9" y="26" width="30" height="5" rx="1.5" fill={p[1] || I.green} />
          <rect x="9" y="31" width="30" height="7" rx="2.5" fill={I.bread} stroke={I.crust} strokeWidth="0.8" />
          <path d="M12 17 H36" stroke={I.white} strokeWidth="0.6" opacity="0.35" />
        </>
      );
    case "roll":
      return (
        <>
          <ellipse cx="24" cy="28" rx="15" ry="10" fill={I.bread} stroke={I.crust} strokeWidth="1" />
          <path d="M12 24 Q24 18 36 24" fill="none" stroke={I.crust} strokeWidth="1" opacity="0.5" />
          <circle cx="24" cy="28" r="6" fill={I.cream} stroke={I.crust} strokeWidth="0.8" />
          <path d="M20 26 H28" stroke={p[0] || I.green} strokeWidth="3" strokeLinecap="round" />
          <path d="M21 30 H27" stroke={p[1] || I.red} strokeWidth="2.5" strokeLinecap="round" />
        </>
      );
    case "fruitcup":
      return (
        <>
          <path d="M14 18 H34 L32 38 H16 Z" fill="#D8EEFF" stroke="#8AB4CC" strokeWidth="1" opacity="0.7" />
          <circle cx="20" cy="26" r="3" fill="#E06A5A" />
          <circle cx="28" cy="24" r="3" fill="#F2CE4B" />
          <circle cx="24" cy="31" r="3" fill="#7FA85A" />
          <circle cx="30" cy="30" r="2.5" fill="#F09CB4" />
          <ellipse cx="24" cy="18" rx="10" ry="2" fill="#E8F4FA" stroke="#8AB4CC" strokeWidth="0.8" />
        </>
      );
    case "donut": {
      const glaze = p[0] || I.jam;
      const top = p[1];
      return (
        <>
          <circle cx="24" cy="26" r="14" fill={I.pastry} stroke={I.crust} strokeWidth="1" />
          <circle cx="24" cy="26" r="11" fill={glaze} opacity="0.95" />
          {top && <ellipse cx="24" cy="22" rx="8" ry="4" fill={top} opacity="0.85" />}
          {!top && <ellipse cx="24" cy="22" rx="7" ry="3.5" fill={I.cream} opacity="0.9" />}
          <circle cx="19" cy="20" r="1.5" fill={I.white} opacity="0.5" />
        </>
      );
    }
    case "ringdonut":
      return (
        <>
          <circle cx="24" cy="26" r="14" fill={I.pastry} stroke={I.crust} strokeWidth="1" />
          <circle cx="24" cy="26" r="14" fill="none" stroke={I.choc} strokeWidth="5" />
          <circle cx="24" cy="26" r="5" fill={C.bg} />
          <circle cx="19" cy="20" r="1.5" fill={I.white} opacity="0.45" />
          <path d="M16 30 Q24 34 32 30" fill="none" stroke={I.milk} strokeWidth="1.2" opacity="0.6" />
        </>
      );
    case "turnover": {
      const cream = p[0];
      return (
        <>
          <path d="M10 34 L24 14 L38 34 Z" fill={I.pastry} stroke={I.crust} strokeWidth="1.2" />
          <path d="M14 32 L24 18 L34 32 Z" fill={I.caramel} opacity="0.55" />
          {cream && <ellipse cx="24" cy="22" rx="8" ry="4" fill={I.cream} opacity="0.95" />}
          <path d="M18 30 Q24 26 30 30" fill="none" stroke={I.crust} strokeWidth="0.8" />
        </>
      );
    }
    case "lamington": {
      const choc = p[0] || I.choc;
      const cream = p[1];
      return (
        <>
          <rect x="12" y="16" width="24" height="20" rx="3" fill={choc} stroke={I.dark} strokeWidth="0.8" />
          <rect x="14" y="18" width="20" height="16" rx="2" fill={I.biscuit} />
          {[16, 20, 24, 28, 32].map((x) => [18, 22, 26, 30].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="0.8" fill={I.white} opacity="0.55" />
          )))}
          {cream && <rect x="14" y="14" width="20" height="5" rx="2" fill={I.cream} stroke={I.crust} strokeWidth="0.6" />}
        </>
      );
    }
    case "slice": {
      const base = p[0] || I.choc;
      const mid = p[1] || I.caramel;
      const deco = p[2];
      return (
        <>
          <path d="M12 34 L12 18 L34 34 Z" fill={base} stroke={I.dark} strokeWidth="0.8" />
          <path d="M12 28 L28 34 L12 34 Z" fill={mid} opacity="0.85" />
          <path d="M12 22 L22 34 L12 34 Z" fill={I.biscuit} opacity="0.7" />
          {deco === "flake" && <path d="M18 20 L20 16 L22 20" stroke={I.white} strokeWidth="1.5" fill="none" />}
          {deco === "drizzle" && <path d="M14 20 Q20 24 26 20" fill="none" stroke={I.choc} strokeWidth="1.2" />}
          {deco === "coconut" && [15, 19, 23].map((x) => <circle key={x} cx={x} cy="19" r="1" fill={I.white} opacity="0.7" />)}
        </>
      );
    }
    case "lolly":
      return (
        <>
          <rect x="11" y="16" width="26" height="18" rx="3" fill="#FF6B8A" stroke={I.dark} strokeWidth="0.8" />
          <rect x="11" y="22" width="26" height="5" fill="#FFE066" />
          <rect x="11" y="28" width="26" height="6" fill="#7EC8FF" />
          {[14, 18, 22, 26, 30, 34].map((x) => [18, 24, 30].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill={I.white} opacity="0.65" />
          )))}
        </>
      );
    case "rockyroad":
      return (
        <>
          <rect x="10" y="16" width="28" height="18" rx="3" fill={I.choc} stroke={I.dark} strokeWidth="0.8" />
          <rect x="13" y="19" width="7" height="5" rx="1.5" fill="#F5EDDB" opacity="0.9" />
          <rect x="22" y="21" width="8" height="5" rx="1.5" fill="#C8956C" />
          <rect x="16" y="27" width="9" height="4" rx="1.5" fill="#F09CB4" opacity="0.85" />
          <rect x="28" y="25" width="6" height="5" rx="1.5" fill="#7FA85A" opacity="0.8" />
        </>
      );
    case "cake":
      return (
        <>
          <path d="M12 34 L12 20 L30 34 Z" fill={p[0] || I.red} stroke={I.dark} strokeWidth="0.8" />
          <path d="M12 26 L24 34 L12 34 Z" fill={p[1] || I.white} opacity="0.9" />
          <path d="M12 20 L18 14 L30 34 L24 34 Z" fill={I.cream} opacity="0.75" />
          <circle cx="18" cy="17" r="1.5" fill={I.red} />
        </>
      );
    case "tart": {
      const fill = p[0] || I.yellow;
      const accent = p[1];
      return (
        <>
          <ellipse cx="24" cy="30" rx="14" ry="5" fill={I.dark} opacity="0.15" />
          <path d="M10 30 Q24 12 38 30 Q24 36 10 30 Z" fill={I.pastry} stroke={I.crust} strokeWidth="1" />
          <ellipse cx="24" cy="28" rx="10" ry="6" fill={fill} />
          {accent && <path d="M16 28 H32" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.8" />}
          {!accent && fill === I.jam && <circle cx="24" cy="27" r="2" fill={I.red} opacity="0.6" />}
        </>
      );
    }
    case "yoyo":
      return (
        <>
          <circle cx="18" cy="26" r="9" fill={I.biscuit} stroke={I.crust} strokeWidth="1" />
          <circle cx="30" cy="26" r="9" fill={I.biscuit} stroke={I.crust} strokeWidth="1" />
          <circle cx="24" cy="26" r="4" fill={I.jam} />
          <circle cx="15" cy="22" r="1.2" fill={I.white} opacity="0.4" />
          <circle cx="27" cy="22" r="1.2" fill={I.white} opacity="0.4" />
        </>
      );
    case "gingerman":
      return (
        <>
          <circle cx="24" cy="14" r="6" fill="#C9853E" stroke={I.dark} strokeWidth="0.8" />
          <rect x="18" y="19" width="12" height="12" rx="4" fill="#C9853E" stroke={I.dark} strokeWidth="0.8" />
          <line x1="14" y1="22" x2="18" y2="24" stroke="#C9853E" strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1="22" x2="34" y2="24" stroke="#C9853E" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="31" x2="18" y2="38" stroke="#C9853E" strokeWidth="3" strokeLinecap="round" />
          <line x1="28" y1="31" x2="30" y2="38" stroke="#C9853E" strokeWidth="3" strokeLinecap="round" />
          <circle cx="22" cy="13" r="1" fill={C.ink} />
          <circle cx="26" cy="13" r="1" fill={C.ink} />
          <path d="M22 16 Q24 18 26 16" fill="none" stroke={I.white} strokeWidth="1" />
          <circle cx="24" cy="22" r="1.5" fill={I.red} />
        </>
      );
    case "cookie":
      return (
        <>
          <circle cx="24" cy="26" r="13" fill="#C9853E" stroke={I.crust} strokeWidth="1" />
          <circle cx="19" cy="22" r="2" fill={I.choc} />
          <circle cx="29" cy="22" r="2" fill={I.choc} />
          <circle cx="22" cy="30" r="2" fill={I.choc} />
          <circle cx="28" cy="29" r="2" fill={I.choc} />
          <path d="M18 28 Q24 33 30 28" fill="none" stroke={I.choc} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="20" cy="19" r="1" fill={I.white} opacity="0.35" />
        </>
      );
    case "marshstick":
      return (
        <>
          <line x1="24" y1="38" x2="24" y2="14" stroke="#C8956C" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="17" y="14" width="14" height="8" rx="4" fill="#F5EDDB" stroke={I.cream} strokeWidth="0.8" />
          <rect x="17" y="23" width="14" height="8" rx="4" fill="#FFB3C7" stroke="#F09CB4" strokeWidth="0.8" />
          <rect x="17" y="32" width="14" height="6" rx="3" fill="#C9E7FF" stroke="#8AB4CC" strokeWidth="0.8" />
        </>
      );
    case "log":
      return (
        <>
          <ellipse cx="24" cy="32" rx="13" ry="4" fill={I.dark} opacity="0.2" />
          <rect x="11" y="18" width="26" height="14" rx="7" fill={I.choc} stroke={I.dark} strokeWidth="0.8" />
          <path d="M11 25 H37" stroke={I.milk} strokeWidth="1" opacity="0.5" />
          <ellipse cx="24" cy="18" rx="13" ry="4" fill="#5A3828" stroke={I.dark} strokeWidth="0.8" />
          <circle cx="24" cy="18" r="2" fill={I.cream} opacity="0.5" />
        </>
      );
    case "corndog":
      return (
        <>
          <line x1="24" y1="40" x2="24" y2="16" stroke="#C8956C" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="24" cy="22" rx="8" ry="10" fill="#E8B95B" stroke={I.crust} strokeWidth="1" />
          <path d="M18 18 Q24 14 30 18" fill="none" stroke={I.crust} strokeWidth="0.8" opacity="0.6" />
          <ellipse cx="24" cy="24" rx="4" ry="5" fill={I.meat} opacity="0.7" />
        </>
      );
    case "potatocake":
      return (
        <>
          <ellipse cx="24" cy="28" rx="14" ry="9" fill="#E8C45A" stroke={I.crust} strokeWidth="1" />
          <path d="M14 26 Q24 22 34 26" fill="none" stroke="#C08A3E" strokeWidth="1" opacity="0.6" />
          <path d="M16 30 Q24 34 32 30" fill="none" stroke="#C08A3E" strokeWidth="0.8" opacity="0.5" />
          <ellipse cx="24" cy="28" rx="10" ry="6" fill="#F2CE4B" opacity="0.35" />
        </>
      );
    case "hashbrown":
      return (
        <>
          <rect x="12" y="18" width="24" height="16" rx="6" fill="#E8C45A" stroke={I.crust} strokeWidth="1" />
          <path d="M14 22 H38 M14 26 H38 M14 30 H38" stroke="#C08A3E" strokeWidth="0.7" opacity="0.45" />
          <rect x="16" y="20" width="6" height="4" rx="1" fill="#F2CE4B" opacity="0.5" />
          <rect x="26" y="24" width="7" height="4" rx="1" fill="#F2CE4B" opacity="0.5" />
        </>
      );
    case "dimsim":
      return (
        <>
          <ellipse cx="24" cy="30" rx="12" ry="6" fill={I.dark} opacity="0.15" />
          <path d="M12 28 Q24 14 36 28 Q24 36 12 28 Z" fill="#F3DCA8" stroke={I.crust} strokeWidth="1" />
          <path d="M16 27 Q24 20 32 27" fill="none" stroke={I.crust} strokeWidth="0.8" />
          <ellipse cx="24" cy="26" rx="8" ry="4" fill={I.meat} opacity="0.55" />
        </>
      );
    case "springroll":
      return (
        <>
          <rect x="13" y="20" width="22" height="10" rx="5" fill="#E8B95B" stroke={I.crust} strokeWidth="1" />
          <path d="M15 23 H33 M15 26 H33" stroke={I.crust} strokeWidth="0.7" opacity="0.5" />
          <ellipse cx="14" cy="25" rx="2" ry="4" fill="#C9853E" />
          <ellipse cx="34" cy="25" rx="2" ry="4" fill="#C9853E" />
          <circle cx="20" cy="25" r="2" fill={I.green} opacity="0.6" />
          <circle cx="28" cy="25" r="2" fill={I.meat} opacity="0.6" />
        </>
      );
    case "wing":
      return (
        <>
          <path d="M14 30 Q18 16 28 18 Q34 20 34 28 Q30 36 20 34 Q12 32 14 30 Z" fill="#C9853E" stroke="#A66A28" strokeWidth="1" />
          <path d="M20 22 Q24 20 28 24" fill="none" stroke="#E8B95B" strokeWidth="1.2" opacity="0.7" />
          <ellipse cx="18" cy="28" rx="3" ry="2" fill="#A66A28" opacity="0.5" />
        </>
      );
    case "sausage": {
      const col = p[0] || I.red;
      return (
        <>
          <rect x="10" y="24" width="28" height="8" rx="4" fill={I.bread} stroke={I.crust} strokeWidth="0.8" />
          <rect x="14" y="26" width="20" height="4" rx="2" fill={col} />
          <path d="M14 26 Q24 22 34 26" fill="none" stroke={I.crust} strokeWidth="0.6" opacity="0.5" />
          <line x1="24" y1="18" x2="24" y2="22" stroke={I.cream} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </>
      );
    }
    case "fritter":
      return (
        <>
          <rect x="11" y="20" width="12" height="10" rx="3" fill="#E8C45A" stroke={I.crust} strokeWidth="0.8" />
          <rect x="25" y="18" width="12" height="12" rx="3" fill="#E8B95B" stroke={I.crust} strokeWidth="0.8" />
          <rect x="18" y="28" width="14" height="8" rx="3" fill="#F2CE4B" stroke={I.crust} strokeWidth="0.8" />
          <path d="M13 23 H21 M27 21 H33" stroke={I.crust} strokeWidth="0.6" opacity="0.45" />
        </>
      );
    case "can": {
      const col = p[0] || "#C8402F";
      return (
        <>
          <rect x="16" y="12" width="16" height="26" rx="3" fill={col} stroke={I.dark} strokeWidth="0.8" />
          <ellipse cx="24" cy="12" rx="8" ry="2.5" fill="#E8E8E8" stroke="#AAA" strokeWidth="0.6" />
          <rect x="18" y="18" width="12" height="8" rx="1" fill={I.white} opacity="0.25" />
          <path d="M18 30 H30" stroke={I.white} strokeWidth="1" opacity="0.3" />
        </>
      );
    }
    case "bottle": {
      const col = p[0] || "#C8402F";
      return (
        <>
          <rect x="20" y="10" width="8" height="4" rx="1" fill="#888" />
          <path d="M17 14 H31 L29 38 H19 Z" fill={col} stroke={I.dark} strokeWidth="0.8" opacity="0.9" />
          <rect x="19" y="20" width="10" height="10" rx="1" fill={I.white} opacity="0.2" />
          <ellipse cx="24" cy="14" rx="7" ry="2" fill={col} stroke={I.dark} strokeWidth="0.6" />
        </>
      );
    }
    case "coffee":
      return (
        <>
          <path d="M14 16 H30 L28 36 H16 Z" fill={I.white} stroke={I.grey} strokeWidth="1" />
          <ellipse cx="22" cy="16" rx="8" ry="2.5" fill="#4A2F1D" />
          <path d="M30 20 Q36 20 36 26 Q36 30 30 30" fill="none" stroke={I.grey} strokeWidth="1.5" />
          <path d="M18 10 Q20 7 22 10" fill="none" stroke={I.grey} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          <path d="M24 8 Q26 5 28 8" fill="none" stroke={I.grey} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        </>
      );
    default:
      return (
        <>
          <circle cx="24" cy="24" r="14" fill={C.panelUp} stroke={C.goldDim} strokeWidth="1.5" />
          <text x="24" y="29" textAnchor="middle" fontSize="16" fontWeight="700" fill={C.gold} fontFamily="Arial,sans-serif">$</text>
        </>
      );
  }
}

export function FoodIcon({ item, size = 48 }) {
  const spec = specFor(item);
  const kind = spec[0];
  const params = spec.slice(1);
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      {renderKind(kind, params)}
    </svg>
  );
}

export function ItemPic({ item, size = 44, radius = 10 }) {
  const b64 = PHOTOS[item?.id];
  if (b64) {
    return (
      <img
        src={"data:image/webp;base64," + b64}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size, borderRadius: radius, objectFit: "cover", display: "block", flexShrink: 0 }}
      />
    );
  }
  const n = typeof size === "number" ? size : 84;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: `linear-gradient(145deg, ${C.panelUp} 0%, ${C.panel} 100%)`,
        border: `1px solid ${C.line}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FoodIcon item={item} size={Math.min(n, 84)} />
    </div>
  );
}
