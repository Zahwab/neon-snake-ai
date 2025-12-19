import React, { useEffect } from 'react';
import GameCanvas from './components/GameCanvas';
import { useGameLogic } from './hooks/useGameLogic';
import './styles/crt.css';

function App() {
  const {
    snake,
    food,
    direction,
    score,
    status,
    aiMode,
    setAiMode,
    resetGame,
    aiPath
  } = useGameLogic();

  // Global restart listen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && status === 'GAMEOVER') {
        resetGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, resetGame]);

  return (
    <div className="crt-container">
      <div className="scanlines"></div>
      <div className="flicker"></div>
      <div className="glow"></div>

      <div style={{ position: 'relative', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>

        {/* Header HUD */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: '20px', marginBottom: '10px', fontSize: '1.2rem', textShadow: '0 0 5px #33ff33' }}>
          <span>NEON SNAKE AI</span>
          <span>SCORE: {score.toString().padStart(4, '0')}</span>
        </div>

        {/* Game View */}
        <GameCanvas
          snake={snake}
          food={food}
          aiPath={aiPath}
          aiMode={aiMode}
          status={status}
        />

        {/* Controls HUD */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ marginRight: '20px' }}>STATUS: {aiMode ? 'AUTOPILOT' : 'MANUAL'}</span>
            <button
              onClick={() => setAiMode(!aiMode)}
              style={{
                background: 'transparent',
                border: '1px solid #33ff33',
                color: '#33ff33',
                padding: '5px 10px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: aiMode ? 'inset 0 0 10px #33ff33' : 'none'
              }}
            >
              TOGGLE AI (SPACE)
            </button>
          </div>

          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            ARROWS to Move • SPACE to Toggle AI (in-game)
          </div>
          <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '5px' }}>
            PATHFINDING: BFS ALGORITHM
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
