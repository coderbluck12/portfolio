"use client";
import { useState, useEffect, useContext } from "react";
import { GameContainerContext } from "../../game-container";
import { RotateCcw, User, Bot, Trophy } from "lucide-react";

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = (board) => {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: "Draw", combo: null };
  }
  return null;
};

// AI Move Selector (Smart Defensive & Winning AI)
const getBestAIMove = (board) => {
  // 1. Check if AI ('O') can win in this move
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const copy = [...board];
      copy[i] = "O";
      const result = checkWinner(copy);
      if (result && result.winner === "O") return i;
    }
  }

  // 2. Check if Player ('X') is about to win and block them
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const copy = [...board];
      copy[i] = "X";
      const result = checkWinner(copy);
      if (result && result.winner === "X") return i;
    }
  }

  // 3. Take center if available
  if (!board[4]) return 4;

  // 4. Take available corners
  const corners = [0, 2, 6, 8].filter((idx) => !board[idx]);
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  // 5. Take any remaining empty cell
  const emptyCells = board.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null);
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

const TicTokToe = () => {
  const { setInfo } = useContext(GameContainerContext) || {};
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameState, setGameState] = useState("playing"); // 'playing' | 'won' | 'draw'
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [scores, setScores] = useState({ player: 0, computer: 0, draws: 0 });

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameState("playing");
    setWinnerInfo(null);
    if (setInfo) setInfo("Your Turn (X)");
  };

  // Player Click Handler
  const handleCellClick = (index) => {
    if (board[index] || !isPlayerTurn || gameState !== "playing") return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    const winResult = checkWinner(newBoard);
    if (winResult) {
      handleGameOver(winResult);
    } else {
      setIsPlayerTurn(false);
      if (setInfo) setInfo("Computer's Turn (O)...");
    }
  };

  // Computer AI Turn Effect
  useEffect(() => {
    if (!isPlayerTurn && gameState === "playing") {
      const timer = setTimeout(() => {
        const aiMove = getBestAIMove(board);
        if (aiMove !== undefined && aiMove !== null) {
          const newBoard = [...board];
          newBoard[aiMove] = "O";
          setBoard(newBoard);

          const winResult = checkWinner(newBoard);
          if (winResult) {
            handleGameOver(winResult);
          } else {
            setIsPlayerTurn(true);
            if (setInfo) setInfo("Your Turn (X)");
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, gameState]);

  const handleGameOver = (result) => {
    setGameState("finished");
    setWinnerInfo(result);
    if (result.winner === "X") {
      if (setInfo) setInfo("You Won! 🎉");
      setScores((s) => ({ ...s, player: s.player + 1 }));
    } else if (result.winner === "O") {
      if (setInfo) setInfo("Computer Won! 🤖");
      setScores((s) => ({ ...s, computer: s.computer + 1 }));
    } else {
      if (setInfo) setInfo("It's a Draw! 🤝");
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4">
      {/* Scoreboard */}
      <div className="flex items-center justify-between w-full max-w-xs px-4 py-2 text-sm border rounded-lg border-primary/20 bg-black/40">
        <div className="flex items-center gap-1.5 text-primary">
          <User size={16} />
          <span className="font-medium">You (X):</span>
          <span className="font-bold">{scores.player}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <Bot size={16} className="text-cyan-400" />
          <span className="font-medium">CPU (O):</span>
          <span className="font-bold text-cyan-400">{scores.computer}</span>
        </div>
        <button
          onClick={resetGame}
          className="flex items-center gap-1 px-2 py-1 text-xs border rounded-md border-primary text-primary hover:bg-primary hover:text-black duration-150"
          title="Reset Game"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Turn & Status Indicator */}
      <div className="text-center">
        {gameState === "playing" ? (
          <p className="text-sm font-semibold text-slate-300">
            {isPlayerTurn ? (
              <span className="text-primary">Your Turn (X)</span>
            ) : (
              <span className="text-cyan-400 animate-pulse">Computer Thinking (O)...</span>
            )}
          </p>
        ) : (
          <div className="flex items-center justify-center gap-2 text-base font-bold text-primary animate-bounce">
            <Trophy size={18} />
            <span>
              {winnerInfo?.winner === "X"
                ? "You Won!"
                : winnerInfo?.winner === "O"
                ? "Computer Won!"
                : "It's a Draw!"}
            </span>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-2.5 w-full max-w-xs p-3 border rounded-xl border-white/10 bg-white/[0.02]">
        {board.map((cell, idx) => {
          const isWinningCell = winnerInfo?.combo?.includes(idx);
          return (
            <div
              key={idx}
              onClick={() => handleCellClick(idx)}
              className={`h-24 flex items-center justify-center text-4xl font-extrabold rounded-lg cursor-pointer transition-all duration-200 select-none border ${
                isWinningCell
                  ? "bg-primary/20 border-primary text-primary scale-105"
                  : cell === "X"
                  ? "bg-primary/10 border-primary/40 text-primary"
                  : cell === "O"
                  ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-transparent"
              }`}
            >
              {cell === "X" ? "✕" : cell === "O" ? "◯" : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicTokToe;
