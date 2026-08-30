import Image from "next/image";

import type { HeroContent } from "@/types/home";

import styles from "./Hero.module.css";

type HeroProps = {
  content: HeroContent;
};

/** 첫 화면. 왼쪽에 문장, 오른쪽에 사람. 프로젝트 이름은 쓰지 않는다. */
export function Hero({ content }: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.wrap}>
        <div className={styles.text}>
          <h1 id="hero-title" className={styles.title}>
            {content.lines.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.identity}>{content.identity}</p>
        </div>

        {/* 280px 사각 초상. 첫 화면에서 문장과 사람을 같이 보여준다. */}
        <Image
          className={styles.portrait}
          src={content.portrait.src}
          alt={content.portrait.alt}
          width={280}
          height={280}
          priority
          placeholder="blur"
        />
      </div>
    </section>
  );
}
