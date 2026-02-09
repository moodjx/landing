<script>
    import { onMount, onDestroy } from "svelte";

    /**
     * ParticleBackground.svelte
     * ------------------------------------------------------------------
     * Renders a dynamic, interactive particle field that morphs and breathes.
     *
     * Core Concepts:
     * 1. **Grid-based Particles**: Particles are initialized on a grid but displaced to look organic.
     * 2. **Noise Layers**: Multiple layers of sine/cosine waves create the "blob" shape.
     * 3. **Breathing & Warping**: The blob expands/contracts (breathing) and folds at the edges (warping).
     * 4. **Dynamic Color**: Particles shift from deep blue to bright white based on displacement intensity.
     * 5. **Variable Speed**: The entire animation speeds up and slows down rhythmically.
     */

    // ==================================================================================
    // 1. CONFIGURATION & CONSTANTS
    // ==================================================================================

    const PARTICLE_COUNT = 800; // Total number of particles to render
    const GRID_COLS = 25; // Horizontal grid resolution
    const GRID_ROWS = 32; // Vertical grid resolution
    const GRID_SPACING_Y = 40; // Vertical spacing between grid rows
    const TOTAL_GRID_HEIGHT = GRID_SPACING_Y * GRID_ROWS; // For seamless wrapping

    // Visual Constants
    const BASE_RADIUS = 380; // Base size of the blob
    const HOLE_RADIUS = 150; // Size of the empty center
    const BASE_WIDTH = 1.5; // Base thickness of particle lines
    const BASE_LENGTH = 5; // Base length of particle lines
    const BASE_ALPHA = 0.9; // Base opacity
    const COLOR_HUE = 225; // Deep Blue base hue

    // ==================================================================================
    // 2. STATE VARIABLES
    // ==================================================================================

    let canvas;
    let ctx;
    let animationFrameId;
    let width, height;

    // Interaction State
    let mouse = { x: -1000, y: -1000 };
    let lightPos = { x: 0, y: 0 }; // The "center" the blob follows
    let isIdle = true;
    let idleTime = 0;

    // Animation Time Variables
    let breathTime = 0; // Controls breathing/ripple cycles
    let blobTime = 0; // Controls noise/shape morphing
    let speedVarTime = 0; // Controls the variable speed fluctuation

    // Transition State
    let zoomLevel = 0; // 0 (normal) to 1 (zoomed out/transitioning)
    let { zoom = false } = $props();

    // Pre-calculated/Cached Values
    let particles = [];
    let gridSpacingX;
    let breathingRadius;
    let ripple;
    let currentHoleRadiusBase;

    // Noise Caches (Float32Array for performance)
    // We pre-calculate noise for 360 degrees to avoid heavy trig in the loop
    const CACHE_SIZE = 360;
    let noise1Cache = new Float32Array(CACHE_SIZE); // Base shape (large curves)
    let noise2Cache = new Float32Array(CACHE_SIZE); // Secondary shape
    let noise3Cache = new Float32Array(CACHE_SIZE); // Tertiary shape
    let noise4Cache = new Float32Array(CACHE_SIZE); // High-freq edge detail
    let noise5Cache = new Float32Array(CACHE_SIZE); // Low-freq sector bulging

    // ==================================================================================
    // 3. HELPER FUNCTIONS
    // ==================================================================================

    /**
     * Updates the noise cache arrays for the current frame.
     * This combines multiple sine/cosine waves to create an organic, evolving shape.
     */
    const updateNoiseCache = () => {
        for (let i = 0; i < CACHE_SIZE; i++) {
            // Map index to angle (-PI to PI)
            const angle = (i / CACHE_SIZE) * 2 * Math.PI - Math.PI;

            // Layer 1: Base Shape (Large, slow moving curves)
            noise1Cache[i] =
                Math.sin(angle * 2 + blobTime) * 30 +
                Math.cos(angle * 1.5 - blobTime * 0.8) * 25;

            // Layer 2: Secondary undulations
            noise2Cache[i] = Math.sin(angle * 1.5 - blobTime * 1.2) * 20;

            // Layer 3: Tertiary detail
            noise3Cache[i] = Math.cos(angle * 2.5 + blobTime * 0.6) * 15;

            // Layer 4: High Frequency Edge Noise (creates the "rough" edge look)
            noise4Cache[i] = Math.sin(angle * 8 + blobTime * 2) * 10;

            // Layer 5: Sector Bulging (Low freq, High amplitude)
            // This creates the "morphing" effect where whole sides of the blob bulge out
            noise5Cache[i] =
                Math.sin(angle * 1.5 + blobTime * 0.5) * 40 +
                Math.cos(angle * 1 - blobTime * 0.3) * 30;
        }
    };

    // ==================================================================================
    // 4. PARTICLE CLASS
    // ==================================================================================

    class Particle {
        constructor(gridX, gridY) {
            this.baseGridX = gridX;
            this.baseGridY = gridY;

            // Random offset for "wiggle" animation
            this.wiggleOffset = Math.random() * Math.PI * 2;

            // Static position offset to break the grid regularity
            // Constrained to ensure particles don't overlap too much
            this.offsetX = (Math.random() - 0.5) * 20;
            this.offsetY = (Math.random() - 0.5) * 15;
        }

        draw(ctx) {
            // ---------------------------------------------------------
            // A. Position Calculation
            // ---------------------------------------------------------

            // Calculate base position
            const x = this.baseGridX * gridSpacingX + this.offsetX;

            // Seamless vertical wrapping
            // We use modulo arithmetic to wrap particles from bottom to top
            let rawY = this.baseGridY * GRID_SPACING_Y; // Note: globalScrollY removed for static effect
            let y = (rawY + this.offsetY) % TOTAL_GRID_HEIGHT;
            if (y < 0) y += TOTAL_GRID_HEIGHT;

            // Calculate distance relative to the "light" (blob center)
            // dx is scaled by 0.65 to give the blob an elliptical (wider) shape
            const dx = (x - lightPos.x) * 0.65;
            const dy = y - lightPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // ---------------------------------------------------------
            // B. Noise & Radius Calculation
            // ---------------------------------------------------------

            // Calculate angle for noise lookup
            const angle = Math.atan2(dy, dx);
            const angleIndex =
                Math.floor(((angle + Math.PI) / (2 * Math.PI)) * CACHE_SIZE) %
                CACHE_SIZE;

            // Sum up noise layers
            // Note: noise4 (high freq) is scaled by distance to be stronger at edges
            const totalNoise =
                noise1Cache[angleIndex] +
                noise2Cache[angleIndex] +
                noise3Cache[angleIndex] +
                noise4Cache[angleIndex] * (distance / BASE_RADIUS) +
                noise5Cache[angleIndex];

            // Calculate effective radii for this frame/angle
            const effectiveRadius = breathingRadius + totalNoise;
            const currentHoleRadius = currentHoleRadiusBase + totalNoise * 0.4; // Less noise on hole

            // ---------------------------------------------------------
            // C. Hole Rendering (Inner Particles)
            // ---------------------------------------------------------

            if (distance < currentHoleRadius) {
                // Particles inside the hole are small dots that fade towards the center
                const distFromCenter = distance;
                const holeNorm = distFromCenter / currentHoleRadius; // 0 (center) -> 1 (edge)

                // Cubic fade for clean center
                const holeAlpha = Math.pow(holeNorm, 3) * 0.8;

                if (holeAlpha > 0.05) {
                    ctx.globalAlpha = holeAlpha;
                    ctx.fillStyle = `hsl(${COLOR_HUE}, 100%, 65%)`;
                    ctx.beginPath();
                    ctx.arc(x, y, 0.9, 0, Math.PI * 2); // Small dot
                    ctx.fill();
                }
                return; // Done for this particle
            }

            // ---------------------------------------------------------
            // D. Blob Rendering (Main Particles)
            // ---------------------------------------------------------

            if (distance < effectiveRadius) {
                // Normalized position within the particle band (0 = hole edge, 1 = outer edge)
                const bandWidth = effectiveRadius - currentHoleRadius;
                const distInBand = distance - currentHoleRadius;
                const bandNorm = Math.max(
                    0,
                    Math.min(1, distInBand / bandWidth),
                );
                const distNorm = distance / effectiveRadius; // 0 (center) -> 1 (outer edge)

                // --- 1. Inner Breathing (Ripple) ---
                // Strongest near the hole, creates the "exhale" ripple effect
                const innerStrength = Math.pow(1 - bandNorm, 2);
                const innerAmplitude = ripple > 0 ? 60 : 150; // Asymmetric: fast inward, slow outward
                const innerDisplacement =
                    ripple * innerAmplitude * innerStrength;

                // --- 2. Outer Folding (Curvature) ---
                // Strongest near the outer edge, creates the "folding" wave effect
                const outerStrength = Math.pow(bandNorm, 2);
                // High speed (blobTime * 15) for energetic edge movement
                const outerWave = Math.sin(distNorm * 8 + blobTime * 15);
                const outerAmplitude = outerWave > 0 ? 50 : 150; // Asymmetric containment
                const outerDisplacement =
                    outerWave * outerAmplitude * outerStrength;

                // Total displacement determines final position and color
                const totalDisplacement = innerDisplacement + outerDisplacement;

                // --- 3. Position Update ---
                const angleToCenter = Math.atan2(dy, dx);
                const xDisplaced =
                    x + Math.cos(angleToCenter) * totalDisplacement;
                const yDisplaced =
                    y + Math.sin(angleToCenter) * totalDisplacement;

                // --- 4. Tilt/Rotation ---
                // Particles align radially but have subtle wiggles
                const baseWiggle = Math.sin(blobTime + this.wiggleOffset) * 0.1;
                const warpWiggle = outerWave * 0.2 * outerStrength;
                const finalAngle = angleToCenter + baseWiggle + warpWiggle;

                // --- 5. Appearance (Size & Alpha) ---
                // Parabolic thickness: thickest in middle of band
                const thicknessFactor = 4 * bandNorm * (1 - bandNorm);
                const currentWidth = BASE_WIDTH * (0.5 + 1.5 * thicknessFactor);
                const currentLength =
                    BASE_LENGTH * (0.02 + 1.48 * thicknessFactor);

                // Sharp fade at the very outer edge
                const fade = Math.min(1, (1 - distNorm) * 5);
                const distFromHole = distance - currentHoleRadius;
                const holeFade = Math.min(1, distFromHole / 50); // Soft fade in from hole
                const alpha = BASE_ALPHA * fade * holeFade;

                if (alpha > 0.01) {
                    ctx.globalAlpha = alpha;

                    // --- 6. Dynamic Color Warping ---
                    // Map displacement intensity to lightness/hue
                    // Max expected displacement is around 100-150
                    const warpIntensity = Math.min(
                        1,
                        Math.abs(totalDisplacement) / 100,
                    );

                    // Shift from Deep Blue (45% L) to Bright White (95% L)
                    const lightness = 45 + warpIntensity * 50;
                    // Shift Hue slightly towards Cyan (195)
                    const hue = COLOR_HUE - warpIntensity * 30;

                    ctx.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`;
                    ctx.lineWidth = currentWidth;
                    ctx.lineCap = "round";

                    // Draw Capsule
                    ctx.save();
                    ctx.translate(xDisplaced, yDisplaced);
                    ctx.rotate(finalAngle);
                    ctx.beginPath();
                    const segmentLength = Math.max(
                        0,
                        currentLength - currentWidth,
                    );
                    ctx.moveTo(-segmentLength * 0.5, 0);
                    ctx.lineTo(segmentLength * 0.5, 0);
                    ctx.stroke();
                    ctx.restore();
                }
            }
            // ---------------------------------------------------------
            // E. Star Field Rendering (Outer Particles)
            // ---------------------------------------------------------
            else {
                const distFromEdge = distance - effectiveRadius;
                const fadeOutDist = 300; // Stars visible up to 300px away

                if (distFromEdge < fadeOutDist) {
                    const distFactor = 1 - distFromEdge / fadeOutDist;

                    // Shiny Flickering Effect
                    // Power of 1.5 creates sharp spikes in brightness (twinkling)
                    const flicker = Math.pow(Math.random(), 1.5);
                    // Boost visibility near blob
                    const starAlpha = flicker * distFactor + 0.1 * distFactor;

                    if (starAlpha > 0.05) {
                        ctx.globalAlpha = starAlpha;
                        ctx.fillStyle = `hsl(${COLOR_HUE}, 100%, 65%)`;
                        ctx.beginPath();
                        ctx.arc(x, y, 0.9, 0, Math.PI * 2); // Star dot
                        ctx.fill();
                    }
                }
            }
        }
    }

    // ==================================================================================
    // 5. MAIN ANIMATION LOOP
    // ==================================================================================

    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        // --- A. Update Global Time Variables ---
        speedVarTime += 0.005; // Cycle for speed fluctuation

        // Calculate Variable Speed Multiplier
        // Oscillates between 0.4 (slow) and 1.1 (capped max)
        const speedMultiplier = 0.75 + 0.35 * Math.sin(speedVarTime);

        // Apply speed to animation timers
        breathTime += 0.004 * speedMultiplier;
        blobTime += 0.002 * speedMultiplier;

        // --- B. Handle Zoom Transition ---
        if (zoom) {
            zoomLevel = Math.min(1, zoomLevel + 0.02);
        } else {
            zoomLevel = Math.max(0, zoomLevel - 0.02);
        }

        // --- C. Pre-calculate Frame Values ---
        // Breathing Offset (Exhale/Inhale)
        const sineVal = Math.sin(breathTime);
        const breathOffset = sineVal > 0 ? sineVal * 50 : sineVal * 20;

        // Zoom Multipliers
        const zoomMultiplier = 1 + zoomLevel * 2.5;
        const holeZoomMultiplier = 1 + zoomLevel * 4;

        // Base Radii for this frame
        breathingRadius =
            BASE_RADIUS * zoomMultiplier +
            breathOffset +
            Math.cos(breathTime * 1.5) * 40;
        currentHoleRadiusBase = HOLE_RADIUS * holeZoomMultiplier;

        // Ripple Factor for Inner Breathing
        ripple = Math.sin(breathTime * 4);

        // Update Noise Cache
        updateNoiseCache();

        // --- D. Update Light/Mouse Position ---
        // --- D. Update Light/Mouse Position (Smoothed & Damped) ---
        let targetX, targetY;
        let lerpFactor;

        if (mouse.x === -1000) {
            isIdle = true;
            idleTime += 0.003;
            // Gentle idle movement
            targetX = width * 0.5 + (Math.sin(idleTime) * width) / 3;
            targetY = height * 0.5 + (Math.sin(idleTime * 2) * height) / 4;
            // Reduce idle catchup speed from 0.05 to 0.01
            lerpFactor = 0.01;
        } else {
            isIdle = false;
            targetX = mouse.x;
            targetY = mouse.y;
            // Reduce follow speed from 0.008 to 0.005
            lerpFactor = 0.005;
        }

        // Calculate distance and direction
        const dx = targetX - lightPos.x;
        const dy = targetY - lightPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0.1) {
            // Apply speed limit to prevent "knee jerk" reactions
            const MAX_SPEED = 2.5; // Max movement per frame

            // Calculate step size based on linear interpolation
            let step = dist * lerpFactor;

            // Clamp step to max speed (this handles "unregistered events" or rapid movements)
            if (step > MAX_SPEED) {
                step = MAX_SPEED;
            }

            // Update position
            lightPos.x += (dx / dist) * step;
            lightPos.y += (dy / dist) * step;
        }

        // --- E. Draw Particles ---
        const len = particles.length;
        for (let i = 0; i < len; i++) {
            particles[i].draw(ctx);
        }

        animationFrameId = requestAnimationFrame(animate);
    };

    // ==================================================================================
    // 6. INITIALIZATION & EVENTS
    // ==================================================================================

    const init = () => {
        resize();
        particles = [];
        let count = 0;
        // Create grid of particles
        for (let row = 0; row < GRID_ROWS && count < PARTICLE_COUNT; row++) {
            for (
                let col = 0;
                col < GRID_COLS && count < PARTICLE_COUNT;
                col++
            ) {
                particles.push(new Particle(col, row));
                count++;
            }
        }
    };

    const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        gridSpacingX = width / GRID_COLS;
    };

    const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    };

    onMount(() => {
        ctx = canvas.getContext("2d", {
            alpha: true,
            willReadFrequently: false,
            desynchronized: true,
        });
        resize();
        lightPos.x = width * 0.5;
        lightPos.y = height * 0.5;
        init();
        animate();

        window.addEventListener("resize", resize);
    });

    onDestroy(() => {
        if (typeof window !== "undefined") {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        }
    });
</script>

<canvas
    bind:this={canvas}
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    role="img"
    aria-label="Interactive particle background"
></canvas>

<style>
    canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: auto;
        background: transparent;
        will-change: transform;
    }
</style>
