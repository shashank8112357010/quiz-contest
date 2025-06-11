import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import {
  Globe,
  Rabbit,
  BookOpen,
  Scroll,
  Crown,
  Trophy,
  Banknote,
  Newspaper,
  Laptop,
  Zap,
  Atom,
  Compass,
  ChefHat,
  Microscope,
  FlaskConical,
  Lightbulb,
  Feather,
  Tag,
  Telescope,
  Brain,
} from "lucide-react";

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  questionCount: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

export const categories: QuizCategory[] = [
  {
    id: "world",
    name: "World",
    description: "Global knowledge, cultures, and international affairs",
    icon: Globe,
    color: "from-brand-500 to-electric-500",
    bgColor: "bg-brand-500/10",
    borderColor: "border-brand-400/30",
    questionCount: 100,
    difficulty: "Medium",
  },
  {
    id: "animal",
    name: "Animal",
    description: "Wildlife, pets, and fascinating creatures of our planet",
    icon: Rabbit,
    color: "from-neon-500 to-electric-500",
    bgColor: "bg-neon-500/10",
    borderColor: "border-neon-400/30",
    questionCount: 85,
    difficulty: "Easy",
  },
  {
    id: "gk",
    name: "General Knowledge",
    description: "A mix of everything you should know",
    icon: BookOpen,
    color: "from-magic-500 to-fire-500",
    bgColor: "bg-magic-500/10",
    borderColor: "border-magic-400/30",
    questionCount: 200,
    difficulty: "Medium",
  },
  {
    id: "history",
    name: "History",
    description: "Ancient civilizations, wars, and historical events",
    icon: Clock,
    color: "from-fire-500 to-danger-500",
    bgColor: "bg-fire-500/10",
    borderColor: "border-fire-400/30",
    questionCount: 120,
    difficulty: "Hard",
  },
  {
    id: "celebrity",
    name: "Celebrity",
    description: "Famous personalities, actors, musicians, and influencers",
    icon: Star,
    color: "from-electric-500 to-magic-500",
    bgColor: "bg-electric-500/10",
    borderColor: "border-electric-400/30",
    questionCount: 90,
    difficulty: "Easy",
  },
  {
    id: "cricket",
    name: "Cricket",
    description: "The gentleman's game - stats, players, and records",
    icon: Trophy,
    color: "from-neon-500 to-brand-500",
    bgColor: "bg-neon-500/10",
    borderColor: "border-neon-400/30",
    questionCount: 75,
    difficulty: "Medium",
  },
  {
    id: "banking",
    name: "Banking",
    description: "Finance, economics, and banking sector knowledge",
    icon: Building,
    color: "from-brand-500 to-magic-500",
    bgColor: "bg-brand-500/10",
    borderColor: "border-brand-400/30",
    questionCount: 110,
    difficulty: "Hard",
  },
  {
    id: "current-affairs",
    name: "Current Affairs",
    description: "Latest news, politics, and recent developments",
    icon: Newspaper,
    color: "from-danger-500 to-fire-500",
    bgColor: "bg-danger-500/10",
    borderColor: "border-danger-400/30",
    questionCount: 150,
    difficulty: "Medium",
  },
  {
    id: "computer",
    name: "Computer",
    description: "Technology, programming, and digital world",
    icon: Computer,
    color: "from-electric-500 to-neon-500",
    bgColor: "bg-electric-500/10",
    borderColor: "border-electric-400/30",
    questionCount: 130,
    difficulty: "Hard",
  },
  {
    id: "sports",
    name: "Sports",
    description: "Olympics, football, tennis, and all sporting events",
    icon: Zap,
    color: "from-neon-500 to-fire-500",
    bgColor: "bg-neon-500/10",
    borderColor: "border-neon-400/30",
    questionCount: 95,
    difficulty: "Medium",
  },
  {
    id: "science",
    name: "Science",
    description: "General science, discoveries, and scientific principles",
    icon: Atom,
    color: "from-magic-500 to-electric-500",
    bgColor: "bg-magic-500/10",
    borderColor: "border-magic-400/30",
    questionCount: 140,
    difficulty: "Hard",
  },
  {
    id: "geography",
    name: "Geography",
    description: "Countries, capitals, rivers, mountains, and world maps",
    icon: MapPin,
    color: "from-brand-500 to-neon-500",
    bgColor: "bg-brand-500/10",
    borderColor: "border-brand-400/30",
    questionCount: 105,
    difficulty: "Medium",
  },
  {
    id: "food",
    name: "Food",
    description: "Cuisines, cooking, restaurants, and culinary culture",
    icon: UtensilsCrossed,
    color: "from-fire-500 to-electric-500",
    bgColor: "bg-fire-500/10",
    borderColor: "border-fire-400/30",
    questionCount: 70,
    difficulty: "Easy",
  },
  {
    id: "biology",
    name: "Biology",
    description: "Life sciences, human body, plants, and ecosystems",
    icon: Dna,
    color: "from-neon-500 to-magic-500",
    bgColor: "bg-neon-500/10",
    borderColor: "border-neon-400/30",
    questionCount: 125,
    difficulty: "Hard",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    description: "Elements, compounds, reactions, and chemical processes",
    icon: FlaskConical,
    color: "from-electric-500 to-fire-500",
    bgColor: "bg-electric-500/10",
    borderColor: "border-electric-400/30",
    questionCount: 115,
    difficulty: "Hard",
  },
  {
    id: "physics",
    name: "Physics",
    description: "Laws of nature, mechanics, energy, and universe",
    icon: Lightbulb,
    color: "from-magic-500 to-brand-500",
    bgColor: "bg-magic-500/10",
    borderColor: "border-magic-400/30",
    questionCount: 135,
    difficulty: "Hard",
  },
  {
    id: "english-literature",
    name: "English Literature",
    description: "Famous authors, novels, poetry, and literary works",
    icon: PenTool,
    color: "from-brand-500 to-fire-500",
    bgColor: "bg-brand-500/10",
    borderColor: "border-brand-400/30",
    questionCount: 80,
    difficulty: "Medium",
  },
  {
    id: "brand",
    name: "Brand",
    description: "Company logos, slogans, and brand recognition",
    icon: Briefcase,
    color: "from-fire-500 to-neon-500",
    bgColor: "bg-fire-500/10",
    borderColor: "border-fire-400/30",
    questionCount: 65,
    difficulty: "Easy",
  },
  {
    id: "astronomy",
    name: "Astronomy",
    description: "Space, planets, stars, and cosmic phenomena",
    icon: Telescope,
    color: "from-electric-500 to-magic-500",
    bgColor: "bg-electric-500/10",
    borderColor: "border-electric-400/30",
    questionCount: 85,
    difficulty: "Medium",
  },
  {
    id: "psychology",
    name: "Psychology",
    description: "Human behavior, mental processes, and cognitive science",
    icon: Brain,
    color: "from-magic-500 to-neon-500",
    bgColor: "bg-magic-500/10",
    borderColor: "border-magic-400/30",
    questionCount: 90,
    difficulty: "Hard",
  },
];

const Categories = () => {
  const handleCategorySelect = (categoryId: string) => {
    window.location.href = `/quiz/${categoryId}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-neon-400 bg-neon-500/20 border-neon-400";
      case "Medium":
        return "text-electric-400 bg-electric-500/20 border-electric-400";
      case "Hard":
        return "text-danger-400 bg-danger-500/20 border-danger-400";
      default:
        return "text-white/70 bg-white/10 border-white/20";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-40">
        <Header />

        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-electric-400 via-neon-400 to-magic-400 bg-clip-text text-transparent">
                Category
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Boost your IQ in the most classic categories. Select your
              expertise and start your quiz journey!
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-electric-400">
                  {categories.length}
                </div>
                <div className="text-white/70 text-sm">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-neon-400">
                  {categories
                    .reduce((total, cat) => total + cat.questionCount, 0)
                    .toLocaleString()}
                  +
                </div>
                <div className="text-white/70 text-sm">Questions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-magic-400">50K+</div>
                <div className="text-white/70 text-sm">Players</div>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl border ${category.borderColor} p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl bg-gradient-to-br from-white to-transparent" />

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 ${category.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      className={`w-7 h-7 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-electric-200 group-hover:bg-clip-text transition-all duration-300">
                    {category.name}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed mb-4 group-hover:text-white/80 transition-colors duration-300">
                    {category.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getDifficultyColor(category.difficulty)}>
                      {category.difficulty}
                    </Badge>
                    <span className="text-white/60 text-sm font-medium">
                      {category.questionCount} questions
                    </span>
                  </div>

                  {/* Play Button */}
                  <Button
                    className={`w-full bg-gradient-to-r ${category.color} hover:shadow-lg transition-all duration-300 text-white border-0`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategorySelect(category.id);
                    }}
                  >
                    Start Quiz
                  </Button>

                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl bg-gradient-to-r ${category.color} blur-xl -z-10`}
                  />
                </div>
              );
            })}
          </div>

          {/* More Categories Coming Soon */}
          <div className="text-center mt-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                More Categories Coming Soon!
              </h3>
              <p className="text-white/70 mb-6">
                We're constantly adding new categories to challenge your
                knowledge. Stay tuned for updates!
              </p>
              <Badge className="bg-electric-500/20 border-electric-400 text-electric-100 px-4 py-2">
                🚀 New categories every week
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
