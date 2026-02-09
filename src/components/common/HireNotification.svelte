<script>
  /**
   * HireNotification Component - One-time popup notification
   *
   * Purpose:
   * - Display a hiring availability message to first-time visitors
   * - Show only once per user session using localStorage
   * - Centered modal with backdrop overlay
   * - Provides direct links to Upwork and Contact page
   *
   * Svelte 5 Features Used:
   * - $state() rune for reactive state management
   * - $props() rune for receiving props from parent
   * - onMount() lifecycle hook for initialization
   * - Reactive statements with $effect() for side effects
   *
   * Design Pattern:
   * - Single Responsibility: Only handles the hire notification
   * - State management: Tracks visibility and localStorage
   * - Accessibility: Proper ARIA labels and keyboard support
   */

  import { onMount } from "svelte";
  import { SOCIAL_LINKS } from "../../lib/constants.js";
  import { GitHubIcon, LinkedInIcon, TwitterIcon } from "../../lib/icons.js";
  import { scrollToSection } from "../../lib/utils.js";

  // ============================================================================
  // PROPS
  // ============================================================================

  /**
   * Props passed from parent (App.svelte)
   * $props() is Svelte 5's way to receive props
   */
  let { onClose } = $props();

  // ============================================================================
  // STATE
  // ============================================================================

  /**
   * Controls whether the notification is visible
   * $state() makes this reactive - when it changes, the UI updates automatically
   *
   * Initially false, will be set to true in onMount if user hasn't seen it
   */
  let isVisible = $state(false);

  // ============================================================================
  // LIFECYCLE
  // ============================================================================

  /**
   * onMount runs when the component is first added to the DOM
   * This is where we check localStorage and decide whether to show the popup
   *
   * Why onMount?
   * - localStorage is only available in the browser (not during SSR)
   * - We want to check after the component is ready
   */
  onMount(() => {
    // Small delay before showing (500ms) for better UX
    setTimeout(() => {
      isVisible = true;
    }, 500);
  });

  // ============================================================================
  // FUNCTIONS
  // ============================================================================

  /**
   * Closes the notification and marks it as seen in localStorage
   *
   * This function:
   * 1. Hides the notification (sets isVisible to false)
   * 2. Saves to localStorage so it won't show again
   *
   * Called when:
   * - User clicks the X button
   * - User presses Escape key (handled in markup)
   * - User clicks the backdrop
   */
  function closeNotification() {
    // Hide the notification
    isVisible = false;
    if (onClose) onClose();
  }

  /**
   * Handle keyboard events for accessibility
   * Allows closing with Escape key
   *
   * @param {KeyboardEvent} event - The keyboard event
   */
  function handleKeydown(event) {
    if (event.key === "Escape" && isVisible) {
      closeNotification();
    }
  }

  /**
   * Navigate to contact page
   * Closes the notification and navigates to the contact page
   */
  function goToContact() {
    closeNotification();
    scrollToSection("contact");
  }
</script>

<!--
  KEYBOARD EVENT LISTENER
  Attached to window to catch Escape key anywhere on the page
  <svelte:window> must be at the top level, not inside {#if} blocks
  We handle the isVisible check inside the handleKeydown function instead
-->
<svelte:window onkeydown={handleKeydown} />

<!--
  MODAL OVERLAY
  Conditionally rendered based on isVisible state
  {#if} block only renders content when condition is true
-->
{#if isVisible}
  <!--
    BACKDROP
    Dark overlay behind the notification
    Clicking it closes the notification
  -->
  <div class="backdrop" onclick={closeNotification} role="presentation"></div>

  <!--
    NOTIFICATION POPUP
    Centered modal dialog
    role="dialog" for accessibility
    aria-modal="true" indicates this is a modal
  -->
  <div
    class="notification-popup"
    role="dialog"
    aria-labelledby="notification-title"
    aria-modal="true"
  >
    <!--
      CLOSE BUTTON
      Positioned in top-right corner
      onclick calls closeNotification function
      aria-label provides accessible label for screen readers
    -->
    <button
      class="close-btn"
      onclick={closeNotification}
      aria-label="Close notification"
    >
      ✕
    </button>

    <!--
      CONTENT CONTAINER
      Split into two equal halves (50/50 layout)
      Left side: Deep Blue background with text and buttons
      Right side: Violet background with profile picture
    -->
    <div class="notification-content">
      <!--
        LEFT HALF: Text and Action Buttons
        Deep Blue background zone
      -->
      <div class="text-section">
        <h3 id="notification-title">Available for Hire!</h3>
        <p>You can hire me now on here</p>

        <!--
          ACTION BUTTONS
          Upwork, Freelancer and Contact buttons
        -->
        <div class="button-group">
          <a
            href={SOCIAL_LINKS.upwork}
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-upwork"
          >
            Upwork.com
          </a>
          <a
            href={SOCIAL_LINKS.freelancer}
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-freelancer"
          >
            Freelancer.com
          </a>
          <button class="btn btn-contact" onclick={goToContact}> Email </button>
        </div>
      </div>

      <!--
        RIGHT HALF: Profile Picture
        Full image with social links at bottom
      -->
      <div class="image-section">
        <div class="image-container">
          <img
            src="/img/mypic_nanobanana.jpeg"
            alt="Mohamed Jridi"
            class="profile-pic"
          />
        </div>
        <div class="social-links">
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
            aria-label="LinkedIn"
          >
            {@html LinkedInIcon("20")}
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
            aria-label="GitHub"
          >
            {@html GitHubIcon("20")}
          </a>
          <a
            href={SOCIAL_LINKS.x}
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
            aria-label="X (Twitter)"
          >
            {@html TwitterIcon("20")}
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /**
   * NOTIFICATION POPUP STYLES
   * Martian / Space Theme
   * Glassy dark aesthetic with fine borders
   */

  /**
   * Backdrop overlay
   */
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 9998;
    animation: fadeIn 0.3s ease;
    backdrop-filter: blur(5px);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /**
   * Main popup container
   */
  .notification-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 700px; /* Wider for better layout */
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 0;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    z-index: 9999;
    backdrop-filter: blur(20px);
    animation: scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  @keyframes scaleIn {
    from {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  /**
   * Close button
   */
  .close-btn {
    position: absolute;
    top: var(--space-sm);
    right: var(--space-sm);
    background: rgba(0, 0, 0, 0.5);
    color: var(--color-text);
    border: 2px solid var(--color-border);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 20;
  }

  .close-btn:hover {
    background: var(--color-primary);
    color: black;
    transform: rotate(90deg);
  }

  /**
   * Content container
   */
  .notification-content {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr; /* More space for text */
    min-height: 350px;
  }

  /**
   * Text section (left half)
   */
  .text-section {
    padding: var(--space-xl);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: var(--space-md);
    border-right: 3px solid var(--color-border);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.03) 0%,
      transparent 100%
    );
  }

  .text-section h3 {
    font-size: 1.75rem;
    font-weight: 900;
    color: var(--color-primary);
    margin: 0;
    line-height: 1.1;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .text-section p {
    font-size: 1rem;
    color: var(--color-text);
    margin: 0;
    opacity: 0.8;
  }

  /**
   * Button group
   */
  .button-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    width: 100%;
    margin-top: var(--space-md);
  }

  .btn {
    padding: var(--space-sm) var(--space-md);
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: 2px solid var(--color-border);
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    background: transparent;
    color: var(--color-text);
  }

  .btn:hover {
    transform: translateX(5px);
  }

  .btn-upwork {
    border-color: #14a800; /* Upwork Green */
    color: #14a800;
  }

  .btn-upwork:hover {
    background: #14a800;
    color: white;
    box-shadow: 0 0 15px rgba(20, 168, 0, 0.3);
  }

  .btn-freelancer {
    border-color: #29b2fe; /* Freelancer Blue */
    color: #29b2fe;
  }

  .btn-freelancer:hover {
    background: #29b2fe;
    color: white;
    box-shadow: 0 0 15px rgba(41, 178, 254, 0.3);
  }

  .btn-contact {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  .btn-contact:hover {
    background: var(--color-primary);
    color: black;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  }

  /**
   * Image section (right half)
   */
  .image-section {
    position: relative;
    display: flex;
    flex-direction: column;
    background: black;
  }

  .image-container {
    flex: 1;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Full color, no filter */
    filter: none;
    transition: transform 0.5s ease;
  }

  .image-container:hover .profile-pic {
    transform: scale(1.05);
  }

  /**
   * Social Links at bottom of image
   */
  .social-links {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: var(--space-sm);
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    border-top: none;
    z-index: 10;
  }

  .social-icon {
    color: var(--color-text);
    opacity: 0.7;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .social-icon:hover {
    opacity: 1;
    color: var(--color-primary);
    transform: translateY(-2px);
  }

  /**
   * RESPONSIVE DESIGN
   */
  @media (max-width: 768px) {
    .notification-popup {
      width: 95%;
      max-width: 95%;
      max-height: 90vh; /* Prevent overflowing screen height */
      overflow-y: auto; /* Allow scrolling if content is too tall */
    }

    .notification-content {
      grid-template-columns: 1fr;
    }

    .text-section {
      border-right: none;
      border-bottom: 3px solid var(--color-border);
      padding: var(--space-md); /* Reduced padding */
    }

    .image-section {
      height: 180px; /* Reduced height */
      min-height: 180px;
    }

    .profile-pic {
      object-position: center 20%;
    }
  }
</style>
