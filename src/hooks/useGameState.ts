import { useState } from 'react';
import { 
  Player, 
  GameStatus, 
} from '../types/gameTypes';
import { 
  initializePlayers, 
} from '../utils/gameLogic';
import { EmojiCategory} from '../constants/emojiCategories';

export const useGameState = () => {
  // Game state
  const [players, setPlayers] = useState<Player[]>(initializePlayers());
  const [gameStatus, setGameStatus] = useState<GameStatus>('category-selection');

 

 

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
    handleCategorySelect,
    startGame,
  };
};