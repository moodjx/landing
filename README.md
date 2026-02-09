# Portfolio 2.0

A modern, interactive portfolio website built with Svelte 5 and Vite.

## Overview

This project is a personal portfolio showcasing professional experience, projects, and skills. It features a dynamic particle background, smooth animations, and a responsive design. It also supports internationalization (English/German) and uses a custom routing solution for a seamless Single Page Application (SPA) experience.

## Tech Stack

-   **Framework:** Svelte 5
-   **Build Tool:** Vite
-   **Styling:** CSS Variables, Flexbox, Grid, Glass design, light by default
-   **Animation:** Custom Canvas Particles, CSS Transitions
-   **Internationalization:** Custom i18n implementation

## Project Structure

```
src/
├── components/          # Svelte components
│   ├── blog/            # Blog specific components
│   ├── common/          # Reusable components (Navigation, Footer, etc.)
│   ├── contact/         # Contact page components
│   ├── experience/      # Experience page components
│   ├── home/            # Home page specific components
│   └── projects/        # Project page components
├── pages/               # Top-level page components
├── lib/                 # Utilities and constants
│   ├── constants.js     # Static data (text, links, config)
│   ├── icons.js         # SVG icons
│   ├── scrollSpy.svelte.js # Scroll spy logic (Svelte 5 module)
│   ├── translations.js  # Internationalization strings
│   └── utils.js         # Helper functions
├── App.svelte           # Main application component with routing logic
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
-   **Custom Routing:** `App.svelte` implements a lightweight client-side router using the History API to manage navigation and language prefixes (e.g., `/en/home`, `/de/contact`).
-   **Internationalization:** Content text is centrally managed in `src/lib/translations.js`, allowing for easy language switching.
