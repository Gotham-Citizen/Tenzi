# Tenzies

A single-player dice game built with React, Vite, CSS, and JavaScript. Roll until all 10 dice show the same number.

## How to Play

1. Roll the 10 dice and note which number appears most often.
2. Click any dice showing that number to **hold** them (they turn green).
3. Click **Roll** to re-roll the remaining dice.
4. Continue holding and re-rolling until all 10 dice match.
5. The game ends when every die is held and shows the same value — confetti included.

## Tech Stack

- **React 19** — UI library
- **Vite 8** — build tool & dev server
- **react-confetti** — win celebration
- **nanoid** — unique die IDs
- **Google Fonts** — Karla & Inter

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Project Structure

```
├── index.html              # Entry point
├── package.json            # Dependencies & scripts
├── eslint.config.js        # ESLint flat config
├── components/
│   └── Die.jsx             # Die face component (CSS Grid dots)
├── src/
│   ├── App.jsx             # Game logic & state
│   └── index.jsx           # React root mount
├── styles/
    └── index.css           # Global styles
```