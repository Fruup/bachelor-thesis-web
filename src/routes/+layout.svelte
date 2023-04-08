<script lang="ts">
  import '$lib/styles/app.scss'
</script>

<main>
  <slot />
</main>

<style lang="scss">
  main {
    max-width: 750px;
    margin: auto;
  }
</style>
