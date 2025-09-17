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

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "On which shoulder do you have the pain?",
    options: ["Right", "Left"],
  },
  {
    id: 2,
    text: "Where is the pain?",
    options: [
      "Front of shoulder",
      "Top/outside",
      "Deep inside joint",
      "Neck/back of shoulder",
      "Goes down the arm",
    ],
  },
  {
    id: 3,
    text: "Since when?",
    options: ["<1 week", "1-4 weeks", "1-6 months", ">6 months"],
  },
  {
    id: 4,
    text: "Movement vs Rest?",
    options: ["Only on movement", "Even at rest/night", "Both"],
  },
  {
    id: 5,
    text: "Which movements) are almost impossible?",
    options: [
      "Lifting overhead",
      "Reaching behind back",
      "Turning neck",
      "None (can move but hurts)",
    ],
  },
  {
    id: 6,
    text: "When is pain worst?",
    options: [
      "At night",
      "With overhead reaching",
      "After desk/phone use",
      "Random",
    ],
  },
  {
    id: 7,
    text: "Age Band",
    options: ["<35", "35-50", ">50"],
  },
];
