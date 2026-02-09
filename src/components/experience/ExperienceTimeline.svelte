<script>
    /**
     * ExperienceTimeline Component
     *
     * Renders the curved timeline visualization for work experience.
     * Reusable across Home and Professional Experience pages.
     */

    let { experiences } = $props();
</script>

<div class="timeline">
    {#each experiences as exp, i (exp.title)}
        <div
            class="timeline-item"
            class:first={i === 0}
            class:last={i === experiences.length - 1}
        >
            <!-- Timeline line segment -->
            {#if i === 0}
                <!-- First item: horizontal line from far right edge + curve down + vertical continuation -->
                <div class="timeline-line-start"></div>
                <!-- Vertical line continues from curve to bottom of item -->
                <div class="timeline-line-vertical"></div>
            {:else if i === experiences.length - 1}
                <!-- Last item: vertical line + curve to far left edge -->
                <div class="timeline-line-vertical"></div>
                <div class="timeline-line-end"></div>
            {:else}
                <!-- Middle items: vertical line segment -->
                <div class="timeline-line-vertical"></div>
            {/if}

            <!-- Dot marker on the timeline -->
            <div class="timeline-dot"></div>

            <!-- Content (always on the right) -->
            <div class="timeline-content">
                <!-- Small date card -->
                <div class="date-card">
                    <span class="period">{exp.period}</span>
                </div>

                <h3>{exp.title}</h3>
                <p class="company">{exp.company}</p>
                <p class="description">{exp.description}</p>

                <div class="tech-tags">
                    {#each exp.technologies as tech (tech)}
                        <span class="tag">{tech}</span>
                    {/each}
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    /*
   * Timeline container
   * The timeline line will be positioned at 15% from the left (moved more to the left)
   */
    .timeline {
        position: relative;
        padding: var(--space-2xl) 0;
    }

    /*
   * Individual timeline item
   * Contains: timeline line segment + dot + content
   */
    .timeline-item {
        position: relative;
        width: 100%;
        min-height: 220px; /* Taller for better spacing */
        margin-bottom: 0; /* Remove gap to ensure continuous line */
        padding-top: var(--space-md); /* Add top padding to prevent overlap */
    }

    /* First item needs special positioning to align with curve */
    .timeline-item.first {
        padding-top: 60px; /* Push content down to align with curve end */
    }

    /* Last item needs extra height for the ending curve */
    .timeline-item.last {
        min-height: 340px; /* Taller to accommodate end curve */
        padding-bottom: 120px; /* Space for the end curve */
    }

    /*
   * TIMELINE LINE - START CURVE (First item only)
   * Creates the curve from far right edge of screen to left position
   */
    .timeline-line-start {
        position: absolute;
        top: 0; /* Start from top */
        left: 15%; /* Timeline vertical position */
        width: calc(
            100vw - 15%
        ); /* Extends all the way to the right edge of viewport */
        height: 120px; /* Taller curve for better flow */
        border-left: 4px solid var(--color-primary); /* Thicker orange line */
        border-top: 4px solid var(--color-primary); /* Thicker orange line */
        border-top-left-radius: 80px; /* Smoother curve */
        z-index: 1;
    }

    /*
   * TIMELINE LINE - END CURVE (Last item only)
   * Creates the curve from vertical line to far left edge of screen
   */
    .timeline-line-end {
        position: absolute;
        bottom: 0; /* Start from bottom of last item */
        right: calc(
            85% - 4px
        ); /* Align right edge with vertical line (15% + 4px width) */
        left: auto; /* Override default left: 0 if set elsewhere, though here we are replacing it */
        width: 100vw; /* Extend to the left edge of viewport */
        height: 120px; /* Same height as start curve */
        border-right: 4px solid var(--color-primary); /* Right border for the curve */
        border-bottom: 4px solid var(--color-primary); /* Bottom border for the curve */
        border-bottom-right-radius: 80px; /* Mirror of start curve */
        z-index: 1;
    }

    /*
   * TIMELINE LINE - VERTICAL SEGMENT (All items)
   * Straight vertical line connecting items
   */
    .timeline-line-vertical {
        position: absolute;
        top: 0;
        left: 15%; /* Timeline vertical position - moved left */
        width: 4px; /* Thicker line */
        height: 100%;
        background: var(--color-primary); /* Orange color */
        z-index: 1;
    }

    /* First item's vertical line starts from where the start curve ends */
    .timeline-item.first .timeline-line-vertical {
        top: 120px; /* Start from curve height */
    }

    /* Last item's vertical line ends where the end curve begins */
    .timeline-item.last .timeline-line-vertical {
        height: calc(100% - 120px); /* End before the curve starts */
    }

    /*
   * DOT MARKER
   * Positioned on the timeline line at 15% from left
   * Aligned with the date card
   */
    .timeline-dot {
        position: absolute;
        width: 20px; /* Larger dot */
        height: 20px;
        background: var(--color-primary); /* White */
        border: 3px solid var(--color-bg); /* Match background */
        border-radius: 50%;
        box-shadow: 0 0 0 4px var(--color-bg);
        z-index: 3;
        top: var(--space-md); /* Align with content top padding */
        left: calc(
            15% - 8px
        ); /* Timeline position minus half dot width, adjusted slightly right */
    }

    /* First item dot positioned to align with content after curve */
    .timeline-item.first .timeline-dot {
        top: 60px; /* Align with first item content padding */
    }

    /*
   * CONTENT AREA (No card background)
   * Always positioned on the right side of the timeline
   */
    .timeline-content {
        position: relative;
        width: 70%; /* Content width */
        margin-left: calc(15% + 50px); /* Timeline position + gap */
        padding: 0;
        z-index: 2;
    }

    /*
   * Small date card - compact badge style
   * Positioned to align with the dot marker
   */
    .date-card {
        display: inline-block;
        margin-bottom: var(--space-md);
        transform: translateY(-3px); /* Fine-tune vertical alignment with dot */
    }

    .period {
        display: inline-block;
        font-size: 0.9rem;
        font-weight: 400; /* Non-bold */
        font-style: italic; /* Italic */
        padding: 0;
        background: transparent; /* No background */
        border: none; /* No border */
        box-shadow: none; /* No shadow */
        text-transform: none; /* Normal case or keep uppercase if preferred, user said "data and time" */
        color: var(--color-text-light);
        line-height: 1;
    }

    /*
   * Job title
   */
    .timeline-content h3 {
        margin-bottom: var(--space-xs);
        color: var(--color-text);
        font-size: 1.5rem;
        font-weight: 700;
    }

    /*
   * Company name
   */
    .company {
        font-weight: 700;
        color: var(--color-text); /* White to match text */
        font-size: 1.1rem;
        margin-bottom: var(--space-sm);
        display: block;
    }

    /*
   * Description text
   */
    .description {
        line-height: 1.6;
        margin-bottom: var(--space-md);
        color: var(--color-text);
        font-size: 1rem;
        max-width: 600px;
    }

    /* Technologies tags container */
    .tech-tags {
        margin-top: var(--space-md);
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
    }

    .tag {
        background: transparent; /* No color background */
        border: 1px solid rgba(0, 0, 0, 0.2); /* Dark thin border */
        padding: 4px 12px;
        border-radius: 100px;
        font-size: 0.8rem;
        color: var(--color-text-light);
    }

    /*
   * RESPONSIVE DESIGN
   * On mobile, timeline moves to far left with content taking full width
   */
    @media (max-width: 768px) {
        .timeline {
            padding-left: 40px;
        }

        .timeline-item {
            min-height: 200px;
            padding-top: var(--space-sm); /* Less padding on mobile */
        }

        .timeline-item.first {
            padding-top: var(--space-sm); /* Same as other items on mobile */
        }

        .timeline-item.last {
            min-height: 200px; /* Normal height on mobile */
            padding-bottom: 0; /* No extra padding on mobile */
        }

        /* Show curves on mobile */
        .timeline-line-start,
        .timeline-line-end {
            display: block;
        }

        /* Move timeline to far left on mobile */
        .timeline-line-vertical {
            left: 0;
            width: 3px; /* Slightly thinner on mobile */
        }

        /* 
     * TIMELINE START - Mobile
     * Infinite effect starting from the right
     * Connects to the vertical line at left: 0
     */
        .timeline-line-start {
            left: 0; /* Connect to vertical line */
            width: 100vw; /* Extend to right edge */
            height: 60px; /* Reduced height for mobile */
            border-left: 3px solid var(--color-primary); /* Match vertical line width */
            border-top: 3px solid var(--color-primary);
            border-top-left-radius: 40px; /* Smaller radius */
        }

        /* First item's vertical line starts after curve */
        .timeline-item.first .timeline-line-vertical {
            top: 60px; /* Match start curve height */
        }

        /* 
     * TIMELINE END - Mobile
     * Bends to the left
     * Connects from vertical line at left: 0
     */
        .timeline-line-end {
            right: auto; /* Reset desktop positioning */
            left: -100vw; /* Extend infinitely to left */
            width: calc(
                100vw + 3px
            ); /* Full width plus vertical line width to align right edge */
            height: 60px;
            border-right: 3px solid var(--color-primary); /* Vertical part connects to main line */
            border-bottom: 3px solid var(--color-primary); /* Horizontal part goes left */
            border-bottom-right-radius: 40px;
        }

        /* Last item's vertical line ends before curve */
        .timeline-item.last .timeline-line-vertical {
            height: calc(100% - 60px); /* End before curve starts */
        }

        /* Dot on left edge */
        .timeline-dot {
            left: -6.5px; /* Adjusted for smaller dot, centered on 3px line */
            width: 16px;
            height: 16px;
            top: var(--space-sm); /* Match mobile padding */
        }

        .timeline-item.first .timeline-dot {
            top: var(--space-sm); /* Same as other items on mobile */
        }

        /* Content takes most of the width */
        .timeline-content {
            width: calc(100% - 40px);
            margin-left: 40px;
        }

        /* Smaller text on mobile */
        .timeline-content h3 {
            font-size: 1.25rem;
        }

        .company {
            font-size: 1rem;
        }

        .description {
            font-size: 0.9rem;
        }

        /* Adjust date card alignment on mobile */
        .date-card {
            transform: translateY(-2px);
        }
    }
</style>
