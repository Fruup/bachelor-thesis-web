<script lang="ts">
  import { previewElement, previewAnchor } from '$lib/services/preview'
  import { fly } from 'svelte/transition'

  $: element = $previewElement
  $: anchor = $previewAnchor

  let x = 0
  let y = 0

  let contentWidth: number
  let contentHeight: number

  let showTime = false
  let timer: ReturnType<typeof setTimeout>

  $: show = showTime && element

  $: if (element) {
    timer = setTimeout(() => (showTime = true), 500)
  } else {
    showTime = false
    clearTimeout(timer)
  }

  $: if (show && anchor) {
    const rect = anchor.getBoundingClientRect()

    x = rect.x + window.scrollX + rect.width / 2 - contentWidth / 2

    if (rect.y < window.innerHeight / 2) {
      y = rect.y + rect.height
    } else {
      y = rect.y - rect.height - contentHeight
    }

    x = Math.max(0, Math.min(window.innerWidth - contentWidth, x))
    y = Math.max(0, Math.min(window.innerHeight - contentHeight, y))

    x += window.scrollX
    y += window.scrollY
  }

  $: style = `--x: ${x}px; top: ${y}px;`

  $: html = (() => {
    const N = 3
    let html = ''
    let e: Element | undefined | null = element

    for (let i = 0; e && i < N; i++) {
      html += e.outerHTML
      e = e.nextElementSibling
    }

    return html
  })()
</script>

{#if show && element}
  <div
    {style}
    transition:fly={{ y: 20 }}
    class="preview"
    bind:clientWidth={contentWidth}
    bind:clientHeight={contentHeight}
  >
    <div class="content">
      {@html html}
    </div>

    <div class="gradient" />
  </div>
{/if}

<style lang="scss">
  .preview {
    position: absolute;
    z-index: 1000;
    left: var(--x);
    top: var(--y);

    margin: 0.5em;
    padding: 1em;

    width: 350px;
    max-height: 350px;

    border-radius: 12px;

    box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.5);
    background-color: var(--color-background);

    overflow: hidden;

    &:after {
      content: '';
      position: absolute;

      width: 100%;
      height: 50%;
      bottom: 0;

      background: linear-gradient(transparent, var(--color-background));
    }

    :global(.content > :first-child) {
      margin-top: 0;
    }

    :global(.content > :last-child) {
      margin-bottom: 0;
    }

    :global(.content > *) {
      margin-left: 0;
      margin-right: 0;
    }
  }
</style>
