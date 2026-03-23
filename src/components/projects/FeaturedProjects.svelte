<script>
  /**
   * Featured Projects Component - Minimalistic card design
   *
   * Displays projects with:
   * - Clean white background cards
   * - Small, compact layout
   * - Button-like styling (rounded corners, subtle shadows)
   * - Horizontal layout for multiple cards per row
   *
   * Design Pattern:
   * - Data imported from constants file (Single Source of Truth)
   * - Grid layout with multiple small cards per row
   * - External links open in new tab (target="_blank")
   * - rel="noopener noreferrer" for security
   *
   * Svelte Features:
   * - {#each} loop for projects
   * - Nested {#each} for technologies
   * - Dynamic href attributes
   */

  import { translations } from "../../lib/translations.js";
  import { GitHubIcon } from "../../lib/icons.js";
  import DecorativeShape from "../common/DecorativeShape.svelte";
  import { getAssetPath } from "../../lib/utils.js";

  let { currentLang = "en" } = $props();
</script>

<!--
  FEATURED PROJECTS SECTION
  id="projects" allows navigation to scroll to this section
-->
<section id="projects" class="projects section">
  <!-- Decorative Shapes -->
  <DecorativeShape variant="green" className="shape-green" />
  <DecorativeShape variant="pink" className="shape-pink" />
  <DecorativeShape variant="blue" className="shape-blue" />
  <DecorativeShape variant="orange" className="shape-orange" />

  <!-- New Vertical Decoration -->
  <img
    src={getAssetPath("/vectors/verticle-xs.svg")}
    alt=""
    class="decorative-vertical"
  />

  <div class="container">
    <!-- Section title -->
    <div class="section-header">
      <h2 class="section-title">{translations[currentLang].nav.projects}..</h2>
    </div>

    <!--
      Projects grid - minimalistic card layout
      Small cards displayed horizontally
    -->
    <div class="projects-grid">
      <!-- Loop through projects -->
      {#each translations[currentLang].projects as project (project.title)}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          class="project-card"
        >
          <!-- Card content -->
          <div class="card-content">
            <h3 class="project-title">{project.title}</h3>
            <p class="project-description">{project.description}</p>

            <!-- Technologies used in this project -->
            <div class="project-tech">
              {#each project.technologies as tech (tech)}
                <span class="tech-tag">{tech}</span>
              {/each}
            </div>

            <!-- GitHub icon indicator -->
            <div class="project-icon">
              {@html GitHubIcon("16")}
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  /**
   * MINIMALISTIC PROJECTS SECTION
   *
   * Design Features:
   * - Clean white background cards
   * - Small, compact cards
   * - Button-like styling (rounded corners, subtle shadows)
   * - Horizontal grid layout
   * - Inspired by hero section button design
   */

  .projects {
    background: var(--color-bg);
    position: relative;
    overflow: hidden; /* Ensure SVG doesn't overflow */
  }

  /* Shape positioning */
  :global(.shape-green) {
    top: 10%;
    right: 45%;
    width: 120px;
    opacity: 0.6;
  }
  :global(.shape-pink) {
    bottom: 20px;
    left: 5%;
    width: 150px;
    opacity: 0.6;
  }
  :global(.shape-blue) {
    top: 40%;
    left: 2%;
    width: 90px;
    opacity: 0.4;
  }
  :global(.shape-orange) {
    bottom: 20%;
    right: 35%;
    width: 100px;
    opacity: 0.4;
  }

  .decorative-vertical {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    height: 80%;
    width: auto;
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
  }

  /**
   * Container - standard width, centered
   */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-md);
    position: relative;
    z-index: 1;
  }

  /**
   * Section Header - Clean title styling
   */
  .section-header {
    margin-bottom: var(--space-xl);
    position: relative;
  }

  .section-title {
    font-family: var(--font-hyperwave), monospace;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0;
  }

  /**
   * Projects Grid - Horizontal layout with small cards
   * Multiple cards per row for compact display
   */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-md);
    margin-top: var(--space-lg);
  }

  /**
   * Project Card - Minimalistic button-like styling
   *
   * Features:
   * - White background
   * - Rounded corners (like hero buttons)
   * - Subtle border and shadow
   * - Compact size
   * - Hover effect similar to buttons
   */
  .project-card {
    background: var(--color-card-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    position: relative;
    display: block;
    text-decoration: none;
    color: var(--color-text);
    backdrop-filter: blur(10px);
  }

  /**
   * Hover effect - Lift card slightly
   * Similar to button hover in hero section
   */
  .project-card:hover {
    transform: translateY(-4px);
    box-shadow:
      var(--shadow-md),
      0 0 15px rgba(0, 0, 0, 0.05);
    color: var(--color-text);
    border-color: var(--color-secondary);
  }

  /**
   * Active effect - Press down
   */
  .project-card:active {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }

  /**
   * Card content area
   * Compact padding for small cards
   */
  .card-content {
    padding: var(--space-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    position: relative;
  }

  /**
   * Project title - Compact and bold
   */
  .project-title {
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0;
    letter-spacing: 0.02em;
    line-height: 1.2;
  }

  /**
   * Project description - Smaller text
   */
  .project-description {
    margin-bottom: 0;
    line-height: 1.4;
    font-size: 0.875rem;
    color: var(--color-secondary);
  }

  /**
   * Technologies tags container
   */
  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 0;
  }

  /**
   * Individual tech tag - Minimal pill styling
   * Small, subtle tags
   */
  .tech-tag {
    display: inline-block;
    padding: 2px 8px;
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    background: var(--color-bg);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: 4px;
  }

  /**
   * GitHub icon - positioned in bottom right
   */
  .project-icon {
    position: absolute;
    bottom: var(--space-md);
    right: var(--space-md);
    opacity: 0.4;
    transition: opacity 0.2s ease;
  }

  .project-card:hover .project-icon {
    opacity: 0.8;
  }

  /**
   * RESPONSIVE DESIGN
   * Adjust for smaller screens
   */
  @media (max-width: 1024px) {
    /* .grid-sphere,
    :global(.shape-blue),
    :global(.shape-orange) {
      display: none;
    } */
    :global(.shape-green) {
      right: 2%;
      top: 10px;
      width: 80px;
    }
    :global(.shape-pink) {
      left: 2%;
      bottom: 10px;
      width: 100px;
    }
  }

  @media (max-width: 768px) {
    .section-header {
      text-align: center;
    }

    .projects-grid {
      grid-template-columns: 1fr;
      gap: var(--space-md);
    }
  }

  @media (max-width: 480px) {
    .project-title {
      font-size: 0.875rem;
    }

    .project-description {
      font-size: 0.75rem;
    }

    .tech-tag {
      font-size: 0.5rem;
      padding: 2px 6px;
    }
  }
</style>
