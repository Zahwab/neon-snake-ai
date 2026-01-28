# Neon Snake AI - Retro Revival Challenge

An 80s-inspired Snake game with a modern AI twist, built for the **AI for Bharat Week 4 Challenge**.

## 🕹️ The Game
This isn't just your standard CRT-style Snake. It features an embedded **AI Autopilot** powered by **Advanced Pathfinding** and **Smart Food Evasion**.

- **Retro Aesthetic**: Glowing green phosphor graphics, CRT curvature, scanlines, and screen flicker.
- **AI "The Twist"**: Toggle the AI mode to watch the computer play perfectly.
- **Visualized Thought**: The AI's planned path is projected onto the grid in real-time (ghost path), showing exactly how it "thinks" before it moves.
- **Smart Food AI**: The food attempts to evade the snake when it gets too close, making the game more challenging!
- **Sound Effects**: Retro beep sounds for movement, eating, and game events.
- **High Score System**: Persistent high score tracking with local storage.
- **Enhanced Visuals**: Pulsing food, gradient snake body, and improved neon glow effects.

## 🚀 How to Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Local Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173`

## 🎮 Controls

### Desktop
- **Arrow Keys**: Move the snake (Manual mode only)
- **Spacebar**: Toggle between Manual and AI mode
- **F Key**: Toggle Smart Food evasion on/off
- **Arrow Keys** (Game Over): Restart the game

### Mobile / Touch
- **Touch Controls**: Use the on-screen joystick/arrows to move.
- **AI Button**: Tap to toggle AI mode.
- **Restart**: Tap arrow controls after game over.

## 🎯 Game Modes

### Manual Mode
Control the snake directly with arrow keys. The challenge increases significantly with Smart Food enabled!

### AI Mode (Autopilot)
Watch the AI play using advanced pathfinding. Even the AI struggles when Smart Food is enabled!

### Smart Food Mode
When enabled, the food will attempt to escape when the snake gets within 5 tiles. The food appears orange with a pulsing white center and makes a subtle sound when it moves.

## 🧠 Technical Details

### Pathfinding Logic (`src/utils/aiLogic.js`)
The AI uses a **Shortest Path** algorithm to calculate the route from the snake's head to the food at every single frame.

- **Input**: Current grid state (snake body, obstacles, walls).
- **Process**: Explores all possible moves layer by layer until the food is found.
- **Fallback**: If no path to food exists (e.g., trapped by own body), the AI enters "Survival Mode," choosing any valid open neighbor to prolong survival until a path clears.

### Smart Food Evasion Logic
The food now has its own AI that attempts to escape when the snake gets too close:

- **Detection**: Uses Manhattan distance to detect when snake is within danger radius (5 tiles).
- **Evasion**: Calculates all valid adjacent positions and moves to the one furthest from the snake head.
- **Constraints**: Won't move into walls or snake body segments.
- **Visual Feedback**: Smart food appears orange with a pulsing white center dot.

### Tech Stack
- React + Vite
- HTML5 Canvas (Hardware accelerated rendering)
- Vanilla CSS (CRT Effects)
- Web Audio API (Retro sound effects)
