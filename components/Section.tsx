import type { ReactNode } from "react";

import styles from "./Section.module.css";

type SectionProps = {
  /** 영문 키커 — 예: `ABOUT` */
  kicker: string;
  /** 국문 제목. 생략하면 `titleNode`를 대신 렌더한다. */
  title?: string;
  /** 국문 제목 대신 문장형 h2를 쓰는 섹션(CONTACT)용. */
  titleNode?: ReactNode;
  id: string;
  /** 섹션 루트에 붙일 추가 클래스. */
  className?: string;
  /** 기본 섹션 제목 스타일을 **대체**할 때 (CONTACT처럼 제목 자리에 문장이 오는 경우). */
  titleClassName?: string;
  children: ReactNode;
};

/**
 * 전 섹션 공통 껍데기 — 영문 키커 + 국문 제목 조합.
 * 키커는 `<span>`이므로 heading 위계는 h1(히어로) → h2(섹션) → h3(항목)으로 유지된다.
 */
export function Section({
  kicker,
  title,
  titleNode,
  id,
  className,
  titleClassName,
  children,
}: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={className ? `${styles.section} ${className}` : styles.section}
    >
      <div className={styles.wrap}>
        <span className={styles.kicker}>{kicker}</span>
        <h2
          id={headingId}
          className={titleClassName ?? styles.title}
        >
          {titleNode ?? title}
        </h2>
        {children}
      </div>
    </section>
  );
}
