"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useCursor } from "./CustomCursor";
import { questions } from "../lib/Data"; // Use path alias for cleaner import

// Animation variants can live here with the component that uses them
const rollUpVariants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3, ease: "easeIn" } },
};

const questionVariants: Variants = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: 0.2,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const optionVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, filter: "blur(5px)" },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: 0.2 + i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
  hover: { scale: 1.02, transition: { duration: 0.2, ease: "easeInOut" } },
  tap: { scale: 0.98 },
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
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 600);
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="flex items-center justify-center p-8 h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center"
          onMouseEnter={() => setCursorVariant("default")}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Thank You!</h2>
          <p className="text-gray-600 text-lg">
            Your responses have been recorded.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
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
            className="text-3xl font-bold text-gray-800 mb-10 leading-relaxed text-left"
          >
            {questions[currentQuestion].text}
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                custom={index}
                variants={optionVariants}
                initial="initial"
                animate="animate"
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
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
