import type { Metadata } from "next";

import { CaseView } from "@/components/case/CaseView";
import { dudu } from "@/content/cases/dudu";
import { home } from "@/content/home";
import { OG_IMAGE, OG_IMAGE_URL } from "@/lib/metadata";

const card = home.selectedWork.items.find((item) => item.id === dudu.id);

if (!card) {
  throw new Error(`Unknown work item: ${dudu.id}`);
}

const description = card.summary;

export const metadata: Metadata = {
  title: dudu.title,
  description,
  // openGraph를 선언하면 부모 것을 통째로 덮으므로 이미지도 다시 넣는다.
  openGraph: {
    title: `${dudu.title} · 조승민`,
    description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${dudu.title} · 조승민`,
    description,
    images: [OG_IMAGE_URL],
  },
};

export default function DuduPage() {
  return <CaseView content={dudu} />;
}
