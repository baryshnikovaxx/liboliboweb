"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const MOSAIC_FADE_MS = 650;

const mosaicSlotByIndex: Array<{ col: number; row: number; colSpan?: number; rowSpan?: number }> = [
  { col: 0, row: 0, colSpan: 2, rowSpan: 2 },
  { col: 2, row: 0 },
  { col: 2, row: 1 },
  { col: 0, row: 2 },
  { col: 1, row: 2 },
  { col: 2, row: 2 },
];

function pickRandomCover(covers: string[], current: string) {
  if (covers.length <= 1) return covers[0] ?? current;
  let next = covers[Math.floor(Math.random() * covers.length)];
  while (next === current) {
    next = covers[Math.floor(Math.random() * covers.length)];
  }
  return next;
}

function mosaicTileStyle(slotDef: (typeof mosaicSlotByIndex)[number]): CSSProperties {
  const colSpan = slotDef.colSpan ?? 1;
  const rowSpan = slotDef.rowSpan ?? 1;
  const col = slotDef.col;
  const row = slotDef.row;

  return {
    width: `calc(${colSpan} * ((100% - 1.5rem) / 3) + ${(colSpan - 1) * 0.75}rem)`,
    height: `calc(${rowSpan} * ((100% - 1.5rem) / 3) + ${(rowSpan - 1) * 0.75}rem)`,
    left: `calc(${col} * ((100% - 1.5rem) / 3 + 0.75rem))`,
    top: `calc(${row} * ((100% - 1.5rem) / 3 + 0.75rem))`,
  };
}

function MosaicTile({
  covers,
  initialSrc,
  layoutStyle,
}: {
  covers: string[];
  initialSrc: string;
  layoutStyle: CSSProperties;
}) {
  const [src, setSrc] = useState(initialSrc);
  const [overlaySrc, setOverlaySrc] = useState<string | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const srcRef = useRef(src);
  srcRef.current = src;

  useEffect(() => {
    let cancelled = false;
    let waitTimeout = 0;
    let swapTimeout = 0;
    let resetTimeout = 0;

    const scheduleNext = () => {
      const wait = 1600 + Math.random() * 2800;
      waitTimeout = window.setTimeout(() => {
        if (cancelled) return;

        const next = pickRandomCover(covers, srcRef.current);
        setOverlaySrc(next);
        requestAnimationFrame(() => {
          if (!cancelled) setOverlayVisible(true);
        });

        swapTimeout = window.setTimeout(() => {
          if (cancelled) return;
          setSrc(next);
          setOverlayVisible(false);
          resetTimeout = window.setTimeout(() => {
            if (!cancelled) {
              setOverlaySrc(null);
              scheduleNext();
            }
          }, 80);
        }, MOSAIC_FADE_MS);
      }, wait);
    };

    waitTimeout = window.setTimeout(scheduleNext, 400 + Math.random() * 2400);

    return () => {
      cancelled = true;
      window.clearTimeout(waitTimeout);
      window.clearTimeout(swapTimeout);
      window.clearTimeout(resetTimeout);
    };
  }, [covers]);

  return (
    <div className="absolute overflow-hidden border border-[#E8DDE0] bg-white" style={layoutStyle}>
      <Image
        src={src}
        alt="Libo/Libo podcast cover"
        fill
        className="object-cover"
        sizes="(min-width: 768px) 460px, 44vw"
      />
      {overlaySrc ? (
        <div
          className="absolute inset-0 transition-opacity duration-[650ms] ease-in-out"
          style={{ opacity: overlayVisible ? 1 : 0 }}
        >
          <Image
            src={overlaySrc}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 768px) 460px, 44vw"
            aria-hidden
          />
        </div>
      ) : null}
    </div>
  );
}

export function PodcastMosaic({ covers }: { covers: string[] }) {
  const initialTiles = Array.from({ length: 6 }, (_, index) => covers[index % covers.length]);

  return (
    <div className="relative aspect-square w-full">
      {initialTiles.map((initialSrc, tileIndex) => (
        <MosaicTile
          key={tileIndex}
          covers={covers}
          initialSrc={initialSrc}
          layoutStyle={mosaicTileStyle(mosaicSlotByIndex[tileIndex])}
        />
      ))}
    </div>
  );
}