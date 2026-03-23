<script>
    /**
     * CardsCarousel Component
     *
     * Displays a carousel of project/skill cards.
     */

    import { translations } from "../../lib/translations.js";
    import { getAssetPath } from "../../lib/utils.js";

    let { currentLang = "en" } = $props();
    let currentCardIndex = $state(0);

    let cards = $derived([
        {
            title: translations[currentLang].cards.iot.title,
            desc: translations[currentLang].cards.iot.desc,
            image: getAssetPath("/img/iot-frame.png"),
        },
        {
            title: translations[currentLang].cards.saas.title,
            desc: translations[currentLang].cards.saas.desc,
            image: getAssetPath("/img/saas-pic.png"),
        },
        {
            title: translations[currentLang].cards.pm.title,
            desc: translations[currentLang].cards.pm.desc,
            image: getAssetPath("/img/pm-picture.png"),
        },
    ]);

    function nextCard() {
        if (currentCardIndex < cards.length - 1) {
            currentCardIndex++;
        }
    }

    function prevCard() {
        if (currentCardIndex > 0) {
            currentCardIndex--;
        }
    }
</script>

<section id="cards-section" class="scroll-section cards-section">
    <div class="container carousel-layout">
        <div class="cards-display">
            <div
                class="cards-track"
                style="transform: translateX(-{currentCardIndex * 85}%)"
            >
                {#each cards as card, index}
                    <div
                        class="card-container"
                        class:active={index === currentCardIndex}
                        class:next={index === currentCardIndex + 1}
                    >
                        <!-- Black Frame -->
                        <div class="card-frame">
                            <img
                                src={card.image}
                                alt={card.title}
                                class="card-image"
                            />
                        </div>

                        <!-- Text under card -->
                        <div class="card-text">
                            <h3>{card.title}</h3>
                            <p>{card.desc}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Navigation Buttons (Below cards) -->
        <div class="nav-buttons">
            <button
                class="nav-btn"
                onclick={prevCard}
                disabled={currentCardIndex === 0}>&lt;</button
            >
            <button
                class="nav-btn"
                onclick={nextCard}
                disabled={currentCardIndex === cards.length - 1}>&gt;</button
            >
        </div>
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

    .cards-section {
        overflow: hidden;
        padding-top: var(--space-xl);
    }

    .carousel-layout {
        display: flex;
        flex-direction: column;
        gap: var(--space-xl);
        width: 100%;
    }

    .cards-display {
        width: 100%;
        overflow: visible; /* Allow next card to be seen */
    }

    .cards-track {
        display: flex;
        gap: 5%; /* Spacing between cards */
        transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        width: 100%;
    }

    .card-container {
        flex: 0 0 80%; /* Each card takes 80% of width */
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        opacity: 0.3; /* Dim inactive cards */
        transition: opacity 0.5s ease;
    }

    .card-container.active {
        opacity: 1;
    }

    .card-container.next {
        opacity: 0.3; /* Ensure next card is dimmed */
    }

    /* Black Frame */
    .card-frame {
        width: 100%;
        aspect-ratio: 16/9; /* Widescreen frame */
        background: #000;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        /* No shadow as requested */
    }

    .card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
    }

    /* Text under card */
    .card-text {
        padding-left: var(--space-sm);
    }

    .card-text h3 {
        font-size: 1.5rem;
        font-weight: 500; /* Medium weight */
        margin-bottom: var(--space-xs);
        color: var(--color-text);
    }

    .card-text p {
        font-size: 1.1rem;
        color: var(--color-secondary);
        font-weight: 400; /* Normal weight */
        max-width: 90%;
    }

    /* Navigation Buttons */
    .nav-buttons {
        display: flex;
        gap: var(--space-xl);
        padding-left: var(--space-sm); /* Align with text */
    }

    .nav-btn {
        background: transparent;
        border: none;
        color: #888; /* Grey */
        font-size: 3rem; /* Big */
        cursor: pointer;
        padding: 0;
        line-height: 1;
        transition: color 0.3s ease;
        font-family: monospace; /* For clean < > look */
    }

    .nav-btn:hover:not(:disabled) {
        color: var(--color-text);
    }

    .nav-btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        .card-container {
            flex: 0 0 90%; /* Wider on mobile */
        }

        .cards-track {
            gap: 5%;
        }
    }
</style>
