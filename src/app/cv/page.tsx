import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { certificates } from "@/data/certificates";
import PrintButton from "@/components/PrintButton";
import Link from "next/link";

export const metadata = {
  title: "CV — Hashem Alhamed",
};

export default function CVPage() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const allSkills = skillGroups.map((g) => g.skills.join(", ")).join(" · ");

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 print:bg-white">
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <Link
          href="/"
          className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700"
        >
          ← Portfolio
        </Link>
        <PrintButton />
      </div>

      <article className="cv-page max-w-[820px] mx-auto bg-white my-0 sm:my-8 p-6 sm:p-8 shadow-lg print:shadow-none print:my-0 print:p-0 print:max-w-none">
        <header className="border-b-2 border-slate-800 pb-2 mb-3">
          <h1 className="text-xl font-bold tracking-tight uppercase">{profile.name}</h1>
          <p className="text-sm text-slate-700 mt-0.5">{profile.title}</p>
          <p className="text-xs text-slate-600 mt-1 leading-snug">
            {profile.location} · {profile.email} · {profile.phone} · github.com/HZCS-IoT ·
            linkedin.com/in/hashem-alhamed-16b9412a1
          </p>
        </header>

        <section className="mb-3">
          <h2 className="cv-heading">Professional Summary</h2>
          <p className="cv-text leading-snug">
            CS student (AOU) building full-stack web apps, Flutter mobile apps, and ESP32/MQTT
            robotics. Delivered production HR platform, Firebase academic app, and quadruped IoT
            robots. React, Flutter, Supabase, C++, embedded systems.
          </p>
        </section>

        <section className="mb-3">
          <h2 className="cv-heading">Education</h2>
          <p className="cv-text">
            <span className="font-semibold">{profile.education.university}</span> —{" "}
            {profile.education.degree} ({profile.education.status})
          </p>
        </section>

        <section className="mb-3">
          <h2 className="cv-heading">Technical Skills</h2>
          <p className="cv-text leading-snug">{allSkills}</p>
        </section>

        <section className="mb-3">
          <h2 className="cv-heading">Projects</h2>
          <div className="space-y-2.5">
            {featured.map((p) => (
              <div key={p.id}>
                <p className="cv-text font-semibold">
                  {p.title}
                  {p.subtitle ? ` — ${p.subtitle}` : ""}
                </p>
                <ul className="cv-text list-disc ml-4 mt-0.5 space-y-0 text-slate-700">
                  {p.highlights.slice(0, 2).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="cv-text text-slate-600 italic mt-0.5">{p.tech.slice(0, 6).join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="cv-heading">Certifications</h2>
          <p className="cv-text leading-snug text-slate-700">
            {certificates.map((c) => `${c.title} (${c.issuer}, ${c.date})`).join(" · ")}
          </p>
          <p className="cv-text text-slate-600 mt-1">Portfolio certificates: hashem-portfolio-six.vercel.app/#certificates</p>
        </section>
      </article>
    </div>
  );
}
