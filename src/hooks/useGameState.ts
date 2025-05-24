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
  checkWinner, 
  placeEmoji, 
  resetGameState 
} from '../utils/gameLogic';
import { EmojiCategory, getRandomEmoji } from '../constants/emojiCategories';

export const useGameState = () => {
  // Game state
  const [board, setBoard] = useState<Board>(initializeBoard());
  const [players, setPlayers] = useState<Player[]>(initializePlayers());
  const [currentPlayerId, setCurrentPlayerId] = useState<number>(1);
  const [gameStatus, setGameStatus] = useState<GameStatus>('category-selection');
  const [winInfo, setWinInfo] = useState<WinInfo | null>(null);
  const [currentEmoji, setCurrentEmoji] = useState<string>('');
  const [latestMovePosition, setLatestMovePosition] = useState<number | null>(null);

  // Get current player
  const getCurrentPlayer = (): Player => {
    return players.find(player => player.id === currentPlayerId)!;
  };

  // Get player by ID
  const getPlayerById = (id: number): Player => {
    return players.find(player => player.id === id)!;
  };

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
    generateRandomEmoji();
  };

  // Generate a random emoji for the current player
  const generateRandomEmoji = () => {
    const player = getCurrentPlayer();
    if (player.category) {
      let emoji: string;
      while(true){
      emoji = getRandomEmoji(player.category);
      if (!player.emojis.some(e => e.emoji === emoji)) {
        break;
      }
    }
      setCurrentEmoji(emoji);
  };
}

  // Handle cell click during gameplay
  const handleCellClick = (position: number) => {
    if (gameStatus !== 'playing' || board[position] !== null) {
      return;
    }

    const currentPlayer = getCurrentPlayer();
    
    // Check if the player is trying to place on a cell that just had their own emoji removed
    if (currentPlayer.emojis.length >= 3) {
      const sortedEmojis = [...currentPlayer.emojis].sort((a, b) => a.timestamp - b.timestamp);
      const oldestEmojiPosition = sortedEmojis[0].position;
      
      // If trying to place on the same position as the oldest emoji, prevent it
      if (position === oldestEmojiPosition) {
        return;
      }
    }
    
    // Place the emoji on the board
    const { updatedBoard, updatedPlayer} = placeEmoji(
      board,
      currentPlayer,
      currentEmoji,
      position
    );
    
    // Update the game state
    setBoard(updatedBoard);
    setLatestMovePosition(position);
    
    // Update the player's emojis
    const updatedPlayers = players.map(player => 
      player.id === currentPlayer.id ? updatedPlayer : player
    );
    setPlayers(updatedPlayers);
    
    // Check for a winner
    const winner = checkWinner(updatedBoard );
    if (winner) {
      handleWin(winner);
    } else {
      // Switch to the next player
      switchPlayer();
    }
  };

  // Switch to the next player
  const switchPlayer = () => {
    const nextPlayerId = currentPlayerId === 1 ? 2 : 1;
    setCurrentPlayerId(nextPlayerId);
    
    // Generate a new random emoji for the next player
    setTimeout(() => {
      const nextPlayer = getPlayerById(nextPlayerId);
      if (nextPlayer.category) {
        const emoji = getRandomEmoji(nextPlayer.category);
        setCurrentEmoji(emoji);
      }
    }, 100);
  };

  // Handle win condition
  const handleWin = (winner: WinInfo) => {
    setWinInfo(winner);
    setGameStatus('win');
    
    // Increment the winner's score
    const updatedPlayers = players.map(player => 
      player.id === winner.playerId 
        ? { ...player, score: player.score + 1 } 
        : player
    );
    setPlayers(updatedPlayers);
  };

  // Reset the game for a new round
  const resetGame = () => {
    const { board: newBoard, updatedPlayers } = resetGameState(players);
    setBoard(newBoard);
    setPlayers(updatedPlayers);
    setCurrentPlayerId(1);
    setWinInfo(null);
    setGameStatus('playing');
    setLatestMovePosition(null);
    
    // Generate a new random emoji for the first player
    setTimeout(() => {
      const firstPlayer = getPlayerById(1);
      if (firstPlayer.category) {
        const emoji = getRandomEmoji(firstPlayer.category);
        setCurrentEmoji(emoji);
      }
    }, 100);
  };

  // Start a completely new game (reset everything including categories)
  const startNewGame = () => {
    setBoard(initializeBoard());
    setPlayers(initializePlayers());
    setCurrentPlayerId(1);
    setWinInfo(null);
    setGameStatus('category-selection');
    setLatestMovePosition(null);
    setCurrentEmoji('');
  };

  return {
    board,
    players,
    currentPlayerId,
    gameStatus,
    winInfo,
    currentEmoji,
    latestMovePosition,
    handleCategorySelect,
    startGame,
    handleCellClick,
    resetGame,
    startNewGame
  };
};