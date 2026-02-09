/**
 * Scroll Spy - Tracks which section is currently visible
 * 
 * This is a Svelte 5 rune-based module that uses the Intersection Observer API
 * to detect which section is currently in view and update the navigation accordingly.
 * 
 * The .svelte.js extension allows us to use Svelte runes ($state, $effect) in a
 * regular JavaScript file, making it a reactive module.
 */

/**
 * Creates a scroll spy instance
 * 
 * @param {string[]} sectionIds - Array of section IDs to observe
 * @returns {Object} Object with activeSection state and cleanup function
 * 
 * @example
 * // In a Svelte component:
 * import { createScrollSpy } from '$lib/scrollSpy.svelte.js';
 * 
 * const { activeSection, cleanup } = createScrollSpy(['hero', 'about', 'contact']);
 * 
 * onMount(() => {
 *   return cleanup; // Cleanup on component unmount
 * });
 */
export function createScrollSpy(sectionIds) {
  // Reactive state to track the currently active section
  // $state() makes this value reactive - when it changes, components re-render
  let activeSection = $state(sectionIds[0] || '');

  // Store for the IntersectionObserver instance
  let observer = null;

  /**
   * Initialize the Intersection Observer
   * This watches for when sections enter/leave the viewport
   */
  function init() {
    // Configuration for the observer
    // rootMargin: Trigger when section enters the middle third of viewport
    // threshold: Multiple thresholds for better detection
    const options = {
      root: null, // Use viewport as root
      rootMargin: '-30% 0px -50% 0px', // Trigger zone in the middle portion of viewport
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] // Multiple thresholds for better detection
    };

    /**
     * Callback function called when intersection changes
     * @param {IntersectionObserverEntry[]} entries - Array of observed elements
     */
    // Track intersection state of all sections
    const sectionStates = new Map();

    /**
     * Callback function called when intersection changes
     * @param {IntersectionObserverEntry[]} entries - Array of observed elements
     */
    const callback = (entries) => {
      // Update state for changed entries
      entries.forEach(entry => {
        sectionStates.set(entry.target.id, entry);
      });

      // Find the most visible section from ALL tracked sections
      let maxRatio = 0;
      let mostVisibleId = '';

      sectionStates.forEach((entry, id) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleId = id;
        }
      });

      // Update active section if we found a visible one
      if (mostVisibleId) {
        activeSection = mostVisibleId;
      }
    };

    // Create the observer
    observer = new IntersectionObserver(callback, options);

    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
  }

  /**
   * Cleanup function to disconnect the observer
   * Important to prevent memory leaks
   */
  function cleanup() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  // Initialize the observer
  init();

  // Return the reactive state and cleanup function
  return {
    // Getter for activeSection - allows components to read the value
    get activeSection() {
      return activeSection;
    },
    cleanup
  };
}

