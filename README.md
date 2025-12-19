# Neon Snake AI - Retro Revival Challenge

An 80s-inspired Snake game with a modern AI twist, built for the **AI for Bharat Week 4 Challenge**.

## 🕹️ The Game
This isn't just your standard CRT-style Snake. It features an embedded **AI Autopilot** powered by **BFS Pathfinding**.

- **Retro Aesthetic**: Glowing green phosphor graphics, CRT curvature, scanlines, and screen flicker.
- **AI "The Twist"**: Toggle the AI mode to watch the computer play perfectly.
- **Visualized Thought**: The AI's planned path is projected onto the grid in real-time (ghost path), showing exactly how it "thinks" before it moves.

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

## 🧠 Technical Details

### Pathfinding Logic (`src/utils/aiLogic.js`)
The AI uses a **Breadth-First Search (BFS)** algorithm to calculate the shortest path from the snake's head to the food at every single frame.

- **Input**: Current grid state (snake body, obstacles, walls).
- **Process**: Explores all possible moves layer by layer until the food is found.
- **Fallback**: If no path to food exists (e.g., trapped by own body), the AI enters "Survival Mode," choosing any valid open neighbor to prolong survival until a path clears.

### Tech Stack
- React + Vite
- HTML5 Canvas (Hardware accelerated rendering)
- Vanilla CSS (CRT Effects)

## 📸 Screenshots
*(Embed screenshots of the gameplay here)*

## 📂 Submission Compliance
- Public Repository: Included
- `/.kiro` directory: Included at root
