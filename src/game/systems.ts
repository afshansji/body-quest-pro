export type Grade = "1-5" | "6-10";

export type Part = {
  id: string;
  name: string;
  fact: string;
  icon: string;
  /** drop spot position on the body board, in % */
  x: number;
  y: number;
};

export type BodySystem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: number;
  grades: Grade[];
  locked?: boolean;
  parts: Part[];
  journey?: string[];
  journeyComplete?: string;
  /** rank tiers, highest first */
  ranks: { min: number; title: string; note: string }[];
};

const bodyRanks = [
  { min: 95, title: "Body Builder", note: "Every part in the perfect place." },
  { min: 80, title: "Anatomy Star", note: "Great job naming the body." },
  { min: 60, title: "Body Explorer", note: "Nice work — try again for a perfect score." },
  { min: 0, title: "Learner", note: "Keep practicing where each part goes." },
];

const organRanks = [
  { min: 95, title: "Lung Legend", note: "Flawless airflow mapping." },
  { min: 80, title: "Breath Expert", note: "Strong grasp of the pathway." },
  { min: 60, title: "Air Apprentice", note: "Solid try — review the order." },
  { min: 0, title: "Trainee", note: "Replay to lock in the sequence." },
];

export const SYSTEMS: BodySystem[] = [
  {
    id: "body-parts",
    name: "Body Parts",
    description: "Drag arms, legs, hands, and more onto the body.",
    icon: "🧍",
    difficulty: 1,
    grades: ["1-5"],
    ranks: bodyRanks,
    parts: [
      { id: "head", name: "Head", icon: "🙂", fact: "Holds your brain, eyes, ears, nose, and mouth.", x: 42, y: 9 },
      { id: "eye", name: "Eye", icon: "👁️", fact: "Lets you see colors, shapes, and everything around you.", x: 40, y: 18 },
      { id: "ear", name: "Ear", icon: "👂", fact: "Collects sound on both sides of your head.", x: 30, y: 21 },
      { id: "nose", name: "Nose", icon: "👃", fact: "Helps you smell and breathe in air.", x: 48, y: 20 },
      { id: "mouth", name: "Mouth", icon: "👄", fact: "Used for eating, talking, and smiling.", x: 46, y: 24 },
      { id: "neck", name: "Neck", icon: "🧣", fact: "Connects your head to your body and lets you look around.", x: 44, y: 29 },
      { id: "arm", name: "Arm", icon: "💪", fact: "Connects your shoulder to your hand so you can reach and lift.", x: 28, y: 41 },
      { id: "hand", name: "Hand", icon: "✋", fact: "Grabs, holds, writes, and helps you touch the world.", x: 24, y: 57 },
      { id: "leg", name: "Leg", icon: "🦵", fact: "Carries your weight and helps you walk, run, and jump.", x: 52, y: 75 },
      { id: "foot", name: "Foot", icon: "🦶", fact: "Balances your body and pushes off the ground when you move.", x: 57, y: 89 },
    ],
  },
  {
    id: "core-organs",
    name: "Core Organs",
    description: "Place the brain, heart, lungs, and every major organ.",
    icon: "🫀",
    difficulty: 3,
    grades: ["6-10"],
    ranks: organRanks,
    parts: [
      { id: "brain", name: "Brain", icon: "🧠", fact: "The control center — it thinks, remembers, and feels.", x: 50, y: 8 },
      { id: "eye", name: "Eye", icon: "👁️", fact: "Lets you see the world around you.", x: 43, y: 12 },
      { id: "lungs", name: "Lungs", icon: "🫁", fact: "Bring oxygen in and push carbon dioxide out.", x: 39, y: 36 },
      { id: "heart", name: "Heart", icon: "❤️", fact: "Pumps blood to every part of your body.", x: 55, y: 37 },
      { id: "liver", name: "Liver", icon: "🟤", fact: "Filters blood and helps digest food.", x: 41, y: 46 },
      { id: "stomach", name: "Stomach", icon: "🍽️", fact: "Breaks down food so your body can use it.", x: 58, y: 47 },
      { id: "spleen", name: "Spleen", icon: "🟣", fact: "Filters blood and helps fight germs.", x: 62, y: 43 },
      { id: "kidneys", name: "Kidneys", icon: "🫘", fact: "Filter waste from the blood.", x: 37, y: 53 },
      { id: "intestine", name: "Intestine", icon: "🌀", fact: "Absorbs nutrients from digested food.", x: 50, y: 57 },
      { id: "bladder", name: "Bladder", icon: "💧", fact: "Stores urine before it leaves the body.", x: 50, y: 64 },
    ],
  },
  {
    id: "respiratory",
    name: "Respiratory System",
    description: "Follow one breath from the nose to the alveoli.",
    icon: "🌬️",
    difficulty: 2,
    grades: ["6-10"],
    ranks: organRanks,
    journeyComplete: "Every organ is in place. Take a deep breath!",
    journey: [
      "Air enters the nasal cavity and is warmed and filtered.",
      "It passes the pharynx, the shared throat passage.",
      "The larynx (voice box) guards the airway.",
      "Down the trachea — the windpipe ringed with cartilage.",
      "The trachea splits into two bronchi, one per lung.",
      "Bronchioles branch out like a tree inside the lungs.",
      "Oxygen crosses the alveoli into the blood.",
      "The diaphragm contracts to pull the next breath in.",
    ],
    parts: [
      { id: "nasal", name: "Nasal Cavity", icon: "👃", fact: "Warms, moistens and filters incoming air.", x: 50, y: 13 },
      { id: "pharynx", name: "Pharynx", icon: "🗣️", fact: "The throat passage shared by air and food.", x: 50, y: 20 },
      { id: "larynx", name: "Larynx", icon: "🎤", fact: "The voice box — vocal cords make sound here.", x: 50, y: 25 },
      { id: "trachea", name: "Trachea", icon: "🪈", fact: "The windpipe, held open by C-shaped cartilage.", x: 50, y: 32 },
      { id: "bronchi", name: "Bronchi", icon: "🌿", fact: "Two large tubes carrying air into each lung.", x: 40, y: 38 },
      { id: "bronchioles", name: "Bronchioles", icon: "🌱", fact: "Tiny branches spreading air through the lungs.", x: 61, y: 42 },
      { id: "alveoli", name: "Alveoli", icon: "🫧", fact: "Air sacs where oxygen enters the bloodstream.", x: 39, y: 46 },
      { id: "diaphragm", name: "Diaphragm", icon: "〰️", fact: "The muscle sheet that powers every breath.", x: 50, y: 52 },
    ],
  },
  {
    id: "digestive",
    name: "Digestive System",
    description: "Trace a meal from mouth to intestine.",
    icon: "🍎",
    difficulty: 3,
    grades: ["1-5", "6-10"],
    locked: true,
    ranks: organRanks,
    parts: [],
  },
  {
    id: "circulatory",
    name: "Circulatory System",
    description: "Pump blood through heart, arteries and veins.",
    icon: "🩸",
    difficulty: 4,
    grades: ["1-5", "6-10"],
    locked: true,
    ranks: organRanks,
    parts: [],
  },
];

export function systemsForGrade(grade: Grade) {
  return SYSTEMS.filter((s) => s.grades.includes(grade));
}

export function rankFor(system: BodySystem, accuracy: number) {
  return system.ranks.find((r) => accuracy >= r.min) ?? system.ranks[system.ranks.length - 1];
}

export function scoreForCorrect(streakBefore: number, grade: Grade) {
  const bonus = Math.min(streakBefore, 5) * 10;
  const base = 100 + bonus;
  return grade === "6-10" ? Math.round(base * 1.3) : base;
}

export const PENALTY: Record<Grade, number> = { "1-5": 10, "6-10": 30 };
