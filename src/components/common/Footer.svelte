<script>
  /**
   * Footer Component - Site footer
   *
   * Features:
   * - Quick links to sections and pages
   * - Social media links
   * - Copyright notice with dynamic year
   *
   * Svelte 5 Features:
   * - $props() for receiving props from parent
   * - {new Date().getFullYear()} - JavaScript expression in template
   * - Reactive to data from constants
   *
   * Design Pattern:
   * - Links from constants file (DRY)
   * - Semantic HTML (footer, nav elements)
   * - Responsive grid layout
   */

  import { NAV_SECTIONS, SOCIAL_LINKS } from "../../lib/constants.js";
  import { GitHubIcon, LinkedInIcon, EmailIcon } from "../../lib/icons.js";

  // ============================================================================
  // PROPS
  // ============================================================================

  /**
   * Props passed from parent (App.svelte)
   * $props() is Svelte 5's way to receive props
   */
  import { translations } from "../../lib/translations.js";

  /**
   * Props passed from parent (App.svelte)
   * $props() is Svelte 5's way to receive props
   */
  let { currentLang = "en", onNavigate = () => {} } = $props();
</script>

<!--
  FOOTER
  Semantic <footer> element for better accessibility
-->
<footer class="footer">
  <img
    src="/updated_clean_all.svg"
    alt=""
    class="bg-decoration"
    aria-hidden="true"
  />
  <div class="container">
    <div class="footer-content">
      <!-- About section -->
      <div class="footer-section">
        <h3>Mohamed Jridi</h3>
        <p>
          {translations[currentLang].footer.about}
        </p>
        <p class="copyright">
          &copy; {new Date().getFullYear()} Mohamed Jridi
          <span class="flags">
            <span style="font-size: 16px;">🇹🇳</span>
            <span style="font-size: 16px;">🇩🇪</span>
          </span>
          . {translations[currentLang].footer.copyright}
        </p>
      </div>

      <!-- Quick links to sections and pages -->
      <div class="footer-section">
        <h4>{translations[currentLang].footer.links}</h4>
        <ul>
          <!-- Generate links from NAV_SECTIONS constant -->
          {#each NAV_SECTIONS as section}
            <li>
              <button
                onclick={() =>
                  onNavigate(section.id === "hero" ? "home" : section.id)}
              >
                {section.id === "hero"
                  ? translations[currentLang].nav.home
                  : translations[currentLang].nav[section.id]}
              </button>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Social media links -->
      <div class="footer-section">
        <h4>{translations[currentLang].footer.connect}</h4>
        <ul>
          <li>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >
              <span class="icon">{@html GitHubIcon("18")}</span>
              GitHub
            </a>
          </li>
          <li>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >
              <span class="icon">{@html LinkedInIcon("18")}</span>
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>

<style>
  /**
   * FOOTER STYLES
   * Dark footer with light text and links
   */

  .footer {
    background: var(--color-bg);
    color: var(--color-text);
    padding: var(--space-2xl) 0 var(--space-lg);
    border-top: var(--border-width) solid var(--color-border);
    position: relative;
    overflow: hidden;
  }

  .bg-decoration {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: auto;
    opacity: 0.05;
    pointer-events: none;
    z-index: 0;
  }

  .container {
    position: relative;
    z-index: 1;
  }

  /*
   * Three-column grid layout
   * First column is wider (2fr) for the about section
   */
  .footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: var(--space-xl);
    margin-bottom: var(--space-xl);
  }

  /* Section headings */
  .footer-section h3 {
    color: var(--color-primary);
    margin-bottom: var(--space-sm);
  }

  .footer-section h4 {
    color: var(--color-secondary);
    margin-bottom: var(--space-sm);
    font-size: 1rem; /* Reduced for compact feel */
  }

  .footer-section p {
    color: var(--color-text);
    line-height: 1.6;
  }

  /* Remove default list styling */
  .footer-section ul {
    list-style: none;
    padding: 0;
  }

  .footer-section li {
    margin-bottom: var(--space-xs);
  }

  /*
   * Link and button styles
   * Buttons styled to look like links for consistency
   */
  .footer-section a,
  .footer-section button {
    color: var(--color-text);
    text-decoration: none;
    transition: all 0.2s ease;
    background: none;
    border: none;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    text-align: left;
  }

  .footer-section a:hover,
  .footer-section button:hover {
    color: var(--color-primary);
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  /* Social links with icons */
  .social-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
  }

  .social-link .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .copyright {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
    margin-top: var(--space-md);
    color: var(--color-accent);
    font-size: 0.875rem;
  }

  .flags {
    display: inline-flex;
    gap: 4px;
    margin: 0 4px;
    vertical-align: middle;
  }

  /*
   * RESPONSIVE DESIGN
   * Single column layout on mobile
   */
  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: var(--space-lg);
    }
  }
</style>
