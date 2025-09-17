"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useCursor } from "./CustomCursor";
import { questions } from "../lib/Data";

// --- VARIANTS SECTION ---

const rollUpVariants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3, ease: "easeIn" } },
};

// This variant is already correct (slide-up only)
const questionVariants: Variants = {
  initial: { opacity: 1, y: 20 },
  animate: {
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const optionsContainerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.4,
      staggerChildren: 0.1,
    },
  },
};

// --- MODIFIED THIS VARIANT TO REMOVE BLUR ---
const optionVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 }, // MODIFIED: Removed filter: "blur(5px)"
  animate: {
    opacity: 1,
    scale: 1, // MODIFIED: Removed filter: "blur(0px)"
    transition: {
      duration: 0.4, // MODIFIED: Adjusted duration for consistency
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  hover: { scale: 1.02, transition: { duration: 0.2, ease: "easeInOut" } },
  tap: { scale: 0.98 },
};
// --- END OF MODIFICATION ---

const checkmarkVariants: Variants = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { setCursorVariant } = useCursor();

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]:
        questions[currentQuestion].options[optionIndex],
    }));
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        // You might want to navigate to a results page here
        console.log("Quiz Complete", answers);
      }
    }, 600);
  };

  const isQuizFinished = currentQuestion >= questions.length;
  const questionData = isQuizFinished ? null : questions[currentQuestion];

  return (
    <div className="max-w-4xl w-full">
      {/* You would add a progress bar here if you have one */}

      <AnimatePresence mode="wait">
        {!isQuizFinished && questionData ? (
          <motion.div
            key={currentQuestion}
            variants={rollUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white rounded-2xl shadow-2xl p-10"
          >
            <motion.h1
              variants={questionVariants}
              initial="initial"
              animate="animate"
              className="text-3xl font-bold text-gray-800 mb-10 leading-relaxed text-left"
            >
              {questionData.text}
            </motion.h1>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={optionsContainerVariants}
              initial="initial"
              animate="animate"
            >
              {questionData.options.map((option, index) => (
                <motion.button
                  key={option}
                  variants={optionVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleOptionSelect(index)}
                  disabled={selectedOption !== null}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className={`w-full h-full text-left p-6 rounded-xl border-2 transition-all duration-200 flex items-center ${
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
                    className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center ${
                      selectedOption === index
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedOption === index && (
                      <motion.svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <motion.path
                          variants={checkmarkVariants}
                          initial="initial"
                          animate="animate"
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
          </motion.div>
        ) : (
          <div>{/* Thank you screen or completion message */}</div>
        )}
      </AnimatePresence>
    </div>
  );
}
