import { Board, EmojiPlacement, Player, WinInfo } from '../types/gameTypes';

// Check if there's a winning combination on the board
export const checkWinner = (board: Board): WinInfo | null => {
  const winPatterns = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6]  // diagonal top-right to bottom-left
  ];

  // Check each winning pattern
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    
    // All cells in pattern must be filled
    if (board[a] && board[b] && board[c]) {
      // All cells must belong to the same player
      if (
        board[a]!.playerId !== null &&
        board[a]!.playerId === board[b]!.playerId &&
        board[a]!.playerId === board[c]!.playerId
      ) {
        return {
          playerId: board[a]!.playerId!,
          positions: pattern
        };
      }
    }
  }

  return null;
};

export const placeEmoji = (
  board: Board,
  player: Player,
  emoji: string,
  position: number
): {
  updatedBoard: Board,
  updatedPlayer: Player,
  removedPosition: number | null
} => {
  const updatedBoard = [...board];

  const newPlacement: EmojiPlacement = {
    emoji,
    position,
    timestamp: Date.now()
  };

  let updatedPlayer: Player;
  let removedPosition: number | null = null;

  if (player.emojis.length >= 3) {
    // Vanishing rule: remove oldest emoji
    const sortedEmojis = [...player.emojis].sort((a, b) => a.timestamp - b.timestamp);
    const oldestEmoji = sortedEmojis[0];

    updatedBoard[oldestEmoji.position] = null;
    removedPosition = oldestEmoji.position;

    updatedPlayer = {
      ...player,
      emojis: player.emojis
        .filter(e => e.position !== oldestEmoji.position)
        .concat(newPlacement)
    };
  } else {
    updatedPlayer = {
      ...player,
      emojis: [...player.emojis, newPlacement]
    };
  }

  updatedBoard[position] = {
    emoji,
    playerId: player.id
  };

  return {
    updatedBoard,
    updatedPlayer,
    removedPosition
  };
};


// Initialize an empty board
export const initializeBoard = (): Board => {
  return Array(9).fill(null);
};

// Initialize players
export const initializePlayers = (): Player[] => {
  return [
    {
      id: 1,
      name: 'Player 1',
      category: null,
      emojis: [],
      score: 0
    },
    {
      id: 2,
      name: 'Player 2',
      category: null,
      emojis: [],
      score: 0
    }
  ];
};

// Reset the game state for a new round
export const resetGameState = (players: Player[]): {
  board: Board,
  updatedPlayers: Player[]
} => {
  const updatedPlayers = players.map(player => ({
    ...player,
    emojis: []
  }));
  
  return {
    board: initializeBoard(),
    updatedPlayers
  };
};