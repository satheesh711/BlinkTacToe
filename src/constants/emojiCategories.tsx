export interface EmojiCategory {
  id: string;
  name: string;
  emojis: string[];
  color: string;
}

export const emojiCategories: EmojiCategory[] = [
  {
    id: 'animals',
    name: 'Animals',
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
    color: '#8A2BE2' // Purple
  },
  {
    id: 'food',
    name: 'Food',
    emojis: ['🍕', '🍔', '🍟', '🌭', '🍿', '🍩', '🍦', '🍓'],
    color: '#FF69B4' // Pink
  },
  {
    id: 'sports',
    name: 'Sports',
    emojis: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱'],
    color: '#FFD700' // Gold
  },
  {
    id: 'travel',
    name: 'Travel',
    emojis: ['✈️', '🚗', '🚂', '🚢', '🚁', '🏖️', '🗽', '🗼'],
    color: '#00CED1' // Turquoise
  },
  {
    id: 'weather',
    name: 'Weather',
    emojis: ['☀️', '🌙', '⭐', '☁️', '🌈', '⚡', '❄️', '🌊'],
    color: '#FF8C00' // Dark Orange
  }
];

export const getRandomEmoji = (category: EmojiCategory): string => {
  const randomIndex = Math.floor(Math.random() * category.emojis.length);
  return category.emojis[randomIndex];
};
