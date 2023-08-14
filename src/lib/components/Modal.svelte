<script lang="ts">
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import { base } from '$app/paths'
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'

  export let name: string = 'test'
  // export let name: string = Math.floor(0xffff * Math.random()).toString(16)
  export let open = false
  export let closable = true

  $: hashName = '#' + name

  const duration = 200

  $: if (open) {
    goto(hashName, { state: { hashName }, noScroll: true })

    document.body.classList.add('no-scroll')
  } else if (browser) {
    if (history.state.hashName === hashName) goto(base, { noScroll: true })

    document.body.classList.remove('no-scroll')
  }

  const handleHashChange = (e: HashChangeEvent) => {
    if (new URL(e.newURL).hash === hashName) open = true
    else if (new URL(e.oldURL).hash === hashName) open = false
  }

  const handlePointerDown = () => {
    if (closable) open = false
  }

  onMount(() => {
    if (window.location.hash === hashName) open = true
  })
</script>

<svelte:head>
  <style>
    body.no-scroll {
      overflow-y: hidden;
    }
  </style>
</svelte:head>

<svelte:window on:hashchange={handleHashChange} />

<button type="button" on:click={() => (open = true)}>modal</button>

{#if open}
  <div
    transition:fly={{ duration }}
    on:pointerdown|stopPropagation|self|capture={handlePointerDown}
    class="background"
  >
    <div transition:fly={{ y: 20, delay: duration, duration }} class="container">
      {#if closable}
        <button type="button" class="close" on:click={() => (open = false)}>X</button>
      {/if}

      <div class="content">
        <slot />
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @use 'sass:color';
  @import 'vars';

  .background {
    position: fixed;
    inset: 0;

    display: grid;
    place-content: center;

    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(1.5px);

    .container {
      :global(.content > :first-child) {
        margin-top: 0;
      }

      :global(.content > :last-child) {
        margin-bottom: 0;
      }

      position: relative;

      border-radius: 12px;
      padding: 1em;

      background-color: var(--color-text);
      color: var(--color-background);

      min-width: 100px;
      max-width: 100vw;

      button.close {
        position: absolute;
        top: 1em;
        right: 1em;

        width: 2em;
        aspect-ratio: 1;

        z-index: 1;

        &::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 999px;

          background-color: $color-background;
          opacity: 0.1;

          scale: 0;
          transition: 100ms scale ease;
        }

        &:hover::after {
          scale: 1;
        }
      }
    }
  }

  @include sm {
  }
</style>
