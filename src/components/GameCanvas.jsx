import React, { useRef, useEffect } from 'react';
import { GRID_SIZE } from '../utils/aiLogic';

const CELL_SIZE = 20;
const GAP = 1;

const GameCanvas = ({ snake, food, aiPath, aiMode, status, smartFood }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Clear Screen with subtle gradient
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width / 2
        );
        gradient.addColorStop(0, '#0f150f');
        gradient.addColorStop(1, '#0b100b');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw subtle grid
        ctx.strokeStyle = 'rgba(51, 255, 51, 0.1)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= GRID_SIZE; i++) {
            // Vertical lines
            ctx.beginPath();
            ctx.moveTo(i * CELL_SIZE, 0);
            ctx.lineTo(i * CELL_SIZE, canvas.height);
            ctx.stroke();

            // Horizontal lines
            ctx.beginPath();
            ctx.moveTo(0, i * CELL_SIZE);
            ctx.lineTo(canvas.width, i * CELL_SIZE);
            ctx.stroke();
        }

        // Draw AI Path (Ghost Path)
        if (aiMode && aiPath && aiPath.length > 0) {
            ctx.strokeStyle = 'rgba(50, 100, 255, 0.4)'; // Blueish ghost path
            ctx.lineWidth = 2;
            ctx.beginPath();
            // Start from snake head
            if (snake[0]) ctx.moveTo(snake[0].x * CELL_SIZE + CELL_SIZE / 2, snake[0].y * CELL_SIZE + CELL_SIZE / 2);

            aiPath.forEach(pos => {
                ctx.lineTo(pos.x * CELL_SIZE + CELL_SIZE / 2, pos.y * CELL_SIZE + CELL_SIZE / 2);
                // Draw small dots
                ctx.fillStyle = 'rgba(50, 100, 255, 0.3)';
                ctx.fillRect(pos.x * CELL_SIZE + 8, pos.y * CELL_SIZE + 8, 4, 4);
            });
            ctx.stroke();
        }

        // Draw Food with pulsing effect and smart food indicator
        const time = Date.now() * 0.005;
        const pulse = Math.sin(time) * 0.3 + 0.7;

        // Different colors for smart vs normal food
        const foodColor = smartFood ? '#ff6633' : '#ff3333';
        const foodGlow = smartFood ? '#ff9966' : '#ff6666';

        ctx.fillStyle = foodColor;
        ctx.shadowBlur = 15 * pulse;
        ctx.shadowColor = foodColor;

        // Draw food with rounded corners effect
        const foodSize = CELL_SIZE - GAP * 2;
        const foodX = food.x * CELL_SIZE + GAP;
        const foodY = food.y * CELL_SIZE + GAP;

        ctx.fillRect(foodX, foodY, foodSize, foodSize);

        // Add inner glow
        ctx.fillStyle = foodGlow;
        ctx.fillRect(foodX + 2, foodY + 2, foodSize - 4, foodSize - 4);

        // Add smart food indicator (small pulsing dot in center)
        if (smartFood) {
            const smartPulse = Math.sin(time * 2) * 0.5 + 0.5;
            ctx.fillStyle = `rgba(255, 255, 255, ${smartPulse})`;
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#ffffff';
            const dotSize = 4;
            ctx.fillRect(foodX + foodSize / 2 - dotSize / 2, foodY + foodSize / 2 - dotSize / 2, dotSize, dotSize);
        }

        ctx.shadowBlur = 0;

        // Draw Snake with enhanced neon effect
        snake.forEach((segment, index) => {
            const isHead = index === 0;
            const segmentSize = CELL_SIZE - GAP * 2;
            const segmentX = segment.x * CELL_SIZE + GAP;
            const segmentY = segment.y * CELL_SIZE + GAP;

            if (isHead) {
                // Head with bright glow
                ctx.fillStyle = '#ffffff';
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#33ff33';
                ctx.fillRect(segmentX, segmentY, segmentSize, segmentSize);

                // Inner head detail
                ctx.fillStyle = '#33ff33';
                ctx.shadowBlur = 10;
                ctx.fillRect(segmentX + 2, segmentY + 2, segmentSize - 4, segmentSize - 4);

                // Eyes
                ctx.fillStyle = '#000000';
                ctx.shadowBlur = 0;
                const eyeSize = 3;
                ctx.fillRect(segmentX + 4, segmentY + 4, eyeSize, eyeSize);
                ctx.fillRect(segmentX + segmentSize - 7, segmentY + 4, eyeSize, eyeSize);
            } else {
                // Body segments with gradient effect
                const bodyIntensity = Math.max(0.3, 1 - (index * 0.1));
                ctx.fillStyle = `rgba(51, 255, 51, ${bodyIntensity})`;
                ctx.shadowBlur = 8 * bodyIntensity;
                ctx.shadowColor = '#33ff33';
                ctx.fillRect(segmentX, segmentY, segmentSize, segmentSize);

                // Inner body glow
                ctx.fillStyle = `rgba(102, 255, 102, ${bodyIntensity * 0.5})`;
                ctx.shadowBlur = 0;
                ctx.fillRect(segmentX + 1, segmentY + 1, segmentSize - 2, segmentSize - 2);
            }
        });

        ctx.shadowBlur = 0;

        // Draw Game Over Overlay
        if (status === 'GAMEOVER') {
            ctx.fillStyle = 'rgba(0,0,0,0.8)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Text is now handled by HTML overlay in App.jsx
        }

        // Draw Idle Overlay
        if (status === 'IDLE') {
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

    }, [snake, food, aiPath, aiMode, status, smartFood]);

    return (
        <canvas
            ref={canvasRef}
            width={GRID_SIZE * CELL_SIZE}
            height={GRID_SIZE * CELL_SIZE}
            style={{
                border: '2px solid #333',
                boxShadow: '0 0 10px #33ff33',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
            }}
        />
    );
};

export default GameCanvas;
