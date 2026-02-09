<script>
  /**
   * Navigation Component - Sticky navigation bar
   *
   * Features:
   * - Scroll spy: Auto-highlights current section as you scroll
   * - Smooth scrolling to sections
   * - Mobile responsive with hamburger menu
   *
   * Svelte 5 Features:
   * - $state() for reactive state
   * - onMount/onDestroy for lifecycle management
   * - class: directive for conditional classes
   *
   * Design Pattern:
   * - Separation of concerns: scroll spy logic in separate module
   * - Event handlers for navigation
   * - Accessibility: aria-label for icon buttons
   */

  import { onMount, onDestroy } from "svelte";
  import { NAV_SECTIONS, SOCIAL_LINKS } from "../../lib/constants.js";
  import { scrollToSection } from "../../lib/utils.js";
  import { createScrollSpy } from "../../lib/scrollSpy.svelte.js";
  import { translations } from "../../lib/translations.js";

  /**
   * Props
   */
  let { currentLang, setLang, onNavigate, activePage = "home" } = $props();

  // ============================================================================
  // STATE
  // ============================================================================

  /**
   * Mobile menu open/closed state
   * $state() makes this reactive
   */
  let mobileMenuOpen = $state(false);

  /**
   * Scroll position state
   * Used to hide navbar border when at top of page
   */
  let isAtTop = $state(true);

  /**
   * Scroll spy instance
   * Tracks which section is currently visible
   */
  let scrollSpy = null;

  /**
   * Active section from scroll spy
   * This is a derived value that updates as user scrolls
   */
  let activeSection = $state("hero");

  // ============================================================================
  // LIFECYCLE
  // ============================================================================

  /**
   * Initialize scroll spy and scroll listener when component mounts
   */
  onMount(() => {
    // Initialize scroll spy with all section IDs
    const sectionIds = NAV_SECTIONS.map((s) => s.id);
    scrollSpy = createScrollSpy(sectionIds);

    /**
     * Scroll event handler
     * Updates isAtTop state to hide/show navbar border
     */
    function handleScroll() {
      isAtTop = window.scrollY < 10;
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function - removes scroll listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  /**
   * Cleanup scroll spy when component unmounts
   * Prevents memory leaks
   */
  onDestroy(() => {
    if (scrollSpy) {
      scrollSpy.cleanup();
    }
  });

  // ============================================================================
  // FUNCTIONS
  // ============================================================================

  /**
   * Scrolls to a section
   * @param {string} sectionId - ID of the section to scroll to
   */
  function handleSectionClick(sectionId) {
    if (activePage !== "home") {
      onNavigate("home");
      // Wait for navigation then scroll
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
    mobileMenuOpen = false;
  }

  /**
   * Reactive statement to update activeSection from scroll spy
   * $: runs whenever scrollSpy changes
   */
  $effect(() => {
    if (scrollSpy) {
      activeSection = scrollSpy.activeSection;
    }
  });
</script>

<!--
  NAVIGATION BAR
  Simple top bar without sticky positioning
-->
<nav class="nav">
  <div class="nav-content">
    <!-- Mobile menu toggle button (hamburger icon) -->
    <button
      class="mobile-toggle"
      onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Left section: Logo + Navigation links -->
    <div class="left-section">
      <!-- Logo text - navigates to home -->
      <div
        class="logo"
        onclick={() => onNavigate("home")}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === "Enter" && onNavigate("home")}
      >
        <img src="/vectors/logo-mj.svg" alt="MJ Logo" class="logo-img" />
      </div>

      <!-- Navigation links -->
      <div class="nav-links">
        <button
          onclick={() => onNavigate("home")}
          class:active={activePage === "home"}
          >{translations[currentLang].nav.home}</button
        >

        <button
          onclick={() => onNavigate("experience")}
          class:active={activePage === "experience"}
          >{translations[currentLang].nav.experience}</button
        >

        <button
          onclick={() => onNavigate("projects")}
          class:active={activePage === "projects"}
          >{translations[currentLang].nav.projects}</button
        >

        <button
          onclick={() => onNavigate("contact")}
          class:active={activePage === "contact"}
          >{translations[currentLang].nav.contact}</button
        >

        <!-- Separator -->
        <span class="nav-separator">|</span>

        <button
          onclick={() => onNavigate("blog")}
          class:active={activePage === "blog"}
          >{translations[currentLang].nav.blog}</button
        >
      </div>
    </div>

    <!-- Right side: Social media icons + Download Resume button + Language flags -->
    <div class="right-section">
      <!-- Social media icons -->
      <div class="social-icons">
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          class="social-icon"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
        </a>
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          class="social-icon"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </a>
        <a
          href={SOCIAL_LINKS.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          class="social-icon"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            />
          </svg>
        </a>
      </div>

      <!-- Language flags -->
      <div class="flags">
        <button
          class="flag-btn"
          class:active={currentLang === "en"}
          onclick={(e) => {
            e.stopPropagation();
            setLang("en");
          }}
          aria-label="Switch to English"
        >
          <span style="font-size: 24px;">🇬🇧</span>
        </button>
        <button
          class="flag-btn"
          class:active={currentLang === "de"}
          onclick={(e) => {
            e.stopPropagation();
            setLang("de");
          }}
          aria-label="Switch to German"
        >
          <span style="font-size: 24px;">🇩🇪</span>
        </button>
      </div>
    </div>

    <!-- Mobile menu (hidden by default) -->
    <div class="mobile-menu" class:open={mobileMenuOpen}>
      {#each NAV_SECTIONS as section}
        <button
          onclick={() => handleSectionClick(section.id)}
          class:active={activeSection === section.id}
        >
          {section.id === "hero"
            ? translations[currentLang].nav.home
            : translations[currentLang].nav[section.id]}
        </button>
      {/each}
    </div>
  </div>
</nav>

<style>
  /**
   * NAVIGATION STYLES
   * Simple top bar without sticky positioning
   */

  /*
   * Main navigation container
   * Static positioning at top of page
   */
  /*
   * Main navigation container
   * Absolute positioning at top of page to overlay background
   */
  .nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: transparent;
  }

  /*
   * Navigation content container
   * Full width bar with left and right sections
   */
  .nav-content {
    width: 100%;
    padding: 5px var(--space-xl);
    background: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-lg);
  }

  /*
   * Left section - Logo + Navigation links
   */
  .left-section {
    display: flex;
    align-items: center;
    gap: var(--space-xl);
  }

  /*
   * Logo
   */
  .logo {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    position: relative;
  }

  /* Hover effect - slight scale */
  .logo:hover .logo-img {
    transform: scale(1.05);
  }

  /*
   * Logo text styling
   */
  /*
   * Logo image styling
   */
  .logo-img {
    height: 40px;
    width: auto;
    transition: all 0.2s ease;
    display: block;
    margin-top: 15px;
  }

  /*
   * Navigation links
   */
  .nav-links {
    display: flex;
    gap: var(--space-lg);
    align-items: center;
  }

  .nav-links button {
    background: none;
    border: none;
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--color-text);
    cursor: pointer;
    padding: var(--space-xs) 0;
    transition: all 0.2s ease;
    font-family: var(--font-gantari);
    position: relative;
  }

  .nav-links button:hover {
    color: var(--color-primary);
  }

  .nav-links button.active {
    color: var(--color-primary);
    font-weight: 700;
  }

  /*
   * Navigation separator
   */
  .nav-separator {
    color: var(--color-text);
    opacity: 0.3;
    font-size: 0.9rem;
    user-select: none;
  }

  /*
   * Language flags
   */
  .flags {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .flag-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
    opacity: 0.5;
    display: flex;
    align-items: center;
  }

  .flag-btn:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }

  .flag-btn.active {
    opacity: 1;
    transform: scale(1.1);
  }

  /*
   * Right section container - holds social icons, flags, and resume button
   */
  .right-section {
    display: flex;
    gap: var(--space-md);
    align-items: center;
  }

  /*
   * Social media icons container
   */
  .social-icons {
    display: flex;
    gap: var(--space-md);
    align-items: center;
  }

  /*
   * Individual social icon
   */
  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: var(--color-text);
    transition: all 0.2s ease;
  }

  .social-icon:hover {
    color: var(--color-primary);
    transform: scale(1.1);
  }

  .social-icon:active {
    transform: scale(0.95);
  }

  /* SVG icon sizing */
  .social-icon svg {
    width: 20px;
    height: 20px;
  }

  /*
   * Mobile menu toggle (hamburger icon)
   * Hidden on desktop, shown on mobile
   */
  .mobile-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-xs);
  }

  /* Hamburger icon lines */
  .mobile-toggle span {
    width: 25px;
    height: 2px;
    background: var(--color-text);
    transition: all 0.3s ease;
  }

  /*
   * Mobile menu (hidden by default)
   */
  .mobile-menu {
    display: none;
    flex-direction: column;
    width: 100%;
    background: #fafafa;
    padding: 0;
    margin: 0;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition:
      max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.2s ease,
      padding 0.3s ease;
  }

  /* Open state */
  .mobile-menu.open {
    max-height: 500px;
    opacity: 1;
    padding: var(--space-md) 0;
  }

  .mobile-menu button {
    background: none;
    border: none;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text);
    cursor: pointer;
    padding: var(--space-sm) var(--space-md);
    transition: all 0.2s ease;
    text-align: left;
    width: 100%;
  }

  .mobile-menu button:hover {
    background: rgba(0, 0, 0, 0.05);
    color: var(--color-primary);
  }

  .mobile-menu button.active {
    color: var(--color-primary);
    font-weight: 700;
  }

  /*
   * RESPONSIVE DESIGN
   * Mobile menu
   */
  @media (max-width: 768px) {
    /* Show hamburger menu on mobile */
    .mobile-toggle {
      display: flex;
    }

    .nav-content {
      padding: var(--space-sm) var(--space-md);
      flex-wrap: wrap;
    }

    /* Hide right section on mobile */
    .right-section {
      display: none;
    }

    /* Show mobile menu */
    .mobile-menu {
      display: flex;
    }
  }
</style>
