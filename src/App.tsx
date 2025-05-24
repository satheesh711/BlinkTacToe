import {  Container } from 'react-bootstrap';
import CategorySelection from './components/CategorySelection'
import GameRules from './components/GameRules'
import { emojiCategories } from './constants/emojiCategories'
import { useGameState } from './hooks/useGameState';
import Board from './components/Board';

function App() {
const {
    players,
    gameStatus,
    board,
    winInfo,
    handleCategorySelect,
    startGame,
  } = useGameState();
  const handleCellClick = (index: number) => {
    // Handle cell click logic here
    console.log(`Cell ${index} clicked`);
  };
  return (
    <div className="app min-vh-100 d-flex flex-column">
      <GameRules />
      <header className="py-4 bg-dark text-white text-center">
        <h1 className="mb-0">Blink Tac Toe</h1>
        <p className="lead mb-0">A twist on the classic with vanishing emojis</p>
      </header>
      <main className="flex-grow-1 py-4">
          <Container>
          {gameStatus === 'category-selection' ? (
            <CategorySelection
              players={players}
              categories={emojiCategories}
              onCategorySelect={handleCategorySelect}
              onStartGame={startGame}
            />
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Game Board</h2>
                 
              </div>
               <Board
                board={board}
                winningPositions={winInfo ? winInfo.positions : []}
                latestMovePosition={null}
                onCellClick={handleCellClick}
              />
            </>
          )}
        </Container>
      </main>
    </div>
  )
}

export default App
