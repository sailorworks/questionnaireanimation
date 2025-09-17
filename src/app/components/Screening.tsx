"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { screeningQuestions } from "../lib/Data";
import { ScreeningCard } from "./ScreeningCard";

interface ScreeningProps {
  onComplete: () => void;
}

// NOTE: These values must match the styling in ScreeningCard.tsx
// md:w-[450px] -> 450
// mx-4 (1rem) on each side -> 1rem * 2 = 32px
const CARD_WIDTH = 450;
const CARD_GAP = 32;

export default function Screening({ onComplete }: ScreeningProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (questionId: number, answer: string) => {
    if (answers[questionId]) return;

    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    setTimeout(() => {
      if (currentStep < screeningQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete();
      }
    }, 400);
  };

  // This calculation remains the same. The padding handles the centering.
  const trackOffset = -currentStep * (CARD_WIDTH + CARD_GAP);

  return (
    <div className="w-full flex flex-col items-center">
      {/* --- The title and subtitle section remains unchanged --- */}
      <div className="text-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-800"
        >
          Initial Screening
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 mt-2"
        >
          A few quick questions. This helps us identify if you need immediate
          medical attention.
        </motion.p>
      </div>

      {/* --- The layout for the carousel is updated here --- */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex"
          // This animate property correctly slides the track by one card width at a time
          animate={{ x: trackOffset }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          // 👇 NEW: Add padding here using an inline style to center the cards.
          // The calculation is: (50% of viewport) - (50% of one card's width)
          style={{
            paddingLeft: `calc(50% - ${CARD_WIDTH / 2}px)`,
            paddingRight: `calc(50% - ${CARD_WIDTH / 2}px)`,
          }}
        >
          {screeningQuestions.map((question, index) => (
            <ScreeningCard
              key={question.id}
              question={question}
              isActive={index === currentStep}
              answer={answers[question.id] || null}
              onAnswer={(answer) => handleAnswer(question.id, answer)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
