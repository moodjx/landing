<script>
    import { onMount } from "svelte";
    import { translations } from "../lib/translations.js";
    // Post Metadata Configuration
    const posts = [];

    // State
    let activePost = $state(null);
    let { currentLang = "en" } = $props();

    // Handlers
    const openPost = (post, event) => {
        console.log("openPost called", {
            post,
            event,
            currentLang,
            activePost,
        });
        if (event) {
            event.preventDefault();
        }
        activePost = post;

        // Update URL for Google Analytics
        const newUrl = `/${currentLang}/blog/${post.id}`;
        console.log("Pushing URL:", newUrl);
        window.history.pushState({ postId: post.id }, "", newUrl);
        window.scrollTo(0, 0);
    };

    const closePost = (event) => {
        if (event) {
            event.preventDefault();
        }
        activePost = null;

        // Update URL back to blog listing
        const newUrl = `/${currentLang}/blog`;
        window.history.pushState({}, "", newUrl);
        window.scrollTo(0, 0);
    };

    // Handle URL changes (back/forward navigation)
    const handleUrlChange = () => {
        const path = window.location.pathname;
        const segments = path.split("/").filter(Boolean);
        console.log("handleUrlChange", { path, segments });

        // Check if we're on a specific blog post URL
        // Expected format: /en/blog/post-id or /de/blog/post-id
        if (segments.length >= 3 && segments[1] === "blog") {
            const postId = segments[2];
            const post = posts.find((p) => p.id === postId);
            console.log("Found post for ID:", postId, post);
            if (post) {
                activePost = post;
            } else {
                // Invalid post ID, go back to listing
                activePost = null;
            }
        } else {
            // We're on the blog listing page
            console.log("On blog listing page");
            activePost = null;
        }
    };

    onMount(() => {
        console.log("BlogPage mounted, initial URL:", window.location.pathname);
        // Check URL on mount to see if we should display a specific post
        handleUrlChange();

        // Listen for browser back/forward navigation
        window.addEventListener("popstate", handleUrlChange);

        return () => {
            window.removeEventListener("popstate", handleUrlChange);
        };
    });
</script>

<div class="blog-page">
    <div class="container">
        {#if activePost}
            <!-- Render Active Post Component -->
            {@const PostComponent = activePost.component}
            <PostComponent onBack={closePost} />
        {:else}
            <!-- Render List of Posts -->
            <div class="posts-grid">
                {#each posts as post}
                    <a
                        class="post-card"
                        href="/{currentLang}/blog/{post.id}"
                        onclick={(e) => openPost(post, e)}
                    >
                        <div class="card-content">
                            <span class="tag">{post.tag}</span>
                            <h2>{post.title}</h2>
                            <p>{post.excerpt}</p>
                            <div class="meta">
                                <span class="date">{post.date}</span>
                                <span class="read-more"
                                    >{translations[currentLang].blog
                                        .readMore}</span
                                >
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .blog-page {
        min-height: 100vh;
        padding-top: 120px; /* Ensure clearance for nav bar */
        background: var(--color-bg);
        color: var(--color-text);
        position: relative; /* Ensure z-index works */
        z-index: 10; /* Sit above background */
    }

    .container {
        max-width: 1200px; /* Match website borders */
        margin: 0 auto;
        padding: 0 var(--space-md); /* Match HomeContent padding */
    }

    .posts-grid {
        display: grid;
        gap: var(--space-xl);
    }

    .post-card {
        display: block;
        width: 100%;
        text-align: left;
        font-family: inherit;
        color: inherit;
        text-decoration: none; /* Remove underline from links */
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: var(--space-xl);
        cursor: pointer;
        position: relative;
        z-index: 20;
        transition:
            transform 0.2s,
            background 0.2s,
            border-color 0.2s;
    }

    .post-card:hover {
        transform: translateY(-4px);
        background: rgba(255, 255, 255, 0.05);
        border-color: var(--color-primary);
    }

    .tag {
        display: inline-block;
        background: rgba(76, 161, 255, 0.1);
        color: var(--color-primary);
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: var(--space-md);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    h2 {
        font-size: 1.5rem;
        margin-bottom: var(--space-md);
        color: var(--color-text);
    }

    p {
        color: var(--color-text-light);
        line-height: 1.6;
        margin-bottom: var(--space-lg);
    }

    .meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
    }

    .date {
        color: var(--color-text-dim);
    }

    .read-more {
        color: var(--color-primary);
        font-weight: 500;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 2.5rem;
        }
    }
</style>
