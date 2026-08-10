"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import WorkStateBadge from "@/components/WorkStateBadge";
import { useWorkStateFromScroll } from "@/hooks/useWorkStateFromScroll";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

export default function Home() {
  const [scroll, setScroll] = useState(0);
  const { workState, activeSection } = useWorkStateFromScroll();

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Scene3D scroll={scroll} workState={workState} />
      <WorkStateBadge workState={workState} activeSection={activeSection} />
      <Nav scroll={scroll} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
