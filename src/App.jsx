import React from 'react';
import GameCanvas from './components/GameCanvas';
import MobileControls from './components/MobileControls';
import { useGameLogic } from './hooks/useGameLogic';
import './styles/crt.css';

function App() {
  const {
    snake,
    food,

    score,
    highScore,
    status,
    aiMode,
    setAiMode,
    aiPath,
    smartFood,
    setSmartFood,
    handleDirection // Helper for mobile controls
  } = useGameLogic();



  // Handle D-Pad / Button clicks for mobile
  const onMobileDirection = (newDir) => {
    handleDirection(newDir);
  };

  return (
    <div className="crt-container">
      <div className="scanlines"></div>
      <div className="flicker"></div>
      <div className="glow"></div>

      <div className="game-content">

        {/* Header HUD */}
        <div className="hud-header">
          <span>NEON SNAKE AI</span>
          <div className="score-board">
            <span>SCORE: {score.toString().padStart(4, '0')}</span>
            <span style={{ opacity: 0.7 }}>HIGH: {highScore.toString().padStart(4, '0')}</span>
          </div>
        </div>

        {/* Status Display */}
        {(status === 'IDLE' || status === 'GAMEOVER') && (
          <div className="status-overlay">
            {status === 'IDLE' && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <span className="desktop-only">PRESS ARROW KEYS OR SPACE TO START</span>
                  <span className="mobile-only">TAP ARROWS TO START</span>
                </div>
                <div className="desktop-only" style={{ fontSize: '1rem', opacity: 0.7 }}>OR SPACE TO ENABLE AI</div>
                <div className="desktop-only" style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '10px' }}>F to Toggle Smart Food</div>
              </>
            )}
            {status === 'GAMEOVER' && (
              <>
                <div style={{ color: '#ff3333', fontSize: '2rem', marginBottom: '10px', textShadow: '0 0 10px #ff3333' }}>GAME OVER</div>
                <div className="desktop-only" style={{ fontSize: '1rem', marginBottom: '20px' }}>Press Arrow Keys to Restart</div>
                <div className="mobile-only" style={{ fontSize: '1rem', marginBottom: '10px' }}>Tap Arrow to Restart</div>
              </>
            )}
          </div>
        )}

        {/* Game View */}
        <div className="game-area-wrapper">
          <GameCanvas
            snake={snake}
            food={food}
            aiPath={aiPath}
            aiMode={aiMode}
            status={status}
            smartFood={smartFood}
          />
        </div>

        {/* Controls HUD */}
        <div className="hud-controls">

          {/* Desktop/Tablet Buttons */}
          <div className="control-buttons-row">
            <span style={{ marginRight: '10px', fontSize: '1rem', alignSelf: 'center' }}>
              STATUS: {aiMode ? 'AUTOPILOT' : 'MANUAL'}
            </span>

            <button
              className={`hud-btn ${aiMode ? 'active' : ''}`}
              onClick={() => setAiMode(!aiMode)}
              disabled={status !== 'PLAYING'}
            >
              TOGGLE AI <span className="desktop-only">(SPACE)</span>
            </button>

            <button
              className={`hud-btn secondary ${smartFood ? 'active' : ''}`}
              onClick={() => setSmartFood(!smartFood)}
            >
              SMART FOOD ({smartFood ? 'ON' : 'OFF'})
            </button>
          </div>

          <div className="instructions">
            <span className="desktop-only">ARROWS to Move • SPACE to Toggle AI • F to Toggle Smart Food</span>
            <span className="mobile-only">Tap Arrows to Move • Tap Toggle AI • Tap Smart Food</span>
          </div>



          {/* Mobile D-Pad (only visible on small screens via CSS) */}
          <MobileControls onDirectionChange={onMobileDirection} status={status} />

        </div>

      </div>
    </div>
  );
}

export default App;
