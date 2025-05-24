import { Container, Button } from 'react-bootstrap';
import { useGameState } from './hooks/useGameState';
import { emojiCategories } from './constants/emojiCategories';
import CategorySelection from './components/CategorySelection';
import Board from './components/Board';
import PlayerTurn from './components/PlayerTurn';
import WinNotification from './components/WinNotification';
import GameRules from './components/GameRules';
import { RefreshCw } from 'lucide-react';

function App() {
  const {
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
  } = useGameState();

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
                <Button 
                  variant="outline-secondary" 
                  onClick={startNewGame}
                  className="d-flex align-items-center"
                >
                  <RefreshCw size={16} className="me-1" />
                  New Game
                </Button>
              </div>
              
              <PlayerTurn 
                players={players}
                currentPlayerId={currentPlayerId}
                currentEmoji={currentEmoji}
              />
              
              <Board 
                board={board}
                winningPositions={winInfo ? winInfo.positions : []}
                latestMovePosition={latestMovePosition}
                onCellClick={handleCellClick}
              />
              
              {gameStatus === 'win' && winInfo && (
                <WinNotification 
                  winner={players.find(p => p.id === winInfo.playerId)!}
                  onPlayAgain={resetGame}
                />
              )}
            </>
          )}
        </Container>
      </main>
      
       
    </div>
  );
}

export default App;