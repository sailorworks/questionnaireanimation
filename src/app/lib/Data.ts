export interface Question {
  id: number;
  text: string;
  options: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "What's your favorite way to spend a weekend?",
    options: [
      "Reading a good book in a cozy corner",
      "Exploring new places and adventures",
      "Catching up with friends and family",
      "Working on personal projects",
    ],
  },
  {
    id: 2,
    text: "How do you prefer to learn new things?",
    options: [
      "Through hands-on experience",
      "By reading and researching",
      "In group settings with others",
      "With video tutorials and visual aids",
    ],
  },
  {
    id: 3,
    text: "What motivates you the most?",
    options: [
      "Personal growth and self-improvement",
      "Making a positive impact on others",
      "Achieving recognition and success",
      "Finding balance and happiness",
    ],
  },
];

export interface ScreeningQuestion {
  id: number;
  text: string;
  options: string[];
}

export const screeningQuestions: ScreeningQuestion[] = [
  {
    id: 1,
    text: "Do you have a case of extreme pain which started from a trauma (e.g., accident, fall)?",
    options: ["Yes", "No"],
  },
  {
    id: 2,
    text: "Do you have unexplained fever, weight loss, or history of cancer?",
    options: ["Yes", "No"],
  },
  {
    id: 3,
    text: "Any numbness, tingling, or weakness spreading to arm/ hand?",
    options: ["Yes", "No"],
  },
];

export interface PainAssessmentQuestion {
  id: number;
  text: string;
  subtitle: string;
  options: string[];
}

export const painAssessmentQuestions: PainAssessmentQuestion[] = [
  {
    id: 1,
    text: "Where do you have pain?",
    subtitle: "Select the area where you're experiencing discomfort.",
    options: [
      "Shoulder",
      "Ankle",
      "Elbow",
      "Foot",
      "Hips",
      "Knee",
      "Lower Back",
      "Neck",
      "Wrist",
    ],
  },
  {
    id: 2,
    text: "How would you describe the pain?",
    subtitle: "Choose the option that best fits your sensation.",
    options: [
      "Sharp and stabbing",
      "Dull and aching",
      "Burning or tingling",
      "Throbbing",
    ],
  },
];
