import { useState } from 'react';
import { 
  Board, 
  Player, 
  GameStatus,
  WinInfo,
} from '../types/gameTypes';
import { 
  initializeBoard,
  initializePlayers, 
} from '../utils/gameLogic';
import { EmojiCategory} from '../constants/emojiCategories';

export const useGameState = () => {
  // Game state
  const [players, setPlayers] = useState<Player[]>(initializePlayers());
  const [gameStatus, setGameStatus] = useState<GameStatus>('category-selection');
  const [board, setBoard] = useState<Board>(initializeBoard());
  const [winInfo, setWinInfo] = useState<WinInfo | null>(null);


  // Handle category selection
  const handleCategorySelect = (playerId: number, category: EmojiCategory) => {
    const updatedPlayers = players.map(player => 
      player.id === playerId 
        ? { ...player, category } 
        : player
    );
    setPlayers(updatedPlayers);
  };

  // Start the game after category selection
  const startGame = () => {
    setGameStatus('playing');

  };
 
 
  return {
    players,
    gameStatus,
    board,
    winInfo,
    handleCategorySelect,
    startGame,
  };
};