"use client";

import { useEffect, useState } from "react";

import type { NavContent } from "@/types/home";

import styles from "./SiteNav.module.css";

type SiteNavProps = {
  content: NavContent;
};

/** 판정선 — 화면 높이의 이 지점을 지난 섹션을 "현재"로 본다. */
const LINE_RATIO = 0.28;

/**
 * 하단 중앙에 떠 있는 알약형 네비게이션.
 *
 * 상단 고정 대신 하단을 고른 이유는 두 가지다.
 * 1. 이름을 크게 세운 첫 화면을 가리지 않는다.
 * 2. 앵커로 이동해도 제목이 바 뒤로 숨지 않는다 — `scroll-margin-top`이 필요 없다.
 *
 * 현재 위치 표시는 관찰자를 신호로만 쓰고, 판정은 그 순간의 좌표로 다시 한다.
 * 관찰 대상이 아닌 섹션(PRINCIPLES·TIMELINE) 구간에서도 표시가 끊기지 않게 하기 위해서다.
 */
export function SiteNav({ content }: SiteNavProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = content.items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    // 지나온 항목 중 마지막 것이 현재 위치다. 아직 아무것도 안 지났으면 아무것도 켜지 않는다.
    const update = () => {
      const line = window.innerHeight * LINE_RATIO;
      let current: string | null = null;
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };

    // root를 판정선 위쪽 구간으로 자른다. 섹션이 그 선을 넘어오고 넘어갈 때만 콜백이 돈다.
    // 띠를 얇게 잡으면 화면이 낮을 때 그 높이가 1px 아래로 내려가 관찰이 헛돈다.
    const observer = new IntersectionObserver(update, {
      rootMargin: `0px 0px -${100 - LINE_RATIO * 100}% 0px`,
    });
    for (const el of targets) observer.observe(el);

    // 화면 높이가 바뀌면 판정선도 움직인다.
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [content.items]);

  return (
    <nav className={styles.nav} aria-label={content.label}>
      <ul className={styles.list}>
        {content.items.map((item) => (
          <li key={item.id}>
            <a
              className={styles.link}
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
