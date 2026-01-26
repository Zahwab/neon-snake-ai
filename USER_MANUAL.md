# 🕹️ Neon Snake AI - User Manual

Welcome to **Neon Snake AI**, an 80s-inspired arcade game where you can play manually or watch an advanced AI play perfectly!

## 📺 The Interface

The game features a retro CRT (Cathode Ray Tube) aesthetic with scanlines, screen curvature, and neon glow effects.

### Heads-Up Display (HUD)
- **Top Left**: Game Title
- **Top Right**: Current Score & High Score
- **Center**: Game Status (Press Space to Start)
- **Bottom**: Controls Reminder & Status Indicators

---

## 🎮 How to Play

### 1. Game Modes

| Mode | Description | How to Activate |
| :--- | :--- | :--- |
| **Manual Mode** | You control the snake using Arrow Keys. Classic gameplay. | Default mode. Use Arrow Keys. |
| **AI Autopilot** | The computer plays for you using BFS pathfinding. | Press **SPACE** or click "TOGGLE AI". |
| **Smart Food** | The food tries to run away from you! | Press **F** or click "SMART FOOD". |

### 2. Controls

| Key | Action |
| :--- | :--- |
| **Arrow Up** | Move Up |
| **Arrow Down** | Move Down |
| **Arrow Left** | Move Left |
| **Arrow Right** | Move Right |
| **Spacebar** | Toggle AI Mode / Restart Game (Variables) |
| **F** | Toggle Smart Food Evasion |

---

## 🚀 Advanced Features

### 🧠 The "Ghost" Path
When AI Mode is active, you will see a faint **Ghost Path** projection on the grid.
- This shows exactly what the AI is "thinking".
- It represents the calculated shortest path to the food.
- If the path disappears, the AI is in "Survival Mode" and looking for any way to stay alive!

### ⚡ Smart Food
In this mode, the food is **alive**.
- It detects when the snake is within **5 tiles**.
- It will actively move to the furthest possible safe tile to escape you.
- **Strategy Tip**: Corner the food against a wall to catch it!

---

## 🛠️ Troubleshooting

- **Game freezes?** Refresh the page.
- **No Sound?** Ensure your browser allows auto-play audio or interact with the page first.
- **AI stuck in loop?** Sometimes the AI enters a loop if no path to food exists. It will break out once the tail moves enough to open a path.
