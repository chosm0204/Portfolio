"use client";

import { useEffect, useRef, useState } from "react";

import type { CaseBar, CaseMetric } from "@/types/case";

import styles from "./Case.module.css";

type CaseMetricsProps = {
  metrics: readonly CaseMetric[];
  bars: readonly CaseBar[];
  caption: string;
};

/** 막대 차오름 620ms · 숫자 카운트업 760ms (CLAUDE.md 모션 표) */
const COUNT_DURATION = 760;

/**
 * 숫자를 0에서 끝값까지 올린다. 끝나면 원래 문자열을 그대로 되돌려 놓는다.
 * `73.1%` 처럼 앞이 숫자, 뒤가 단위인 형태만 다룬다.
 */
function countUp(element: HTMLElement, onFrame: (id: number) => void) {
  const raw = element.textContent?.trim() ?? "";
  const match = /^([\d.]+)(.*)$/.exec(raw);
  if (!match) {
    return;
  }

  const [, digits = "", suffix = ""] = match;
  const end = Number.parseFloat(digits);
  const decimals = (digits.split(".")[1] ?? "").length;
  const start = performance.now();

  const step = (now: number) => {
    const k = Math.min(1, (now - start) / COUNT_DURATION);
    const eased = 1 - Math.pow(1 - k, 3);
    element.textContent = (end * eased).toFixed(decimals) + suffix;

    if (k < 1) {
      onFrame(requestAnimationFrame(step));
    } else {
      element.textContent = raw;
    }
  };

  onFrame(requestAnimationFrame(step));
}

/**
 * 큰 지표 + Before/After 막대.
 * 화면에 들어올 때 **한 번만** 재생한다. 되감지 않는다.
 * `prefers-reduced-motion`이면 즉시 완성 상태로 둔다.
 */
export function CaseMetrics({ metrics, bars, caption }: CaseMetricsProps) {
  const metricsRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedRef = useRef(false);

  const [metricsOn, setMetricsOn] = useState(false);
  const [barsOn, setBarsOn] = useState(false);

  useEffect(() => {
    // 완성 상태 자체는 CSS의 prefers-reduced-motion 블록이 보장한다.
    // 여기서는 숫자 카운트업만 건너뛰면 된다.
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          observer.unobserve(entry.target);

          if (entry.target === metricsRef.current) {
            setMetricsOn(true);
          } else {
            setBarsOn(true);
          }
        }
      },
      { threshold: 0.4 },
    );

    const targets = [metricsRef.current, barsRef.current].filter(
      (node): node is HTMLDivElement => node !== null,
    );
    targets.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!metricsOn || reducedRef.current) {
      return;
    }

    let frame = 0;
    const track = (id: number) => {
      frame = id;
    };

    valueRefs.current.forEach((node) => {
      if (node) {
        countUp(node, track);
      }
    });

    return () => {
      if (frame !== 0) {
        cancelAnimationFrame(frame);
      }
    };
  }, [metricsOn]);

  return (
    <>
      {/* 스크립트가 없으면 막대를 채운 상태 그대로 보여준다 */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<style>.${styles.barFill}{transform:scaleX(1)}.${styles.metricValue}{opacity:1;transform:none}</style>`,
        }}
      />

      <div className={styles.metrics} ref={metricsRef} data-on={metricsOn ? "true" : "false"}>
        {metrics.map((metric, index) => (
          <div key={metric.label}>
            <div
              className={styles.metricValue}
              ref={(node) => {
                valueRefs.current[index] = node;
              }}
            >
              {metric.value}
            </div>
            <div className={styles.metricLabel}>{metric.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.bars} ref={barsRef} data-on={barsOn ? "true" : "false"}>
        {bars.map((bar) => (
          <div key={bar.tag} className={styles.barRow}>
            <span className={styles.barTag}>{bar.tag}</span>
            <span className={styles.barTrack}>
              <span
                className={
                  bar.dim ? `${styles.barFill} ${styles.barFillDim}` : styles.barFill
                }
                style={{ width: `${bar.percent}%` }}
              />
            </span>
            <span className={styles.barValue}>{bar.value}</span>
          </div>
        ))}
      </div>

      <p className={styles.caption}>{caption}</p>
    </>
  );
}
