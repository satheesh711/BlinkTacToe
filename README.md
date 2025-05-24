# ✨ Blink Tac Toe

Blink Tac Toe is a fun twist on the classic Tic Tac Toe game with vanishing emojis! Built using React and TypeScript, it features modern UI components, category-based emoji selection, and a fresh competitive experience.

## 🎮 Game Features

- 😄 Emoji category selection by each player
- ⏳ Emojis disappear after a short time, adding a memory challenge
- 🧠 Dynamic and responsive game board
- 👥 Two-player mode
- 🏆 Winning highlight and scoring
- 🔁 New game and reset options
- 📱 Mobile-friendly interface using React-Bootstrap

## 🧱 Tech Stack

- React + TypeScript
- React Bootstrap
- Custom game state logic using React Hooks
- Modular and scalable component design

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/blink-tac-toe.git
   cd blink-tac-toe
src/
├── components/
│   ├── Board.tsx
|   ├── CategoryCard.tsx
|   ├── CategorySelection.tsx
|   ├── Cell.tsx
│   ├── PlayerTurn.tsx
│   ├── WinNotification.tsx
│   └── GameRules.tsx
├── constants
|   ├──emojiCategories.tsx
├── hooks/
│   └── useGameState.ts
├── constants/
│   └── emojiCategories.ts
├── utils/
│   └── gameLogic.ts
|── types/
|   └── gameTypes.tsx
├── App.tsx
└── main.tsx
