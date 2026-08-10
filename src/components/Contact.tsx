"use client";

import { profile } from "@/data/profile";
import { SectionLabel } from "./About";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="section-panel pb-32">
      <SectionLabel n="05" title="Contact" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-8 max-w-2xl"
      >
        <p className="text-slate-300 mb-8 leading-relaxed">
          Open to cooperative training opportunities and technical collaborations. Reach out via
          email or connect on LinkedIn and GitHub.
        </p>

        <div className="space-y-4 font-mono text-sm">
          <ContactLink label="Email" href={`mailto:${profile.email}`} value={profile.email} />
          <ContactLink label="Phone" href={`tel:+966${profile.phone.slice(1)}`} value={profile.phone} />
          <ContactLink label="GitHub" href={profile.github} value="HZCS-IoT" external />
          <ContactLink label="LinkedIn" href={profile.linkedin} value="hashem-alhamed" external />
        </div>
      </motion.div>

      <footer className="mt-16 text-center text-xs text-slate-600 font-mono">
        © {new Date().getFullYear()} {profile.name} · Built with Next.js & Three.js
      </footer>
    </section>
  );
}

function ContactLink({
  label,
  href,
  value,
  external,
}: {
  label: string;
  href: string;
  value: string;
  external?: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
      <span className="text-cyan-500/70 w-20 uppercase text-xs tracking-wider">{label}</span>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-slate-200 hover:text-cyan-300 transition-colors"
      >
        {value}
      </a>
    </div>
  );
}
