<script lang="ts">
  import Cover from '$lib/components/Cover.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import '$lib/styles/app.scss'
</script>

<svelte:head>
  <meta
    name="description"
    content="A thesis about visualizing fluids using smoothed-particle hydrodynamics with in-depth descriptions, code, images and mathematical insights. Author: Leon Scherer."
  />

  <title>Visualization for Smoothed-Particle Hydrodynamics - Leon Scherer</title>
</svelte:head>

<Cover />

<main>
  <slot />
</main>

<Footer />

<style lang="scss">
  main {
    max-width: 750px;
    margin: auto;
    padding: 1em;
  }
</style>
