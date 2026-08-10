"use client";

import { WORK_STATE_LABELS, type WorkState } from "@/data/workStates";
import { motion, AnimatePresence } from "framer-motion";

const STATE_HINTS: Record<WorkState, string> = {
  coding: "Writing code on laptop",
  inspecting: "Reviewing components",
  soldering: "Building hardware projects",
  wiring: "Connecting systems & skills",
};

export default function WorkStateBadge({
  workState,
  activeSection,
}: {
  workState: WorkState;
  activeSection: string;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-20 no-print pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={workState}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="glass-card px-4 py-3 min-w-[180px]"
        >
          <p className="text-[10px] font-mono tracking-[0.25em] text-cyan-500/70 uppercase">
            {activeSection}
          </p>
          <p className="text-sm font-mono font-semibold text-cyan-300 mt-1">
            {WORK_STATE_LABELS[workState]}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">{STATE_HINTS[workState]}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
