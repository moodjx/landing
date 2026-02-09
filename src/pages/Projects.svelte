<script>
    import FeaturedProjects from "../components/projects/FeaturedProjects.svelte";

    let { currentLang = "en" } = $props();
</script>

<!-- Projects Page - Dedicated page for showcasing projects -->
<div class="projects-page">
    <div class="container">
        <div class="projects-section">
            <FeaturedProjects {currentLang} />
        </div>
    </div>
</div>

<style>
    .projects-page {
        min-height: 100vh;
        padding-top: var(--space-xl);
        background: var(--color-bg);
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--space-xl);
    }

    .projects-section {
        padding: var(--space-2xl) 0;
    }

    @media (max-width: 768px) {
        .container {
            padding: 0 var(--space-md);
        }

        .projects-section {
            padding: var(--space-xl) 0;
        }
    }
</style>
