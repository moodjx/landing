<script>
    /**
     * Professional Experience Page
     *
     * Displays work experience in a dedicated page.
     * Features an entrance animation that coordinates with the Hero exit animation.
     */

    import { onMount } from "svelte";
    import { EXPERIENCES } from "../lib/constants.js";
    import ExperienceTimeline from "../components/experience/ExperienceTimeline.svelte";

    let visible = $state(false);

    onMount(() => {
        // Slight delay to allow the Hero exit animation to play out a bit
        setTimeout(() => {
            visible = true;
        }, 100);
    });
</script>

<div class="page-container" class:visible>
    <div class="experience-content">
        <ExperienceTimeline experiences={EXPERIENCES} />
    </div>
</div>

<style>
    .page-container {
        min-height: 100vh;
        background: var(--color-bg);
        padding: 120px var(--space-xl) var(--space-2xl);
        opacity: 0;
        transform: translateY(20px);
        transition:
            opacity 0.8s ease-out,
            transform 0.8s ease-out;
    }

    .page-container.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* Timeline Styles (Copied and adapted from Experience.svelte) */
    .experience-content {
        max-width: 1200px;
        margin: 0 auto;
    }

    @media (max-width: 768px) {
        .page-container {
            padding: 100px var(--space-md) var(--space-xl);
        }
    }
</style>
