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
        <div className="mobile-controls">
            <div className="d-pad-grid">
                <button
                    className="control-btn up-btn"
                    onTouchStart={(e) => handleTouch(e, UP)}
                    onMouseDown={(e) => handleTouch(e, UP)}
                    aria-label="Up"
                >
                    ▲
                </button>
                <button
                    className="control-btn left-btn"
                    onTouchStart={(e) => handleTouch(e, LEFT)}
                    onMouseDown={(e) => handleTouch(e, LEFT)}
                    aria-label="Left"
                >
                    ◀
                </button>
                <button
                    className="control-btn down-btn"
                    onTouchStart={(e) => handleTouch(e, DOWN)}
                    onMouseDown={(e) => handleTouch(e, DOWN)}
                    aria-label="Down"
                >
                    ▼
                </button>
                <button
                    className="control-btn right-btn"
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
