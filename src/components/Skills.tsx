"use client";

import { skillGroups } from "@/data/skills";
import { githubRepos } from "@/data/projects";
import { SectionLabel } from "./About";
import SkillIcon from "./SkillIcon";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <section id="skills" className="section-panel">
      <SectionLabel n="04" title="Technical Skills" />

      <p className="text-slate-400 text-sm mb-8 max-w-2xl">
        Hover any icon to see where each technology was used — projects, robots, and repos.
      </p>

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
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-4">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-3 justify-start pb-6">
              {group.skills.map((skill) => (
                <SkillIcon key={skill.name} meta={skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <SectionLabel n="05" title="GitHub Repositories" />
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
