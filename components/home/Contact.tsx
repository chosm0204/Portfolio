import { Section } from "@/components/Section";
import type { ContactContent } from "@/types/home";

import styles from "./Contact.module.css";
import { PhoneLink } from "./PhoneLink";

type ContactProps = {
  content: ContactContent;
};

/**
 * 마무리. 히어로("짐작으로 만들지 않습니다")와 수미상관을 이룬다.
 *
 * 링크 값은 히어로 인적사항 표와 같다(`content/home.ts`의 상수 하나에서 온다).
 * 히어로 표는 훑고 지나갈 사람을 위한 자리, 여기는 다 읽고 연락할 사람을 위한 자리다.
 */
export function Contact({ content }: ContactProps) {
  return (
    <Section
      id={content.id}
      kicker={content.kicker}
      titleNode={content.heading}
      titleClassName={styles.heading}
    >
      <p className={styles.body}>{content.body}</p>
      <p className={`${styles.body} ${styles.push}`}>{content.push}</p>

      <nav className={styles.links} aria-label={content.navLabel}>
        <ul className={styles.list}>
          {content.links.map((link) => (
            <li key={link.key} className={styles.item}>
              {link.phoneParts ? (
                <PhoneLink
                  label={link.key}
                  parts={link.phoneParts}
                  className={styles.link}
                  keyClassName={styles.key}
                  valueClassName={styles.value}
                />
              ) : (
                <a
                  className={styles.link}
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className={styles.key}>{link.key}</span>
                  <span className={styles.value}>{link.value}</span>
                  {link.note ? (
                    <span className={styles.note}>{link.note}</span>
                  ) : null}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </Section>
  );
}
