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
