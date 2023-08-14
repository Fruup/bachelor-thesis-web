<script lang="ts">
  import ExternalLinks from './ExternalLinks.svelte'
  import AngleDown from './icons/AngleDown.svelte'

  const scrollToContent = () => {
    window.scrollTo({
      top: window.visualViewport?.height,
      behavior: 'smooth',
    })
  }
</script>

<div class="cover">
  <h1>
    Implementation<br />of a method of<br /><span class="a">surface reconstruction</span><br />and
    <span class="b">visualization</span> of<br />
    particle-based fluids
  </h1>
  <h6>Leon Scherer</h6>

  <ExternalLinks class="external-links" />

  <button
    type="button"
    class="to-content"
    on:click={scrollToContent}
    aria-label="skip to main content"
  >
    <AngleDown />
  </button>
</div>

<style lang="scss">
  @use 'sass:color';
  @import 'vars';

  .cover {
    height: 100vh;
    display: grid;
    place-content: center;
    text-align: center;

    position: relative;

    box-sizing: border-box;
    border-bottom: 10px solid var(--color-primary);

    :global(.external-links) {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
    }

    h1 {
      font-size: 3rem;
      max-width: 800px;

      // span.b {
      //   text-decoration: underline var(--color-primary);
      // }

      // span.a {
      //   position: relative;

      //   &::before {
      //     z-index: -1;
      //     content: '';
      //     // background-color: var(--color-primary);
      //     border: 2px solid var(--color-primary);
      //     inset: 0 -15px 0 -15px;
      //     position: absolute;
      //     transform: skewX(-15deg);
      //   }
      // }
    }

    h6 {
      font-weight: 300;
      font-size: 1.5rem;
    }

    @include sm {
      h1 {
        font-size: 1.7rem;
      }

      h6 {
        font-size: 1rem;
      }
    }

    button.to-content {
      display: grid;
      place-content: center;

      color: $color-text;
      cursor: pointer;

      background-color: color.change($color-text, $alpha: 0.1);
      border: none;
      padding: 0;
      border-radius: 999px;

      transition: background-color 150ms ease;

      &:hover {
        background-color: color.change($color-text, $alpha: 0.2);
      }

      width: 3rem;
      height: 3rem;
      position: absolute;
      bottom: 2rem;
      left: 50%;
      translate: -50%;
    }
  }
</style>
