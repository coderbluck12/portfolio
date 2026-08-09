"use client";
import { useState, useEffect } from "react";
import { RotateCcw, Trophy } from "lucide-react";

const EMOJIS = ["⚡", "🚀", "💎", "🎮", "🎨", "🔮", "🌟", "🏎️"];

const createShuffledDeck = () => {
  const deck = [...EMOJIS, ...EMOJIS].map((emoji, idx) => ({
    id: idx,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));
  return deck.sort(() => Math.random() - 0.5);
};

const Memorium = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const initGame = () => {
    setCards(createShuffledDeck());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
    setIsChecking(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index) => {
    if (isChecking) return;
    const clickedCard = cards[index];
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsChecking(true);
      const [firstIdx, secondIdx] = newFlipped;

      if (newCards[firstIdx].emoji === newCards[secondIdx].emoji) {
        newCards[firstIdx].isMatched = true;
        newCards[secondIdx].isMatched = true;
        setCards(newCards);
        setMatches((m) => {
          const updatedMatches = m + 1;
          if (updatedMatches === EMOJIS.length) {
            setIsWon(true);
          }
          return updatedMatches;
        });
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4">
      <div className="flex items-center justify-between w-full max-w-sm px-4 py-2 text-sm border rounded-lg border-primary/20 bg-black/40">
        <div>
          <span>Moves: </span>
          <span className="font-bold text-primary">{moves}</span>
        </div>
        <div>
          <span>Matches: </span>
          <span className="font-bold text-primary">
            {matches} / {EMOJIS.length}
          </span>
        </div>
        <button
          onClick={initGame}
          className="flex items-center gap-1 px-2 py-1 text-xs border rounded-md border-primary text-primary hover:bg-primary hover:text-black duration-150"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {isWon && (
        <div className="flex flex-col items-center justify-center p-4 text-center border rounded-lg border-primary bg-primary/10 animate-bounce">
          <Trophy className="w-10 h-10 mb-2 text-primary" />
          <h3 className="text-xl font-bold text-primary">Congratulations! You Won!</h3>
          <p className="text-sm opacity-80">Completed in {moves} moves.</p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => handleCardClick(idx)}
            className={`h-20 flex items-center justify-center text-2xl font-bold rounded-lg cursor-pointer transition-all duration-300 select-none border ${
              card.isMatched
                ? "bg-primary/20 border-primary text-white"
                : card.isFlipped
                ? "bg-primary text-black border-primary scale-105"
                : "bg-white/10 border-white/20 hover:bg-white/20 text-transparent"
            }`}
          >
            {card.isFlipped || card.isMatched ? card.emoji : "❓"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memorium;
