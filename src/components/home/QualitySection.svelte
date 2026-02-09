<script>
    /**
     * QualitySection Component
     *
     * Displays the "Commitment to Excellence" section with 3D animation.
     */

    import { translations } from "../../lib/translations.js";

    let { visible = false, currentLang = "en" } = $props();
</script>

<section id="quality-section" class="scroll-section quality-section">
    <!-- Removed container to allow full width -->
    <div class="quality-box" class:enlarge={visible}>
        <div class="quality-content">
            <div class="quality-title-col">
                <div class="title-wrapper">
                    <img
                        src="/img/mypic_nanobanana.jpeg"
                        alt="Profile"
                        class="profile-pic"
                    />
                    <h3>{translations[currentLang].quality.title}</h3>
                </div>
            </div>
            <div class="quality-grid-col">
                <div class="quality-grid">
                    <div class="quality-item">
                        <span class="quality-icon">⚡</span>
                        <h4>{translations[currentLang].quality.speed.title}</h4>
                        <p>{translations[currentLang].quality.speed.text}</p>
                    </div>
                    <div class="quality-item">
                        <span class="quality-icon">💎</span>
                        <h4>
                            {translations[currentLang].quality.quality.title}
                        </h4>
                        <p>{translations[currentLang].quality.quality.text}</p>
                    </div>
                    <div class="quality-item">
                        <span class="quality-icon">🤝</span>
                        <h4>
                            {translations[currentLang].quality.professionalism
                                .title}
                        </h4>
                        <p>
                            {translations[currentLang].quality.professionalism
                                .text}
                        </p>
                    </div>
                    <div class="quality-item">
                        <span class="quality-icon">🔒</span>
                        <h4>
                            {translations[currentLang].quality.security.title}
                        </h4>
                        <p>{translations[currentLang].quality.security.text}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .scroll-section {
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-3xl) 0;
    }

    /* 3. Quality Section (Black Box) */
    .quality-section {
        perspective: 1000px;
        padding: 0; /* Remove padding to allow full size */
        height: 100vh; /* Full viewport height */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .quality-box {
        background: #000;
        color: #fff;
        border-radius: 24px;
        padding: var(--space-xl);
        width: 80%;
        margin: 0 auto;
        transform: scale(0.8) rotateX(10deg);
        opacity: 0;
        transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        overflow: hidden; /* Prevent scrolling inside */
        /* Initial state */
    }

    .quality-box.enlarge {
        transform: scale(1) rotateX(0);
        opacity: 1;
        width: 96%; /* Almost full width */
        height: 90vh; /* Almost full height */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .quality-content {
        display: flex;
        width: 100%;
        height: 100%;
        gap: var(--space-2xl);
        align-items: center;
    }

    .quality-title-col {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        padding-left: var(--space-xl);
    }

    .quality-content h3 {
        font-size: clamp(3rem, 6vw, 5rem);
        font-weight: 900;
        line-height: 1.1; /* Increased slightly to prevent clipping if tight */
        margin: 0;
        text-transform: uppercase;
        position: relative;
        z-index: 2;
    }

    .title-wrapper {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
    }

    .profile-pic {
        width: 100%;
        max-width: 450px; /* Limit max size */
        height: auto;
        object-fit: contain;
        margin-bottom: -60px; /* Pull text up over image bottom */
        position: relative;
        z-index: 1;
        align-self: flex-start; /* Align left */
        border-radius: 12px; /* Optional slight rounding to match theme */
    }

    .quality-grid-col {
        flex: 2;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .quality-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--space-xl);
        width: 100%;
        padding-right: var(--space-xl);
    }

    .quality-item {
        padding: var(--space-lg);
        background: rgba(255, 255, 255, 0.05);
        border-radius: 16px;
        transition: transform 0.3s ease;
    }

    .quality-item:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.1);
    }

    .quality-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: var(--space-md);
    }

    .quality-item h4 {
        font-size: 1.5rem;
        margin-bottom: var(--space-sm);
        color: #fff;
    }

    .quality-item p {
        color: #aaa;
        font-size: 1rem;
    }

    @media (max-width: 1024px) {
        .quality-content {
            flex-direction: column;
            text-align: center;
            padding: var(--space-lg);
        }

        .quality-title-col {
            padding-left: 0;
            flex: 0;
            margin-bottom: var(--space-xl);
        }

        .quality-grid {
            padding-right: 0;
        }

        .quality-box.enlarge {
            height: auto;
            min-height: 80vh;
        }
    }

    @media (max-width: 768px) {
        .quality-box {
            width: 95%;
            padding: var(--space-lg);
        }
    }
</style>
