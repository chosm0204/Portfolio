import { Section } from "@/components/Section";
import { Shot } from "@/components/Shot";
import type { TimelineContent } from "@/types/home";

import styles from "./Timeline.module.css";

type TimelineProps = {
  content: TimelineContent;
};

/** 연도 → 활동·수상. 프로젝트명은 계보 배지로만 나온다. */
export function Timeline({ content }: TimelineProps) {
  return (
    <Section
      id={content.head.id}
      kicker={content.head.kicker}
      title={content.head.title}
    >
      <dl className={styles.list}>
        {content.years.map((group) => (
          <div key={group.year} className={styles.row}>
            <dt className={styles.year}>{group.year}</dt>
            <dd className={styles.entries}>
              <ul>
                {group.entries.map((entry) => (
                  <li key={entry.label}>
                    {entry.label}
                    {entry.lineage ? (
                      <span className={styles.lineage}>{`→ ${entry.lineage}`}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
      {/* 목록만으로는 글자로만 남는 수상 기록에 현장 한 장을 붙인다. */}
      {content.shot ? (
        <div className={styles.shot}>
          <Shot shot={content.shot} />
        </div>
      ) : null}
    </Section>
  );
}
