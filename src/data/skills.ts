import { projects, githubRepos } from "./projects";

export type SkillMeta = {
  name: string;
  slug?: string;
  color?: string;
  /** Fallback label when no Simple Icons slug */
  monogram?: string;
};

export const skillGroups: { category: string; skills: SkillMeta[] }[] = [
  {
    category: "Frontend & Mobile",
    skills: [
      { name: "React", slug: "react", color: "61DAFB" },
      { name: "TypeScript", slug: "typescript", color: "3178C6" },
      { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
      { name: "Flutter", slug: "flutter", color: "02569B" },
      { name: "Dart", slug: "dart", color: "0175C2" },
      { name: "HTML/CSS", slug: "html5", color: "E34F26" },
      { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
      { name: "Framer Motion", slug: "framer", color: "0055FF" },
    ],
  },
  {
    category: "Backend & Cloud",
    skills: [
      { name: "Supabase", slug: "supabase", color: "3FCF8E" },
      { name: "Firebase", slug: "firebase", color: "DD2C00" },
      { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
      { name: "Edge Functions", monogram: "EF", color: "3FCF8E" },
      { name: "REST APIs", monogram: "API", color: "00F0FF" },
      { name: "PHP", slug: "php", color: "777BB4" },
    ],
  },
  {
    category: "IoT & Embedded",
    skills: [
      { name: "ESP32", monogram: "32", color: "E7352B" },
      { name: "C++", slug: "cplusplus", color: "00599C" },
      { name: "Arduino", slug: "arduino", color: "00979D" },
      { name: "MQTT", monogram: "MQ", color: "660066" },
      { name: "LEDC/PWM", monogram: "PWM", color: "00F0FF" },
      { name: "Servo Control", monogram: "SV", color: "FF006E" },
      { name: "MPU6050", monogram: "IMU", color: "94A3B8" },
      { name: "ROS 2", slug: "ros", color: "22314E" },
    ],
  },
  {
    category: "AI & Data",
    skills: [
      { name: "Python", slug: "python", color: "3776AB" },
      { name: "Machine Learning", slug: "tensorflow", color: "FF6F00" },
      { name: "Object Recognition", slug: "opencv", color: "5C3EE8" },
      { name: "NLP", monogram: "NLP", color: "00F0FF" },
      { name: "Voice AI", monogram: "AI", color: "FF006E" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", slug: "git", color: "F05032" },
      { name: "GitHub", slug: "github", color: "FFFFFF" },
      { name: "Vite", slug: "vite", color: "646CFF" },
      { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
      { name: "Onshape", slug: "onshape", color: "00B4D8" },
      { name: "3D Printing", monogram: "3D", color: "00F0FF" },
      { name: "Linux", slug: "linux", color: "FCC624" },
    ],
  },
];

/** Extra project links per skill (manual + inferred) */
const MANUAL_PROJECTS: Record<string, string[]> = {
  Onshape: ["Kiba RoboDog (Kiba V1 CAD)", "RoboDog BodyV2 mechanical refs", "mechanics-Algorithm-exploded-view"],
  "3D Printing": ["RoboDog BodyV2 parts", "Kiba RoboDog prototypes"],
  "Edge Functions": ["AlHulul HR Platform"],
  Firebase: ["Smart Academic Manager"],
  Supabase: ["AlHulul HR Platform", "Hashem OS"],
  PostgreSQL: ["AlHulul HR Platform"],
  "REST APIs": ["AlHulul HR Platform", "Smart Academic Manager"],
  PHP: ["AlHulul HR Platform (legacy integrations)"],
  MQTT: ["RoboDog BodyV2", "RoboDog Control Panel", "Smart Gate System"],
  "LEDC/PWM": ["RoboDog BodyV2"],
  "Servo Control": ["RoboDog BodyV2", "Smart Gate System", "Kiba RoboDog"],
  MPU6050: ["Kiba RoboDog"],
  ESP32: ["RoboDog BodyV2", "Kiba RoboDog", "Smart Gate System"],
  Arduino: ["RoboDog BodyV2", "Smart Gate System"],
  "ROS 2": ["ROS2-Humble-installation repo"],
  NLP: ["Voice Assistant AI", "RoboDog voice commands"],
  "Voice AI": ["Voice Assistant AI", "RoboDog BodyV2"],
  "Object Recognition": ["AI Object Recognition"],
  "Machine Learning": ["AI Object Recognition", "Fresh vs Rotten Fruit Classifier"],
  "Framer Motion": ["AlHulul HR Platform", "Hashem OS", "Portfolio"],
  "Tailwind CSS": ["AlHulul HR Platform", "Portfolio"],
  Vite: ["AlHulul HR Platform"],
  "Next.js": ["Portfolio", "Hashem OS"],
  "HTML/CSS": ["RoboDog Control Panel", "Portfolio"],
};

const TECH_ALIASES: Record<string, string[]> = {
  JavaScript: ["JavaScript", "HTML/CSS", "HTML", "Web APIs"],
  TypeScript: ["TypeScript", "Web APIs", "AI"],
  Python: ["Python", "Machine Learning", "Computer Vision"],
  Firebase: ["Firebase Auth", "Cloud Firestore", "Firebase"],
  "Object Recognition": ["Computer Vision", "Machine Learning"],
  AI: ["AI", "Web APIs"],
};

function techMatchesSkill(skillName: string, tech: string): boolean {
  const aliases = TECH_ALIASES[skillName] ?? [skillName];
  const t = tech.toLowerCase();
  return aliases.some((a) => t.includes(a.toLowerCase()) || a.toLowerCase().includes(t));
}

export function getProjectsForSkill(skillName: string): string[] {
  const found = new Set<string>();

  for (const p of projects) {
    if (p.tech.some((t) => techMatchesSkill(skillName, t))) {
      found.add(p.title);
    }
  }

  for (const r of githubRepos) {
    const lang = r.lang.toLowerCase();
    if (
      (skillName === "C++" && lang === "c++") ||
      (skillName === "Python" && lang === "python") ||
      (skillName === "JavaScript" && (lang === "javascript" || lang === "html")) ||
      (skillName === "TypeScript" && lang === "typescript") ||
      (skillName === "ROS 2" && lang.includes("ros")) ||
      (skillName === "Onshape" && lang === "cad")
    ) {
      found.add(r.name);
    }
  }

  for (const extra of MANUAL_PROJECTS[skillName] ?? []) {
    found.add(extra);
  }

  if (skillName === "Git" || skillName === "GitHub") {
    githubRepos.forEach((r) => found.add(r.name));
    found.add("All HZCS-IoT repositories");
  }

  if (skillName === "Linux") {
    found.add("ROS2-Humble-installation");
    found.add("Smart Methods Linux & ROS 2 course");
  }

  return [...found];
}

export function skillIconUrl(meta: SkillMeta): string | null {
  if (!meta.slug) return null;
  const color = meta.color ?? "FFFFFF";
  return `https://cdn.simpleicons.org/${meta.slug}/${color}`;
}

/** Flat list for CV / other uses */
export const skillNames = skillGroups.flatMap((g) => g.skills.map((s) => s.name));
