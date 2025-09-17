// src/app/page.tsx

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CursorProvider } from "./components/CustomCursor";
import Quiz from "./components/Quiz";
import Screening from "./components/Screening";
import PainAssessment from "./components/PainAssessment";

type View = "screening" | "painAssessment" | "quiz";

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
            <motion.div key="screening" /* ... animation props ... */>
              {/* 3. Screening now transitions to 'painAssessment' */}
              <Screening onComplete={() => setCurrentView("painAssessment")} />
            </motion.div>
          )}

          {/* 4. Add the new view for PainAssessment */}
          {currentView === "painAssessment" && (
            <motion.div
              key="painAssessment"
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* It transitions to 'quiz' on complete */}
              <PainAssessment onComplete={() => setCurrentView("quiz")} />
            </motion.div>
          )}

          {currentView === "quiz" && (
            <motion.div key="quiz" /* ... animation props ... */>
              <Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </CursorProvider>
  );
}
