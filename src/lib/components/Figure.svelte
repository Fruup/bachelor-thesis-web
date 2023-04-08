<script lang="ts">
  import { base } from '$app/paths'
  import { joinPaths } from '$lib/utils'

  export let sources: string
  export let sourcesPath = 'figures'
  export let ref: string | undefined = undefined
  export let numbering: 'alphabetical' | 'numeric' | boolean = false
  export let size = 1

  $: _sources = sources
    .split(',')
    .map((source) => source.trim())
    .filter((source) => !!source)
    .map((source) => joinPaths(base, sourcesPath, source))

  $: columns = Math.ceil(Math.sqrt(_sources.length))
  $: rows = Math.ceil(_sources.length / columns)
</script>

<figure id={ref}>
  <div class="images" style:--columns={columns} style:--rows={rows}>
    {#each _sources as src, i}
      <div class="item">
        <img style:width="{100 * size}%" {src} alt="" />

        <div class="numbering">
          {#if numbering === 'numeric'}
            ({i + 1})
          {:else if numbering}
            ({String.fromCharCode('a'.charCodeAt(0) + i)})
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <figcaption>
    <i>Figure 42.1:</i>

    <slot />
  </figcaption>
</figure>

<style lang="scss">
  figure {
    margin: 3em 2em;

    page-break-inside: avoid;

    .images {
      display: grid;
      grid-template-columns: repeat(var(--columns), 1fr);
      grid-template-rows: repeat(var(--rows), 1fr);
      gap: 0.5em;

      width: 100%;

      img {
        margin: auto;
      }
    }

    .item {
      display: flex;
      flex-direction: column;
    }

    figcaption {
      margin-top: 0.5em;
    }

    .numbering {
      text-align: center;
      color: #555;
    }
  }
</style>
