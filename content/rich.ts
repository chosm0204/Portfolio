import type { RichText, TextSegment } from "@/types/home";

/**
 * 카피 안의 강조 구간을 데이터로 적기 위한 최소 도구.
 * 마크다운을 파싱하지 않는다 — 문장은 `content/`에 그대로 두고 구간만 표시한다.
 */

/** 굵게. 원본 HTML의 `<b>` */
export const b = (text: string): TextSegment => ({ text, strong: true });

/** 등폭. 숫자·코드 조각. */
export const mono = (text: string): TextSegment => ({ text, mono: true });

/** 보조 색. 원본 HTML의 `color:var(--sub)` 인라인 구간. */
export const sub = (text: string): TextSegment => ({ text, sub: true });

/** 문장 한 줄. 문자열은 평문 구간으로, 나머지는 그대로 담는다. */
export const line = (...parts: readonly (string | TextSegment)[]): RichText =>
  parts.map((part) => (typeof part === "string" ? { text: part } : part));
