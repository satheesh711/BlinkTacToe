import { EmojiCategory } from '../constants/emojiCategories';

export interface Player {
  id: number;
  name: string;
  category: EmojiCategory | null;
  emojis: EmojiPlacement[];
  score: number;
}

export interface EmojiPlacement {
  emoji: string;
  position: number;
  timestamp: number;
}

export type GameStatus = 'category-selection' | 'playing' | 'win';

export type BoardCell = {
  emoji: string;
  playerId: number | null;
} | null;

export type Board = BoardCell[];

export interface WinInfo {
  playerId: number;
  positions: number[];
}