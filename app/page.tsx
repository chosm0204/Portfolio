import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Principles } from "@/components/home/Principles";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Teaching } from "@/components/home/Teaching";
import { SiteFooter } from "@/components/SiteFooter";
import { Timeline } from "@/components/home/Timeline";
import { home } from "@/content/home";

export default function HomePage() {
  return (
    <>
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
