import Image from "next/image";

import type { HeroContent } from "@/types/home";

import styles from "./Hero.module.css";
import { PhoneLink } from "./PhoneLink";

type HeroProps = {
  content: HeroContent;
};

/**
 * 첫 화면. 사람이 먼저 오고, 주장이 뒤따르고, 인적사항이 표로 정리된다.
 * 프로젝트 이름은 쓰지 않는다.
 */
export function Hero({ content }: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.wrap}>
        <div className={styles.intro}>
          <h1 id="hero-title" className={styles.name}>
            {content.name}
          </h1>
          <p className={styles.role}>{content.role}</p>
          <p className={styles.claim}>
            {content.lines.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
          </p>
        </div>

        {/* 사각 초상. 첫 화면에서 문장과 사람을 같이 보여준다. */}
        <Image
          className={styles.portrait}
          src={content.portrait.src}
          alt={content.portrait.alt}
          width={380}
          height={380}
          priority
          placeholder="blur"
        />

        {/* 인적사항 — 읽지 않고 훑을 사람을 위한 라벨/값 2열.
            CONTACT의 링크 목록과 값은 같다. 거기는 마무리 맥락, 여기는 스캔용이다. */}
        <ul className={styles.profile}>
          {content.profile.map((row) => (
            <li key={row.label} className={styles.item}>
              {row.phoneParts ? (
                <PhoneLink
                  label={row.label}
                  parts={row.phoneParts}
                  className={styles.link}
                  keyClassName={styles.key}
                  valueClassName={styles.value}
                />
              ) : (
                <a
                  className={styles.link}
                  href={row.href}
                  {...(row.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className={styles.key}>{row.label}</span>
                  <span className={styles.value}>{row.value}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
