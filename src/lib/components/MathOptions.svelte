<script lang="ts">
  import { onMount } from 'svelte'

  export let mathContainer: HTMLElement

  let scale = 1

  $: child = mathContainer.firstElementChild! as HTMLElement
  $: mathContainer.classList.toggle('fit', scale !== 1)
  $: child.style.scale = scale.toString()

  const fit = () => {
    if (scale !== 1) scale = 1
    else {
      scale = mathContainer.clientWidth / mathContainer.scrollWidth
      mathContainer.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    }
  }

  onMount(() => {
    mathContainer.onclick = () => fit()

    fit()
  })
</script>

<style lang="scss" global>
  .math {
    &.fit {
      overflow-x: hidden;
    }

    > * {
      transition: scale 500ms ease;
      transform-origin: center left;
    }
  }
</style>
