let allGames = [];

// Initialize Lucide icons
function initIcons() {
    lucide.createIcons();
}

// Fetch games from JSON
async function loadGames() {
    try {
        const response = await fetch('games.json');
        allGames = await response.json();
        renderGames(allGames);
    } catch (error) {
        console.error('Error loading games:', error);
    }
}

// Render games to the grid
function renderGames(games) {
    const grid = document.getElementById('gamesGrid');
    const noResults = document.getElementById('noResults');
    grid.innerHTML = '';

    if (games.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        games.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-indigo-500/50 transition-all shadow-lg hover:shadow-indigo-500/10';
            card.onclick = () => playGame(game);
            
            card.innerHTML = `
                <div class="aspect-[3/2] overflow-hidden">
                    <img
                        src="${game.thumbnail}"
                        alt="${game.title}"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerpolicy="no-referrer"
                    >
                    <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                </div>
                
                <div class="p-4">
                    <h3 class="text-lg font-bold group-hover:text-indigo-400 transition-colors">
                        ${game.title}
                    </h3>
                    <div class="mt-2 flex items-center gap-2">
                        <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 rounded border border-indigo-500/20">
                            Web Game
                        </span>
                        <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-400 rounded border border-zinc-700">
                            Unblocked
                        </span>
                    </div>
                </div>

                <div class="play-icon absolute top-3 right-3 opacity-0 translate-y-2 transition-all">
                    <div class="p-2 bg-indigo-500 rounded-xl shadow-lg">
                        <i data-lucide="maximize-2" class="w-4 h-4 text-white"></i>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }
    initIcons();
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allGames.filter(game => 
        game.title.toLowerCase().includes(query)
    );
    renderGames(filtered);
});

function clearSearch() {
    document.getElementById('searchInput').value = '';
    renderGames(allGames);
}

// View switching
function showHome() {
    document.getElementById('homeView').classList.remove('hidden');
    document.getElementById('playerView').classList.add('hidden');
    document.getElementById('gameFrame').src = '';
    window.scrollTo(0, 0);
}

function playGame(game) {
    document.getElementById('homeView').classList.add('hidden');
    document.getElementById('playerView').classList.remove('hidden');
    
    document.getElementById('gameTitle').innerText = game.title;
    document.getElementById('gameFrame').src = game.url;
    document.getElementById('gameDescription').innerText = `Enjoy playing ${game.title} directly in your browser. This game is provided via an iframe for easy access.`;
    
    document.getElementById('externalLink').onclick = () => window.open(game.url, '_blank');
    
    window.scrollTo(0, 0);
    initIcons();
}

// Fullscreen functionality
function toggleFullscreen() {
    const frame = document.getElementById('gameFrame');
    if (frame.requestFullscreen) {
        frame.requestFullscreen();
    } else if (frame.webkitRequestFullscreen) { /* Safari */
        frame.webkitRequestFullscreen();
    } else if (frame.msRequestFullscreen) { /* IE11 */
        frame.msRequestFullscreen();
    }
}

// Initial Load
window.onload = () => {
    loadGames();
    initIcons();
};
