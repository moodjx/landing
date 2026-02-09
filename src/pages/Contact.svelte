<script>
    import Contact from "../components/contact/Contact.svelte";

    let { currentLang = "en" } = $props();
</script>

<!-- Contact Page - Dedicated page for the contact section -->
<div class="contact-page">
    <Contact {currentLang} />
</div>

<style>
    .contact-page {
        min-height: 100vh;
        padding-top: var(--space-xl);
    }
</style>
