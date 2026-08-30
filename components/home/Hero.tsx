import Image from "next/image";

import type { HeroContent } from "@/types/home";

import styles from "./Hero.module.css";

type HeroProps = {
  content: HeroContent;
};

/** 첫 화면. 사람이 먼저 나오고 프로젝트 이름은 쓰지 않는다. */
export function Hero({ content }: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.wrap}>
        <h1 id="hero-title" className={styles.title}>
          {content.lines.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </h1>

        {/* 주인공은 문장이다. 사진은 정체줄 옆 작은 원형으로만 둔다. */}
        <p className={styles.identity}>
          <Image
            className={styles.portrait}
            src={content.portrait.src}
            alt={content.portrait.alt}
            width={64}
            height={64}
            sizes="64px"
            priority
            placeholder="blur"
          />
          <span>{content.identity}</span>
        </p>
      </div>
    </section>
  );
}
