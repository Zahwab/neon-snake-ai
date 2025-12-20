import { useState, useEffect, useCallback, useRef } from 'react';
import { GRID_SIZE, UP, DOWN, LEFT, RIGHT, findPath, getSurvivalMove, isOpposite, getFoodEvasionMove } from '../utils/aiLogic';
import { soundManager } from '../utils/sounds';

const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }]; // Tail is last
const INITIAL_DIR = UP;
const GAME_SPEED = 120; // ms per tick (slightly slower for better playability)

export const useGameLogic = () => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState(INITIAL_DIR);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('snake-high-score');
        return saved ? parseInt(saved, 10) : 0;
    });
    const [status, setStatus] = useState('IDLE'); // IDLE, PLAYING, GAMEOVER
    const [aiMode, setAiMode] = useState(false);
    const [aiPath, setAiPath] = useState([]); // For visualization
    const [smartFood, setSmartFood] = useState(true); // Toggle for food AI

    // Use refs for mutable values inside intervals to avoid closure staleness without excessive re-renders
    const snakeRef = useRef(snake);
    const directionRef = useRef(direction);
    const foodRef = useRef(food);
    const aiModeRef = useRef(aiMode);
    const statusRef = useRef(status);
    const smartFoodRef = useRef(smartFood);

    // Sync refs
    useEffect(() => { snakeRef.current = snake; }, [snake]);
    useEffect(() => { directionRef.current = direction; }, [direction]);
    useEffect(() => { foodRef.current = food; }, [food]);
    useEffect(() => { aiModeRef.current = aiMode; }, [aiMode]);
    useEffect(() => { statusRef.current = status; }, [status]);
    useEffect(() => { smartFoodRef.current = smartFood; }, [smartFood]);

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
        // Handle spacebar for AI toggle and game start
        if (e.key === ' ' || e.code === 'Space') {
            e.preventDefault();
            if (statusRef.current === 'IDLE') {
                setStatus('PLAYING');
            } else if (statusRef.current === 'PLAYING') {
                setAiMode(!aiModeRef.current);
                soundManager.playToggle();
            }
            return;
        }

        // Toggle smart food with 'F' key
        if (e.key === 'f' || e.key === 'F') {
            setSmartFood(!smartFoodRef.current);
            soundManager.createBeep(500, 0.1, 'sine');
            return;
        }

        // Start game on first arrow key press
        if (statusRef.current === 'IDLE') {
            setStatus('PLAYING');
        }

        if (aiModeRef.current) return; // Disable controls in AI mode

        switch (e.key) {
            case 'ArrowUp':
                if (!isOpposite(directionRef.current, UP)) {
                    setDirection(UP);
                    soundManager.playMove();
                }
                break;
            case 'ArrowDown':
                if (!isOpposite(directionRef.current, DOWN)) {
                    setDirection(DOWN);
                    soundManager.playMove();
                }
                break;
            case 'ArrowLeft':
                if (!isOpposite(directionRef.current, LEFT)) {
                    setDirection(LEFT);
                    soundManager.playMove();
                }
                break;
            case 'ArrowRight':
                if (!isOpposite(directionRef.current, RIGHT)) {
                    setDirection(RIGHT);
                    soundManager.playMove();
                }
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

        // SMART FOOD EVASION - Move food before collision check
        if (smartFoodRef.current) {
            const currentFood = foodRef.current;
            const evasionMove = getFoodEvasionMove(currentFood, newHead, currentSnake);

            if (evasionMove) {
                setFood(evasionMove);
                // Play a subtle sound when food moves
                soundManager.playFoodMove();
            }
        }

        // Collision Check (Walls) - Logic for "No Walls" can be added here, but standard is death
        if (
            newHead.x < 0 ||
            newHead.x >= GRID_SIZE ||
            newHead.y < 0 ||
            newHead.y >= GRID_SIZE ||
            currentSnake.some((seg, index) => index !== currentSnake.length - 1 && seg.x === newHead.x && seg.y === newHead.y) // Self collision
        ) {
            // Update high score if needed
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('snake-high-score', score.toString());
            }
            setStatus('GAMEOVER');
            soundManager.playGameOver();
            return;
        }

        // Move Snake
        const newSnake = [newHead, ...currentSnake];

        // Check Food (use current food position after potential evasion)
        const currentFood = foodRef.current;
        if (newHead.x === currentFood.x && newHead.y === currentFood.y) {
            setScore(s => s + 10);
            soundManager.playEat();
            const nextFood = generateFood(newSnake);
            setFood(nextFood);
            // Don't pop tail (grow)
        } else {
            newSnake.pop(); // Remove tail
        }

        setSnake(newSnake);

    }, [getAiMove, generateFood, score, highScore]);

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
        highScore,
        status,
        aiMode,
        setAiMode,
        resetGame,
        aiPath,
        smartFood,
        setSmartFood
    };
};
