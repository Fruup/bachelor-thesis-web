<script lang="ts">
  import Modal from '$lib/components/Modal.svelte'
  import Preview from '$lib/components/Preview.svelte'
  import { navigationHistory, useNavigationHistory } from '$lib/services/history'
  import { usePreview } from '$lib/services/preview'

  let container: HTMLDivElement

  const restore = (index: number) => {
    container.dispatchEvent(new CustomEvent('history:restore', { detail: index }))
  }

  export let data
  const { html, css, headings } = data
</script>

<svelte:head>
  <!-- https://github.com/sveltejs/svelte/issues/5292 -->
  {@html `<${''}style>${css}</${''}style>`}
</svelte:head>

<div class="container" bind:this={container} use:useNavigationHistory use:usePreview>
  {@html html}
</div>

<!--
	Put this element below all content so hash links won't lead to previewed elements.
-->
<Preview />

<nav>
  <ul>
    {#each $navigationHistory as item, index}
      <li>
        {item.scrollPosition}
        <br />
        {item.toHash}

        <button on:click={() => restore(index)}> restore </button>
      </li>
    {/each}
  </ul>
</nav>

<Modal>
  <h1>Login</h1>

  <p>Hello my name is Leon</p>
</Modal>

<style lang="scss">
  nav {
    position: fixed;
    bottom: 0;
    right: 0;
  }

  .container {
    /* max-width: 500px; */
    margin: auto;
  }

  .container {
    :global {
      @import './page.scss';
    }
  }
</style>
