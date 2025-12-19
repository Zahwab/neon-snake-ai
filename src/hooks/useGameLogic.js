import { useState, useEffect, useCallback, useRef } from 'react';
import { GRID_SIZE, UP, DOWN, LEFT, RIGHT, findPath, getSurvivalMove, isOpposite } from '../utils/aiLogic';

const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }]; // Tail is last
const INITIAL_DIR = UP;
const GAME_SPEED = 100; // ms per tick

export const useGameLogic = () => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState(INITIAL_DIR);
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState('IDLE'); // IDLE, PLAYING, GAMEOVER
    const [aiMode, setAiMode] = useState(false);
    const [aiPath, setAiPath] = useState([]); // For visualization

    // Use refs for mutable values inside intervals to avoid closure staleness without excessive re-renders
    const snakeRef = useRef(snake);
    const directionRef = useRef(direction);
    const foodRef = useRef(food);
    const aiModeRef = useRef(aiMode);
    const statusRef = useRef(status);

    // Sync refs
    useEffect(() => { snakeRef.current = snake; }, [snake]);
    useEffect(() => { directionRef.current = direction; }, [direction]);
    useEffect(() => { foodRef.current = food; }, [food]);
    useEffect(() => { aiModeRef.current = aiMode; }, [aiMode]);
    useEffect(() => { statusRef.current = status; }, [status]);

    const generateFood = useCallback((currentSnake) => {
        let newFood;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
            // Check collision with snake
            const collision = currentSnake.some(s => s.x === newFood.x && s.y === newFood.y);
            if (!collision) break;
        }
        return newFood;
    }, []);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIR);
        setScore(0);
        setStatus('PLAYING');
        setFood(generateFood(INITIAL_SNAKE));
        setAiPath([]);
    };

    const handleKeyPress = useCallback((e) => {
        if (aiModeRef.current) return; // Disable controls in AI mode

        switch (e.key) {
            case 'ArrowUp':
                if (!isOpposite(directionRef.current, UP)) setDirection(UP);
                break;
            case 'ArrowDown':
                if (!isOpposite(directionRef.current, DOWN)) setDirection(DOWN);
                break;
            case 'ArrowLeft':
                if (!isOpposite(directionRef.current, LEFT)) setDirection(LEFT);
                break;
            case 'ArrowRight':
                if (!isOpposite(directionRef.current, RIGHT)) setDirection(RIGHT);
                break;
            case ' ': // Spacebar to toggle
                // Optional: Toggle pause?
                break;
            default:
                break;
        }
    }, []);

    // AI Decision Logic
    const getAiMove = useCallback(() => {
        const head = snakeRef.current[0];
        const target = foodRef.current;

        // Find path
        let path = findPath(head, target, snakeRef.current);

        if (!path) {
            // Fallback: Survival
            path = getSurvivalMove(head, snakeRef.current);
        }

        setAiPath(path || []);

        if (path && path.length > 0) {
            const nextStep = path[0];
            const moveX = nextStep.x - head.x;
            const moveY = nextStep.y - head.y;
            return { x: moveX, y: moveY };
        }

        return directionRef.current; // Keep going if unsure (will likely die)
    }, []);

    const gameLoop = useCallback(() => {
        if (statusRef.current !== 'PLAYING') return;

        let nextDir = directionRef.current;

        // AI CONTROL
        if (aiModeRef.current) {
            nextDir = getAiMove();
            setDirection(nextDir);
        }

        const currentSnake = snakeRef.current;
        const head = currentSnake[0];
        const newHead = { x: head.x + nextDir.x, y: head.y + nextDir.y };

        // Collision Check (Walls) - Logic for "No Walls" can be added here, but standard is death
        if (
            newHead.x < 0 ||
            newHead.x >= GRID_SIZE ||
            newHead.y < 0 ||
            newHead.y >= GRID_SIZE ||
            currentSnake.some((seg, index) => index !== currentSnake.length - 1 && seg.x === newHead.x && seg.y === newHead.y) // Self collision
        ) {
            setStatus('GAMEOVER');
            return;
        }

        // Move Snake
        const newSnake = [newHead, ...currentSnake];

        // Check Food
        if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
            setScore(s => s + 10);
            const nextFood = generateFood(newSnake);
            setFood(nextFood);
            // Don't pop tail (grow)
        } else {
            newSnake.pop(); // Remove tail
        }

        setSnake(newSnake);

    }, [getAiMove, generateFood]);

    useEffect(() => {
        const interval = setInterval(gameLoop, GAME_SPEED);
        return () => clearInterval(interval);
    }, [gameLoop]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    return {
        snake,
        food,
        direction,
        score,
        status,
        aiMode,
        setAiMode,
        resetGame,
        aiPath
    };
};
