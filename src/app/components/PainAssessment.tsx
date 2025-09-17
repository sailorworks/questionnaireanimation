// app/components/PainAssessment.tsx

"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { painAssessmentQuestions } from "../lib/Data";

interface PainAssessmentProps {
  onComplete: () => void;
}

// --- VARIANTS SECTION: Updated variants are here ---

const rollUpVariants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3, ease: "easeIn" } },
};

// 1. Variant for the question text reveal
const questionVariants: Variants = {
  initial: { opacity: 1, y: 20 },
  animate: {
    y: 0,
    transition: {
      delay: 0.2, // A slight delay after the card rolls up
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// 2. Variant for the options container to stagger its children
const optionsContainerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.4, // Delay after the question appears
      staggerChildren: 0.1, // Animate each child with a 0.1s delay
    },
  },
};

// 3. Variant for individual options for reveal and hover
const optionVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  hover: {
    scale: 1.03, // The scale effect on hover
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  tap: {
    scale: 0.97, // A nice little effect when clicking
  },
};

// --- END OF VARIANTS SECTION ---

export default function PainAssessment({ onComplete }: PainAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const questionData = painAssessmentQuestions[currentQuestion];
    setAnswers((prev) => ({
      ...prev,
      [questionData.id]: questionData.options[optionIndex],
    }));
    setTimeout(() => {
      if (currentQuestion < painAssessmentQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        onComplete();
      }
    }, 600);
  };

  const questionData = painAssessmentQuestions[currentQuestion];

  return (
    <div className="max-w-4xl w-full">
      {/* Progress Bar (no changes here) */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-800">
            Question {currentQuestion + 1} of {painAssessmentQuestions.length}
          </span>
          <span className="text-sm font-medium text-gray-800">
            {Math.round(
              ((currentQuestion + 1) / painAssessmentQuestions.length) * 100
            )}
            %
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${
                ((currentQuestion + 1) / painAssessmentQuestions.length) * 100
              }%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question and Options */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          variants={rollUpVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-white rounded-2xl shadow-2xl p-10"
        >
          {/* --- JSX MODIFICATION 1: Animating the question text --- */}
          <motion.h1
            variants={questionVariants}
            initial="initial"
            animate="animate"
            className="text-3xl font-bold text-gray-800 leading-tight"
          >
            {questionData.text}
          </motion.h1>
          <motion.p
            variants={questionVariants} // Reuse the same variant for a consistent effect
            initial="initial"
            animate="animate"
            className="text-gray-500 mt-2 mb-10 text-lg"
          >
            {questionData.subtitle}
          </motion.p>
          {/* --- END OF MODIFICATION --- */}

          {/* --- JSX MODIFICATION 2: Animating the options container --- */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={optionsContainerVariants}
            initial="initial"
            animate="animate"
          >
            {questionData.options.map((option, index) => (
              <motion.button
                key={option} // Using the option text as a key
                variants={optionVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleOptionSelect(index)}
                disabled={selectedOption !== null}
                className={`w-full h-full text-left p-6 rounded-xl border-2 transition-all duration-200 flex items-center group ${
                  selectedOption === index
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                } ${
                  selectedOption !== null && selectedOption !== index
                    ? "opacity-50"
                    : ""
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${
                    selectedOption === index
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 group-hover:border-gray-400"
                  }`}
                >
                  {selectedOption === index && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  )}
                </div>
                <span className="text-lg font-medium">{option}</span>
              </motion.button>
            ))}
          </motion.div>
          {/* --- END OF MODIFICATION --- */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
