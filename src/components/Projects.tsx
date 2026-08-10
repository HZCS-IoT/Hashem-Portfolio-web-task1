"use client";

import { projects } from "@/data/projects";
import { SectionLabel } from "./About";
import { motion } from "framer-motion";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-panel">
      <SectionLabel n="02" title="Projects" />

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {featured.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} large />
        ))}
      </div>

      <h3 className="text-lg font-mono text-cyan-500/70 uppercase tracking-wider mb-4">
        More on GitHub
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {other.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  large = false,
}: {
  project: (typeof projects)[0];
  index: number;
  large?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className={`glass-card p-6 flex flex-col ${large ? "md:min-h-[320px]" : ""} group hover:border-cyan-400/40 transition-colors`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-cyan-500/70 mt-1">{project.subtitle}</p>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 border border-slate-700 rounded px-2 py-0.5">
          {project.category}
        </span>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

      <ul className="text-sm text-slate-500 space-y-1.5 mb-5 flex-1">
        {project.highlights.slice(0, large ? 4 : 2).map((h) => (
          <li key={h} className="flex gap-2">
            <span className="text-cyan-500 shrink-0">▸</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono text-cyan-400 hover:text-cyan-300 mt-auto"
        >
          View on GitHub →
        </a>
      )}
    </motion.article>
  );
}
