<script>
    import { onMount } from "svelte";
    import CardsCarousel from "./CardsCarousel.svelte";
    import TypewriterSection from "./TypewriterSection.svelte";
    import QualitySection from "./QualitySection.svelte";
    import ContactCTA from "./ContactCTA.svelte";

    // ============================================================================
    // STATE
    // ============================================================================

    let { currentLang = "en" } = $props();

    let visible = $state(false);
    let ideasSectionVisible = $state(false);
    let qualitySectionVisible = $state(false);
    let cardsSectionVisible = $state(false);

    // ============================================================================
    // ANIMATION LOGIC
    // ============================================================================

    // Intersection Observer
    onMount(() => {
        visible = true;

        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.3, // Trigger when 30% visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = entry.target.id;
                if (entry.isIntersecting) {
                    if (id === "ideas-section") {
                        ideasSectionVisible = true;
                    } else if (id === "quality-section") {
                        qualitySectionVisible = true;
                    } else if (id === "cards-section") {
                        cardsSectionVisible = true;
                    }
                } else {
                    // Reset animations when sections leave viewport
                    if (id === "quality-section") {
                        qualitySectionVisible = false;
                    } else if (id === "ideas-section") {
                        // Reset typewriter animation state
                        ideasSectionVisible = false;
                    }
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll(".scroll-section");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    });
</script>

<div class="home-content">
    <!-- 3. Professionality/Quality (Black Box) -->
    <QualitySection visible={qualitySectionVisible} {currentLang} />

    <!-- 2. Turn your ideas into products (Typewriter) -->
    <TypewriterSection visible={ideasSectionVisible} {currentLang} />

    <!-- 1. Horizontal Cards (Moved to top) -->
    <CardsCarousel {currentLang} />

    <!-- 4. Contact CTA -->
    <ContactCTA {currentLang} />
</div>

<style>
    .home-content {
        background: var(--color-bg);
        color: var(--color-text);
        overflow-x: hidden;
    }
</style>
