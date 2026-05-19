"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

const TILE_COUNT = 6;
const MOSAIC_FADE_MS = 650;

const mosaicSlotByIndex: Array<{ col: number; row: number; colSpan?: number; rowSpan?: number }> = [
  { col: 0, row: 0, colSpan: 2, rowSpan: 2 },
  { col: 2, row: 0 },
  { col: 2, row: 1 },
  { col: 0, row: 2 },
  { col: 1, row: 2 },
  { col: 2, row: 2 },
];

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildInitialTiles(covers: string[], count: number): string[] {
  if (covers.length === 0) return Array(count).fill("");

  const unique = shuffle(covers);
  const tiles: string[] = [];

  for (let i = 0; i < count; i += 1) {
    if (i < unique.length) {
      tiles.push(unique[i]);
      continue;
    }

    const used = new Set(tiles);
    const available = covers.filter((cover) => !used.has(cover));
    const pool = available.length > 0 ? available : covers;
    tiles.push(pool[Math.floor(Math.random() * pool.length)]);
  }

  return tiles;
}

function getUsedCovers(
  tileSrcs: string[],
  overlaySrcs: Array<string | null>,
  excludeIndex: number,
): Set<string> {
  const used = new Set<string>();
  for (let i = 0; i < tileSrcs.length; i += 1) {
    if (i === excludeIndex) continue;
    used.add(tileSrcs[i]);
    const overlay = overlaySrcs[i];
    if (overlay) used.add(overlay);
  }
  return used;
}

function pickUniqueCover(
  covers: string[],
  tileIndex: number,
  tileSrcs: string[],
  overlaySrcs: Array<string | null>,
): string {
  const current = tileSrcs[tileIndex];
  const used = getUsedCovers(tileSrcs, overlaySrcs, tileIndex);

  let pool = covers.filter((cover) => !used.has(cover) && cover !== current);
  if (pool.length === 0) {
    pool = covers.filter((cover) => !used.has(cover));
  }
  if (pool.length === 0) {
    pool = covers.filter((cover) => cover !== current);
  }
  if (pool.length === 0) {
    return covers[Math.floor(Math.random() * covers.length)] ?? current;
  }

  return pool[Math.floor(Math.random() * pool.length)];
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
  src,
  overlaySrc,
  overlayVisible,
  layoutStyle,
}: {
  src: string;
  overlaySrc: string | null;
  overlayVisible: boolean;
  layoutStyle: CSSProperties;
}) {
  return (
    <div className="absolute overflow-hidden border border-[#E8DDE0] bg-white" style={layoutStyle}>
      {src ? (
        <Image
          src={src}
          alt="Libo/Libo podcast cover"
          fill
          className="object-cover"
          sizes="(min-width: 768px) 460px, 44vw"
        />
      ) : null}
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

function useTileCycler(
  tileIndex: number,
  covers: string[],
  tileSrcsRef: RefObject<string[]>,
  overlaySrcsRef: RefObject<Array<string | null>>,
  setTileSrcs: Dispatch<SetStateAction<string[]>>,
  setOverlaySrcs: Dispatch<SetStateAction<Array<string | null>>>,
  setOverlayVisible: Dispatch<SetStateAction<boolean[]>>,
) {
  const cycleTile = useCallback(() => {
    const tileSrcs = tileSrcsRef.current;
    const overlaySrcs = overlaySrcsRef.current;
    if (!tileSrcs || !overlaySrcs) return;

    const next = pickUniqueCover(covers, tileIndex, tileSrcs, overlaySrcs);
    const overlayDraft = [...overlaySrcs];
    overlayDraft[tileIndex] = next;
    overlaySrcsRef.current = overlayDraft;

    setOverlaySrcs((prev) => {
      const copy = [...prev];
      copy[tileIndex] = next;
      return copy;
    });

    requestAnimationFrame(() => {
      setOverlayVisible((prev) => {
        const copy = [...prev];
        copy[tileIndex] = true;
        return copy;
      });
    });

    window.setTimeout(() => {
      setTileSrcs((prev) => {
        const copy = [...prev];
        copy[tileIndex] = next;
        tileSrcsRef.current = copy;
        return copy;
      });
      setOverlayVisible((prev) => {
        const copy = [...prev];
        copy[tileIndex] = false;
        return copy;
      });
      window.setTimeout(() => {
        setOverlaySrcs((prev) => {
          const copy = [...prev];
          copy[tileIndex] = null;
          return copy;
        });
      }, 80);
    }, MOSAIC_FADE_MS);
  }, [covers, overlaySrcsRef, setOverlaySrcs, setOverlayVisible, setTileSrcs, tileIndex, tileSrcsRef]);

  useEffect(() => {
    let cancelled = false;
    let waitTimeout = 0;
    let swapTimeout = 0;
    let resetTimeout = 0;

    const scheduleNext = () => {
      const wait = 1600 + Math.random() * 2800;
      waitTimeout = window.setTimeout(() => {
        if (cancelled) return;
        cycleTile();
        swapTimeout = window.setTimeout(() => {
          if (!cancelled) scheduleNext();
        }, MOSAIC_FADE_MS + 80);
      }, wait);
    };

    waitTimeout = window.setTimeout(scheduleNext, 400 + Math.random() * 2400);

    return () => {
      cancelled = true;
      window.clearTimeout(waitTimeout);
      window.clearTimeout(swapTimeout);
      window.clearTimeout(resetTimeout);
    };
  }, [cycleTile]);
}

export function PodcastMosaic({ covers }: { covers: string[] }) {
  const [tileSrcs, setTileSrcs] = useState(() => buildInitialTiles(covers, TILE_COUNT));
  const [overlaySrcs, setOverlaySrcs] = useState<Array<string | null>>(() => Array(TILE_COUNT).fill(null));
  const [overlayVisible, setOverlayVisible] = useState(() => Array(TILE_COUNT).fill(false));

  const tileSrcsRef = useRef(tileSrcs);
  const overlaySrcsRef = useRef(overlaySrcs);
  tileSrcsRef.current = tileSrcs;
  overlaySrcsRef.current = overlaySrcs;

  useEffect(() => {
    setTileSrcs(buildInitialTiles(covers, TILE_COUNT));
    setOverlaySrcs(Array(TILE_COUNT).fill(null));
    setOverlayVisible(Array(TILE_COUNT).fill(false));
  }, [covers]);

  return (
    <div className="relative aspect-square w-full">
      {tileSrcs.map((src, tileIndex) => (
        <TileWithCycle
          key={tileIndex}
          tileIndex={tileIndex}
          covers={covers}
          src={src}
          overlaySrc={overlaySrcs[tileIndex]}
          overlayVisible={overlayVisible[tileIndex]}
          tileSrcsRef={tileSrcsRef}
          overlaySrcsRef={overlaySrcsRef}
          setTileSrcs={setTileSrcs}
          setOverlaySrcs={setOverlaySrcs}
          setOverlayVisible={setOverlayVisible}
        />
      ))}
    </div>
  );
}

function TileWithCycle({
  tileIndex,
  covers,
  src,
  overlaySrc,
  overlayVisible,
  tileSrcsRef,
  overlaySrcsRef,
  setTileSrcs,
  setOverlaySrcs,
  setOverlayVisible,
}: {
  tileIndex: number;
  covers: string[];
  src: string;
  overlaySrc: string | null;
  overlayVisible: boolean;
  tileSrcsRef: RefObject<string[]>;
  overlaySrcsRef: RefObject<Array<string | null>>;
  setTileSrcs: Dispatch<SetStateAction<string[]>>;
  setOverlaySrcs: Dispatch<SetStateAction<Array<string | null>>>;
  setOverlayVisible: Dispatch<SetStateAction<boolean[]>>;
}) {
  useTileCycler(
    tileIndex,
    covers,
    tileSrcsRef,
    overlaySrcsRef,
    setTileSrcs,
    setOverlaySrcs,
    setOverlayVisible,
  );

  return (
    <MosaicTile
      src={src}
      overlaySrc={overlaySrc}
      overlayVisible={overlayVisible}
      layoutStyle={mosaicTileStyle(mosaicSlotByIndex[tileIndex])}
    />
  );
}
