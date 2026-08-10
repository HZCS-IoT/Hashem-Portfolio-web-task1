"use client";

import { useEffect, useState } from "react";
import {
  SCROLL_SECTIONS,
  SECTION_WORK_STATE,
  type WorkState,
} from "@/data/workStates";

export function useWorkStateFromScroll(defaultState: WorkState = "coding") {
  const [workState, setWorkState] = useState<WorkState>(defaultState);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const sections = SCROLL_SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;

        const id = visible[0].target.id;
        setActiveSection(id);
        setWorkState(SECTION_WORK_STATE[id] ?? defaultState);
      },
      {
        root: null,
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [defaultState]);

  return { workState, activeSection };
}
