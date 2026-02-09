# Development Guide

This guide explains the architecture, patterns, and best practices used in this portfolio website.

## 📁 Project Structure

```
portfolio-2/
├── src/
│   ├── components/          # Svelte components (UI sections)
│   │   ├── About.svelte
│   │   ├── Blog.svelte
│   │   ├── Contact.svelte
│   │   ├── Experience.svelte
│   │   ├── FeaturedProjects.svelte
│   │   ├── Footer.svelte
│   │   ├── Hero.svelte
│   │   ├── Navigation.svelte
│   │   └── TechStack.svelte
│   ├── lib/                 # Utilities and constants
│   │   ├── constants.js     # All static data (DRY principle)
│   │   ├── posts.js         # Blog post utilities
│   │   ├── scrollSpy.svelte.js  # Scroll tracking
│   │   └── utils.js         # Helper functions
│   ├── posts/               # Markdown blog posts
│   ├── App.svelte           # Root component
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
Each component has one clear purpose:
- `Hero.svelte` - Landing section only
- `Navigation.svelte` - Navigation only
- `Contact.svelte` - Contact form only

**Why?** Easier to maintain, test, and understand.

### 3. **Separation of Concerns**
- **Data** → `lib/constants.js`
- **Logic** → `lib/utils.js`, `lib/scrollSpy.svelte.js`
- **Presentation** → Component files
- **Styles** → Scoped in components or `app.css`

**Why?** Changes to one layer don't affect others.

### 4. **Modularity**
Reusable utilities:
- `scrollToSection()` - Smooth scrolling
- `formatDate()` - Date formatting
- `createScrollSpy()` - Scroll tracking

**Why?** Write once, use everywhere.

## 🔧 Key Features

### Scroll Spy Navigation
The navigation automatically highlights the current section as you scroll.

**How it works:**
1. `scrollSpy.svelte.js` uses Intersection Observer API
2. Tracks which section is in viewport
3. Updates `activeSection` state
4. Navigation highlights active section

**Files involved:**
- `src/lib/scrollSpy.svelte.js` - Core logic
- `src/components/Navigation.svelte` - UI implementation

### Smooth Scrolling
Clicking navigation links smoothly scrolls to sections.

**Implementation:**
```javascript
// src/lib/utils.js
export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}
```

### Responsive Design
Mobile-first approach with breakpoints at 768px.

**Pattern:**
```css
/* Desktop styles first */
.component {
  /* Desktop layout */
}

/* Mobile overrides */
@media (max-width: 768px) {
  .component {
    /* Mobile layout */
  }
}
```

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
// Old (Svelte 4)
new App({ target: document.getElementById('app') });

// New (Svelte 5)
import { mount } from 'svelte';
mount(App, { target: document.getElementById('app') });
```

## 🎨 Styling Approach

### Neo-Brutalism Design
- **Bold borders** (3px)
- **Sharp shadows** (no blur)
- **Bright colors**
- **No border-radius**
- **High contrast**

### CSS Variables
All design tokens in `app.css`:
```css
:root {
  --color-primary: #FF6B6B;
  --color-secondary: #FFE66D;
  --space-md: 1rem;
  --border-width: 3px;
  /* ... */
}
```

**Why?** Easy to theme and maintain consistency.

### Scoped Styles
Each component has its own `<style>` block:
```svelte
<style>
  /* These styles only apply to this component */
  .hero {
    /* ... */
  }
</style>
```

## 🔄 Data Flow

```
constants.js (Data Source)
    ↓
Component (Imports data)
    ↓
Template (Renders data)
    ↓
User sees content
```

**Example:**
```javascript
// constants.js
export const TECHNOLOGIES = [
  { name: 'React', category: 'Frontend' }
];

// TechStack.svelte
import { TECHNOLOGIES } from '../lib/constants.js';

{#each TECHNOLOGIES as tech}
  <div>{tech.name}</div>
{/each}
```

## 📚 Adding Content

### Add a Blog Post
1. Create `src/posts/my-post.md`
2. Add frontmatter:
```markdown
---
title: My Post Title
date: 2024-11-15
author: Mohamed Jridi
tags: [Tag1, Tag2]
excerpt: Brief description
---

# Content here...
```
3. Post automatically appears in blog!

### Add a Project
Edit `src/lib/constants.js`:
```javascript
export const PROJECTS = [
  {
    title: 'My Project',
    description: 'Description here',
    technologies: ['React', 'Node.js'],
    github: 'https://github.com/...',
    demo: 'https://demo.com'
  }
];
```

### Add a Technology
Edit `src/lib/constants.js`:
```javascript
export const TECHNOLOGIES = [
  { name: 'New Tech', category: 'Frontend' }
];
```

## 🧪 Best Practices

### 1. **Always Comment**
Every component has:
- File-level comment explaining purpose
- Section comments for major blocks
- Inline comments for complex logic

### 2. **Use Constants**
Never hardcode data in components:
```javascript
// ❌ Bad
const tech = 'React';

// ✅ Good
import { TECHNOLOGIES } from '../lib/constants.js';
```

### 3. **Semantic HTML**
Use proper HTML elements:
```html
<!-- ✅ Good -->
<section id="about">
  <h2>About Me</h2>
  <p>Content...</p>
</section>

<!-- ❌ Bad -->
<div id="about">
  <div class="title">About Me</div>
  <div>Content...</div>
</div>
```

### 4. **Accessibility**
- Use `aria-label` for icon buttons
- Include `alt` text for images
- Use semantic HTML
- Ensure keyboard navigation works

## 🚀 Deployment

### GitHub Pages
1. Update `vite.config.js` base path to match your repo name
2. Push to GitHub
3. Enable GitHub Pages in repo settings
4. Select "GitHub Actions" as source
5. Site deploys automatically on push to main

### Environment Variables
For production, update:
- `CONTACT_FORM_ENDPOINT` in `constants.js`
- `SOCIAL_LINKS` in `constants.js`
- Base path in `vite.config.js`

## 🐛 Debugging

### Common Issues

**Scroll spy not working?**
- Check section IDs match `NAV_SECTIONS` in constants
- Ensure sections have `id` attribute
- Check browser console for errors

**Styles not applying?**
- Check CSS variable names
- Verify scoped styles aren't conflicting
- Clear browser cache

**Build errors?**
- Run `npm install` to ensure dependencies are installed
- Check for syntax errors in components
- Verify all imports are correct

## 📖 Learning Resources

- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Vite Documentation](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

## 🤝 Contributing

When making changes:
1. Follow existing code style
2. Add comments for complex logic
3. Update constants instead of hardcoding
4. Test on mobile and desktop
5. Check accessibility

---

**Remember:** This portfolio is designed for easy maintenance. All content updates should happen in `src/lib/constants.js` or `src/posts/`. Component logic should rarely need changes.

