# Portfolio 2.0

A modern, interactive portfolio website built with Svelte 5 and Vite.

## Overview

This project is a personal portfolio showcasing professional experience, projects, and skills. It features a dynamic particle background, smooth animations, and a responsive design.

## Tech Stack

-   **Framework:** [Svelte 5](https://svelte.dev/) (Runes, Snippets)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Styling:** CSS Variables, Flexbox, Grid
-   **Animation:** Custom Canvas Particles, CSS Transitions

## Project Structure

```
src/
├── components/          # Svelte components
│   ├── blog/            # Blog specific components
│   ├── CardsCarousel.svelte    # Project/Skill cards carousel
│   ├── ExperienceTimeline.svelte # Reusable timeline component
│   ├── QualitySection.svelte   # 3D "Commitment to Excellence" section
│   └── ...
├── lib/                 # Utilities and constants
│   ├── constants.js     # Static data (text, links, config)
│   ├── icons.js         # SVG icons
│   ├── scrollSpy.svelte.js # Scroll spy logic (Svelte 5 module)
│   └── utils.js         # Helper functions
├── App.svelte           # Main application component
└── main.js              # Entry point
```

## Setup & Development

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Start the development server:**

    ```bash
    npm run dev
    ```

3.  **Build for production:**

    ```bash
    npm run build
    ```

## Architecture Highlights

-   **Modularity:** Key sections like the Experience Timeline and Cards Carousel are encapsulated in reusable components.
-   **Data-Driven:** Content is separated from presentation in `src/lib/constants.js`, making it easy to update text and data without touching component code.
-   **Svelte 5:** Utilizes the latest Svelte 5 features like `$state`, `$props`, and `$effect` for reactive state management.
