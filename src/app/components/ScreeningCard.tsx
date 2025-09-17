"use client";

import { motion, Variants } from "framer-motion";
import { ScreeningQuestion } from "../lib/Data";

// --- VARIANTS SECTION ---

// This variant for the main card remains the same
const cardVariants: Variants = {
  active: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
  inactive: {
    opacity: 0.3,
    scale: 0.95,
    filter: "blur(2px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// This variant for the checkmark also remains the same
const checkmarkVariants: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// --- NEW VARIANTS ADAPTED FROM PAINASSESSMENT ---

// 1. Variant for the question text (Slide-up only)
const questionVariants: Variants = {
  active: {
    opacity: 1, // Ensure it's visible when active
    y: 0,
    transition: {
      delay: 0.2, // A slight delay after the card becomes active
      duration: 0.5,
      ease: "easeOut",
    },
  },
  inactive: {
    opacity: 1, // Keep it visible, but positioned off-screen
    y: 20, // Start 20px below its final position
  },
};

// 2. Variant for the options container to stagger its children
const optionsContainerVariants: Variants = {
  active: {
    opacity: 1,
    transition: {
      delay: 0.4, // Delay after the question appears
      staggerChildren: 0.1, // Animate each child with a 0.1s delay
    },
  },
  inactive: {
    opacity: 0, // The container starts invisible
  },
};

// 3. Variant for individual options for reveal and hover
const optionVariants: Variants = {
  active: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  inactive: {
    opacity: 0,
    scale: 0.8, // Start slightly smaller
  },
  hover: {
    scale: 1.03, // The scale effect on hover
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  tap: {
    scale: 0.97, // A nice little effect when clicking
  },
};
// --- END OF NEW VARIANTS ---

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
  const animationState = isActive ? "active" : "inactive";

  return (
    <motion.div
      variants={cardVariants}
      animate={animationState}
      initial="inactive" // Start all cards in the inactive state
      className="flex-shrink-0 w-[350px] md:w-[450px] bg-white rounded-2xl shadow-2xl p-8 mx-4"
    >
      <h3 className="text-sm font-semibold text-gray-500 mb-1">
        Question {question.id}
      </h3>

      {/* --- JSX MODIFICATION 1: Animating the question text --- */}
      <motion.p
        variants={questionVariants}
        animate={animationState} // This component now also follows the active/inactive state
        className="text-xl font-medium text-gray-800 mb-6 min-h-[84px]"
      >
        {question.text}
      </motion.p>
      {/* --- END OF MODIFICATION --- */}

      {/* --- JSX MODIFICATION 2: Animating the options container --- */}
      <motion.div
        variants={optionsContainerVariants}
        animate={animationState} // Container also follows the active/inactive state
        className="flex flex-col space-y-3"
      >
        {question.options.map((option) => (
          // --- JSX MODIFICATION 3: Animating each button ---
          // Note: The buttons will automatically animate because their parent container has variants
          <motion.button
            key={option}
            variants={optionVariants} // The button uses the optionVariants
            whileHover="hover"
            whileTap="tap"
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
            {option}
          </motion.button>
          // --- END OF MODIFICATION ---
        ))}
      </motion.div>
      {/* --- END OF MODIFICATION --- */}
    </motion.div>
  );
}
