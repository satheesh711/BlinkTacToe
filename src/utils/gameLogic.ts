import {  Board, Player } from '../types/gameTypes'


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

// Initialize an empty board
export const initializeBoard = (): Board => {
  return Array(9).fill(null);
};

