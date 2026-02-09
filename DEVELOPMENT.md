# Development Guide

This guide explains the architecture, patterns, and best practices used in this portfolio website.

## 📁 Project Structure

```
portfolio-2/
├── src/
│   ├── components/          # Svelte components (UI sections)
│   │   ├── blog/            # Blog related components
│   │   ├── common/          # Shared components (Footer, Navigation, etc.)
│   │   ├── contact/         # Contact page components
│   │   ├── experience/      # Experience page components
│   │   ├── home/            # Home page components
│   │   └── projects/        # Projects page components
│   ├── pages/               # Page views (Home, Experience, Contact, etc.)
│   ├── lib/                 # Utilities and constants
│   │   ├── constants.js     # All static data (DRY principle) & Feature Flags
│   │   ├── icons.js         # SVG icons
│   │   ├── scrollSpy.svelte.js  # Scroll tracking
│   │   ├── translations.js  # Translation strings
│   │   └── utils.js         # Helper functions
│   ├── posts/               # Markdown blog posts
│   ├── App.svelte           # Root component & Routing Logic
│   ├── app.css              # Global styles
│   └── main.js              # Entry point
├── public/                  # Static assets
└── vite.config.js           # Build configuration
```

## 🎯 Design Principles

### 1. **DRY (Don't Repeat Yourself)**
All static data is centralized in `src/lib/constants.js`:
- Navigation sections
- Technologies
- Work experience
- Projects
- Social links
- Form endpoints

**Why?** Update content in one place, changes reflect everywhere.

### 2. **Single Responsibility Principle (SOLID)**
Each component has one clear purpose. For example:
- `pages/Home.svelte` - Orchestrates the home page layout
- `components/common/Navigation.svelte` - Handles navigation interaction only

**Why?** Easier to maintain, test, and understand.

### 3. **Separation of Concerns**
- **Data** → `lib/constants.js`
- **Logic** → `lib/utils.js`, `lib/scrollSpy.svelte.js`
- **Presentation** → Component files
- **Styles** → Scoped in components or `app.css`
- **Content** → `lib/translations.js`

**Why?** Changes to one layer don't affect others.

## 🔧 Key Features

### Custom Routing
The application uses a custom client-side router implemented in `App.svelte` instead of a library or meta-framework router.

**How it works:**
1. Intercepts navigation events and URL changes.
2. Updates `currentPage` and `currentLang` state based on the URL path (e.g., `/en/home`).
3. Uses the History API (`pushState`, `replaceState`) to manage browser history without page reloads.
4. Renders the appropriate component from `src/pages/` based on `currentPage`.

### Internationalization (i18n)
Multi-language support is built-in.

- **Strings:** Stored in `src/lib/translations.js` nested by language code (`en`, `de`).
- **State:** `currentLang` state in `App.svelte` determines which set of strings to use.
- **Usage:** Components receive `currentLang` as a prop and access text via `translations[currentLang].section.key`.
- **Feature Flag:** German language support can be toggled via `FEATURES.ENABLE_GERMAN` in `constants.js`.

### Scroll Spy Navigation
The navigation automatically highlights the current section as you scroll.

**Files involved:**
- `src/lib/scrollSpy.svelte.js` - Core logic using Intersection Observer.
- `src/components/common/Navigation.svelte` - UI implementation.

## 📝 Svelte 5 Features Used

### 1. **Runes**
Svelte 5's new reactivity system:

```javascript
// State - reactive variable
let count = $state(0);

// Props - receive data from parent
let { name, age } = $props();

// Derived - computed value
let doubled = $derived(count * 2);

// Effect - side effects
$effect(() => {
  console.log('Count changed:', count);
});
```

### 2. **Event Handlers**
New syntax in Svelte 5:

```svelte
<!-- Old (Svelte 4) -->
<button on:click={handleClick}>Click</button>

<!-- New (Svelte 5) -->
<button onclick={handleClick}>Click</button>
```

### 3. **Component Mounting**
```javascript
// New (Svelte 5)
import { mount } from 'svelte';
mount(App, { target: document.getElementById('app') });
```

## 🎨 Styling Approach

### Neo-Brutalism Design
- **Bold borders** (3px)
- **Sharp shadows** (no blur)
- **Bright colors**
- **High contrast**

### CSS Variables
All design tokens in `app.css`.

## 🔄 Data Flow

```
constants.js / translations.js
    ↓
App.svelte (Manages State & Routing)
    ↓
Page Component (e.g., Home.svelte)
    ↓
Child Component (e.g., Hero.svelte)
```

## 📚 Adding Content

### Add a Project or Experience
Edit `src/lib/constants.js`. The arrays `PROJECTS` and `EXPERIENCES` feed the components directly.

### Add a Translation
Edit `src/lib/translations.js` and add the new key path to both `en` and `de` objects.

## 🚀 Deployment

### GitHub Pages
1. Update `vite.config.js` base path if necessary.
2. Build with `npm run build`.
3. Deploy the `dist` folder.

## 🤝 Contributing

When making changes:
1. Follow existing code style.
2. Update constants/translations instead of hardcoding text.
3. Test on mobile and desktop.
