export interface Question {
  id: string;
  category: string;
  level: number;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tags: string[];
  timeLimit: number; // in seconds
  points: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockLevel: number;
  maxLevel: number;
  totalQuestions: number;
}

export const categories: Category[] = [
  {
    id: "general-knowledge",
    name: "General Knowledge",
    description: "Test your broad knowledge across various topics",
    icon: "🧠",
    color: "from-quiz-500 to-quiz-700",
    unlockLevel: 1,
    maxLevel: 60,
    totalQuestions: 1200,
  },
  {
    id: "science",
    name: "Science",
    description: "Explore the wonders of scientific discovery",
    icon: "🔬",
    color: "from-electric-500 to-electric-700",
    unlockLevel: 5,
    maxLevel: 60,
    totalQuestions: 1200,
  },
  {
    id: "animals",
    name: "Animals",
    description: "Discover the amazing world of wildlife",
    icon: "🦁",
    color: "from-neon-500 to-neon-700",
    unlockLevel: 1,
    maxLevel: 60,
    totalQuestions: 1200,
  },
  {
    id: "food",
    name: "Food & Cooking",
    description: "Culinary knowledge from around the world",
    icon: "🍕",
    color: "from-gold-500 to-gold-700",
    unlockLevel: 3,
    maxLevel: 60,
    totalQuestions: 1200,
  },
  {
    id: "history",
    name: "History",
    description: "Journey through time and historical events",
    icon: "🏛️",
    color: "from-magic-500 to-magic-700",
    unlockLevel: 7,
    maxLevel: 60,
    totalQuestions: 1200,
  },
  {
    id: "geography",
    name: "Geography",
    description: "Explore countries, capitals, and landmarks",
    icon: "🌍",
    color: "from-blue-500 to-blue-700",
    unlockLevel: 4,
    maxLevel: 60,
    totalQuestions: 1200,
  },
  {
    id: "sports",
    name: "Sports",
    description: "Athletic achievements and sporting knowledge",
    icon: "⚽",
    color: "from-green-500 to-green-700",
    unlockLevel: 6,
    maxLevel: 60,
    totalQuestions: 1200,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Movies, music, celebrities, and pop culture",
    icon: "🎬",
    color: "from-pink-500 to-pink-700",
    unlockLevel: 2,
    maxLevel: 60,
    totalQuestions: 1200,
  },
  {
    id: "technology",
    name: "Technology",
    description: "Digital world, computers, and innovations",
    icon: "💻",
    color: "from-purple-500 to-purple-700",
    unlockLevel: 8,
    maxLevel: 60,
    totalQuestions: 1200,
  },
  {
    id: "literature",
    name: "Literature",
    description: "Books, authors, and literary masterpieces",
    icon: "📚",
    color: "from-indigo-500 to-indigo-700",
    unlockLevel: 10,
    maxLevel: 60,
    totalQuestions: 1200,
  },
];

// Sample questions for each category (in production, this would be much larger)
export const questions: Question[] = [
  // General Knowledge - Level 1 (Easy)
  {
    id: "gk-001",
    category: "general-knowledge",
    level: 1,
    difficulty: "easy",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    explanation:
      "Paris is the capital and largest city of France, known for landmarks like the Eiffel Tower.",
    tags: ["geography", "europe", "capitals"],
    timeLimit: 30,
    points: 100,
  },
  {
    id: "gk-002",
    category: "general-knowledge",
    level: 1,
    difficulty: "easy",
    question: "How many sides does a triangle have?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    explanation: "A triangle is a polygon with three sides and three angles.",
    tags: ["mathematics", "geometry", "shapes"],
    timeLimit: 30,
    points: 100,
  },
  {
    id: "gk-003",
    category: "general-knowledge",
    level: 1,
    difficulty: "easy",
    question: "What color is the sun?",
    options: ["Red", "Blue", "Yellow", "Green"],
    correctAnswer: 2,
    explanation:
      "The sun appears yellow to us on Earth, though it actually emits white light.",
    tags: ["astronomy", "colors", "basic"],
    timeLimit: 30,
    points: 100,
  },

  // General Knowledge - Level 2 (Medium)
  {
    id: "gk-011",
    category: "general-knowledge",
    level: 2,
    difficulty: "medium",
    question: "Who painted the Mona Lisa?",
    options: [
      "Pablo Picasso",
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correctAnswer: 2,
    explanation:
      "Leonardo da Vinci painted the Mona Lisa between 1503-1519. It's housed in the Louvre Museum.",
    tags: ["art", "renaissance", "famous-paintings"],
    timeLimit: 30,
    points: 150,
  },
  {
    id: "gk-012",
    category: "general-knowledge",
    level: 2,
    difficulty: "medium",
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    explanation: 'Au comes from the Latin word "aurum" meaning gold.',
    tags: ["chemistry", "elements", "symbols"],
    timeLimit: 30,
    points: 150,
  },

  // Science - Level 1 (Easy)
  {
    id: "sci-001",
    category: "science",
    level: 1,
    difficulty: "easy",
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: 2,
    explanation:
      "Plants absorb carbon dioxide during photosynthesis and release oxygen.",
    tags: ["biology", "plants", "photosynthesis"],
    timeLimit: 30,
    points: 100,
  },
  {
    id: "sci-002",
    category: "science",
    level: 1,
    difficulty: "easy",
    question: "How many bones are there in an adult human body?",
    options: ["206", "205", "207", "210"],
    correctAnswer: 0,
    explanation:
      "An adult human skeleton has 206 bones, though babies are born with about 270.",
    tags: ["biology", "human-body", "anatomy"],
    timeLimit: 30,
    points: 100,
  },

  // Animals - Level 1 (Easy)
  {
    id: "ani-001",
    category: "animals",
    level: 1,
    difficulty: "easy",
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: 1,
    explanation:
      "The blue whale is the largest animal ever known to have lived on Earth.",
    tags: ["mammals", "marine-life", "records"],
    timeLimit: 30,
    points: 100,
  },
  {
    id: "ani-002",
    category: "animals",
    level: 1,
    difficulty: "easy",
    question: 'Which animal is known as the "King of the Jungle"?',
    options: ["Tiger", "Lion", "Leopard", "Cheetah"],
    correctAnswer: 1,
    explanation:
      'Lions are called the "King of the Jungle" despite actually living in savannas.',
    tags: ["big-cats", "lions", "nicknames"],
    timeLimit: 30,
    points: 100,
  },

  // Food - Level 1 (Easy)
  {
    id: "food-001",
    category: "food",
    level: 1,
    difficulty: "easy",
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Onion", "Lime"],
    correctAnswer: 1,
    explanation:
      "Guacamole is primarily made from mashed avocados, originating from Mexico.",
    tags: ["mexican-cuisine", "ingredients", "dips"],
    timeLimit: 30,
    points: 100,
  },
  {
    id: "food-002",
    category: "food",
    level: 1,
    difficulty: "easy",
    question: "Which country is famous for inventing pizza?",
    options: ["France", "Spain", "Italy", "Greece"],
    correctAnswer: 2,
    explanation:
      "Pizza originated in Italy, specifically in Naples during the 18th century.",
    tags: ["italian-cuisine", "origins", "pizza"],
    timeLimit: 30,
    points: 100,
  },

  // History - Level 1 (Easy)
  {
    id: "hist-001",
    category: "history",
    level: 1,
    difficulty: "easy",
    question: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: 1,
    explanation:
      "World War II ended in 1945 with Japan's surrender in September.",
    tags: ["world-war-2", "20th-century", "wars"],
    timeLimit: 30,
    points: 100,
  },
  {
    id: "hist-002",
    category: "history",
    level: 1,
    difficulty: "easy",
    question: "Who was the first person to walk on the moon?",
    options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
    correctAnswer: 1,
    explanation:
      "Neil Armstrong was the first person to walk on the moon on July 20, 1969.",
    tags: ["space-exploration", "moon-landing", "astronauts"],
    timeLimit: 30,
    points: 100,
  },
];

// Function to get questions by category and level
export const getQuestionsByLevel = (
  categoryId: string,
  level: number,
  count: number = 7,
): Question[] => {
  const categoryQuestions = questions.filter(
    (q) => q.category === categoryId && q.level === level,
  );

  // Shuffle and return requested count
  const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);

  // If not enough questions, generate more or repeat with different difficulty
  if (shuffled.length < count) {
    // In production, you'd fetch more from database or generate procedurally
    const needed = count - shuffled.length;
    const additionalQuestions = questions
      .filter((q) => q.category === categoryId)
      .slice(0, needed);

    return [...shuffled, ...additionalQuestions].slice(0, count);
  }

  return shuffled.slice(0, count);
};

// Function to get random questions for quick play
export const getRandomQuestions = (count: number = 7): Question[] => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Function to get questions by difficulty
export const getQuestionsByDifficulty = (
  categoryId: string,
  difficulty: "easy" | "medium" | "hard",
  count: number = 7,
): Question[] => {
  const filteredQuestions = questions.filter(
    (q) => q.category === categoryId && q.difficulty === difficulty,
  );

  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Function to get category info
export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find((cat) => cat.id === categoryId);
};

// Function to check if category is unlocked for user level
export const isCategoryUnlocked = (
  categoryId: string,
  userLevel: number,
): boolean => {
  const category = getCategoryById(categoryId);
  return category ? userLevel >= category.unlockLevel : false;
};
