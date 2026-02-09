<script>
    import { onMount } from "svelte";

    // Props to handle "Back" navigation if needed, though usually handled by parent
    let { onBack } = $props();

    // State for current language
    let currentLang = $state("en");

    // Get current language from URL
    const updateCurrentLang = () => {
        const path = window.location.pathname;
        const segments = path.split("/").filter(Boolean);
        currentLang = segments[0] === "de" ? "de" : "en";
    };

    onMount(() => {
        updateCurrentLang();
    });
</script>

<article class="blog-post">
    <header class="post-header">
        <a
            class="back-button"
            href="/{currentLang}/blog"
            onclick={(e) => {
                e.preventDefault();
                onBack(e);
            }}
        >
            ← Back to Articles
        </a>
        <div class="header-content">
            <span class="tag">Tutorial</span>
            <h1>Building a Living Particle Field with Svelte</h1>
            <div class="meta">
                <span class="date">January 19, 2026</span>
                <span class="author">By Mohamed Jridi</span>
            </div>
        </div>
    </header>

    <div class="post-content">
        <p class="intro">
            I wanted my portfolio to feel <em>alive</em>. Not just a static
            image or a looping video, but something that breathes and reacts.
            That's how the "Living Particle Field" was born. Here's how I built
            it using Svelte and HTML5 Canvas.
        </p>

        <h2>The Concept</h2>
        <p>
            Imagine a grid of tiny dots. On their own, they're boring. But what
            if we could push them around with invisible waves? What if we could
            make them "breathe" like a living organism?
        </p>
        <p>
            The goal was to create a blob-like shape that morphs, pulses, and
            reacts to your mouse, all while maintaining a smooth 60 FPS.
        </p>

        <h2>Why Svelte?</h2>
        <p>
            I chose Svelte because it stays out of your way. For
            high-performance animations, you don't want a heavy framework
            overhead. Svelte compiles away, leaving us with highly optimized
            JavaScript that can drive a complex Canvas animation without
            breaking a sweat.
        </p>

        <h2>The Magic: Noise & Math</h2>
        <p>
            The secret sauce isn't complex physics—it's just <strong
                >Math.sin()</strong
            >
            and <strong>Math.cos()</strong>.
        </p>
        <p>
            We use "Perlin-like" noise to create the organic shape. By layering
            multiple sine waves on top of each other, we get a shape that looks
            random but is actually perfectly controlled.
        </p>

        <div class="code-block">
            <pre><code
                    >// Creating organic noise
const angle = ...;
const noise = 
Math.sin(angle * 2 + time) * 30 +  // Big curves
Math.cos(angle * 8 + time) * 10;   // Small details</code
                ></pre>
        </div>

        <h2>Making it "Breathe"</h2>
        <p>
            To make it feel alive, we modulate the radius of our blob over time.
            It's like a lung expanding and contracting. We also add a "ripple"
            effect that waves through the particles from the center to the edge.
        </p>

        <h2>The "Warping" Effect</h2>
        <p>
            This is my favorite part. We don't just move the particles; we <em
                >warp</em
            > the space they live in. When a particle gets pushed by a wave, we also
            shift its color.
        </p>
        <p>
            Deep blue particles turn bright white when they move fast. It gives
            the illusion of energy transfer.
        </p>

        <div class="code-block">
            <pre><code
                    >// Dynamic Color Shift
// The faster it moves, the brighter it gets!
const intensity = displacement / maxDisplacement;
const lightness = 45 + intensity * 50; // 45% -{">"} 95%
ctx.strokeStyle = `hsl(225, 100%, ${"${"}lightness}%)`;</code
                ></pre>
        </div>

        <h2>Optimization Tricks</h2>
        <p>
            To keep this running smoothly on laptops and phones, I had to be
            smart:
        </p>
        <ul>
            <li>
                <strong>Pre-calculated Noise:</strong> We calculate the noise values
                once per frame for 360 degrees, instead of for every single particle.
            </li>
            <li>
                <strong>Float32Array:</strong> We use typed arrays for our cache
                to keep memory usage low and access times fast.
            </li>
            <li>
                <strong>Canvas API:</strong> We use raw Canvas 2D calls, minimizing
                state changes (like changing colors) where possible.
            </li>
        </ul>

        <h2>Conclusion</h2>
        <p>
            The result is a background that feels unique every time you look at
            it. It's a great example of how a little bit of math and a lot of
            creativity can turn a boring website into an experience.
        </p>
    </div>
</article>

<style>
    .blog-post {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: var(--space-2xl);
        margin-bottom: var(--space-3xl);
        animation: fadeIn 0.5s ease-out;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .post-header {
        margin-bottom: var(--space-2xl);
        text-align: center;
        position: relative;
    }

    .back-button {
        position: absolute;
        left: 0;
        top: 0;
        background: none;
        border: none;
        color: var(--color-text-dim);
        cursor: pointer;
        font-size: 0.9rem;
        padding: 0;
        text-decoration: none; /* Remove underline from link */
        transition: color 0.2s;
    }

    .back-button:hover {
        color: var(--color-primary);
    }

    .tag {
        display: inline-block;
        background: rgba(76, 161, 255, 0.1);
        color: var(--color-primary);
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: var(--space-md);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    h1 {
        font-size: 3rem;
        line-height: 1.2;
        margin-bottom: var(--space-md);
        background: linear-gradient(
            135deg,
            #fff 0%,
            var(--color-text-light) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .meta {
        color: var(--color-text-dim);
        font-size: 1rem;
        display: flex;
        gap: var(--space-md);
        justify-content: center;
    }

    .post-content {
        font-size: 1.15rem;
        line-height: 1.8;
        color: var(--color-text-light);
    }

    .intro {
        font-size: 1.3rem;
        color: var(--color-text);
        margin-bottom: var(--space-xl);
        font-weight: 500;
    }

    h2 {
        font-size: 1.8rem;
        color: var(--color-text);
        margin-top: var(--space-2xl);
        margin-bottom: var(--space-lg);
    }

    p {
        margin-bottom: var(--space-lg);
    }

    ul {
        margin-bottom: var(--space-lg);
        padding-left: var(--space-xl);
    }

    li {
        margin-bottom: var(--space-sm);
    }

    strong {
        color: var(--color-primary);
    }

    .code-block {
        background: #0d1117;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: var(--space-lg);
        margin: var(--space-xl) 0;
        overflow-x: auto;
    }

    code {
        font-family: "Fira Code", monospace;
        font-size: 0.95rem;
        color: #e6edf3;
    }

    @media (max-width: 768px) {
        .blog-post {
            padding: var(--space-xl);
        }

        h1 {
            font-size: 2rem;
        }

        .post-content {
            font-size: 1rem;
        }

        .back-button {
            position: static;
            display: block;
            margin-bottom: var(--space-lg);
        }
    }
</style>
