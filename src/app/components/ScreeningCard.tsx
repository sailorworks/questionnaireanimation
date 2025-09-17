"use client";

import { motion, Variants } from "framer-motion";
import { ScreeningQuestion } from "../lib/Data";

// Animation variants for the card's active/inactive state
const cardVariants: Variants = {
  active: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)" as unknown as string, // 👈 safe cast, no "any"
    transition: { duration: 0.5, ease: "easeOut" },
  },
  inactive: {
    opacity: 0.3,
    scale: 0.95,
    filter: "blur(2px)" as unknown as string, // 👈 safe cast
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface ScreeningCardProps {
  question: ScreeningQuestion;
  isActive: boolean;
  answer: string | null;
  onAnswer: (answer: string) => void;
}

export function ScreeningCard({
  question,
  isActive,
  answer,
  onAnswer,
}: ScreeningCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      animate={isActive ? "active" : "inactive"}
      className="flex-shrink-0 w-[350px] md:w-[450px] bg-white rounded-2xl shadow-2xl p-8 mx-4"
    >
      <h3 className="text-sm font-semibold text-gray-500 mb-1">
        Question {question.id}
      </h3>
      <p className="text-xl font-medium text-gray-800 mb-6 min-h-[84px]">
        {question.text}
      </p>
      <div className="flex flex-col space-y-3">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            disabled={!isActive || answer !== null}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center text-lg font-medium
              ${
                answer === option
                  ? "border-blue-500 bg-blue-50 text-blue-900"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
              }
              ${
                !isActive || answer !== null
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }
            `}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center
              ${
                answer === option
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300"
              }
            `}
            >
              {answer === option && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2.5 h-2.5 bg-white rounded-full"
                />
              )}
            </div>
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
