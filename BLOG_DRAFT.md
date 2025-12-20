# Retro Revival: Building "Neon Snake AI" with Kiro

## The Challenge
The "Retro Revival" challenge asked for a classic game or UI with a "Modern AI Twist". I chose to recreate the legendary **Snake** game, but instead of just playing it effectively, I wanted to visualize *how* an AI agent thinks in real-time.

## The Solution: Neon Snake AI
I built "Neon Snake AI" using **React** and **Vite**. The core features include:
1.  **Retro Aesthetics**: A custom CSS implementation of CRT scanlines, screen curvature, and phosphor glow to mimic 80s arcade monitors.
2.  **AI Autopilot**: An embedded Breadth-First Search (BFS) pathfinding algorithm.
3.  **Visualization (The Twist)**: The "Ghost Path" rendering, which draws the calculated path on the grid before the snake moves, giving players a window into the AI's logic.

## How Kiro Accelerated Development

### 1. Rapid Prototyping
Kiro instantly scaffolded the entire Vite + React project structure, including the `.kiro` directory and configuration files. What usually takes 10-15 minutes of setup was done in seconds.

### 2. Complex Logic Implementation
The most challenging part was the BFS pathfinding algorithm (`src/utils/aiLogic.js`). Kiro not only wrote the algorithm but efficiently integrated it with the React state loop.
- It handled edge cases (like the snake trapping itself) by implementing a "Survival Mode" fallback.
- It separated the game logic (`useGameLogic`) from the rendering (`GameCanvas`), ensuring clean code architecture.

### 3. Visual Polish
I described a "Retro CRT look," and Kiro generated the complete CSS for scanlines, flicker, and glow (`src/styles/crt.css`) in a single shot. Adjusting these CSS keyframes manually would have been tedious, but Kiro provided a production-ready effect immediately.

### Code Snippet: The AI Decision Logic
Here's how the AI calculates its next move, which Kiro helped optimize:

```javascript
// BFS to find shortest path from head to food
export const findPath = (head, food, snake) => {
  const queue = [[head]];
  const visited = new Set();
  visited.add(`${head.x},${head.y}`);

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

    if (current.x === food.x && current.y === food.y) {
      return path.slice(1);
    }

    // ... Neighbor exploration logic
  }
  return null;
};
```

## Conclusion
With Kiro, I turned a concept into a playable, polished web app significantly faster than traditional coding. The ability to generate complex algorithm logic (BFS) and visual assets (CSS shaders) simultaneously allowed me to focus on the "fun" part of the Retro Revival challenge.
