import { Fragment } from "react";

import { RichText } from "@/components/RichText";
import { Section } from "@/components/Section";
import type { AboutContent } from "@/types/home";

import styles from "./About.module.css";

type AboutProps = {
  content: AboutContent;
};

export function About({ content }: AboutProps) {
  return (
    <Section
      id={content.head.id}
      kicker={content.head.kicker}
      title={content.head.title}
    >
      <p className={styles.body}>
        {content.lines.map((line, index) => (
          <Fragment key={line}>
            {index > 0 ? <br /> : null}
            {line}
          </Fragment>
        ))}
      </p>
      <p className={styles.proof}>
        <RichText value={content.proof} strongClassName={styles.strong} />
      </p>
    </Section>
  );
}
