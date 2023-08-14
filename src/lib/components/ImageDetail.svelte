<script lang="ts">
  import { onMount } from 'svelte'
  import { cubicOut } from 'svelte/easing'
  import { fly, fade, type TransitionConfig } from 'svelte/transition'

  export let element: HTMLImageElement
  export let visible = false

  export let durationIn = 250
  export let durationOut = 500

  $: src = element.src
  $: alt = element.alt

  const BUTTON_CLASS_NAME = 'image-detail-button'

  const flyParams = {
    duration: durationOut,
    y: 50,
  }

  onMount(() => {
    const parent = element.parentElement
    if (!parent) return
    if (parent.tagName === 'BUTTON' && parent.className === BUTTON_CLASS_NAME) return

    const button = document.createElement('button')
    button.addEventListener('click', () => (visible = true))
    button.className = BUTTON_CLASS_NAME

    parent.insertBefore(button, element)
    button.appendChild(element)
  })

  const intro = (node: HTMLElement): TransitionConfig => {
    const r1 = element.getBoundingClientRect()
    const r2 = node.getBoundingClientRect()

    const dx = r1.x - r2.x
    const dy = r1.y - r2.y
    const scaleX = r1.width / r2.width
    const scaleY = r1.height / r2.height

    return {
      css: (t, u) => `
				translate: ${u * dx}px ${u * dy}px;
				scale: ${scaleX + t * (1 - scaleX)} ${scaleY + t * (1 - scaleY)};
			`,
      duration: durationIn,
      easing: cubicOut,
    }
  }

  const handleWindowKeydown = (e: KeyboardEvent) => {
    if (!visible) return

    if (e.key === 'Escape') {
      visible = false
    }
  }
</script>

<svelte:window on:keydown={handleWindowKeydown} />

{#if visible}
  <button
    type="button"
    class="image-detail-mask"
    in:fade={{ duration: 100 }}
    out:fade={{ duration: durationOut }}
    on:click={() => (visible = false)}
  >
    <img class="detail-image" in:intro out:fly={flyParams} {src} {alt} />
  </button>
{/if}

<style lang="scss">
  :global {
    .image-detail-mask,
    .image-detail-button {
      display: contents;

      border: none;
      padding: 0;
    }

    :root:has(.image-detail-mask) {
      overflow: hidden;
    }
  }

  .image-detail-mask {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);

    display: grid;
    place-content: center;
    backdrop-filter: blur(2px);

    .detail-image {
      transform-origin: top left;
      max-width: 100%;
      max-height: 100%;

      border-radius: 8px;
    }
  }
</style>
