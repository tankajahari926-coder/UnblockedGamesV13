import { useState, useEffect } from 'react';
import { Gamepad2, Home, Search, X, Maximize2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setGames(gamesData);
  }, []);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedGame(null)}>
              <Gamepad2 className="w-8 h-8 text-indigo-500" />
              <span className="text-xl font-bold tracking-tight">UnblockedHub</span>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search games..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedGame(null)}
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
              >
                <Home className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Search */}
        <div className="sm:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {selectedGame ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{selectedGame.title}</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.open(selectedGame.url, '_blank')}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in New Tab
                </button>
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="relative aspect-video w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-indigo-500/10">
              <iframe
                src={selectedGame.url}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                title={selectedGame.title}
              />
            </div>
            
            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <h3 className="text-lg font-semibold mb-2">About {selectedGame.title}</h3>
              <p className="text-zinc-400 leading-relaxed">
                Enjoy playing {selectedGame.title} directly in your browser. This game is provided via an iframe for easy access. 
                If the game doesn't load, try opening it in a new tab using the button above.
              </p>
            </div>
          </div>
        ) : (
          <>
            <header className="mb-12">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Play Without Limits
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl">
                A curated collection of the best unblocked games. No downloads, no signups, just instant fun.
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredGames.map((game) => (
                  <motion.div
                    key={game.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -8 }}
                    className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-indigo-500/50 transition-all shadow-lg hover:shadow-indigo-500/10"
                    onClick={() => setSelectedGame(game)}
                  >
                    <div className="aspect-[3/2] overflow-hidden">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors">
                        {game.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 rounded border border-indigo-500/20">
                          Web Game
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-400 rounded border border-zinc-700">
                          Unblocked
                        </span>
                      </div>
                    </div>

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 bg-indigo-500 rounded-xl shadow-lg">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex p-4 bg-zinc-900 rounded-full mb-4">
                  <Search className="w-8 h-8 text-zinc-700" />
                </div>
                <h3 className="text-xl font-semibold">No games found</h3>
                <p className="text-zinc-500 mt-2">Try searching for something else or browse our full collection.</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-6 text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="mt-20 border-t border-zinc-800 py-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-indigo-500" />
              <span className="text-lg font-bold">UnblockedHub</span>
            </div>
            <div className="flex gap-8 text-sm text-zinc-500">
              <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Contact</a>
            </div>
            <p className="text-sm text-zinc-600">
              © 2026 UnblockedHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
