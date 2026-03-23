/**
 * Utility functions
 *
 * This file contains reusable helper functions used across the application.
 * Following the DRY (Don't Repeat Yourself) principle.
 */

/**
 * Smoothly scrolls to a section on the page
 *
 * @param {string} sectionId - The id of the section to scroll to
 * @example
 * scrollToSection('about') // Scrolls to <section id="about">
 */
export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Formats a date string into a readable format
 *
 * @param {string} dateString - ISO date string or any valid date format
 * @returns {string} Formatted date (e.g., "November 15, 2024")
 * @example
 * formatDate('2024-11-15') // Returns "November 15, 2024"
 */
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Debounces a function call
 * Useful for performance optimization on scroll/resize events
 *
 * @param {Function} func - The function to debounce
 * @param {number} wait - Milliseconds to wait before calling the function
 * @returns {Function} Debounced function
 * @example
 * const debouncedScroll = debounce(handleScroll, 100);
 * window.addEventListener('scroll', debouncedScroll);
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Resolves asset paths with base URL for GitHub Pages deployment
 *
 * @param {string} path - Absolute path from public root (e.g., "/img/pic.png")
 * @returns {string} The resolved path including base URL
 */
export function getAssetPath(path) {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Ensure base ends with slash
  const cleanBase = base.endsWith('/') ? base : base + '/';
  return cleanBase + cleanPath;
}
