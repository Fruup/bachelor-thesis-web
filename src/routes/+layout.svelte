<script lang="ts">
  import Cover from '$lib/components/Cover.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import '$lib/styles/app.scss'
</script>

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
