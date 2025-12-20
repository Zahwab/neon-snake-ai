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
    highScore,
    status,
    aiMode,
    setAiMode,
    resetGame,
    aiPath,
    smartFood,
    setSmartFood
  } = useGameLogic();

  // Global restart listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.code === 'Space' || e.key === ' ') && status === 'GAMEOVER') {
        e.preventDefault();
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
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>SCORE: {score.toString().padStart(4, '0')}</span>
            <span style={{ opacity: 0.7 }}>HIGH: {highScore.toString().padStart(4, '0')}</span>
          </div>
        </div>

        {/* Status Display */}
        {status === 'IDLE' && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 200,
            fontSize: '1.5rem',
            textShadow: '0 0 10px #33ff33'
          }}>
            <div style={{ marginBottom: '20px' }}>PRESS ARROW KEYS TO START</div>
            <div style={{ fontSize: '1rem', opacity: 0.7 }}>OR SPACE TO ENABLE AI</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '10px' }}>F to Toggle Smart Food</div>
          </div>
        )}

        {/* Game View */}
        <GameCanvas
          snake={snake}
          food={food}
          aiPath={aiPath}
          aiMode={aiMode}
          status={status}
          smartFood={smartFood}
        />

        {/* Controls HUD */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ marginRight: '20px' }}>STATUS: {aiMode ? 'AUTOPILOT' : 'MANUAL'}</span>
            <button
              onClick={() => setAiMode(!aiMode)}
              disabled={status !== 'PLAYING'}
              style={{
                background: 'transparent',
                border: '1px solid #33ff33',
                color: status !== 'PLAYING' ? '#666' : '#33ff33',
                padding: '5px 10px',
                cursor: status !== 'PLAYING' ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
                boxShadow: aiMode ? 'inset 0 0 10px #33ff33' : 'none',
                opacity: status !== 'PLAYING' ? 0.5 : 1,
                marginRight: '10px'
              }}
            >
              TOGGLE AI (SPACE)
            </button>
            <button
              onClick={() => setSmartFood(!smartFood)}
              style={{
                background: 'transparent',
                border: '1px solid #ff6633',
                color: '#ff6633',
                padding: '5px 10px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: smartFood ? 'inset 0 0 10px #ff6633' : 'none'
              }}
            >
              SMART FOOD ({smartFood ? 'ON' : 'OFF'})
            </button>
          </div>

          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            ARROWS to Move • SPACE to Toggle AI • F to Toggle Smart Food • SPACE to Restart (game over)
          </div>
          <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '5px' }}>
            PATHFINDING: BFS ALGORITHM • FOOD EVASION: MANHATTAN DISTANCE
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
