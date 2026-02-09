<script>
    /**
     * ContactCTA Component
     *
     * Call-to-action section at the bottom of the home page
     * that encourages users to get in touch and navigates to the contact page.
     */

    import { onMount } from "svelte";
    import { translations } from "../../lib/translations.js";

    let { currentLang = "en" } = $props();

    // ============================================================================
    // STATE
    // ============================================================================

    let visible = $state(false);

    // ============================================================================
    // ANIMATION LOGIC
    // ============================================================================

    onMount(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.3,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    visible = true;
                } else {
                    visible = false;
                }
            });
        }, observerOptions);

        const section = document.getElementById("contact-cta-section");
        if (section) {
            observer.observe(section);
        }

        return () => observer.disconnect();
    });

    // ============================================================================
    // NAVIGATION
    // ============================================================================

    function navigateToContact() {
        // Dispatch custom event to navigate to contact page
        window.dispatchEvent(
            new CustomEvent("navigate", { detail: "contact" }),
        );
    }
</script>

<section id="contact-cta-section" class="scroll-section contact-cta-section">
    <div class="contact-cta-box" class:enlarge={visible}>
        <div class="contact-cta-content">
            <div class="cta-text">
                <h2>{translations[currentLang].contactCta.title}</h2>
                <p>{translations[currentLang].contactCta.text}</p>
            </div>
            <button onclick={navigateToContact} class="btn-cta">
                {translations[currentLang].contactCta.button}
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="arrow-icon"
                >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>
        </div>
    </div>
</section>

<style>
    .scroll-section {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-3xl) 0;
    }

    .contact-cta-section {
        perspective: 1000px;
        padding: var(--space-2xl) 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-bg);
    }

    .contact-cta-box {
        /* Removed black background and shadow */
        /* background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); */
        color: #000; /* Changed to black */
        border-radius: 24px;
        padding: var(--space-2xl);
        width: 90%;
        max-width: 1000px;
        margin: 0 auto;
        transform: scale(0.9) translateY(20px);
        opacity: 0;
        transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        /* box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3); */
        position: relative;
        overflow: hidden;
    }

    /* Subtle gradient overlay removed */
    .contact-cta-box::before {
        display: none;
    }

    .contact-cta-box.enlarge {
        transform: scale(1) translateY(0);
        opacity: 1;
    }

    .contact-cta-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-xl);
        text-align: center;
        position: relative;
        z-index: 1;
    }

    .cta-text h2 {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: 900;
        line-height: 1.1;
        margin: 0 0 var(--space-md) 0;
        color: #000000;
        /* Removed gradient text */
        /* background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text; */
    }

    .cta-text p {
        font-size: clamp(1rem, 2vw, 1.25rem);
        color: #555; /* Darker grey for light background */
        margin: 0;
        max-width: 600px;
    }

    .btn-cta {
        background: #000000; /* Black background */
        color: #ffffff; /* White text */
        border: 2px solid #000000; /* Black border */
        border-radius: 50px;
        padding: var(--space-md) var(--space-xl);
        font-size: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        display: inline-flex;
        align-items: center;
        gap: var(--space-sm);
        box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
        position: relative;
        overflow: hidden;
    }

    .btn-cta::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 0, 0, 0.1),
            transparent
        );
        transition: left 0.5s ease;
    }

    .btn-cta:hover::before {
        left: 100%;
    }

    .btn-cta:hover {
        background: transparent;
        color: #000000; /* Black text on hover */
        border-color: #000000;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    .btn-cta:active {
        transform: translateY(0);
    }

    .arrow-icon {
        transition: transform 0.3s ease;
    }

    .btn-cta:hover .arrow-icon {
        transform: translateX(5px);
    }

    @media (max-width: 768px) {
        .contact-cta-box {
            width: 95%;
            padding: var(--space-xl);
        }

        .cta-text h2 {
            font-size: 2rem;
        }

        .cta-text p {
            font-size: 1rem;
        }

        .btn-cta {
            padding: var(--space-sm) var(--space-lg);
            font-size: 0.875rem;
        }
    }
</style>
