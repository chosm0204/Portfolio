import type { Metadata, Viewport } from "next";

import { Reveal } from "@/components/Reveal";
import { OG_IMAGE, OG_IMAGE_URL } from "@/lib/metadata";
import { REVEAL_SCRIPT } from "@/lib/reveal";

import { jetbrainsMono, pretendard } from "./fonts";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const title = "조승민 · 프론트엔드 · AI";
const description =
  "짐작으로 만들지 않습니다. 기준을 먼저 정하고, 만든 뒤에는 얼마나 나아졌는지 검증합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · 조승민`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: title,
    title,
    description,
    // 1200×630 텍스트 카드. 케이스 페이지도 같은 이미지를 쓴다.
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [OG_IMAGE_URL],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F8F9",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${jetbrainsMono.variable}`}>
      <body>
        {/* 본문이 그려지기 전에 실행돼야 깜빡임이 없다.
            숨김 규칙은 이 스크립트 안에만 있다 — 실행되지 않으면 전부 보이는 상태 그대로다. */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
        {children}
        <Reveal />
      </body>
    </html>
  );
}
