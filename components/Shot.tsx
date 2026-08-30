import Image from "next/image";

import { reveal } from "@/lib/reveal";
import type { ShotSlot } from "@/types/home";

import styles from "./Shot.module.css";

type ShotProps = {
  shot: ShotSlot;
  /** 사진 아래 설명. 있으면 `<figcaption>`으로 붙는다. */
  caption?: string;
  /**
   * 스크롤 진입 효과. 이미 진입하는 블록(카드 등) 안에 들어갈 때만 끈다.
   * 겹치면 카드가 나타난 뒤 사진이 한 번 더 나타나 두 번 움직인다.
   */
  reveal?: boolean;
};

/**
 * 이미지 슬롯.
 * 비율이 먼저 고정되어 있어, 사진을 확보하면 `shot.image` 한 필드만 채우면 된다.
 * 사진 처리는 라운드 12px + 옅은 그림자로 통일한다 (CLAUDE.md 이미지 규칙).
 */
export function Shot({ shot, caption, reveal: revealSelf = true }: ShotProps) {
  const { image } = shot;
  // 슬롯이 자기 설명을 들고 있으면 그걸 쓴다. 호출부가 넘긴 값이 우선한다.
  const text = caption ?? shot.caption;
  // priority 사진은 LCP 후보다. 진입 효과로 늦추지 않는다.
  const animate = revealSelf && !image?.priority;

  return (
    <figure
      {...(animate ? reveal() : {})}
      className={styles.shot}
      data-slot={shot.slot}
      data-ratio={shot.ratio}
      data-filled={image ? "true" : undefined}
    >
      {image ? (
        <Image
          className={styles.image}
          src={image.src}
          alt={image.alt}
          sizes={
            image.maxWidth
              ? `(max-width: ${image.maxWidth}px) 100vw, ${image.maxWidth}px`
              : "(max-width: 1160px) 100vw, 1060px"
          }
          priority={image.priority}
          placeholder="blur"
        />
      ) : (
        <div className={styles.ph}>{shot.placeholder}</div>
      )}
      {text ? <figcaption className={styles.caption}>{text}</figcaption> : null}
    </figure>
  );
}
