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

  const hydrateMath = () => {
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
  }

  const hydrateImages = () => {
    imageElements = Array.from(container.querySelectorAll('img'))
  }

  onMount(() => {
    /**
     * Hydrate server rendered markup here.
     */
    hydrateMath()
    hydrateImages()
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

  <section class="bibliography">
    <h2>Bibliography</h2>
    {@html bibliography.html}
  </section>
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

  .bibliography {
    :global {
      .csl-entry {
        margin: 1.5rem 0;
        padding-left: 3rem;
        text-indent: -3rem;
      }
    }
  }
</style>
