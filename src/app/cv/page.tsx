import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import PrintButton from "@/components/PrintButton";
import Link from "next/link";

export const metadata = {
  title: "CV — Hashem Alhamed",
};

export default function CVPage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <Link
          href="/"
          className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700"
        >
          ← Portfolio
        </Link>
        <PrintButton />
      </div>

      <article className="cv-page max-w-[820px] mx-auto bg-white my-0 sm:my-8 p-8 sm:p-12 shadow-lg print:shadow-none print:my-0">
        {/* Header — ATS: plain text, no columns */}
        <header className="border-b-2 border-slate-800 pb-4 mb-6">
          <h1 className="text-2xl font-bold tracking-tight uppercase">{profile.name}</h1>
          <p className="text-base text-slate-700 mt-1">{profile.title}</p>
          <p className="text-sm text-slate-600 mt-2">
            {profile.location} · {profile.email} · {profile.phone} ·{" "}
            <span>{profile.github.replace("https://", "")}</span> ·{" "}
            <span>{profile.linkedin.replace("https://www.", "")}</span>
          </p>
        </header>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-800">{profile.summary}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
            Education
          </h2>
          <div className="text-sm">
            <p className="font-semibold">{profile.education.university}</p>
            <p className="text-slate-700">{profile.education.degree}</p>
            <p className="text-slate-600 italic">{profile.education.status}</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
            Technical Skills
          </h2>
          <div className="text-sm space-y-2">
            {skillGroups.map((g) => (
              <p key={g.category}>
                <span className="font-semibold">{g.category}:</span> {g.skills.join(", ")}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
            Projects
          </h2>
          <div className="space-y-5 text-sm">
            {featured.map((p) => (
              <div key={p.id}>
                <p className="font-semibold text-slate-900">
                  {p.title}
                  {p.subtitle ? ` — ${p.subtitle}` : ""}
                </p>
                <p className="text-slate-700 mt-0.5">{p.description}</p>
                <ul className="list-disc ml-5 mt-1 text-slate-700 space-y-0.5">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="text-slate-600 mt-1 italic">Technologies: {p.tech.join(", ")}</p>
                {p.github && <p className="text-slate-600">{p.github}</p>}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
            Additional GitHub Projects
          </h2>
          <ul className="text-sm text-slate-700 space-y-1 list-disc ml-5">
            <li>Voice Assistant AI — TypeScript voice-to-voice AI assistant</li>
            <li>AI Object Recognition — Python computer vision pipeline</li>
            <li>Fresh vs Rotten Fruit Classifier — Python ML classification model</li>
            <li>Smart Gate System — ESP32 web-controlled servo gate</li>
            <li>RoboDog Control Panel — MQTT web remote control</li>
            <li>Kiba V1 Mechanics — Quadruped robotic dog Onshape CAD concept</li>
            <li>ROS 2 Humble Installation — Linux robotics environment setup</li>
          </ul>
          <p className="text-sm text-slate-600 mt-2">Full list: {profile.github}</p>
        </section>
      </article>
    </div>
  );
}
