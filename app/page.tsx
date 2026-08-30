import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Principles } from "@/components/home/Principles";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Teaching } from "@/components/home/Teaching";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { Timeline } from "@/components/home/Timeline";
import { home } from "@/content/home";

export default function HomePage() {
  return (
    <>
      {/* 화면에서는 하단에 떠 있지만 DOM에서는 본문보다 앞에 둔다.
          키보드·스크린리더가 본문을 다 지나야 이동 수단을 만나는 일이 없게 한다. */}
      <SiteNav content={home.nav} />
      <main>
        <Hero content={home.hero} />
        <About content={home.about} />
        <Principles content={home.principles} />
        <Timeline content={home.timeline} />
        <SelectedWork content={home.selectedWork} />
        <Teaching content={home.teaching} />
        <Contact content={home.contact} />
      </main>
      <SiteFooter text={home.footer} />
    </>
  );
}
