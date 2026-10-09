/**
 * HAVEN PLAY — RUNTIME ENGINE
 * Client-Side Browser Games • Local AI • Interactive Creative Labs
 * 
 * 100% Free • Zero External APIs • Zero Cloud Dependencies • Pure Vanilla JS
 */

(function () {
  'use strict';

  // Shared Toast Helper
  function showToast(msg) {
    let toast = document.getElementById('play-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'play-toast';
      toast.className = 'copy-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // Active Game Modal Controller
  const GameModal = {
    overlay: null,
    titleEl: null,
    contentEl: null,
    activeGameKey: null,

    init() {
      this.overlay = document.getElementById('game-modal-overlay');
      this.titleEl = document.getElementById('game-modal-title');
      this.contentEl = document.getElementById('game-modal-body');
      const closeBtn = document.getElementById('game-close-btn');

      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close());
      }

      if (this.overlay) {
        this.overlay.addEventListener('click', (e) => {
          if (e.target === this.overlay) this.close();
        });
      }

      // Keyboard Esc to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.overlay && this.overlay.classList.contains('active')) {
          this.close();
        }
      });
    },

    open(gameKey) {
      this.activeGameKey = gameKey;
      if (!this.overlay) return;
      this.overlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Route to game launcher
      if (gameKey === 'ttt') {
        this.titleEl.textContent = 'TIC-TAC-TOE — HAVEN LOCAL AI';
        TicTacToe.mount(this.contentEl);
      } else if (gameKey === 'rps') {
        this.titleEl.textContent = 'ROCK PAPER SCISSORS — HAVEN LOCAL AI';
        RockPaperScissors.mount(this.contentEl);
      } else if (gameKey === 'memory') {
        this.titleEl.textContent = 'MEMORY MATCH — NEURAL FOCUS';
        MemoryMatch.mount(this.contentEl);
      } else if (gameKey === 'reaction') {
        this.titleEl.textContent = 'REACTION TEST — MILLISECOND SPEED';
        ReactionTest.mount(this.contentEl);
      } else if (gameKey === 'wolfrun') {
        this.titleEl.textContent = 'WOLF RUN — MASCOT 2D RUNNER';
        WolfRun.mount(this.contentEl);
      }
    },

    close() {
      // Teardown any running game loops
      if (this.activeGameKey === 'wolfrun') {
        WolfRun.destroy();
      }
      this.activeGameKey = null;
      if (this.overlay) {
        this.overlay.classList.remove('active');
      }
      if (this.contentEl) {
        this.contentEl.innerHTML = '';
      }
      document.body.style.overflow = '';
    }
  };

  /* ==========================================================================
     GAME 01: TIC-TAC-TOE (LOCAL AI WITH MINIMAX)
     ========================================================================== */
  const TicTacToe = {
    board: Array(9).fill(''),
    humanPlayer: 'X',
    aiPlayer: 'O',
    difficulty: 'hard', // easy, medium, hard
    gameOver: false,
    scores: { player: 0, ai: 0, draws: 0 },

    mount(container) {
      this.board = Array(9).fill('');
      this.gameOver = false;

      container.innerHTML = `
        <div class="game-toolbar">
          <div class="game-score-display">
            <div class="game-score-item">YOU (<span id="ttt-human-lbl">X</span>): <strong id="ttt-score-p">${this.scores.player}</strong></div>
            <div class="game-score-item">HAVEN AI (<span id="ttt-ai-lbl">O</span>): <strong id="ttt-score-a">${this.scores.ai}</strong></div>
            <div class="game-score-item">DRAWS: <strong id="ttt-score-d">${this.scores.draws}</strong></div>
          </div>
          <div class="game-controls-group">
            <label style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-faint);">Play As:</label>
            <select id="ttt-piece-select" class="game-select-input">
              <option value="X" ${this.humanPlayer === 'X' ? 'selected' : ''}>X (First Move)</option>
              <option value="O" ${this.humanPlayer === 'O' ? 'selected' : ''}>O (AI First Move)</option>
            </select>
            <label style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-faint); margin-left: 0.5rem;">AI Difficulty:</label>
            <select id="ttt-diff-select" class="game-select-input">
              <option value="easy" ${this.difficulty === 'easy' ? 'selected' : ''}>Easy (Random)</option>
              <option value="medium" ${this.difficulty === 'medium' ? 'selected' : ''}>Medium (Strategic)</option>
              <option value="hard" ${this.difficulty === 'hard' ? 'selected' : ''}>Hard (Minimax Optimal)</option>
            </select>
            <button id="ttt-restart-btn" class="game-action-btn">↻ New Round</button>
            <button id="ttt-reset-score-btn" class="game-action-btn" title="Reset Session Score">Reset Score</button>
          </div>
        </div>

        <div id="ttt-status" class="game-status-banner">Your turn — place your mark.</div>

        <div class="ttt-board" id="ttt-board" role="grid" aria-label="Tic-Tac-Toe Game Board">
          ${Array(9).fill(0).map((_, i) => `<div class="ttt-cell" data-index="${i}" tabindex="0" role="gridcell" aria-label="Cell ${i + 1}"></div>`).join('')}
        </div>

        <p style="font-size: 0.78rem; color: var(--text-faint); text-align: center; margin-top: 0.5rem; font-family: var(--font-mono);">
          HAVEN LOCAL AI &bull; Browser-based heuristic &amp; minimax engine &bull; No API required.
        </p>
      `;

      // Event Listeners
      const boardEl = container.querySelector('#ttt-board');
      boardEl.addEventListener('click', (e) => {
        const cell = e.target.closest('.ttt-cell');
        if (!cell || this.gameOver) return;
        const idx = parseInt(cell.dataset.index, 10);
        this.handleHumanMove(idx);
      });

      // Keyboard navigation for cells
      boardEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const cell = e.target.closest('.ttt-cell');
          if (cell && !this.gameOver) {
            e.preventDefault();
            this.handleHumanMove(parseInt(cell.dataset.index, 10));
          }
        }
      });

      container.querySelector('#ttt-piece-select').addEventListener('change', (e) => {
        this.humanPlayer = e.target.value;
        this.aiPlayer = this.humanPlayer === 'X' ? 'O' : 'X';
        container.querySelector('#ttt-human-lbl').textContent = this.humanPlayer;
        container.querySelector('#ttt-ai-lbl').textContent = this.aiPlayer;
        this.resetRound();
      });

      container.querySelector('#ttt-diff-select').addEventListener('change', (e) => {
        this.difficulty = e.target.value;
        this.resetRound();
      });

      container.querySelector('#ttt-restart-btn').addEventListener('click', () => {
        this.resetRound();
      });

      container.querySelector('#ttt-reset-score-btn').addEventListener('click', () => {
        this.scores = { player: 0, ai: 0, draws: 0 };
        this.updateScoreDisplay();
        this.resetRound();
        showToast('Scores reset.');
      });

      // If AI plays X, AI makes first move
      if (this.aiPlayer === 'X') {
        setTimeout(() => this.triggerAiMove(), 300);
      }
    },

    updateScoreDisplay() {
      const p = document.getElementById('ttt-score-p');
      const a = document.getElementById('ttt-score-a');
      const d = document.getElementById('ttt-score-d');
      if (p) p.textContent = this.scores.player;
      if (a) a.textContent = this.scores.ai;
      if (d) d.textContent = this.scores.draws;
    },

    resetRound() {
      this.board = Array(9).fill('');
      this.gameOver = false;
      const cells = document.querySelectorAll('.ttt-cell');
      cells.forEach(c => {
        c.textContent = '';
        c.className = 'ttt-cell';
      });

      const status = document.getElementById('ttt-status');
      if (status) {
        status.className = 'game-status-banner';
        status.textContent = this.humanPlayer === 'X' ? 'Your turn — place your mark.' : 'AI thinking...';
      }

      if (this.aiPlayer === 'X') {
        setTimeout(() => this.triggerAiMove(), 400);
      }
    },

    handleHumanMove(idx) {
      if (this.board[idx] !== '' || this.gameOver) return;

      this.board[idx] = this.humanPlayer;
      this.renderCell(idx, this.humanPlayer);

      const winResult = this.checkWin(this.board, this.humanPlayer);
      if (winResult) {
        this.endGame('win', winResult);
        return;
      }

      if (this.isBoardFull(this.board)) {
        this.endGame('draw');
        return;
      }

      const status = document.getElementById('ttt-status');
      if (status) {
        status.textContent = 'HAVEN Local AI is calculating...';
      }

      setTimeout(() => this.triggerAiMove(), 250);
    },

    renderCell(idx, piece) {
      const cell = document.querySelector(`.ttt-cell[data-index="${idx}"]`);
      if (cell) {
        cell.textContent = piece;
        cell.classList.add('taken', piece.toLowerCase());
      }
    },

    triggerAiMove() {
      if (this.gameOver) return;

      let moveIdx;
      if (this.difficulty === 'easy') {
        moveIdx = this.getRandomMove();
      } else if (this.difficulty === 'medium') {
        moveIdx = this.getStrategicMove();
      } else {
        moveIdx = this.getMinimaxMove();
      }

      if (moveIdx !== undefined && moveIdx !== null) {
        this.board[moveIdx] = this.aiPlayer;
        this.renderCell(moveIdx, this.aiPlayer);

        const winResult = this.checkWin(this.board, this.aiPlayer);
        if (winResult) {
          this.endGame('loss', winResult);
          return;
        }

        if (this.isBoardFull(this.board)) {
          this.endGame('draw');
          return;
        }

        const status = document.getElementById('ttt-status');
        if (status) {
          status.textContent = 'Your turn.';
        }
      }
    },

    getRandomMove() {
      const available = this.board.map((v, i) => v === '' ? i : null).filter(v => v !== null);
      if (available.length === 0) return null;
      return available[Math.floor(Math.random() * available.length)];
    },

    getStrategicMove() {
      // 1. Check if AI can win immediately
      for (let i = 0; i < 9; i++) {
        if (this.board[i] === '') {
          this.board[i] = this.aiPlayer;
          if (this.checkWin(this.board, this.aiPlayer)) {
            this.board[i] = '';
            return i;
          }
          this.board[i] = '';
        }
      }
      // 2. Block human immediate win
      for (let i = 0; i < 9; i++) {
        if (this.board[i] === '') {
          this.board[i] = this.humanPlayer;
          if (this.checkWin(this.board, this.humanPlayer)) {
            this.board[i] = '';
            return i;
          }
          this.board[i] = '';
        }
      }
      // 3. Take center if free
      if (this.board[4] === '') return 4;
      // 4. Otherwise random move
      return this.getRandomMove();
    },

    getMinimaxMove() {
      let bestScore = -Infinity;
      let bestMove = null;

      for (let i = 0; i < 9; i++) {
        if (this.board[i] === '') {
          this.board[i] = this.aiPlayer;
          let score = this.minimax(this.board, 0, false);
          this.board[i] = '';
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
      return bestMove;
    },

    minimax(board, depth, isMaximizing) {
      if (this.checkWin(board, this.aiPlayer)) return 10 - depth;
      if (this.checkWin(board, this.humanPlayer)) return depth - 10;
      if (this.isBoardFull(board)) return 0;

      if (isMaximizing) {
        let maxEval = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === '') {
            board[i] = this.aiPlayer;
            let evaluation = this.minimax(board, depth + 1, false);
            board[i] = '';
            maxEval = Math.max(maxEval, evaluation);
          }
        }
        return maxEval;
      } else {
        let minEval = Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === '') {
            board[i] = this.humanPlayer;
            let evaluation = this.minimax(board, depth + 1, true);
            board[i] = '';
            minEval = Math.min(minEval, evaluation);
          }
        }
        return minEval;
      }
    },

    checkWin(board, player) {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6]             // diags
      ];
      for (const line of lines) {
        const [a, b, c] = line;
        if (board[a] === player && board[b] === player && board[c] === player) {
          return line;
        }
      }
      return null;
    },

    isBoardFull(board) {
      return board.every(cell => cell !== '');
    },

    endGame(result, line) {
      this.gameOver = true;
      const status = document.getElementById('ttt-status');

      if (line) {
        line.forEach(idx => {
          const cell = document.querySelector(`.ttt-cell[data-index="${idx}"]`);
          if (cell) cell.classList.add('winning-cell');
        });
      }

      if (result === 'win') {
        this.scores.player++;
        if (status) {
          status.className = 'game-status-banner win';
          status.textContent = 'VICTORY — You outmaneuvered HAVEN Local AI!';
        }
      } else if (result === 'loss') {
        this.scores.ai++;
        if (status) {
          status.className = 'game-status-banner loss';
          status.textContent = 'DEFEAT — HAVEN Local AI secured the line.';
        }
      } else {
        this.scores.draws++;
        if (status) {
          status.className = 'game-status-banner draw';
          status.textContent = 'DRAW — Perfect defensive equilibrium.';
        }
      }
      this.updateScoreDisplay();
    }
  };

  /* ==========================================================================
     GAME 02: ROCK PAPER SCISSORS (LOCAL AI WITH FREQUENCY PREDICTOR)
     ========================================================================== */
  const RockPaperScissors = {
    scores: { player: 0, ai: 0, ties: 0 },
    playerHistory: [],
    choices: ['rock', 'paper', 'scissors'],
    icons: { rock: '🪨', paper: '📄', scissors: '✂️' },

    mount(container) {
      container.innerHTML = `
        <div class="game-toolbar">
          <div class="game-score-display">
            <div class="game-score-item">YOU: <strong id="rps-score-p">${this.scores.player}</strong></div>
            <div class="game-score-item">HAVEN AI: <strong id="rps-score-a">${this.scores.ai}</strong></div>
            <div class="game-score-item">DRAWS: <strong id="rps-score-t">${this.scores.ties}</strong></div>
          </div>
          <div class="game-controls-group">
            <button id="rps-reset-score-btn" class="game-action-btn">Reset Score</button>
          </div>
        </div>

        <div id="rps-status" class="game-status-banner">Make your choice to initiate round.</div>

        <div class="rps-vs-arena">
          <div class="rps-fighter">
            <span class="rps-fighter-label">Your Choice</span>
            <div id="rps-player-hand" class="rps-hand-display">✦</div>
          </div>
          <div class="rps-vs-badge">VS</div>
          <div class="rps-fighter">
            <span class="rps-fighter-label">HAVEN Local AI</span>
            <div id="rps-ai-hand" class="rps-hand-display">✦</div>
          </div>
        </div>

        <div class="rps-choices-row">
          <button class="rps-choice-btn" data-choice="rock" aria-label="Choose Rock">
            <span class="rps-choice-icon">🪨</span>
            <span class="rps-choice-text">Rock</span>
          </button>
          <button class="rps-choice-btn" data-choice="paper" aria-label="Choose Paper">
            <span class="rps-choice-icon">📄</span>
            <span class="rps-choice-text">Paper</span>
          </button>
          <button class="rps-choice-btn" data-choice="scissors" aria-label="Choose Scissors">
            <span class="rps-choice-icon">✂️</span>
            <span class="rps-choice-text">Scissors</span>
          </button>
        </div>

        <p style="font-size: 0.78rem; color: var(--text-faint); text-align: center; margin-top: 1.5rem; font-family: var(--font-mono);">
          HAVEN LOCAL AI &bull; Browser-based adaptive heuristic model &bull; Unlimited rounds.
        </p>
      `;

      container.querySelectorAll('.rps-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.playRound(btn.dataset.choice);
        });
      });

      container.querySelector('#rps-reset-score-btn').addEventListener('click', () => {
        this.scores = { player: 0, ai: 0, ties: 0 };
        this.playerHistory = [];
        this.updateScores();
        showToast('Scores reset.');
      });
    },

    updateScores() {
      const p = document.getElementById('rps-score-p');
      const a = document.getElementById('rps-score-a');
      const t = document.getElementById('rps-score-t');
      if (p) p.textContent = this.scores.player;
      if (a) a.textContent = this.scores.ai;
      if (t) t.textContent = this.scores.ties;
    },

    getAiChoice() {
      // Adaptive heuristic: analyze player's most frequent move
      if (this.playerHistory.length > 2 && Math.random() < 0.6) {
        const counts = { rock: 0, paper: 0, scissors: 0 };
        this.playerHistory.forEach(c => counts[c]++);
        let mostFrequent = 'rock';
        if (counts.paper > counts[mostFrequent]) mostFrequent = 'paper';
        if (counts.scissors > counts[mostFrequent]) mostFrequent = 'scissors';

        // Counter the player's predicted move
        if (mostFrequent === 'rock') return 'paper';
        if (mostFrequent === 'paper') return 'scissors';
        return 'rock';
      }
      // Pure random
      return this.choices[Math.floor(Math.random() * this.choices.length)];
    },

    playRound(playerChoice) {
      this.playerHistory.push(playerChoice);
      if (this.playerHistory.length > 10) this.playerHistory.shift();

      const aiChoice = this.getAiChoice();

      const pHand = document.getElementById('rps-player-hand');
      const aHand = document.getElementById('rps-ai-hand');
      const status = document.getElementById('rps-status');

      if (pHand && aHand) {
        pHand.textContent = this.icons[playerChoice];
        aHand.textContent = this.icons[aiChoice];
        pHand.classList.add('revealed');
        aHand.classList.add('revealed');
      }

      if (playerChoice === aiChoice) {
        this.scores.ties++;
        if (status) {
          status.className = 'game-status-banner draw';
          status.textContent = `DRAW — Both chose ${playerChoice.toUpperCase()}.`;
        }
      } else if (
        (playerChoice === 'rock' && aiChoice === 'scissors') ||
        (playerChoice === 'paper' && aiChoice === 'rock') ||
        (playerChoice === 'scissors' && aiChoice === 'paper')
      ) {
        this.scores.player++;
        if (status) {
          status.className = 'game-status-banner win';
          status.textContent = `VICTORY — ${playerChoice.toUpperCase()} beats ${aiChoice.toUpperCase()}!`;
        }
      } else {
        this.scores.ai++;
        if (status) {
          status.className = 'game-status-banner loss';
          status.textContent = `DEFEAT — ${aiChoice.toUpperCase()} beats ${playerChoice.toUpperCase()}!`;
        }
      }

      this.updateScores();
    }
  };

  /* ==========================================================================
     GAME 03: MEMORY MATCH (NEURAL FOCUS & LOCAL BEST)
     ========================================================================== */
  const MemoryMatch = {
    difficulty: 'medium', // easy (12), medium (16), hard (20)
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    totalPairs: 8,
    moves: 0,
    timer: 0,
    timerInterval: null,
    isBusy: false,
    iconsMaster: ['✦', '❖', '⬡', '◈', '◉', '▲', '⚡', '☾', '🛡', '⎈'],

    mount(container) {
      const bestScore = this.getBestScore(this.difficulty);

      container.innerHTML = `
        <div class="game-toolbar">
          <div class="game-score-display">
            <div class="game-score-item">MOVES: <strong id="mem-moves">0</strong></div>
            <div class="game-score-item">TIME: <strong id="mem-timer">00:00</strong></div>
            <div class="game-score-item">YOUR BEST: <strong id="mem-best">${bestScore || '—'}</strong></div>
          </div>
          <div class="game-controls-group">
            <label style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-faint);">Cards:</label>
            <select id="mem-diff-select" class="game-select-input">
              <option value="easy" ${this.difficulty === 'easy' ? 'selected' : ''}>12 Cards (6 Pairs)</option>
              <option value="medium" ${this.difficulty === 'medium' ? 'selected' : ''}>16 Cards (8 Pairs)</option>
              <option value="hard" ${this.difficulty === 'hard' ? 'selected' : ''}>20 Cards (10 Pairs)</option>
            </select>
            <button id="mem-restart-btn" class="game-action-btn">↻ New Game</button>
          </div>
        </div>

        <div id="mem-status" class="game-status-banner">Select two matching symbols to sync data.</div>

        <div id="mem-board" class="memory-board grid-${this.difficulty === 'easy' ? '12' : this.difficulty === 'medium' ? '16' : '20'}"></div>
      `;

      container.querySelector('#mem-diff-select').addEventListener('change', (e) => {
        this.difficulty = e.target.value;
        const best = this.getBestScore(this.difficulty);
        document.getElementById('mem-best').textContent = best || '—';
        this.startNewGame();
      });

      container.querySelector('#mem-restart-btn').addEventListener('click', () => {
        this.startNewGame();
      });

      this.startNewGame();
    },

    getBestScore(diff) {
      try {
        return localStorage.getItem(`haven_memory_best_${diff}`);
      } catch (_) {
        return null;
      }
    },

    saveBestScore(diff, moves, seconds) {
      try {
        const timeStr = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
        const summary = `${moves} moves (${timeStr})`;
        const current = this.getBestScore(diff);
        if (!current) {
          localStorage.setItem(`haven_memory_best_${diff}`, summary);
          return true;
        }
        const match = current.match(/^(\d+)\s+moves/);
        if (match && moves < parseInt(match[1], 10)) {
          localStorage.setItem(`haven_memory_best_${diff}`, summary);
          return true;
        }
      } catch (_) {}
      return false;
    },

    startNewGame() {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.timer = 0;
      this.moves = 0;
      this.matchedPairs = 0;
      this.flippedCards = [];
      this.isBusy = false;

      const movesEl = document.getElementById('mem-moves');
      const timerEl = document.getElementById('mem-timer');
      const statusEl = document.getElementById('mem-status');

      if (movesEl) movesEl.textContent = '0';
      if (timerEl) timerEl.textContent = '00:00';
      if (statusEl) {
        statusEl.className = 'game-status-banner';
        statusEl.textContent = 'Flip two cards to begin.';
      }

      const pairCounts = { easy: 6, medium: 8, hard: 10 };
      this.totalPairs = pairCounts[this.difficulty];

      const selectedIcons = this.iconsMaster.slice(0, this.totalPairs);
      const deck = [...selectedIcons, ...selectedIcons];

      // Shuffle
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }

      const boardEl = document.getElementById('mem-board');
      if (!boardEl) return;
      boardEl.className = `memory-board grid-${deck.length}`;
      boardEl.innerHTML = deck.map((icon, idx) => `
        <div class="memory-card" data-index="${idx}" data-icon="${icon}" tabindex="0" role="button" aria-label="Card ${idx + 1}">
          <div class="memory-card-face memory-card-back">❖</div>
          <div class="memory-card-face memory-card-front">${icon}</div>
        </div>
      `).join('');

      boardEl.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('click', () => this.handleCardFlip(card));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleCardFlip(card);
          }
        });
      });
    },

    startTimer() {
      if (this.timerInterval) return;
      this.timerInterval = setInterval(() => {
        this.timer++;
        const mins = Math.floor(this.timer / 60).toString().padStart(2, '0');
        const secs = (this.timer % 60).toString().padStart(2, '0');
        const timerEl = document.getElementById('mem-timer');
        if (timerEl) timerEl.textContent = `${mins}:${secs}`;
      }, 1000);
    },

    handleCardFlip(card) {
      if (this.isBusy || card.classList.contains('flipped') || card.classList.contains('matched')) return;

      this.startTimer();
      card.classList.add('flipped');
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.moves++;
        const movesEl = document.getElementById('mem-moves');
        if (movesEl) movesEl.textContent = this.moves;

        const [cardA, cardB] = this.flippedCards;
        if (cardA.dataset.icon === cardB.dataset.icon) {
          // Matched
          cardA.classList.add('matched');
          cardB.classList.add('matched');
          this.matchedPairs++;
          this.flippedCards = [];

          if (this.matchedPairs === this.totalPairs) {
            this.handleVictory();
          }
        } else {
          // Not matched
          this.isBusy = true;
          setTimeout(() => {
            cardA.classList.remove('flipped');
            cardB.classList.remove('flipped');
            this.flippedCards = [];
            this.isBusy = false;
          }, 850);
        }
      }
    },

    handleVictory() {
      clearInterval(this.timerInterval);
      const isNewBest = this.saveBestScore(this.difficulty, this.moves, this.timer);
      const statusEl = document.getElementById('mem-status');
      const bestEl = document.getElementById('mem-best');

      if (bestEl) {
        bestEl.textContent = this.getBestScore(this.difficulty);
      }

      if (statusEl) {
        statusEl.className = 'game-status-banner win';
        statusEl.textContent = isNewBest
          ? `COMPLETE! New Personal Best: ${this.moves} moves in ${this.timer}s!`
          : `SYSTEM SYNCED! All ${this.totalPairs} pairs matched in ${this.moves} moves (${this.timer}s).`;
      }
    }
  };

  /* ==========================================================================
     GAME 04: REACTION TEST (MILLISECOND SPEED WITH FALSE START DETECTION)
     ========================================================================== */
  const ReactionTest = {
    state: 'idle', // idle, waiting, early, ready, result
    timeoutId: null,
    startTime: 0,
    reactionTime: 0,

    mount(container) {
      const best = this.getBest();

      container.innerHTML = `
        <div class="game-toolbar">
          <div class="game-score-display">
            <div class="game-score-item">YOUR BEST: <strong id="rxn-best">${best ? best + ' ms' : '—'}</strong></div>
            <div class="game-score-item">STATUS: <strong id="rxn-status-tag">Ready</strong></div>
          </div>
          <div class="game-controls-group">
            <button id="rxn-reset-best-btn" class="game-action-btn">Reset Best</button>
          </div>
        </div>

        <div id="rxn-arena" class="reaction-arena idle" tabindex="0" role="button" aria-label="Reaction test trigger arena">
          <div class="reaction-icon">⚡</div>
          <div class="reaction-title">Test Your Reaction Speed</div>
          <p class="reaction-sub">Click anywhere inside this arena to begin.</p>
        </div>

        <p style="font-size: 0.78rem; color: var(--text-faint); text-align: center; margin-top: 0.75rem; font-family: var(--font-mono);">
          Millisecond precision timer &bull; False-start detection &bull; Stored locally in your browser.
        </p>
      `;

      const arena = container.querySelector('#rxn-arena');
      arena.addEventListener('click', () => this.handleAction());
      arena.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          this.handleAction();
        }
      });

      container.querySelector('#rxn-reset-best-btn').addEventListener('click', () => {
        try { localStorage.removeItem('haven_reaction_best'); } catch (_) {}
        document.getElementById('rxn-best').textContent = '—';
        showToast('Reaction record reset.');
      });
    },

    getBest() {
      try {
        return localStorage.getItem('haven_reaction_best');
      } catch (_) {
        return null;
      }
    },

    saveBest(ms) {
      try {
        const cur = this.getBest();
        if (!cur || ms < parseInt(cur, 10)) {
          localStorage.setItem('haven_reaction_best', ms.toString());
          return true;
        }
      } catch (_) {}
      return false;
    },

    handleAction() {
      const arena = document.getElementById('rxn-arena');
      const statusTag = document.getElementById('rxn-status-tag');
      if (!arena) return;

      if (this.state === 'idle' || this.state === 'early' || this.state === 'result') {
        // Start test: enter waiting state
        this.state = 'waiting';
        arena.className = 'reaction-arena waiting';
        arena.innerHTML = `
          <div class="reaction-icon">⏳</div>
          <div class="reaction-title">Wait for Green...</div>
          <p class="reaction-sub">Do not click until the screen turns bright green!</p>
        `;
        if (statusTag) statusTag.textContent = 'Waiting for signal...';

        const delay = Math.floor(Math.random() * 3000) + 1500; // 1.5s to 4.5s
        this.timeoutId = setTimeout(() => {
          this.state = 'ready';
          this.startTime = performance.now();
          arena.className = 'reaction-arena ready';
          arena.innerHTML = `
            <div class="reaction-icon">⚡</div>
            <div class="reaction-title">CLICK NOW!</div>
            <p class="reaction-sub">Tap or click as fast as you can!</p>
          `;
          if (statusTag) statusTag.textContent = 'SIGNAL FIRED!';
        }, delay);

      } else if (this.state === 'waiting') {
        // False start!
        clearTimeout(this.timeoutId);
        this.state = 'early';
        arena.className = 'reaction-arena early';
        arena.innerHTML = `
          <div class="reaction-icon">⚠️</div>
          <div class="reaction-title">Too Soon! False Start.</div>
          <p class="reaction-sub">You clicked before the green signal appeared. Click to try again.</p>
        `;
        if (statusTag) statusTag.textContent = 'False start';

      } else if (this.state === 'ready') {
        // Valid reaction recorded!
        this.reactionTime = Math.round(performance.now() - this.startTime);
        this.state = 'result';
        const isNewBest = this.saveBest(this.reactionTime);

        const bestEl = document.getElementById('rxn-best');
        if (bestEl) bestEl.textContent = this.getBest() + ' ms';

        let tier = 'Good Speed';
        if (this.reactionTime < 190) tier = 'Cybernetic Reflexes (Top Tier)';
        else if (this.reactionTime < 240) tier = 'Elite Reflexes';
        else if (this.reactionTime < 300) tier = 'Great Speed';
        else tier = 'Solid Reflexes';

        arena.className = 'reaction-arena result';
        arena.innerHTML = `
          <div class="reaction-icon">🎯</div>
          <div class="reaction-ms">${this.reactionTime} ms</div>
          <div class="reaction-title" style="font-size: 1.15rem; color: var(--accent-lilac);">${tier}</div>
          <p class="reaction-sub">${isNewBest ? '✦ NEW PERSONAL BEST! ✦ — ' : ''}Click to test your reaction speed again.</p>
        `;
        if (statusTag) statusTag.textContent = `${this.reactionTime} ms`;
      }
    }
  };

  /* ==========================================================================
     GAME 05: WOLF RUN (MASCOT 2D RUNNER)
     ========================================================================== */
  const WolfRun = {
    canvas: null,
    ctx: null,
    animationId: null,
    isPaused: false,
    gameOver: false,
    score: 0,
    energyCollected: 0,
    speed: 5.5,
    highScore: 0,

    // Wolf player physics
    wolf: {
      x: 70,
      y: 220,
      width: 52,
      height: 38,
      vy: 0,
      gravity: 0.72,
      jumpStrength: -12.5,
      isGrounded: true,
      jumpsRemaining: 2,
      legCycle: 0
    },

    groundY: 250,
    obstacles: [],
    energies: [],
    particles: [],
    lastObstacleFrame: 0,
    lastEnergyFrame: 0,
    frame: 0,

    mount(container) {
      this.highScore = this.getHighScore();

      container.innerHTML = `
        <div class="game-toolbar">
          <div class="game-score-display">
            <div class="game-score-item">SCORE: <strong id="wolf-score-val">0</strong></div>
            <div class="game-score-item">ENERGY: <strong id="wolf-energy-val">0</strong></div>
            <div class="game-score-item">HIGH SCORE: <strong id="wolf-best-val">${this.highScore}</strong></div>
          </div>
          <div class="game-controls-group">
            <button id="wolf-pause-btn" class="game-action-btn">⏸ Pause (P)</button>
            <button id="wolf-restart-btn" class="game-action-btn">↻ Restart</button>
          </div>
        </div>

        <div class="wolf-game-wrap">
          <div class="wolf-canvas-box">
            <canvas id="wolf-canvas" width="800" height="320" aria-label="HAVEN Wolf Run Game Canvas"></canvas>
            <div id="wolf-start-overlay" class="wolf-overlay-screen">
              <h3 style="font-family: var(--font-display); font-size: 2rem; color: #ffffff; margin-bottom: 0.5rem;">WOLF RUN</h3>
              <p style="color: var(--accent-lilac); font-size: 0.95rem; max-width: 480px; margin-bottom: 1.5rem; line-height: 1.5;">
                Run through the nocturnal misty pine forest. Jump over charcoal ridge spires and collect bronze energy orbs. Double-jump is enabled!
              </p>
              <button id="wolf-start-play-btn" class="btn btn-primary btn-lg">START RUNNING →</button>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-faint); margin-top: 1.25rem;">
                Controls: Spacebar / Up Arrow / Tap screen to jump
              </div>
            </div>

            <div id="wolf-over-overlay" class="wolf-overlay-screen hidden">
              <div style="font-family: var(--font-mono); font-size: 0.8rem; color: #f87171; letter-spacing: 0.1em; margin-bottom: 0.25rem;">SYSTEM OFFLINE</div>
              <h3 style="font-family: var(--font-display); font-size: 2.2rem; color: #ffffff; margin-bottom: 0.5rem;">RUN CONCLUDED</h3>
              <p id="wolf-final-score" style="color: var(--accent-lilac); font-size: 1.1rem; font-family: var(--font-mono); margin-bottom: 1.5rem;">
                Score: 0 &bull; Energy: 0
              </p>
              <button id="wolf-retry-btn" class="btn btn-primary btn-lg">RUN AGAIN →</button>
            </div>
          </div>

          <!-- Mobile Touch Jump Pad -->
          <div class="wolf-touch-controls">
            <button id="wolf-mobile-jump" class="wolf-jump-btn">TAP TO JUMP ✦</button>
          </div>
        </div>

        <p style="font-size: 0.78rem; color: var(--text-faint); text-align: center; margin-top: 0.85rem; font-family: var(--font-mono);">
          HAVEN MASCOT 2D MINI-GAME &bull; 60 FPS Canvas Physics &bull; Unlimited Replays
        </p>
      `;

      this.canvas = document.getElementById('wolf-canvas');
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
      }

      // Start overlay
      const startBtn = document.getElementById('wolf-start-play-btn');
      if (startBtn) {
        startBtn.addEventListener('click', () => {
          document.getElementById('wolf-start-overlay').classList.add('hidden');
          this.initGame();
        });
      }

      // Retry overlay
      const retryBtn = document.getElementById('wolf-retry-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          document.getElementById('wolf-over-overlay').classList.add('hidden');
          this.initGame();
        });
      }

      // Toolbar Controls
      const pauseBtn = document.getElementById('wolf-pause-btn');
      if (pauseBtn) {
        pauseBtn.addEventListener('click', () => this.togglePause());
      }

      const restartBtn = document.getElementById('wolf-restart-btn');
      if (restartBtn) {
        restartBtn.addEventListener('click', () => this.initGame());
      }

      // Touch jump
      const mobileJump = document.getElementById('wolf-mobile-jump');
      if (mobileJump) {
        mobileJump.addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.jump();
        });
        mobileJump.addEventListener('click', () => this.jump());
      }

      // Canvas click / tap
      if (this.canvas) {
        this.canvas.addEventListener('click', () => this.jump());
      }

      // Keyboard Controls
      this._keyHandler = (e) => {
        if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
          e.preventDefault();
          this.jump();
        } else if (e.key === 'p' || e.key === 'P') {
          this.togglePause();
        }
      };
      window.addEventListener('keydown', this._keyHandler);

      // Visibility change: auto-pause if tab switched
      this._visHandler = () => {
        if (document.hidden && !this.isPaused && !this.gameOver) {
          this.togglePause(true);
        }
      };
      document.addEventListener('visibilitychange', this._visHandler);
    },

    getHighScore() {
      try {
        return parseInt(localStorage.getItem('haven_wolfrun_highscore') || '0', 10);
      } catch (_) {
        return 0;
      }
    },

    saveHighScore(val) {
      try {
        if (val > this.highScore) {
          this.highScore = val;
          localStorage.setItem('haven_wolfrun_highscore', val.toString());
          const bestEl = document.getElementById('wolf-best-val');
          if (bestEl) bestEl.textContent = val;
        }
      } catch (_) {}
    },

    initGame() {
      this.destroy(); // Cancel existing loop
      this.gameOver = false;
      this.isPaused = false;
      this.score = 0;
      this.energyCollected = 0;
      this.speed = 5.5;
      this.frame = 0;
      this.lastObstacleFrame = 0;
      this.lastEnergyFrame = 0;

      this.wolf.y = this.groundY - this.wolf.height;
      this.wolf.vy = 0;
      this.wolf.isGrounded = true;
      this.wolf.jumpsRemaining = 2;
      this.wolf.legCycle = 0;

      this.obstacles = [];
      this.energies = [];
      this.particles = [];

      const pauseBtn = document.getElementById('wolf-pause-btn');
      if (pauseBtn) pauseBtn.textContent = '⏸ Pause (P)';

      this.loop();
    },

    jump() {
      if (this.gameOver || this.isPaused) return;
      if (this.wolf.jumpsRemaining > 0) {
        this.wolf.vy = this.wolf.jumpStrength;
        this.wolf.isGrounded = false;
        this.wolf.jumpsRemaining--;

        // Violet particle burst on jump
        for (let i = 0; i < 8; i++) {
          this.particles.push({
            x: this.wolf.x + 15,
            y: this.wolf.y + this.wolf.height,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 2 + 1,
            color: '#c084fc',
            radius: Math.random() * 2.5 + 1,
            alpha: 1
          });
        }
      }
    },

    togglePause(forceState) {
      if (this.gameOver) return;
      this.isPaused = forceState !== undefined ? forceState : !this.isPaused;
      const pauseBtn = document.getElementById('wolf-pause-btn');
      if (pauseBtn) pauseBtn.textContent = this.isPaused ? '▶ Resume (P)' : '⏸ Pause (P)';

      if (!this.isPaused) {
        this.loop();
      }
    },

    loop() {
      if (this.isPaused || this.gameOver) return;

      this.update();
      this.draw();

      this.animationId = requestAnimationFrame(() => this.loop());
    },

    update() {
      this.frame++;
      this.score += 1;

      // Increase speed very gradually
      if (this.frame % 300 === 0 && this.speed < 11.5) {
        this.speed += 0.4;
      }

      // Update UI stats
      if (this.frame % 5 === 0) {
        const sVal = document.getElementById('wolf-score-val');
        const eVal = document.getElementById('wolf-energy-val');
        if (sVal) sVal.textContent = this.score;
        if (eVal) eVal.textContent = this.energyCollected;
      }

      // Wolf Gravity & Movement
      this.wolf.vy += this.wolf.gravity;
      this.wolf.y += this.wolf.vy;

      if (this.wolf.y >= this.groundY - this.wolf.height) {
        this.wolf.y = this.groundY - this.wolf.height;
        this.wolf.vy = 0;
        this.wolf.isGrounded = true;
        this.wolf.jumpsRemaining = 2;
      }

      if (this.wolf.isGrounded) {
        this.wolf.legCycle += 0.25;
      }

      // Spawn Obstacles (Obsidian Spires)
      if (this.frame - this.lastObstacleFrame > Math.max(65, 130 - (this.speed * 4))) {
        if (Math.random() < 0.65) {
          const height = Math.floor(Math.random() * 32) + 38; // 38px to 70px tall
          this.obstacles.push({
            x: 820,
            y: this.groundY - height,
            width: 22,
            height: height
          });
          this.lastObstacleFrame = this.frame;
        }
      }

      // Spawn Energy Crystals
      if (this.frame - this.lastEnergyFrame > 140) {
        if (Math.random() < 0.5) {
          this.energies.push({
            x: 820,
            y: this.groundY - 70 - Math.random() * 50,
            radius: 8,
            collected: false
          });
          this.lastEnergyFrame = this.frame;
        }
      }

      // Move Obstacles
      for (let i = this.obstacles.length - 1; i >= 0; i--) {
        const obs = this.obstacles[i];
        obs.x -= this.speed;

        // Collision Check (AABB with slight forgiveness margin)
        const hitMargin = 6;
        if (
          this.wolf.x + hitMargin < obs.x + obs.width &&
          this.wolf.x + this.wolf.width - hitMargin > obs.x &&
          this.wolf.y + hitMargin < obs.y + obs.height &&
          this.wolf.y + this.wolf.height - hitMargin > obs.y
        ) {
          this.endGame();
          return;
        }

        if (obs.x + obs.width < -50) {
          this.obstacles.splice(i, 1);
        }
      }

      // Move Energy Crystals
      for (let i = this.energies.length - 1; i >= 0; i--) {
        const orb = this.energies[i];
        orb.x -= this.speed;

        // Collect Check
        const dist = Math.hypot(
          (this.wolf.x + this.wolf.width / 2) - orb.x,
          (this.wolf.y + this.wolf.height / 2) - orb.y
        );
        if (dist < 32 && !orb.collected) {
          orb.collected = true;
          this.energyCollected += 1;
          this.score += 50;

          // Energy explosion particles
          for (let p = 0; p < 12; p++) {
            this.particles.push({
              x: orb.x,
              y: orb.y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              color: '#38bdf8',
              radius: Math.random() * 3 + 1,
              alpha: 1
            });
          }
          this.energies.splice(i, 1);
        } else if (orb.x < -30) {
          this.energies.splice(i, 1);
        }
      }

      // Update Particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.04;
        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
        }
      }
    },

    draw() {
      const { ctx, canvas } = this;
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Dark Nocturnal Gradient Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, '#06040d');
      skyGrad.addColorStop(0.7, '#110a26');
      skyGrad.addColorStop(1, '#180e35');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Distant Glowing Moon
      ctx.save();
      ctx.beginPath();
      ctx.arc(680, 70, 36, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(233, 213, 255, 0.9)';
      ctx.shadowColor = 'rgba(192, 132, 252, 0.6)';
      ctx.shadowBlur = 28;
      ctx.fill();
      ctx.restore();

      // 3. Ground Line & Neon Horizon
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, this.groundY);
      ctx.lineTo(canvas.width, this.groundY);
      ctx.stroke();

      // Ground grid lines moving left
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.25)';
      ctx.lineWidth = 1;
      const gridSpacing = 40;
      const offset = (this.frame * this.speed) % gridSpacing;
      for (let x = -offset; x < canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, this.groundY);
        ctx.lineTo(x - 20, canvas.height);
        ctx.stroke();
      }

      // 4. Draw Obstacles (Charcoal Ridge Spires)
      for (const obs of this.obstacles) {
        ctx.save();
        ctx.fillStyle = '#141d18';
        ctx.strokeStyle = '#b88f4c';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'rgba(184, 143, 76, 0.45)';
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.moveTo(obs.x + obs.width / 2, obs.y);
        ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
        ctx.lineTo(obs.x, obs.y + obs.height);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // 5. Draw Energy Crystals (Floating Bronze Diamonds)
      for (const orb of this.energies) {
        ctx.save();
        const floatY = orb.y + Math.sin(this.frame * 0.1) * 4;
        ctx.fillStyle = '#d6af68';
        ctx.shadowColor = '#d6af68';
        ctx.shadowBlur = 15;

        ctx.beginPath();
        ctx.moveTo(orb.x, floatY - orb.radius);
        ctx.lineTo(orb.x + orb.radius, floatY);
        ctx.lineTo(orb.x, floatY + orb.radius);
        ctx.lineTo(orb.x - orb.radius, floatY);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 6. Draw The HAVEN Wolf Mascot Silhouette
      this.drawWolf(this.wolf.x, this.wolf.y);

      // 7. Draw Particles
      for (const p of this.particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    },

    drawWolf(x, y) {
      const { ctx } = this;
      ctx.save();

      // Shadow / Aura
      ctx.shadowColor = 'rgba(192, 132, 252, 0.4)';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#f8fafc'; // Crisp bright cyber wolf silhouette

      // Torso & Body
      ctx.beginPath();
      ctx.ellipse(x + 24, y + 20, 20, 11, 0, 0, Math.PI * 2);
      ctx.fill();

      // Chest & Neck
      ctx.beginPath();
      ctx.moveTo(x + 28, y + 12);
      ctx.lineTo(x + 42, y + 6);
      ctx.lineTo(x + 36, y + 24);
      ctx.closePath();
      ctx.fill();

      // Head & Snout
      ctx.beginPath();
      ctx.moveTo(x + 38, y + 6);
      ctx.lineTo(x + 52, y + 10); // Snout tip
      ctx.lineTo(x + 44, y + 15);
      ctx.lineTo(x + 40, y + 14);
      ctx.closePath();
      ctx.fill();

      // Pointed Wolf Ears
      ctx.beginPath();
      ctx.moveTo(x + 37, y + 7);
      ctx.lineTo(x + 39, y - 2); // Ear tip
      ctx.lineTo(x + 43, y + 5);
      ctx.closePath();
      ctx.fill();

      // Glowing Bronze Wolf Eye
      ctx.fillStyle = '#d6af68';
      ctx.beginPath();
      ctx.arc(x + 43, y + 8, 2, 0, Math.PI * 2);
      ctx.fill();

      // Bushy Tail
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(x + 8, y + 16);
      ctx.quadraticCurveTo(x - 12, y + 10, x - 6, y + 24);
      ctx.closePath();
      ctx.fill();

      // Animated Galloping Legs
      const legSin = Math.sin(this.wolf.legCycle);
      const legCos = Math.cos(this.wolf.legCycle);

      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#f8fafc';
      ctx.lineCap = 'round';

      // Front Leg 1
      ctx.beginPath();
      ctx.moveTo(x + 34, y + 24);
      ctx.lineTo(x + 38 + (this.wolf.isGrounded ? legSin * 8 : -4), y + 36);
      ctx.stroke();

      // Front Leg 2
      ctx.beginPath();
      ctx.moveTo(x + 30, y + 24);
      ctx.lineTo(x + 30 - (this.wolf.isGrounded ? legSin * 8 : 4), y + 36);
      ctx.stroke();

      // Back Leg 1
      ctx.beginPath();
      ctx.moveTo(x + 14, y + 24);
      ctx.lineTo(x + 18 + (this.wolf.isGrounded ? legCos * 9 : -8), y + 36);
      ctx.stroke();

      // Back Leg 2
      ctx.beginPath();
      ctx.moveTo(x + 10, y + 24);
      ctx.lineTo(x + 8 - (this.wolf.isGrounded ? legCos * 9 : 8), y + 36);
      ctx.stroke();

      ctx.restore();
    },

    endGame() {
      this.gameOver = true;
      this.destroy();

      this.saveHighScore(this.score);

      const overlay = document.getElementById('wolf-over-overlay');
      const finalScore = document.getElementById('wolf-final-score');
      if (finalScore) {
        finalScore.textContent = `Score: ${this.score} • Energy Orbs: ${this.energyCollected}`;
      }
      if (overlay) {
        overlay.classList.remove('hidden');
      }
    },

    destroy() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      if (this._keyHandler) {
        window.removeEventListener('keydown', this._keyHandler);
      }
      if (this._visHandler) {
        document.removeEventListener('visibilitychange', this._visHandler);
      }
    }
  };

  /* ==========================================================================
     DIGITAL EXPERIMENTS RUNTIMES
     ========================================================================== */
  const Experiments = {
    init() {
      this.initGradientLab();
      this.initCursorLight();
      this.initParticlePlayground();
      this.initRandomColorLab();
      this.initDigitalClock();
    },

    // 1. Gradient Lab
    initGradientLab() {
      const box = document.getElementById('exp-grad-box');
      const angleSlider = document.getElementById('exp-grad-angle');
      const angleVal = document.getElementById('exp-grad-angle-val');
      const randBtn = document.getElementById('exp-grad-rand');
      const copyBtn = document.getElementById('exp-grad-copy');

      if (!box || !angleSlider) return;

      const palettes = [
        ['#0e1411', '#1f3327', '#b88f4c'],
        ['#141d18', '#3e5a49', '#d6af68'],
        ['#0e1411', '#16221b', '#f4efe6'],
        ['#121814', '#2d4436', '#c99e57'],
        ['#151f19', '#375240', '#e2c589']
      ];
      let currentPalette = palettes[0];

      const apply = () => {
        const deg = angleSlider.value;
        if (angleVal) angleVal.textContent = deg + '°';
        const css = `linear-gradient(${deg}deg, ${currentPalette[0]} 0%, ${currentPalette[1]} 50%, ${currentPalette[2]} 100%)`;
        box.style.background = css;
        box.dataset.css = `background: ${css};`;
      };

      angleSlider.addEventListener('input', apply);

      if (randBtn) {
        randBtn.addEventListener('click', () => {
          currentPalette = palettes[Math.floor(Math.random() * palettes.length)];
          angleSlider.value = Math.floor(Math.random() * 360);
          apply();
        });
      }

      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const text = box.dataset.css || box.style.background;
          navigator.clipboard.writeText(text).then(() => {
            showToast('CSS Gradient Copied!');
          });
        });
      }
      apply();
    },

    // 2. Cursor Light
    initCursorLight() {
      const box = document.getElementById('exp-cursor-box');
      const orb = document.getElementById('exp-cursor-orb');
      if (!box || !orb) return;

      box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        orb.style.left = `${x}px`;
        orb.style.top = `${y}px`;
        orb.style.opacity = '1';
      });

      box.addEventListener('mouseleave', () => {
        orb.style.opacity = '0';
      });
    },

    // 3. Particle Playground (Ultra-lightweight)
    initParticlePlayground() {
      const canvas = document.getElementById('particle-canvas');
      const slider = document.getElementById('exp-particle-slider');
      const countLbl = document.getElementById('exp-particle-count');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      let particles = [];
      let maxCount = parseInt(slider ? slider.value : '30', 10);
      let animId = null;

      function resize() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight || 160;
      }
      resize();
      window.addEventListener('resize', resize, { passive: true });

      function spawnParticles(num) {
        particles = [];
        for (let i = 0; i < num; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.9,
            vy: (Math.random() - 0.5) * 0.9,
            radius: Math.random() * 2 + 1,
            color: Math.random() < 0.6 ? '#c084fc' : '#38bdf8'
          });
        }
      }
      spawnParticles(maxCount);

      if (slider) {
        slider.addEventListener('input', (e) => {
          maxCount = parseInt(e.target.value, 10);
          if (countLbl) countLbl.textContent = maxCount;
          spawnParticles(maxCount);
        });
      }

      function draw() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          // Connect close particles with light lines
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 60) {
              ctx.strokeStyle = `rgba(168, 85, 247, ${1 - dist / 60})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
        animId = requestAnimationFrame(draw);
      }
      draw();
    },

    // 4. Random Color Lab
    initRandomColorLab() {
      const container = document.getElementById('exp-color-grid');
      const genBtn = document.getElementById('exp-color-gen');
      if (!container) return;

      const randomCyberColor = () => {
        const h = Math.floor(Math.random() * 60) + 240; // Violet/Indigo/Purple/Pink hues
        const s = Math.floor(Math.random() * 40) + 60;
        const l = Math.floor(Math.random() * 35) + 20;
        return hslToHex(h, s, l);
      };

      function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
          const k = (n + h / 30) % 12;
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
      }

      function generatePalette() {
        container.innerHTML = '';
        for (let i = 0; i < 5; i++) {
          const hex = randomCyberColor();
          const item = document.createElement('div');
          item.className = 'color-swatch-item';
          item.style.backgroundColor = hex;
          item.innerHTML = `<span class="color-swatch-val">${hex.toUpperCase()}</span>`;
          item.addEventListener('click', () => {
            navigator.clipboard.writeText(hex.toUpperCase()).then(() => {
              showToast(`Copied ${hex.toUpperCase()}!`);
            });
          });
          container.appendChild(item);
        }
      }

      if (genBtn) {
        genBtn.addEventListener('click', generatePalette);
      }
      generatePalette();
    },

    // 5. Digital Clock
    initDigitalClock() {
      const timeEl = document.getElementById('exp-clock-time');
      const msEl = document.getElementById('exp-clock-ms');
      const dateEl = document.getElementById('exp-clock-date');
      if (!timeEl) return;

      function tick() {
        const now = new Date();
        const hrs = now.getHours().toString().padStart(2, '0');
        const mins = now.getMinutes().toString().padStart(2, '0');
        const secs = now.getSeconds().toString().padStart(2, '0');
        const ms = Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0');

        timeEl.textContent = `${hrs}:${mins}:${secs}`;
        if (msEl) msEl.textContent = `.${ms}`;
        if (dateEl) {
          dateEl.textContent = now.toLocaleDateString(undefined, {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) + ' • UTC' + (now.getTimezoneOffset() <= 0 ? '+' : '-') + Math.abs(now.getTimezoneOffset() / 60);
        }
        requestAnimationFrame(tick);
      }
      tick();
    }
  };

  // Filter Tabs logic on play.html
  function initFilterTabs() {
    const tabs = document.querySelectorAll('.play-tab-btn');
    const cards = document.querySelectorAll('.game-card');
    if (!tabs.length || !cards.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category.includes(filter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Initialize
  function initPlayPage() {
    GameModal.init();
    Experiments.init();
    initFilterTabs();

    // Hook card action buttons
    document.querySelectorAll('.game-card-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const gameKey = btn.dataset.game;
        if (gameKey) {
          GameModal.open(gameKey);
        }
      });
    });

    // Check URL query parameters: e.g. ?game=wolfrun or ?game=ttt
    const params = new URLSearchParams(window.location.search);
    const directGame = params.get('game');
    if (directGame && ['ttt', 'rps', 'memory', 'reaction', 'wolfrun'].includes(directGame)) {
      setTimeout(() => GameModal.open(directGame), 300);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayPage);
  } else {
    initPlayPage();
  }
})();
