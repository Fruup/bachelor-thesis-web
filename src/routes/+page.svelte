<script lang="ts">
  import ImageDetail from '$lib/components/ImageDetail.svelte'
  import MathOptions from '$lib/components/MathOptions.svelte'
  import Preview from '$lib/components/Preview.svelte'
  import { navigationHistory, useNavigationHistory } from '$lib/services/history'
  import { usePreview } from '$lib/services/preview'
  import { onMount } from 'svelte'

  let container: HTMLDivElement
  let imageDetailsContainer: HTMLDivElement

  let imageElements: HTMLImageElement[] = []

  const restore = (index: number) => {
    container.dispatchEvent(new CustomEvent('history:restore', { detail: index }))
  }

  export let data
  const { html, css, headings, bibliography } = data

  console.log(bibliography)

  onMount(() => {
    const mathContainers = container.querySelectorAll<HTMLDivElement>('.math.math-display')

    for (const mathContainer of mathContainers) {
      if (mathContainer.scrollWidth <= mathContainer.clientWidth) continue

      new MathOptions({
        target: mathContainer,
        props: {
          mathContainer,
        },
      })
    }

    imageElements = Array.from(container.querySelectorAll('img'))
  })
</script>

<div bind:this={imageDetailsContainer} class="image-details">
  {#each imageElements as element}
    <ImageDetail {element} />
  {/each}
</div>

<div class="container" bind:this={container} use:useNavigationHistory use:usePreview>
  {@html `<${'style'} scoped>${css}</style>`}

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

<style lang="scss">
  @import 'vars';
  @import 'document';

  nav {
    position: fixed;
    bottom: 0;
    right: 0;
  }

  .container {
    margin: auto;

    :global {
      @include document;
    }
  }
</style>
