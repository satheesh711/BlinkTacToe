import GameRules from './components/GameRules'

function App() {

  return (
    <div className="app min-vh-100 d-flex flex-column">
      <GameRules />
      <header className="py-4 bg-dark text-white text-center">
        <h1 className="mb-0">Blink Tac Toe</h1>
        <p className="lead mb-0">A twist on the classic with vanishing emojis</p>
      </header>
      <main className="flex-grow-1 py-4">
       
      </main>
    </div>
  )
}

export default App
