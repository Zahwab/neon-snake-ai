import React from 'react';
import { UP, DOWN, LEFT, RIGHT } from '../utils/aiLogic';

const MobileControls = ({ onDirectionChange }) => {
    // Only show controls when playing or idle (not game over, though handleDirection handles status checks too)
    // But visual feedback is important.

    const handleTouch = (e, dir) => {
        e.preventDefault(); // Prevent default touch actions like scroll
        onDirectionChange(dir);
        // Visual feedback could be added here if needed, but CSS :active handles some
    };

    return (
        <div className="mobile-controls" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            zIndex: 1000 // Ensure it's above scanlines if needed, though they are usually overlay
        }}>
            <button
                className="control-btn"
                onTouchStart={(e) => handleTouch(e, UP)}
                onMouseDown={(e) => handleTouch(e, UP)}
                aria-label="Up"
            >
                ▲
            </button>
            <div style={{ display: 'flex', gap: '20px' }}>
                <button
                    className="control-btn"
                    onTouchStart={(e) => handleTouch(e, LEFT)}
                    onMouseDown={(e) => handleTouch(e, LEFT)}
                    aria-label="Left"
                >
                    ◀
                </button>
                <button
                    className="control-btn"
                    onTouchStart={(e) => handleTouch(e, DOWN)}
                    onMouseDown={(e) => handleTouch(e, DOWN)}
                    aria-label="Down"
                >
                    ▼
                </button>
                <button
                    className="control-btn"
                    onTouchStart={(e) => handleTouch(e, RIGHT)}
                    onMouseDown={(e) => handleTouch(e, RIGHT)}
                    aria-label="Right"
                >
                    ▶
                </button>
            </div>
        </div>
    );
};

export default MobileControls;
