import React from "react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Test Header */}
      <header className="bg-black/30 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🧠</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Quiz2Play</h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="/"
                className="text-white hover:text-purple-300 transition-colors"
              >
                Home
              </a>
              <a
                href="/categories"
                className="text-white hover:text-purple-300 transition-colors"
              >
                Categories
              </a>
              <a
                href="/dashboard"
                className="text-white hover:text-purple-300 transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/admin"
                className="text-white hover:text-purple-300 transition-colors"
              >
                Admin
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="bg-white/20 border border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                Sign In
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Quiz2Play
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            The ultimate AI-powered quiz platform where knowledge meets rewards.
            Win amazing prizes while testing your skills!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/categories")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              Start Playing Now
            </button>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all transform hover:scale-105"
            >
              View Dashboard
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏆</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              Win Real Prizes
            </h3>
            <p className="text-white/70">
              iPhone 15 Pro Max, cash rewards, and exclusive merchandise waiting
              for you.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              Lightning Fast
            </h3>
            <p className="text-white/70">
              Quick 60-second rounds. Test your knowledge and reflexes in
              rapid-fire questions.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👑</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              Become a Champion
            </h3>
            <p className="text-white/70">
              Climb the leaderboard and earn your crown as the ultimate quiz
              master.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">20+</div>
              <div className="text-white/70">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">5000+</div>
              <div className="text-white/70">Questions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">50K+</div>
              <div className="text-white/70">Players</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                $10K+
              </div>
              <div className="text-white/70">Prizes Won</div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => (window.location.href = "/categories")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Browse Categories
          </button>
          <button
            onClick={() => (window.location.href = "/leaderboard")}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all"
          >
            Leaderboard
          </button>
          <button
            onClick={() => (window.location.href = "/contests")}
            className="bg-gradient-to-r from-yellow-600 to-red-600 text-white p-6 rounded-xl font-bold hover:from-yellow-700 hover:to-red-700 transition-all"
          >
            Contests
          </button>
          <button
            onClick={() => (window.location.href = "/rewards")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Rewards
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/20 bg-black/40 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white/70">
            <p>
              &copy; 2024 Quiz2Play. All rights reserved. Made with ❤️ for quiz
              enthusiasts.
            </p>
          </div>
        </div>
      </footer>

      {/* Development Helper */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-black/80 text-white p-3 rounded-lg text-sm">
            <div>✅ Page loaded successfully!</div>
            <div>🔧 Development mode active</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
