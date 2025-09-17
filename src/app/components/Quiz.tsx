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
  hover: { scale: 1.02, transition: { duration: 0.2, ease: "easeInOut" } },
  tap: { scale: 0.98 },
};

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
        setCurrentQuestion((prev) => prev + 1); // Go to the final state
        console.log("Quiz Complete", answers);
      }
    }, 600);
  };

  const isQuizFinished = currentQuestion >= questions.length;
  const questionData = isQuizFinished ? null : questions[currentQuestion];
  const totalQuestions = questions.length;

  return (
    <div className="max-w-4xl w-full">
      {/* --- PROGRESS BAR INTEGRATED HERE --- */}
      {/* We only show the progress bar if the quiz is not finished */}
      {!isQuizFinished && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-800">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-gray-800">
              {Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
              // The key ensures the animation re-runs when the question changes
              key={currentQuestion}
              initial={{
                width: `${(currentQuestion / totalQuestions) * 100}%`,
              }}
              animate={{
                width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      )}
      {/* --- END OF PROGRESS BAR --- */}

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
          // --- Quiz Completion Screen ---
          <motion.div
            key="completion-screen"
            variants={rollUpVariants}
            initial="initial"
            animate="animate"
            className="text-center bg-white rounded-2xl shadow-2xl p-10"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Thank You!
            </h2>
            <p className="text-lg text-gray-600">
              You have completed the assessment.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
