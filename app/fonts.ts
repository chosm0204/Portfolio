import localFont from "next/font/local";

/**
 * 폰트는 2파일만 로딩한다 (CLAUDE.md 디자인 토큰).
 * Pretendard Variable — 본문 / JetBrains Mono Variable — 숫자·코드
 */

/**
 * Pretendard Variable.
 * `weight`를 반드시 명시한다. 생략하면 WebKit에서 가변축이 잡히지 않아 굵기가 깨진다.
 */
export const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  weight: "45 920",
  style: "normal",
  display: "swap",
  preload: true,
  variable: "--font-sans",
  fallback: [
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Apple SD Gothic Neo",
    "Malgun Gothic",
    "sans-serif",
  ],
});

/** JetBrains Mono Variable — 연도·지표 숫자 등폭 정렬용. */
export const jetbrainsMono = localFont({
  src: "../public/fonts/JetBrainsMono-Variable.woff2",
  weight: "100 800",
  style: "normal",
  display: "swap",
  preload: true,
  variable: "--font-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});
