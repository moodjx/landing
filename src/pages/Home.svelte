<script>
    import Hero from "../components/home/Hero.svelte";
    import HomeContent from "../components/home/HomeContent.svelte";

    let { currentLang, startAnimation, isExiting } = $props();
</script>

<!-- HOME PAGE SECTIONS -->
<!-- Each section has an id for scroll navigation -->
<Hero {currentLang} {startAnimation} {isExiting} />

<!-- Skills bar removed -->
<HomeContent {currentLang} />
<!-- FeaturedProjects moved to BlogPage -->
