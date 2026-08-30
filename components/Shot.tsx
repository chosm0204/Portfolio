import Image from "next/image";

import type { ShotSlot } from "@/types/home";

import styles from "./Shot.module.css";

type ShotProps = {
  shot: ShotSlot;
  /** 사진 아래 설명. 있으면 `<figcaption>`으로 붙는다. */
  caption?: string;
};

/**
 * 이미지 슬롯.
 * 비율이 먼저 고정되어 있어, 사진을 확보하면 `shot.image` 한 필드만 채우면 된다.
 * 사진 처리는 라운드 12px + 옅은 그림자로 통일한다 (CLAUDE.md 이미지 규칙).
 */
export function Shot({ shot, caption }: ShotProps) {
  const { image } = shot;
  // 슬롯이 자기 설명을 들고 있으면 그걸 쓴다. 호출부가 넘긴 값이 우선한다.
  const text = caption ?? shot.caption;

  return (
    <figure
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
              : "(max-width: 760px) 100vw, 720px"
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
