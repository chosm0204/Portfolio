import { RichText } from "@/components/RichText";
import { Section } from "@/components/Section";
import { Shot } from "@/components/Shot";
import type { TeachingContent } from "@/types/home";

import styles from "./Teaching.module.css";

type TeachingProps = {
  content: TeachingContent;
};

export function Teaching({ content }: TeachingProps) {
  return (
    <Section
      id={content.head.id}
      kicker={content.head.kicker}
      title={content.head.title}
    >
      <ul className={styles.list}>
        {content.items.map((item) => (
          <li key={item.title}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.body}>
              <RichText value={item.body} strongClassName={styles.strong} />
            </p>
            {item.shot ? <Shot shot={item.shot} /> : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
