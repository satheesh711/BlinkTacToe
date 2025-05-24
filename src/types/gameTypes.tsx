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

