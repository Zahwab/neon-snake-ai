import React, { useRef, useEffect } from 'react';
import { GRID_SIZE } from '../utils/aiLogic';

const CELL_SIZE = 20;
const GAP = 1;

const GameCanvas = ({ snake, food, aiPath, aiMode, status }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Clear Screen
        ctx.fillStyle = '#0b100b'; // Dark retro bg
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Grid (Optional, subtle)
        // ctx.strokeStyle = '#1a221a';
        // for (let i = 0; i < GRID_SIZE; i++) {
        //   for (let j = 0; j < GRID_SIZE; j++) {
        //     ctx.strokeRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        //   }
        // }

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

        // Draw Food
        ctx.fillStyle = '#ff3333'; // Red retro food
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff3333';
        ctx.fillRect(food.x * CELL_SIZE + GAP, food.y * CELL_SIZE + GAP, CELL_SIZE - GAP * 2, CELL_SIZE - GAP * 2);
        ctx.shadowBlur = 0; // Reset

        // Draw Snake
        snake.forEach((segment, index) => {
            const isHead = index === 0;
            ctx.fillStyle = isHead ? '#eeffee' : '#33ff33'; // Bright head, green body
            if (isHead) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#33ff33';
            } else {
                ctx.shadowBlur = 0;
            }

            ctx.fillRect(segment.x * CELL_SIZE + GAP, segment.y * CELL_SIZE + GAP, CELL_SIZE - GAP * 2, CELL_SIZE - GAP * 2);
        });

        // Draw Game Over Overlay
        if (status === 'GAMEOVER') {
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#33ff33';
            ctx.font = '30px "Courier New"';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
            ctx.font = '16px "Courier New"';
            ctx.fillText('Press SPACE to Restart', canvas.width / 2, canvas.height / 2 + 30);
        }

    }, [snake, food, aiPath, aiMode, status]);

    return (
        <canvas
            ref={canvasRef}
            width={GRID_SIZE * CELL_SIZE}
            height={GRID_SIZE * CELL_SIZE}
            style={{ border: '2px solid #333', boxShadow: '0 0 10px #33ff33' }}
        />
    );
};

export default GameCanvas;
