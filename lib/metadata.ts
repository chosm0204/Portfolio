/**
 * 공유 미리보기 카드 — `public/og.png` (1200×630 텍스트 카드).
 *
 * 페이지에서 `openGraph`를 선언하면 부모의 `openGraph` 객체를 **통째로 덮어쓴다**.
 * 따라서 제목만 바꾸는 페이지도 이 이미지를 다시 넣어야 미리보기가 유지된다.
 */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "조승민 · 프론트엔드 · AI",
} as const;

/** 트위터 카드는 URL 문자열만 받는다. */
export const OG_IMAGE_URL = OG_IMAGE.url;
