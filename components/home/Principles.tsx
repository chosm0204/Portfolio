import { Section } from "@/components/Section";
import type { PrinciplesContent } from "@/types/home";

import styles from "./Principles.module.css";

type PrinciplesProps = {
  content: PrinciplesContent;
};

export function Principles({ content }: PrinciplesProps) {
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
            <p className={styles.body}>{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
