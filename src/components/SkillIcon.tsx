"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getProjectsForSkill,
  skillIconUrl,
  type SkillMeta,
} from "@/data/skills";

export default function SkillIcon({ meta }: { meta: SkillMeta }) {
  const [hover, setHover] = useState(false);
  const projects = getProjectsForSkill(meta.name);
  const iconUrl = skillIconUrl(meta);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <motion.button
        type="button"
        aria-label={`${meta.name} — used in ${projects.length} projects`}
        whileHover={{ y: -4, scale: 1.06 }}
        whileTap={{ scale: 0.98 }}
        className={`skill-orb group ${hover ? "skill-orb-active" : ""}`}
      >
        <span className="skill-orb-glow" aria-hidden />
        {iconUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={iconUrl}
            alt=""
            className="w-7 h-7 object-contain relative z-10 drop-shadow-sm"
            loading="lazy"
          />
        ) : (
          <span
            className="relative z-10 text-[10px] font-bold font-mono tracking-tight"
            style={{ color: meta.color ? `#${meta.color}` : "#00f0ff" }}
          >
            {meta.monogram ?? meta.name.slice(0, 2).toUpperCase()}
          </span>
        )}
        <span className="skill-orb-label">{meta.name}</span>
      </motion.button>

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="skill-tooltip"
            role="tooltip"
          >
            <p className="text-cyan-300 font-mono text-[10px] uppercase tracking-wider mb-2">
              {meta.name}
            </p>
            <p className="text-slate-500 text-[10px] mb-1.5">Used in:</p>
            <ul className="space-y-1 max-h-36 overflow-y-auto">
              {projects.length > 0 ? (
                projects.map((p) => (
                  <li key={p} className="text-xs text-slate-200 leading-snug flex gap-1.5">
                    <span className="text-cyan-500 shrink-0">▸</span>
                    <span>{p}</span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-slate-500">Smart Methods coursework & labs</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
