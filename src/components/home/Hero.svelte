<script>
  /**
   * Hero Component - Landing section of the portfolio
   *
   * This is the first section visitors see. It includes:
   * - Introduction text with name and title
   * - Dynamic "Role" text that scrambles on load
   * - Call-to-action buttons
   * - Background video with "mysterious ripples" effect
   *
   * Svelte 5 Features:
   * - $props() for receiving props from parent
   * - onMount: Lifecycle function that runs after component is added to DOM
   * - $state: Reactive state for animation trigger
   * - class:animate-in: Conditional class binding for entrance animation
   */

  import { onMount } from "svelte";
  import { translations } from "../../lib/translations.js";
  import { scrollToSection } from "../../lib/utils.js";

  import ParticleBackground from "../common/ParticleBackground.svelte";

  // ============================================================================
  // PROPS
  // ============================================================================

  /**
   * Props passed from parent (App.svelte)
   * $props() is Svelte 5's way to receive props
   */
  let { currentLang, startAnimation = false, isExiting = false } = $props();

  // ============================================================================
  // STATE
  // ============================================================================

  /**
   * Controls the entrance animation
   * Starts as false, set to true after component mounts
   * This creates a smooth fade-in effect when the page loads
   */
  let visible = $state(false);

  /**
   * Dynamic Text State
   */
  let displayRole1 = $state("");
  let displayRole2 = $state("");

  // ============================================================================
  // LIFECYCLE
  // ============================================================================

  /**
   * Scramble Text Effect Helper
   * Randomly changes characters before settling on the target word
   */
  const scramble = (targetText, setDisplay) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let iterations = 0;
    let animationId;
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime;

      // Only update every ~30ms
      if (deltaTime < 30) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      lastTime = currentTime;

      const current = targetText
        .split("")
        .map((letter, index) => {
          if (index < iterations) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplay(current);

      if (iterations >= targetText.length) {
        setDisplay(targetText); // Ensure final word is correct
        cancelAnimationFrame(animationId);
        return;
      }

      iterations += 1; // Speed of revealing (was 1/3)
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  };

  /**
   * onMount runs once after the component is first rendered
   * We use it to trigger the entrance animation and scramble effects
   */
  /**
   * onMount runs once after the component is first rendered
   * We use it to trigger the entrance animation
   */
  onMount(() => {
    visible = true;

    // Trigger scramble for both roles on load
    const cleanup1 = scramble(
      translations[currentLang].hero.role1,
      (val) => (displayRole1 = val),
    );

    let cleanup2;
    setTimeout(() => {
      cleanup2 = scramble(
        translations[currentLang].hero.role2,
        (val) => (displayRole2 = val),
      );
    }, 200);

    return () => {
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
    };
  });

  /**
   * Effect to trigger scramble animation when startAnimation becomes true
   */
  $effect(() => {
    if (startAnimation) {
      // Trigger scramble for both roles
      // We use a slight delay for the second one for a cascading effect, or simultaneous
      const cleanup1 = scramble(
        translations[currentLang].hero.role1,
        (val) => (displayRole1 = val),
      );

      // Small delay for the second line to make it look techy
      let cleanup2;
      setTimeout(() => {
        cleanup2 = scramble(
          translations[currentLang].hero.role2,
          (val) => (displayRole2 = val),
        );
      }, 200);

      // Cleanup
      return () => {
        if (cleanup1) cleanup1();
        if (cleanup2) cleanup2();
      };
    }
  });
</script>

<!--
  HERO SECTION
  id="hero" allows navigation to scroll to this section
  The section element is semantic HTML5 for better accessibility
-->
<section id="hero" class="hero section">
  <ParticleBackground zoom={isExiting} />
  <div class="container">
    <!--
      class:animate-in={visible} is Svelte's conditional class syntax
      When visible is true, the "animate-in" class is added
    -->
    <div
      class="hero-content"
      class:animate-in={visible}
      class:exit-animation={isExiting}
    >
      <!-- LEFT SIDE: Text content -->
      <div class="hero-text">
        <p class="subtitle">{translations[currentLang].hero.subtitle}</p>

        <!-- Big Roles -->
        <div class="roles-container">
          <h1 class="dynamic-role">{displayRole1}</h1>
          <h1 class="dynamic-role">{displayRole2}</h1>
        </div>

        <p class="description">
          {translations[currentLang].hero.description}
        </p>
      </div>

      <!-- Call-to-action buttons -->
      <div class="hero-actions">
        <button
          onclick={() => scrollToSection("contact")}
          class="btn btn-contact">{translations[currentLang].hero.cta}</button
        >
        <div class="resume-wrapper">
          <a
            href="/docs/resume_nocontact.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-resume-hero"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="download-icon"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            {translations[currentLang].hero.resume}
          </a>
          <img src="/icons/docs.png" alt="" class="resume-ribbon" />
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /**
   * HERO SECTION STYLES
   * Martian / Space Theme
   */

  /* Main hero container - covers full page from top */
  .hero {
    height: 100vh; /* Force full viewport height */
    max-height: 100vh; /* Prevent scrolling within the section if content overflows (shouldn't with this design) */
    display: flex;
    align-items: center; /* Center content vertically */
    justify-content: center;
    background: var(--color-bg); /* Deep Space Black */
    position: relative;
    padding-top: 0; /* Remove padding to center perfectly */
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
    /* border-bottom removed */
    overflow: hidden; /* Contain video and prevent scrollbars */
  }

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* Content grid */
  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-lg);
    text-align: center;
    /* Entrance animation - starts invisible and slides up */
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out;
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    z-index: 1; /* Above canvas */
  }

  /* Animation class added after mount */
  .hero-content.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  /* Exit animation - Fade out with slight movement */
  .hero-content.exit-animation {
    opacity: 0;
    transform: translateY(20px); /* Just move down slightly while fading */
    transition: all 0.8s ease-in; /* Smooth fade out */
    pointer-events: none;
  }

  /* Text content styles */
  .hero-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
  }

  .subtitle {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: var(--space-xs);
    color: #000000;
    letter-spacing: 0.05em;
  }

  .roles-container {
    display: flex;
    flex-direction: column;
    gap: 0; /* Tight spacing between the two big lines */
    margin-bottom: var(--space-sm);
  }

  .dynamic-role {
    font-family: "Courier New", Courier, monospace; /* Tech/Code font */
    font-size: 4.5rem; /* BIG letters */
    font-weight: 700;
    color: var(--color-text);
    letter-spacing: 0.05em;
    line-height: 1.1;
    margin: 0;
  }

  /* Mobile responsiveness for dynamic text */
  @media (max-width: 768px) {
    .dynamic-role {
      font-size: 2.5rem;
    }
  }

  .description {
    font-size: 1rem;
    margin-top: var(--space-xs);
    margin-bottom: var(--space-lg);
    color: var(--color-secondary); /* Sand color */
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  /* Action buttons container */
  .hero-actions {
    display: flex;
    gap: var(--space-md);
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  /* GET IN TOUCH button - Transparent with solid border */
  .btn-contact {
    background: transparent !important;
    color: var(--color-text);
    border: 2px solid #000000;
    border-radius: 50px;
    padding: var(--space-sm) var(--space-lg);
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-family: var(--font-mono);
    height: 48px; /* Fixed height for consistency */
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .btn-contact:hover {
    background: rgba(0, 0, 0, 0.05);
    border: 2px solid var(--color-primary);
    transform: translateY(-1px);
    margin: 0;
  }

  /* Download Resume button - Solid black background with icon */
  .btn-resume-hero {
    background: #000000;
    color: #ffffff;
    border: 2px solid #000000;
    border-radius: 50px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    padding: var(--space-sm) var(--space-lg);
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-family: var(--font-mono);
    height: 48px; /* Fixed height for consistency */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    text-decoration: none;
  }

  .btn-resume-hero:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
    background: transparent;
    color: #000000;
    border: 2px solid #000000;
    margin: 0;
  }

  .btn-resume-hero .download-icon {
    width: 16px;
    height: 16px;
  }

  /* Wrapper to allow ribbon to overflow button */
  .resume-wrapper {
    position: relative;
    display: inline-block;
  }

  /* Ribbon decoration for resume button */
  .resume-ribbon {
    position: absolute;
    top: -35px;
    right: -10px;
    width: 50px;
    height: auto;
    pointer-events: none;
    z-index: 10;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    transition: transform 0.3s ease;
  }

  /* Animate ribbon when wrapper (button) is hovered */
  .resume-wrapper:hover .resume-ribbon {
    transform: scale(1.1);
  }
</style>
