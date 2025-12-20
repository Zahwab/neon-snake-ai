export const GRID_SIZE = 20;

// Directions
export const UP = { x: 0, y: -1 };
export const DOWN = { x: 0, y: 1 };
export const LEFT = { x: -1, y: 0 };
export const RIGHT = { x: 1, y: 0 };

export const DIRECTIONS = [UP, DOWN, LEFT, RIGHT];

export const isOpposite = (dir1, dir2) => dir1.x === -dir2.x && dir1.y === -dir2.y;

// Check if a cell is on the board
const isValid = (x, y) => x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;

// Check if a cell is blocked by the snake (excluding tail, as it will move)
const isBlocked = (x, y, snake) => {
  // We allow the tail to be a valid move because it will move out of the way
  for (let i = 0; i < snake.length - 1; i++) {
    if (snake[i].x === x && snake[i].y === y) return true;
  }
  return false;
};

// BFS to find shortest path from head to food
export const findPath = (head, food, snake) => {
  const queue = [[head]];
  const visited = new Set();
  visited.add(`${head.x},${head.y}`);

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

    if (current.x === food.x && current.y === food.y) {
      return path.slice(1); // Return path excluding start position
    }

    for (let dir of DIRECTIONS) {
      const nextX = current.x + dir.x;
      const nextY = current.y + dir.y;
      const key = `${nextX},${nextY}`;

      if (isValid(nextX, nextY) && !isBlocked(nextX, nextY, snake) && !visited.has(key)) {
        visited.add(key);
        // Create new path
        const newPath = [...path, { x: nextX, y: nextY }];
        queue.push(newPath);
      }
    }
  }

  return null; // No path found
};

// Fallback: Just return any valid move if no path to food is found (to delay death)
export const getSurvivalMove = (head, snake) => {
    for (let dir of DIRECTIONS) {
        const nextX = head.x + dir.x;
        const nextY = head.y + dir.y;
        if (isValid(nextX, nextY) && !isBlocked(nextX, nextY, snake)) {
             return [ { x: nextX, y: nextY } ];
        }
    }
    return [];
}

// Calculate Manhattan distance between two points
const getManhattanDistance = (pos1, pos2) => {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
};

// Food AI: Try to evade the snake when it gets close
export const getFoodEvasionMove = (food, snakeHead, snake, dangerRadius = 5) => {
    const distance = getManhattanDistance(food, snakeHead);

    // Only evade if snake is within danger radius
    if (distance > dangerRadius) {
        return null; // Don't move
    }

    // Find all valid adjacent positions for food
    const validMoves = [];

    for (let dir of DIRECTIONS) {
        const newPos = {
            x: food.x + dir.x,
            y: food.y + dir.y
        };

        // Check if position is valid (not wall, not snake body)
        if (isValid(newPos.x, newPos.y) && !isBlockedBySnake(newPos, snake)) {
            // Calculate distance from snake head at this new position
            const newDistance = getManhattanDistance(newPos, snakeHead);
            validMoves.push({
                pos: newPos,
                distance: newDistance,
                dir: dir
            });
        }
    }

    // If no valid moves, stay put
    if (validMoves.length === 0) {
        return null;
    }

    // Sort by distance (furthest first) and pick the best escape route
    validMoves.sort((a, b) => b.distance - a.distance);

    // Return the position that maximizes distance from snake head
    return validMoves[0].pos;
};

// Check if position is blocked by any part of the snake
const isBlockedBySnake = (pos, snake) => {
    return snake.some(segment => segment.x === pos.x && segment.y === pos.y);
};
