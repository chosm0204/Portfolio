import Link from "next/link";

import { Section } from "@/components/Section";
import { Shot } from "@/components/Shot";
import {
  caseTitleTransitionName,
  TitleTransition,
} from "@/components/TitleTransition";
import { reveal } from "@/lib/reveal";
import type { SelectedWorkContent } from "@/types/home";

import styles from "./SelectedWork.module.css";

type SelectedWorkProps = {
  content: SelectedWorkContent;
};

export function SelectedWork({ content }: SelectedWorkProps) {
  return (
    <Section
      id={content.head.id}
      kicker={content.head.kicker}
      title={content.head.title}
    >
      {content.items.map((item, index) => {
        const titleId = `work-${item.id}-title`;

        return (
          <article
            key={item.id}
            {...reveal(index)}
            className={styles.card}
            aria-labelledby={titleId}
          >
            {/* 카드 제목 → 케이스 상세 제목으로 이어지는 전환의 출발점 */}
            <TitleTransition name={caseTitleTransitionName(item.id)}>
              <h3 id={titleId} className={styles.title}>
                {item.title}
              </h3>
            </TitleTransition>
            <p className={styles.summary}>{item.summary}</p>
            <ul className={styles.badges}>
              {item.badges.map((badge) => (
                <li
                  key={badge.label}
                  className={
                    badge.kind === "tech"
                      ? `${styles.badge} ${styles.badgeTech}`
                      : styles.badge
                  }
                >
                  {badge.label}
                </li>
              ))}
            </ul>
            <p className={styles.role}>{item.role}</p>
            {/* 카드가 통째로 진입한다. 사진이 또 나타나면 한 카드가 두 번 움직인다. */}
            <Shot shot={item.shot} reveal={false} />
            <Link
              className={styles.more}
              href={item.href}
              aria-label={`${item.title} ${item.moreLabel}`}
            >
              {item.moreLabel}
              <span aria-hidden="true"> →</span>
            </Link>
          </article>
        );
      })}
    </Section>
  );
}
