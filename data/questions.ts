export interface Question {
  id: string;
  category: string;
  level: number;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  detailedExplanation?: string; // Rich HTML explanation with bold formatting
  tags: string[];
  timeLimit: number; // in seconds
  points: number;
  funFact?: string; // Additional interesting information
  references?: string[]; // Learning resources
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

// Enhanced questions with detailed explanations in bold formatting
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
    detailedExplanation: `
      <div class="space-y-2">
        <p><strong>Answer: Paris</strong></p>
        <p><strong>Why Paris is correct:</strong> Paris has been the capital of France since 508 AD and is located in the north-central part of the country along the Seine River.</p>
        <p><strong>Key Facts:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Population:</strong> Over 2.1 million in the city, 12 million in metro area</li>
          <li><strong>Famous landmarks:</strong> Eiffel Tower, Louvre Museum, Notre-Dame Cathedral</li>
          <li><strong>Nickname:</strong> "The City of Light" (La Ville Lumière)</li>
          <li><strong>Government:</strong> Houses the French President (Élysée Palace) and Parliament</li>
        </ul>
        <p><strong>Why other options are wrong:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>London:</strong> Capital of the United Kingdom</li>
          <li><strong>Berlin:</strong> Capital of Germany</li>
          <li><strong>Madrid:</strong> Capital of Spain</li>
        </ul>
      </div>
    `,
    tags: ["geography", "europe", "capitals"],
    timeLimit: 30,
    points: 100,
    funFact:
      "Paris is the most visited city in the world with over 30 million tourists annually!",
    references: ["Geography textbooks", "Atlas", "Travel guides"],
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
    detailedExplanation: `
      <div class="space-y-2">
        <p><strong>Answer: 3 sides</strong></p>
        <p><strong>Definition:</strong> A triangle is a <strong>polygon</strong> (closed shape) with exactly <strong>three sides</strong>, <strong>three vertices</strong> (corners), and <strong>three angles</strong>.</p>
        <p><strong>Key Properties:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Angles:</strong> The sum of all three angles always equals 180 degrees</li>
          <li><strong>Sides:</strong> Each side connects two vertices</li>
          <li><strong>Types:</strong> Equilateral, Isosceles, Scalene, Right-angled</li>
        </ul>
        <p><strong>Why other options are wrong:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>2 sides:</strong> Would be a line segment, not a closed shape</li>
          <li><strong>4 sides:</strong> This describes a quadrilateral (square, rectangle, etc.)</li>
          <li><strong>5 sides:</strong> This describes a pentagon</li>
        </ul>
        <p><strong>Memory Tip:</strong> "TRI-angle" - the prefix "tri" means three!</p>
      </div>
    `,
    tags: ["mathematics", "geometry", "shapes"],
    timeLimit: 30,
    points: 100,
    funFact:
      "The triangle is the strongest shape in engineering and is used in bridges and building construction!",
    references: ["Basic geometry", "Mathematics textbooks"],
  },

  {
    id: "gk-003",
    category: "general-knowledge",
    level: 1,
    difficulty: "easy",
    question: "What color does the sun appear to us on Earth?",
    options: ["Red", "Blue", "Yellow", "Green"],
    correctAnswer: 2,
    explanation:
      "The sun appears yellow to us on Earth, though it actually emits white light.",
    detailedExplanation: `
      <div class="space-y-2">
        <p><strong>Answer: Yellow</strong></p>
        <p><strong>Why the sun appears yellow:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Actual color:</strong> The sun emits white light (all colors combined)</li>
          <li><strong>Earth's atmosphere:</strong> Scatters blue light more than other colors</li>
          <li><strong>Result:</strong> More yellow/orange light reaches our eyes</li>
          <li><strong>Time of day matters:</strong> Appears more orange/red at sunset due to more atmosphere</li>
        </ul>
        <p><strong>Scientific explanation:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Rayleigh scattering:</strong> Shorter wavelengths (blue) scatter more</li>
          <li><strong>In space:</strong> Astronauts see the sun as white</li>
          <li><strong>Solar classification:</strong> The sun is a "yellow dwarf" star</li>
        </ul>
        <p><strong>Why other colors are wrong:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Red:</strong> Only at sunrise/sunset due to atmospheric effects</li>
          <li><strong>Blue:</strong> The sky appears blue, not the sun</li>
          <li><strong>Green:</strong> Never naturally appears green from Earth</li>
        </ul>
      </div>
    `,
    tags: ["astronomy", "colors", "basic", "physics"],
    timeLimit: 30,
    points: 100,
    funFact:
      "The sun's surface temperature is about 5,778 K (5,505°C), making it actually white hot!",
    references: ["Basic astronomy", "Physics of light"],
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
    detailedExplanation: `
      <div class="space-y-2">
        <p><strong>Answer: Leonardo da Vinci</strong></p>
        <p><strong>About the painting:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Created:</strong> Between 1503-1519 during the Italian Renaissance</li>
          <li><strong>Subject:</strong> Lisa Gherardini, wife of Florentine merchant Francesco del Giocondo</li>
          <li><strong>Technique:</strong> Oil on poplar wood panel</li>
          <li><strong>Size:</strong> 77 cm × 53 cm (30 in × 21 in)</li>
          <li><strong>Current location:</strong> Louvre Museum, Paris</li>
        </ul>
        <p><strong>Why it's famous:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Enigmatic smile:</strong> Subject's mysterious expression</li>
          <li><strong>Sfumato technique:</strong> Da Vinci's signature soft, gradual transitions</li>
          <li><strong>Direct gaze:</strong> Eyes seem to follow the viewer</li>
          <li><strong>Cultural icon:</strong> Most famous painting in the world</li>
        </ul>
        <p><strong>Why other artists are wrong:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Pablo Picasso (1881-1973):</strong> Spanish artist, painted centuries later</li>
          <li><strong>Vincent van Gogh (1853-1890):</strong> Dutch post-impressionist painter</li>
          <li><strong>Michelangelo (1475-1564):</strong> Contemporary of da Vinci, famous for Sistine Chapel</li>
        </ul>
      </div>
    `,
    tags: ["art", "renaissance", "famous-paintings"],
    timeLimit: 30,
    points: 150,
    funFact:
      "The Mona Lisa was stolen from the Louvre in 1911 and wasn't recovered until 1913!",
    references: ["Art history", "Renaissance studies", "Museum catalogs"],
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
    detailedExplanation: `
      <div class="space-y-2">
        <p><strong>Answer: Au</strong></p>
        <p><strong>Etymology and meaning:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Origin:</strong> From Latin word "aurum" meaning "shining dawn"</li>
          <li><strong>Ancient symbol:</strong> Romans used this term for gold</li>
          <li><strong>Modern usage:</strong> Internationally recognized chemical symbol</li>
        </ul>
        <p><strong>Gold properties:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Atomic number:</strong> 79</li>
          <li><strong>Atomic weight:</strong> 196.97</li>
          <li><strong>Color:</strong> Characteristic yellow metallic luster</li>
          <li><strong>Properties:</strong> Highly malleable, ductile, and corrosion-resistant</li>
        </ul>
        <p><strong>Why other symbols are wrong:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Go:</strong> Not a real chemical symbol</li>
          <li><strong>Gd:</strong> This is Gadolinium (rare earth element)</li>
          <li><strong>Ag:</strong> This is Silver (from Latin "argentum")</li>
        </ul>
        <p><strong>Memory tip:</strong> "AUrum" = AUsome metal = AU!</p>
      </div>
    `,
    tags: ["chemistry", "elements", "symbols"],
    timeLimit: 30,
    points: 150,
    funFact:
      "All the gold ever mined in human history would fit in a cube of about 21 meters on each side!",
    references: ["Periodic table", "Chemistry textbooks", "Elements guide"],
  },

  // Science - Level 1 (Easy)
  {
    id: "sci-001",
    category: "science",
    level: 1,
    difficulty: "easy",
    question:
      "What gas do plants absorb from the atmosphere during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: 2,
    explanation:
      "Plants absorb carbon dioxide during photosynthesis and release oxygen.",
    detailedExplanation: `
      <div class="space-y-2">
        <p><strong>Answer: Carbon Dioxide (CO₂)</strong></p>
        <p><strong>Photosynthesis process:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Input:</strong> Carbon dioxide + Water + Sunlight</li>
          <li><strong>Process:</strong> Chlorophyll captures light energy</li>
          <li><strong>Output:</strong> Glucose (sugar) + Oxygen</li>
          <li><strong>Chemical equation:</strong> 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂</li>
        </ul>
        <p><strong>Where it happens:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Location:</strong> Primarily in leaves</li>
          <li><strong>Organelle:</strong> Chloroplasts contain chlorophyll</li>
          <li><strong>Entry point:</strong> CO₂ enters through stomata (tiny pores)</li>
        </ul>
        <p><strong>Why other gases are wrong:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Oxygen:</strong> This is what plants RELEASE, not absorb</li>
          <li><strong>Nitrogen:</strong> Plants get nitrogen from soil, not air</li>
          <li><strong>Hydrogen:</strong> Comes from water molecules, not directly from air</li>
        </ul>
        <p><strong>Importance:</strong> This process produces the oxygen we breathe!</p>
      </div>
    `,
    tags: ["biology", "plants", "photosynthesis"],
    timeLimit: 30,
    points: 100,
    funFact:
      "A large tree can produce enough oxygen for two people for an entire day!",
    references: [
      "Biology textbooks",
      "Plant physiology",
      "Environmental science",
    ],
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
    detailedExplanation: `
      <div class="space-y-2">
        <p><strong>Answer: 206 bones</strong></p>
        <p><strong>Bone development:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>At birth:</strong> Babies have about 270 bones and cartilage</li>
          <li><strong>During growth:</strong> Many bones fuse together</li>
          <li><strong>By adulthood:</strong> Final count is 206 bones</li>
          <li><strong>Process:</strong> Called ossification</li>
        </ul>
        <p><strong>Bone distribution:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Skull:</strong> 22 bones (8 cranial, 14 facial)</li>
          <li><strong>Spine:</strong> 26 bones (vertebrae and sacrum)</li>
          <li><strong>Ribs and sternum:</strong> 25 bones</li>
          <li><strong>Arms:</strong> 60 bones (30 each)</li>
          <li><strong>Legs:</strong> 60 bones (30 each)</li>
          <li><strong>Other:</strong> 13 bones (pelvis, etc.)</li>
        </ul>
        <p><strong>Functions of bones:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Support:</strong> Framework for the body</li>
          <li><strong>Protection:</strong> Shield vital organs</li>
          <li><strong>Movement:</strong> Attachment points for muscles</li>
          <li><strong>Blood production:</strong> Bone marrow creates blood cells</li>
        </ul>
      </div>
    `,
    tags: ["biology", "human-body", "anatomy"],
    timeLimit: 30,
    points: 100,
    funFact:
      "The smallest bone in your body is the stapes in your ear - it's only 2-3mm long!",
    references: ["Human anatomy", "Biology textbooks", "Medical references"],
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
    detailedExplanation: `
      <div class="space-y-2">
        <p><strong>Answer: Blue Whale</strong></p>
        <p><strong>Size statistics:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Length:</strong> Up to 100 feet (30 meters)</li>
          <li><strong>Weight:</strong> Up to 200 tons (400,000 pounds)</li>
          <li><strong>Heart:</strong> Size of a small car, weighs 400 pounds</li>
          <li><strong>Tongue:</strong> Can weigh as much as an elephant</li>
        </ul>
        <p><strong>Comparison with other options:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>African Elephant:</strong> Largest LAND mammal (6-7 tons)</li>
          <li><strong>Giraffe:</strong> Tallest mammal (18 feet), but much lighter</li>
          <li><strong>Polar Bear:</strong> Largest bear species (800 pounds)</li>
        </ul>
        <p><strong>Blue whale facts:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Diet:</strong> Mainly krill (tiny shrimp-like creatures)</li>
          <li><strong>Daily food:</strong> Can eat 4 tons of krill per day</li>
          <li><strong>Sound:</strong> Loudest animal call - can be heard 500 miles away</li>
          <li><strong>Baby:</strong> Newborns are 23 feet long and weigh 3 tons</li>
        </ul>
        <p><strong>Record:</strong> Not just largest mammal, but largest animal EVER!</p>
      </div>
    `,
    tags: ["mammals", "marine-life", "records"],
    timeLimit: 30,
    points: 100,
    funFact:
      "A blue whale's blood vessels are so large that a small child could crawl through them!",
    references: [
      "Marine biology",
      "Animal encyclopedias",
      "Wildlife documentaries",
    ],
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
    detailedExplanation: `
      <div class="space-y-2">
        <p><strong>Answer: Lion</strong></p>
        <p><strong>Why lions are called "King of the Jungle":</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Historical name:</strong> Ancient term that stuck over time</li>
          <li><strong>Symbolic meaning:</strong> Represents power, courage, and majesty</li>
          <li><strong>Cultural influence:</strong> Used in heraldry, literature, and movies</li>
          <li><strong>Social structure:</strong> Live in organized groups (prides)</li>
        </ul>
        <p><strong>Ironic fact:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Habitat:</strong> Lions actually live in grasslands and savannas, NOT jungles</li>
          <li><strong>True jungle cats:</strong> Tigers, jaguars, and leopards live in jungles</li>
          <li><strong>Location:</strong> Most lions live in African plains</li>
        </ul>
        <p><strong>Lion characteristics:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Male lions:</strong> Have distinctive manes</li>
          <li><strong>Social animals:</strong> Live in family groups called prides</li>
          <li><strong>Hunting:</strong> Females do most of the hunting</li>
          <li><strong>Roar:</strong> Can be heard up to 5 miles away</li>
        </ul>
        <p><strong>Other big cats:</strong> Tigers are actually larger and stronger than lions!</p>
      </div>
    `,
    tags: ["big-cats", "lions", "nicknames"],
    timeLimit: 30,
    points: 100,
    funFact:
      "A lion's roar is so loud it can be heard from 5 miles away - that's like hearing someone from across town!",
    references: ["Wildlife biology", "Animal behavior", "Big cat studies"],
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
    detailedExplanation: `
      <div class="space-y-2">
        <p><strong>Answer: Avocado</strong></p>
        <p><strong>About guacamole:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Origin:</strong> Traditional Mexican dip dating back to 16th century</li>
          <li><strong>Name meaning:</strong> From Nahuatl "āhuacamolli" (avocado-mixture)</li>
          <li><strong>Base ingredient:</strong> Mashed ripe avocados (typically 70-80% of recipe)</li>
          <li><strong>Aztec heritage:</strong> Originally made by Aztec people</li>
        </ul>
        <p><strong>Traditional recipe includes:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Primary:</strong> Mashed avocados (main ingredient)</li>
          <li><strong>Secondary:</strong> Lime juice (prevents browning)</li>
          <li><strong>Seasonings:</strong> Salt, onions, tomatoes, cilantro</li>
          <li><strong>Optional:</strong> Jalapeños, garlic, cumin</li>
        </ul>
        <p><strong>Why other options are secondary:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Tomato:</strong> Common addition but not the main ingredient</li>
          <li><strong>Onion:</strong> Flavoring agent, used in small amounts</li>
          <li><strong>Lime:</strong> Important for flavor and preservation, but not primary</li>
        </ul>
        <p><strong>Nutritional benefits:</strong> Avocados provide healthy fats, fiber, and potassium!</p>
      </div>
    `,
    tags: ["mexican-cuisine", "ingredients", "dips"],
    timeLimit: 30,
    points: 100,
    funFact:
      "Americans consume over 100 million pounds of avocados on Super Bowl Sunday alone!",
    references: ["Mexican cuisine", "Culinary history", "Cooking guides"],
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
    detailedExplanation: `
      <div class="space-y-2">
        <p><strong>Answer: Italy</strong></p>
        <p><strong>Pizza history:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Birthplace:</strong> Naples, Southern Italy</li>
          <li><strong>Time period:</strong> 18th-19th century</li>
          <li><strong>Original purpose:</strong> Cheap food for working class</li>
          <li><strong>First pizzeria:</strong> Port'Alba (1830) in Naples</li>
        </ul>
        <p><strong>Evolution of pizza:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Ancient origins:</strong> Flatbreads existed in many cultures</li>
          <li><strong>Tomato addition:</strong> 16th century after tomatoes arrived from Americas</li>
          <li><strong>Margherita:</strong> Created in 1889 for Queen Margherita of Italy</li>
          <li><strong>Modern pizza:</strong> Spread worldwide in 20th century</li>
        </ul>
        <p><strong>UNESCO recognition:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>2017:</strong> Neapolitan pizza-making became UNESCO heritage</li>
          <li><strong>Traditional method:</strong> Hand-stretched dough, wood-fired oven</li>
          <li><strong>Temperature:</strong> Cooked at 900°F (485°C) for 60-90 seconds</li>
        </ul>
        <p><strong>Why other countries are wrong:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>France:</strong> Known for bread and pastries, not pizza</li>
          <li><strong>Spain:</strong> Has similar dishes but not pizza originators</li>
          <li><strong>Greece:</strong> Ancient flatbreads but not modern pizza</li>
        </ul>
      </div>
    `,
    tags: ["italian-cuisine", "origins", "pizza"],
    timeLimit: 30,
    points: 100,
    funFact:
      "The world's most expensive pizza costs $12,000 and is topped with three types of caviar and lobster!",
    references: [
      "Italian cuisine history",
      "Food origins",
      "Culinary traditions",
    ],
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
    detailedExplanation: `
      <div class="space-y-2">
        <p><strong>Answer: 1945</strong></p>
        <p><strong>End of World War II timeline:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Europe:</strong> May 8, 1945 - Victory in Europe Day (V-E Day)</li>
          <li><strong>Germany surrendered:</strong> Unconditionally to Allied forces</li>
          <li><strong>Pacific Theater:</strong> Continued until September 1945</li>
          <li><strong>Japan surrendered:</strong> September 2, 1945 - Victory over Japan Day (V-J Day)</li>
        </ul>
        <p><strong>Key events leading to the end:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Hitler's death:</strong> April 30, 1945 in his bunker</li>
          <li><strong>Atomic bombs:</strong> Hiroshima (Aug 6) and Nagasaki (Aug 9)</li>
          <li><strong>Soviet invasion:</strong> USSR entered war against Japan</li>
          <li><strong>Emperor's decision:</strong> Japan's Emperor Hirohito announced surrender</li>
        </ul>
        <p><strong>Formal surrender:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Location:</strong> USS Missouri in Tokyo Bay</li>
          <li><strong>Date:</strong> September 2, 1945</li>
          <li><strong>Duration of war:</strong> 6 years (1939-1945)</li>
        </ul>
        <p><strong>Why other years are wrong:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>1944:</strong> War was still ongoing, D-Day had just occurred</li>
          <li><strong>1946-1947:</strong> Post-war period, peace treaties being signed</li>
        </ul>
      </div>
    `,
    tags: ["world-war-2", "20th-century", "wars"],
    timeLimit: 30,
    points: 100,
    funFact:
      "World War II involved over 30 countries and caused an estimated 50-80 million deaths worldwide.",
    references: [
      "World War II history",
      "Military history",
      "20th century studies",
    ],
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
    detailedExplanation: `
      <div class="space-y-2">
        <p><strong>Answer: Neil Armstrong</strong></p>
        <p><strong>Apollo 11 mission details:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Launch date:</strong> July 16, 1969</li>
          <li><strong>Moon landing:</strong> July 20, 1969 at 20:17 UTC</li>
          <li><strong>First step:</strong> July 21, 1969 at 02:56 UTC</li>
          <li><strong>Famous words:</strong> "That's one small step for man, one giant leap for mankind"</li>
        </ul>
        <p><strong>Crew members:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Neil Armstrong:</strong> Commander, first to walk on moon</li>
          <li><strong>Buzz Aldrin:</strong> Lunar Module Pilot, second person on moon</li>
          <li><strong>Michael Collins:</strong> Command Module Pilot, stayed in orbit</li>
        </ul>
        <p><strong>Historic significance:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Space Race:</strong> USA achieved JFK's goal before 1970</li>
          <li><strong>Technology:</strong> Demonstrated advanced spaceflight capabilities</li>
          <li><strong>Global impact:</strong> Watched by 650 million people worldwide</li>
          <li><strong>Duration on moon:</strong> 21 hours and 36 minutes</li>
        </ul>
        <p><strong>Why other astronauts are wrong:</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Buzz Aldrin:</strong> Second person to walk on moon (19 minutes after Armstrong)</li>
          <li><strong>John Glenn:</strong> First American to orbit Earth (1962)</li>
          <li><strong>Alan Shepard:</strong> First American in space (1961)</li>
        </ul>
      </div>
    `,
    tags: ["space-exploration", "moon-landing", "astronauts"],
    timeLimit: 30,
    points: 100,
    funFact:
      "Neil Armstrong's heart rate was only 150 beats per minute during the moon landing - that's what most people reach during moderate exercise!",
    references: [
      "Space exploration history",
      "NASA archives",
      "Apollo program documentation",
    ],
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
