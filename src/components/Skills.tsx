"use client";

import { skillGroups } from "@/data/skills";
import { githubRepos } from "@/data/projects";
import { SectionLabel } from "./About";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <section id="skills" className="section-panel">
      <SectionLabel n="03" title="Technical Skills" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5"
          >
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-3">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <SectionLabel n="04" title="GitHub Repositories" />
      <div className="grid sm:grid-cols-2 gap-3">
        {githubRepos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card px-4 py-3 flex justify-between items-center text-sm hover:border-cyan-400/30 transition-colors group"
          >
            <span className="text-slate-300 group-hover:text-cyan-300 truncate mr-2">
              {repo.name}
            </span>
            <span className="text-xs font-mono text-slate-500 shrink-0">{repo.lang}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
