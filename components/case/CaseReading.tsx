"use client";

import { useEffect, useState } from "react";

import styles from "./Case.module.css";

type TocEntry = {
  readonly id: string;
  readonly tocLabel: string;
};

type CaseReadingProps = {
  navLabel: string;
  tocTitle: string;
  sections: readonly TocEntry[];
};

/** 섹션 제목이 이 높이 안으로 들어오면 현재 섹션으로 본다 (샘플 JS와 같은 기준). */
const ACTIVE_OFFSET = 140;

/**
 * 상단 읽기 진행바 + 좌측 sticky 목차.
 * 둘 다 스크롤 위치 하나로 결정되므로 리스너를 하나만 둔다.
 * 목차는 1100px 이상에서만 보인다 — 모바일에서는 진행바만 남는다.
 */
export function CaseReading({ navLabel, tocTitle, sections }: CaseReadingProps) {
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      const root = document.documentElement;
      const scrollable = root.scrollHeight - root.clientHeight;
      setProgress(scrollable > 0 ? (root.scrollTop / scrollable) * 100 : 0);

      let active = sections[0]?.id ?? "";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= ACTIVE_OFFSET) {
          active = section.id;
        }
      }
      setCurrent(active);
    };

    const onScroll = () => {
      if (frame === 0) {
        frame = requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame !== 0) {
        cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <>
      <div className={styles.bar} style={{ width: `${progress}%` }} aria-hidden="true" />

      <nav className={styles.toc} aria-label={navLabel}>
        <p className={styles.tocTitle}>{tocTitle}</p>
        {sections.map((section) => {
          const active = section.id === current;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={active ? `${styles.tocLink} ${styles.on}` : styles.tocLink}
              aria-current={active ? "location" : undefined}
            >
              {section.tocLabel}
            </a>
          );
        })}
      </nav>
    </>
  );
}
