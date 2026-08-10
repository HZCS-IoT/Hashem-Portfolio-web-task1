"use client";

import { profile } from "@/data/profile";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="section-panel">
      <SectionLabel n="01" title="About Me" />

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-slate-300 leading-relaxed text-lg">{profile.summary}</p>
          <p className="mt-4 text-slate-400 leading-relaxed">
            I focus on end-to-end delivery — from database design and APIs to polished UI and
            embedded firmware. Based in Makkah, studying Computer Science at Arab Open University.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 space-y-4"
        >
          <InfoRow label="Education" value={profile.education.university} />
          <InfoRow label="Degree" value={profile.education.degree} />
          <InfoRow label="Status" value={profile.education.status} />
          <InfoRow label="Location" value={profile.location} />
          <InfoRow label="Languages" value="Arabic (Native) · English (Fluent)" />
        </motion.div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-cyan-900/40 pb-3 last:border-0 last:pb-0">
      <span className="text-cyan-500/80 font-mono text-xs uppercase tracking-wider">{label}</span>
      <span className="text-slate-200 text-sm sm:text-right max-w-xs">{value}</span>
    </div>
  );
}

export function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-10 flex items-end gap-4">
      <span className="text-cyan-400 font-mono text-sm">{n}</span>
      <h2 className="text-3xl sm:text-4xl font-bold text-white">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent mb-2" />
    </div>
  );
}
