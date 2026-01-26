# Neon Snake AI - Architecture Overview

This document provides a high-level overview of the application architecture, component hierarchy, and data flow.

## 🏗️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)
- **Styling**: Pure CSS (CRT Effects), Inline Styles (Dynamic Layout)
- **Rendering**: HTML5 `<canvas>` API
- **Algorithms**: Breadth-First Search (BFS), Manhattan Distance

## 🧩 Component Map

The application follows a simple component-based architecture where state is lifted to a custom hook and passed down to the rendering layer.

```mermaid
graph TD
    Root[main.jsx] --> App[App.jsx]
    App --> Hook[useGameLogic Hook]
    App --> Canvas[GameCanvas Component]
    App --> HUD[UI Overlays / Buttons]

    Hook --> State[Game State]
    Hook --> Loop[Game Loop (setInterval)]

    Loop --> Update[Update Logic]
    Update --> AI[src/utils/aiLogic.js]

    subgraph Data Flow
        Hook -- passes state --> App
        App -- props --> Canvas
    end
```

## 📂 File Structure

| Directory | Purpose |
| :--- | :--- |
| **src/** | Source code root |
| ├── **components/** | React components (Presentation layer) |
| │   └── `GameCanvas.jsx` | Handles all canvas drawing commands |
| ├── **hooks/** | Custom React hooks (Business logic layer) |
| │   └── `useGameLogic.js` | Manages snake state, loop, and collisions |
| ├── **utils/** | Pure functions and algorithms |
| │   ├── `aiLogic.js` | BFS pathfinding and helper functions |
| │   └── `sounds.js` | Audio synthesis logic |
| └── **styles/** | CSS files for global themes |

## 🔄 Data Models

### Snake Segment
```javascript
{
  x: number, // Grid coordinate X (0-19)
  y: number  // Grid coordinate Y (0-19)
}
```

### Game Status (Enum)
- `IDLE`: Game has not started / Waiting for input.
- `PLAYING`: Game loop is active.
- `GAMEOVER`: Snake has died, waiting for restart.

## 🎨 Rendering Pipeline

1. **Clear Screen**: `ctx.fillRect` with a radial gradient (dark CRT background).
2. **Draw Grid**: Draw faint green lines for the background grid.
3. **Draw AI Path** (Ghost Path):
   - Drawn *underneath* the snake.
   - If `aiMode` is true, draw faint blue dots for each step in `aiPath`.
4. **Draw Food**:
   - Save Context.
   - Apply Glow Effect (`shadowBlur`).
   - Fill Rect (Red/Orange based on `smartFood` status).
   - Restore Context.
5. **Draw Snake**:
   - Iterate through `snake` array.
   - **Head**: Bright white/green glow with eyes.
   - **Body**: Gradient green segments.
6. **Draw Overlays**:
   - Game Over / Idle text overlays are drawn last on top of everything.
