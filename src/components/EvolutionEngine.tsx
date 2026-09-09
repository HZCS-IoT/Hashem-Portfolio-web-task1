"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const BrainSphere = dynamic(() => import("./BrainSphere"), { ssr: false });

const logMessages = [
  "> initializing skill enhancement protocols...",
  "> scanning technological landscape...",
  "> integrating new frameworks and patterns...",
  "> refactoring knowledge architecture...",
  "> stress-testing communication layers...",
  "> expanding boundaries through applied CS...",
  "> compiling experience vectors...",
  "> optimizing learning coefficients...",
];

export default function EvolutionEngine() {
  const [currentLog, setCurrentLog] = useState(0);
  const [status, setStatus] = useState<"RUNNING" | "OPTIMIZING" | "EVOLVING">("RUNNING");

  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLog((prev) => (prev + 1) % logMessages.length);
    }, 3000);

    const statusInterval = setInterval(() => {
      const statuses: Array<"RUNNING" | "OPTIMIZING" | "EVOLVING"> = ["RUNNING", "OPTIMIZING", "EVOLVING"];
      setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 4000);

    return () => {
      clearInterval(logInterval);
      clearInterval(statusInterval);
    };
  }, []);

  return (
    <section className="relative max-w-6xl mx-auto px-6 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-3">
          04. Evolution Engine
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-100">
          Continuously Evolving
        </h3>
      </motion.div>

      <div className="glass-card p-6 sm:p-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-80 h-80 shrink-0">
            <BrainSphere />
          </div>

          <div className="flex-1 font-mono text-sm space-y-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <motion.span
                className="w-2 h-2 rounded-full bg-emerald-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs uppercase tracking-wider">SYSTEM_MODE: CONTINUOUS_ITERATION</span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              Architectures are built to scale, not stand static. The active frame undergoes persistent
              runtime upgrades — refactoring operational structures, stress-testing communication
              components, and expanding boundaries through applied computer science.
            </p>

            <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-4 space-y-1.5">
              <motion.div
                key={currentLog}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-cyan-400/70 text-xs"
              >
                {logMessages[currentLog]}
              </motion.div>
              <div className="text-violet-400/60 text-xs">&gt; status: learning loop stable</div>
              <div className="text-cyan-400/80 text-xs flex items-center gap-2">
                <span>&gt; evolution_coefficient:</span>
                <motion.span
                  className="font-bold text-slate-200"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {status}
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
