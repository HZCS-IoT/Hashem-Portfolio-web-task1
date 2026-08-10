export type WorkState = "coding" | "soldering" | "wiring" | "inspecting";

export const WORK_STATE_ORDER: WorkState[] = ["coding", "inspecting", "soldering", "wiring"];

export const WORK_STATE_LABELS: Record<WorkState, string> = {
  coding: "CODING",
  soldering: "SOLDERING",
  wiring: "WIRING",
  inspecting: "INSPECTING",
};

/** Maps each portfolio section to a work-state while scrolling. */
export const SECTION_WORK_STATE: Record<string, WorkState> = {
  hero: "coding",
  about: "inspecting",
  projects: "soldering",
  skills: "wiring",
  contact: "coding",
};

export const SCROLL_SECTIONS = ["hero", "about", "projects", "skills", "contact"] as const;
