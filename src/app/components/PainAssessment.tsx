// app/components/PainAssessment.tsx

"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { painAssessmentQuestions } from "../lib/Data";

// Define the props that this component will accept
interface PainAssessmentProps {
  onComplete: () => void;
}

// Animation variants (no changes here)
const rollUpVariants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3, ease: "easeIn" } },
};
const questionVariants: Variants = {
  /* ... no changes ... */
};
const optionVariants: Variants = {
  /* ... no changes ... */
};

// Update the function to accept the 'onComplete' prop
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
        // --- THIS IS THE KEY CHANGE ---
        // Instead of showing a thank you screen, call the onComplete function
        onComplete();
      }
    }, 600);
  };

  // The "Thank You" screen is removed from this component,
  // as the parent page now handles what happens on completion.

  const questionData = painAssessmentQuestions[currentQuestion];

  return (
    <div className="max-w-4xl w-full">
      {/* Progress Bar */}
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
          <motion.div variants={questionVariants}>
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">
              {questionData.text}
            </h1>
            <p className="text-gray-500 mt-2 mb-10 text-lg">
              {questionData.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {questionData.options.map((option, index) => (
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
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
