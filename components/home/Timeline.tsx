import { Section } from "@/components/Section";
import { Shot } from "@/components/Shot";
import type { TimelineContent } from "@/types/home";

import styles from "./Timeline.module.css";

type TimelineProps = {
  content: TimelineContent;
};

/** 연도 → 활동·수상. 등급은 배지로, 프로젝트명은 계보 표시로만 나온다. */
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
              <ul className={styles.cards}>
                {group.entries.map((entry) => (
                  <li
                    key={`${entry.label}${entry.lineage ?? ""}`}
                    className={styles.card}
                  >
                    <p className={styles.head}>
                      {entry.awards?.map((award) => (
                        <span key={award} className={styles.award}>
                          {award}
                        </span>
                      ))}
                      <span className={styles.name}>{entry.label}</span>
                    </p>
                    {entry.lineage ? (
                      <p className={styles.lineage}>
                        <span aria-hidden="true" className={styles.arrow}>
                          ↳
                        </span>
                        {`${entry.lineage}에서 이어짐`}
                      </p>
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
