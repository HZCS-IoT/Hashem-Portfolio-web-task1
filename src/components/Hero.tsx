"use client";

import { profile } from "@/data/profile";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="section-panel min-h-screen flex flex-col justify-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-cyan-400/90 font-mono text-sm tracking-[0.35em] uppercase mb-4"
      >
        Portfolio · {profile.location}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.05]"
      >
        {profile.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-xl sm:text-2xl text-cyan-300/90 font-medium max-w-2xl"
      >
        {profile.title}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed"
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <a href="#projects" className="btn-primary">
          View Projects
        </a>
        <a href="/cv" className="btn-ghost">
          Download CV
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-500/60 text-xs font-mono tracking-widest"
      >
        SCROLL ↓
      </motion.div>
    </section>
  );
}
