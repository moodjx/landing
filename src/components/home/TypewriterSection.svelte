<script>
    /**
     * TypewriterSection Component
     *
     * Displays the "Turn your ideas into products" section with typewriter effect.
     */

    import { translations } from "../../lib/translations.js";

    let { visible = false, currentLang = "en" } = $props();

    // Text writing effect state
    let ideasText = $derived(translations[currentLang].typewriter.text);
    let displayedIdeasText = $state("");
    let currentIntervalId = null; // Track the active interval

    // Trigger typewriter when visible
    // Trigger typewriter when visible or text changes
    $effect(() => {
        // We depend on ideasText here so it re-runs when lang changes
        const textToType = ideasText;

        if (visible) {
            // Clear any existing interval first
            if (currentIntervalId !== null) {
                clearInterval(currentIntervalId);
                currentIntervalId = null;
            }

            // Reset and start fresh
            displayedIdeasText = "";
            let i = 0;

            currentIntervalId = setInterval(() => {
                displayedIdeasText += textToType.charAt(i);
                i++;
                if (i > textToType.length) {
                    clearInterval(currentIntervalId);
                    currentIntervalId = null;
                }
            }, 50); // Speed of typing
        } else {
            // Clean up when not visible
            if (currentIntervalId !== null) {
                clearInterval(currentIntervalId);
                currentIntervalId = null;
            }
            displayedIdeasText = "";
        }

        // Cleanup function for the effect
        return () => {
            if (currentIntervalId !== null) {
                clearInterval(currentIntervalId);
                currentIntervalId = null;
            }
        };
    });
</script>

<section id="ideas-section" class="scroll-section ideas-section">
    <div class="container">
        <h2 class="typewriter-text">
            {displayedIdeasText}<span class="cursor">|</span>
        </h2>
        <p class="section-subtext" class:visible>
            {translations[currentLang].typewriter.subtext}
        </p>
    </div>
</section>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--space-md);
        position: relative;
    }

    .scroll-section {
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-3xl) 0;
    }

    /* Ideas Section */
    .ideas-section {
        text-align: center;
    }

    .typewriter-text {
        font-family: "Courier New", Courier, monospace;
        font-size: clamp(2rem, 5vw, 4rem);
        font-weight: 700;
        margin-bottom: var(--space-md);
        min-height: 1.2em;
    }

    .cursor {
        animation: blink 1s step-end infinite;
    }

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }

    .section-subtext {
        font-size: 1.2rem;
        color: var(--color-secondary);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease-out;
    }

    .section-subtext.visible {
        opacity: 1;
        transform: translateY(0);
    }
</style>
