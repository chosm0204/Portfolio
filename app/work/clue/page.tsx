import type { Metadata } from "next";

import { CaseView } from "@/components/case/CaseView";
import { clue } from "@/content/cases/clue";
import { home } from "@/content/home";
import { OG_IMAGE, OG_IMAGE_URL } from "@/lib/metadata";

const card = home.selectedWork.items.find((item) => item.id === clue.id);

if (!card) {
  throw new Error(`Unknown work item: ${clue.id}`);
}

const description = card.summary;

export const metadata: Metadata = {
  title: clue.title,
  description,
  // openGraph를 선언하면 부모 것을 통째로 덮으므로 이미지도 다시 넣는다.
  openGraph: {
    title: `${clue.title} · 조승민`,
    description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${clue.title} · 조승민`,
    description,
    images: [OG_IMAGE_URL],
  },
};

export default function CluePage() {
  return <CaseView content={clue} />;
}
