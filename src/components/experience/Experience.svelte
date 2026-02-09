<script>
  /**
   * Experience Component - Professional work history with curved timeline
   *
   * Displays work experience in a curved timeline layout.
   * Each position shows title, company, period, description, and technologies used.
   *
   * Design Pattern:
   * - Timeline starts from the right side of the screen
   * - Curves to the middle-left and continues vertically down
   * - All cards are positioned on the right side of the timeline
   * - Dots mark each experience on the timeline
   *
   * Svelte Features:
   * - {#each} loop to iterate through experiences
   * - Conditional rendering for first item (curve) vs others (straight line)
   * - Nested loops for technologies
   */

  import { EXPERIENCES } from "../../lib/constants.js";
  import ExperienceTimeline from "./ExperienceTimeline.svelte";
</script>

<!--
  EXPERIENCE SECTION
  id="experience" allows navigation to scroll to this section
-->
<section id="experience" class="experience section">
  <!-- 
    INTER-SECTION SPHERE
    Positioned at the top of Experience section to overlay the boundary with Projects section
    Visible on both sections' backgrounds
  -->

  <div class="container">
    <!-- Wrapper with max-width for better layout -->
    <div class="experience-wrapper">
      <!--
        Timeline container with curved path
        - Starts from right side
        - Curves to middle-left
        - Continues vertically down
        - Cards are all on the right side
      -->
      <ExperienceTimeline experiences={EXPERIENCES} />
    </div>
  </div>
</section>

<style>
  /**
   * EXPERIENCE SECTION STYLES
   * Curved timeline design:
   * - Starts from right side of screen
   * - Curves to middle-left position
   * - Continues vertically down
   * - All cards positioned on the right side
   */

  .experience {
    position: relative;
    background: var(--color-bg);
    overflow: visible; /* Allow sphere to extend upwards into Projects section */
  }

  .container {
    position: relative;
    z-index: 1;
  }

  .experience-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }

  /*
   * RESPONSIVE DESIGN
   * On mobile, timeline moves to far left with content taking full width
   */
  @media (max-width: 768px) {
    .experience-wrapper {
      max-width: 100%;
      padding: 0 var(--space-md);
    }
  }
</style>
