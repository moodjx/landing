<script>
  import { onMount } from "svelte";

  // ============================================================================
  // IMPORTS
  // ============================================================================

  // Component imports - each represents a section or feature
  import Navigation from "./components/common/Navigation.svelte";
  import Footer from "./components/common/Footer.svelte";
  import HireNotification from "./components/common/HireNotification.svelte";

  // Page imports
  import Home from "./pages/Home.svelte";
  import Experience from "./pages/Experience.svelte";
  import Contact from "./pages/Contact.svelte";
  import Projects from "./pages/Projects.svelte";
  import Blog from "./pages/Blog.svelte";

  // ============================================================================
  // CONSTANTS
  // ============================================================================

  const BASE_PATH = "";

  // ============================================================================
  // STATE
  // ============================================================================

  /**
   * Current language state
   * 'en' or 'de'
   */
  let currentLang = $state("en");

  /**
   * Hire Popup State
   * Tracks if the hire popup has been closed to trigger Hero animation
   */
  let hirePopupClosed = $state(false);

  /**
   * Current Page State
   * 'home' or 'experience'
   */
  let currentPage = $state("home");

  /**
   * Transition State
   * 'idle', 'exiting'
   */
  let transitionState = $state("idle");

  // ============================================================================
  // FUNCTIONS
  // ============================================================================

  /**
   * Handles navigation and URL updates
   * @param {string} path - The relative path to navigate to (e.g., '/en/home')
   */
  function navigate(path) {
    const fullPath = path.startsWith(BASE_PATH) ? path : `${BASE_PATH}${path}`;
    window.history.pushState({}, "", fullPath);
    handleUrlChange();
  }

  /**
   * Parses the current URL and updates state
   */
  function handleUrlChange() {
    const path = window.location.pathname;

    // Normalize path by removing base path
    let relativePath = path;
    if (path.startsWith(BASE_PATH)) {
      relativePath = path.slice(BASE_PATH.length);
    }

    // Handle root redirect
    if (relativePath === "/" || relativePath === "") {
      window.history.replaceState({}, "", `${BASE_PATH}/en/home`);
      currentLang = "en";
      currentPage = "home";
      return;
    }

    // Parse path segments (e.g., /en/home -> ['', 'en', 'home'])
    const segments = relativePath.split("/").filter(Boolean);

    // Handle /:lang/:page
    if (segments.length >= 1) {
      const lang = segments[0];
      if (lang === "en" || lang === "de") {
        currentLang = lang;
      }

      if (segments.length >= 2) {
        const page = segments[1];
        if (
          ["home", "experience", "contact", "projects", "blog"].includes(page)
        ) {
          currentPage = page;
        }
      } else {
        // If only language is present, default to home
        navigate(`/${currentLang}/home`);
      }
    }
  }

  /**
   * Changes the language
   */
  function setLang(lang) {
    navigate(`/${lang}/${currentPage}`);
  }

  /**
   * Handles page navigation with transition
   */
  function goToPage(page) {
    if (currentPage === page) return;

    // Trigger exit animation when leaving home page to ANY other page
    if (currentPage === "home") {
      // Start exit animation
      transitionState = "exiting";

      // Wait for animation to finish before switching content
      setTimeout(() => {
        currentPage = page;
        transitionState = "idle";
        window.scrollTo(0, 0);
        navigate(`/${currentLang}/${page}`);
      }, 800); // Match CSS transition duration
    } else {
      // Standard navigation for other pages
      currentPage = page;
      window.scrollTo(0, 0);
      navigate(`/${currentLang}/${page}`);
    }
  }

  onMount(() => {
    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);

    // Listen for custom navigate events from components
    const handleNavigateEvent = (event) => {
      goToPage(event.detail);
    };
    window.addEventListener("navigate", handleNavigateEvent);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("navigate", handleNavigateEvent);
    };
  });
</script>

<!--
  NAVIGATION
  Sticky navigation bar that stays at the top of the page
  Props passed:
  - currentLang: Current language state
  - setLang: Function to change language
  - onNavigate: Function to handle page navigation
-->
<Navigation
  {currentLang}
  {setLang}
  onNavigate={goToPage}
  activePage={currentPage}
/>

<!--
  MAIN CONTENT
  Renders all sections
-->
<main>
  {#if currentPage === "home"}
    <!-- HOME PAGE SECTIONS -->
    <Home
      {currentLang}
      startAnimation={hirePopupClosed}
      isExiting={transitionState === "exiting"}
    />
  {:else if currentPage === "experience"}
    <Experience {currentLang} />
  {:else if currentPage === "contact"}
    <Contact {currentLang} />
  {:else if currentPage === "projects"}
    <Projects {currentLang} />
  {:else if currentPage === "blog"}
    <Blog {currentLang} />
  {/if}
</main>

<!--
  FOOTER
  Site footer with links and copyright info 
-->
<Footer {currentLang} onNavigate={goToPage} />

<!--
  HIRE NOTIFICATION
  One-time popup notification for hiring availability
  Automatically shows on first visit and tracks with localStorage
-->
<HireNotification onClose={() => (hirePopupClosed = true)} />

<style>
  /**
   * Main content container
   * min-height ensures the page is at least full viewport height
   */
  main {
    min-height: 100vh;
  }
</style>
