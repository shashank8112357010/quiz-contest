import { Button } from "@/components/ui/button";
import { Brain, Menu, User, Trophy } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-electric-400 to-magic-500 rounded-xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-400 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-white to-electric-200 bg-clip-text text-transparent">
                QuizMaster
              </h1>
              <p className="text-xs text-white/70 font-medium">
                Win. Learn. Dominate.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="/categories"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Leaderboard
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Contests
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Rewards
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-neon-500 to-electric-500 hover:from-neon-400 hover:to-electric-400 text-white border-0 shadow-lg">
              <Trophy className="w-4 h-4 mr-2" />
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/20">
            <nav className="flex flex-col gap-4">
              <a
                href="/"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
              >
                Home
              </a>
              <a
                href="/categories"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
              >
                Categories
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
              >
                Leaderboard
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
              >
                Contests
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
              >
                Rewards
              </a>
              <div className="flex flex-col gap-2 mt-4">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-neon-500 to-electric-500 hover:from-neon-400 hover:to-electric-400 text-white">
                  <Trophy className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
