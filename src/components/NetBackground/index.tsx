/**
 * NetBackground — Canvas-based animated network mesh.
 *
 * Inspired by Vanta.js NET effect, implemented from scratch using
 * HTML5 Canvas for zero external dependencies.
 *
 * How it works:
 *  1. Points are placed on a grid with random jitter.
 *  2. Each frame, points float gently (sine-wave oscillation).
 *  3. Lines connect nearby points; opacity fades with distance.
 *  4. Dots render at each point location.
 *  5. Mouse proximity causes points to subtly gravitate, creating
 *     a living, interactive background.
 */

import React, { useRef, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

/* ─── Types ──────────────────────────────────── */

interface Point {
  /** base position (never mutated) */
  ox: number;
  oy: number;
  /** current drawn position */
  x: number;
  y: number;
  /** per-point randomised wave offsets */
  phaseX: number;
  phaseY: number;
  /** per-point amplitude multipliers */
  ampX: number;
  ampY: number;
  /** slow drift velocity */
  vx: number;
  vy: number;
}

/* ─── Tuning knobs ───────────────────────────── */

const CONFIG = {
  /** grid density: columns × rows are computed from this + viewport */
  spacing: 65,
  /** random jitter applied to initial grid placement */
  jitter: 30,
  /** maximum pixel distance to draw a connecting line */
  maxDistance: 150,
  /** dot radius */
  dotRadius: 1.8,
  /** floating amplitude range (px) */
  floatAmpMin: 8,
  floatAmpMax: 22,
  /** floating speed multiplier */
  floatSpeed: 0.0004,
  /** mouse interaction radius */
  mouseRadius: 200,
  /** how strongly points push away from mouse (0 = off) */
  mouseRepel: 0.06,
  /** line colour (r, g, b) — purple-700 (#7c2dc2) */
  lineColor: [124, 45, 194] as [number, number, number],
  /** dot colour */
  dotColor: [107, 33, 168] as [number, number, number],
  /** max line alpha */
  lineAlphaMax: 0.28,
  /** dot alpha */
  dotAlpha: 0.45,
  /** extra points added around edges so lines don't clip */
  edgePad: 80,
};

/* ─── Helpers ────────────────────────────────── */

function rn(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

/* ─── Component ──────────────────────────────── */

export default function NetBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const rafRef = useRef<number>(0);
  const dprRef = useRef<number>(1);

  /* ── Build point grid ──────────────────────── */
  const buildPoints = useCallback((w: number, h: number) => {
    const { spacing, jitter, edgePad, floatAmpMin, floatAmpMax } = CONFIG;
    const pts: Point[] = [];
    const cols = Math.ceil((w + edgePad * 2) / spacing);
    const rows = Math.ceil((h + edgePad * 2) / spacing);

    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const bx = -edgePad + i * spacing + rn(-jitter, jitter);
        const by = -edgePad + j * spacing + rn(-jitter, jitter);
        pts.push({
          ox: bx,
          oy: by,
          x: bx,
          y: by,
          phaseX: rn(0, Math.PI * 2),
          phaseY: rn(0, Math.PI * 2),
          ampX: rn(floatAmpMin, floatAmpMax),
          ampY: rn(floatAmpMin, floatAmpMax),
          vx: rn(-0.15, 0.15),
          vy: rn(-0.15, 0.15),
        });
      }
    }
    pointsRef.current = pts;
  }, []);

  /* ── Animation loop ────────────────────────── */
  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = dprRef.current;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const pts = pointsRef.current;
    const mouse = mouseRef.current;
    const {
      maxDistance,
      dotRadius,
      floatSpeed,
      mouseRadius,
      mouseRepel,
      lineColor,
      dotColor,
      lineAlphaMax,
      dotAlpha,
    } = CONFIG;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    const t = time * floatSpeed;

    /* update positions */
    for (const p of pts) {
      p.x = p.ox + Math.sin(t + p.phaseX) * p.ampX;
      p.y = p.oy + Math.cos(t * 0.8 + p.phaseY) * p.ampY;

      /* slow drift */
      p.ox += p.vx * 0.05;
      p.oy += p.vy * 0.05;

      /* wrap drift so points don't leave canvas region */
      const pad = CONFIG.edgePad + 20;
      if (p.ox < -pad) p.ox = w + pad;
      if (p.ox > w + pad) p.ox = -pad;
      if (p.oy < -pad) p.oy = h + pad;
      if (p.oy > h + pad) p.oy = -pad;

      /* mouse interaction — gentle push */
      if (mouse.active) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRadius && dist > 0) {
          const force = (1 - dist / mouseRadius) * mouseRepel;
          p.x += (dx / dist) * force * mouseRadius;
          p.y += (dy / dist) * force * mouseRadius;
        }
      }
    }

    /* draw lines */
    const [lr, lg, lb] = lineColor;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDistance) {
          const alpha = clamp((1 - dist / maxDistance) * 1.5, 0, 1) * lineAlphaMax;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${lr},${lg},${lb},${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    /* draw dots */
    const [dr, dg, db] = dotColor;
    ctx.fillStyle = `rgba(${dr},${dg},${db},${dotAlpha})`;
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  /* ── Setup & teardown ──────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* respect reduced-motion */
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      buildPoints(w, h);
    };

    /* listen on document so mouse interaction works even though
       the canvas has pointer-events: none */
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMouse);
    document.addEventListener('mouseleave', onMouseLeave);

    if (!prefersReducedMotion) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      /* draw one static frame */
      animate(0);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouse);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [animate, buildPoints]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
