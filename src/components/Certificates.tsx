"use client";

import { useEffect, useState } from "react";
import { certificates, type Certificate } from "@/data/certificates";
import { SectionLabel } from "./About";
import { motion } from "framer-motion";

export default function Certificates() {
  const [active, setActive] = useState<Certificate | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="certificates" className="section-panel">
      <SectionLabel n="03" title="Certificates" />

      <p className="text-slate-400 text-sm mb-8 max-w-2xl">
        Smart Methods (الأساليب الذكية) — robotics, IoT, web, and engineering programs. Click any
        certificate to view the PDF.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((cert, i) => (
          <motion.button
            key={cert.id}
            type="button"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setActive(cert)}
            className="glass-card p-5 text-left hover:border-cyan-400/40 transition-colors group cursor-pointer"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-500/70">
              {cert.category}
            </span>
            <h3 className="text-base font-semibold text-white mt-2 group-hover:text-cyan-300 transition-colors">
              {cert.title}
            </h3>
            <p className="text-sm text-slate-500 mt-1">{cert.issuer}</p>
            <p className="text-xs font-mono text-slate-600 mt-3">{cert.date}</p>
            <p className="text-xs text-cyan-400/80 mt-3 font-mono">View PDF →</p>
          </motion.button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <div
            className="relative w-full max-w-4xl h-[85vh] glass-card overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-cyan-900/40">
              <div>
                <h3 className="text-white font-semibold">{active.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {active.issuer} · {active.date}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <a
                  href={active.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-xs py-2 px-3"
                >
                  Open tab
                </a>
                <a href={active.file} download className="btn-primary text-xs py-2 px-3">
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="btn-ghost text-xs py-2 px-3"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
            <iframe
              src={`${active.file}#toolbar=1&navpanes=0`}
              title={active.title}
              className="flex-1 w-full bg-white"
            />
          </div>
        </div>
      )}
    </section>
  );
}
