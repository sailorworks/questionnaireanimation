"use client"; // This page now needs state, so it must be a client component

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CursorProvider } from "./components/CustomCursor";
import Quiz from "./components/Quiz";
import Screening from "./components/Screening"; // Import the new component

type View = "screening" | "quiz";

// Variants for fading views in and out
const viewVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export default function Page() {
  const [currentView, setCurrentView] = useState<View>("screening");

  return (
    <CursorProvider>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8 cursor-none overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === "screening" && (
            <motion.div
              key="screening"
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Screening onComplete={() => setCurrentView("quiz")} />
            </motion.div>
          )}

          {currentView === "quiz" && (
            <motion.div
              key="quiz"
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </CursorProvider>
  );
}
