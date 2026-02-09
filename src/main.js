/**
 * Main entry point for the portfolio application
 *
 * This file handles:
 * - Base styles import
 * - Theme initialization (light mode only)
 * - App component mounting
 *
 * Design Philosophy:
 * - Neo-brutalism design with clean, bold aesthetics
 * - Light mode with vibrant accent colors
 */

import './app.css'
import { mount } from 'svelte'
import App from './App.svelte'
// Theme initialization removed

/**
 * Mount the main App component
 * This renders the entire portfolio application
 */
const app = mount(App, {
  target: document.getElementById('app'),
})

export default app

