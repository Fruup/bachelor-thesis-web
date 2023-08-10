<script lang="ts">
  import { navigationHistory } from '$lib/services/history'
  import { flip } from 'svelte/animate'

  export let restore: (index: number) => void
</script>

<!-- <nav>
  <ul>
    {#each $navigationHistory as item, index (index)}
      <li animate:flip={{ duration: 500 }}>
        {item.scrollPosition}
        <br />
        {item.toHash}

        <button on:click={() => restore(index)}> restore </button>
      </li>
    {/each}
  </ul>
</nav> -->

<style>
  nav {
    position: fixed;
    bottom: 0;
    right: 0;
  }
</style>
