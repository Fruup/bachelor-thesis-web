<script lang="ts">
  import GitHubIcon from './icons/GitHubIcon.svelte'

  let className: string | undefined
  export { className as class }
</script>

<nav class={className}>
  <ul>
    <li>
      <a href="https://leonscherer.com" target="_blank"> My Personal Website </a>
    </li>
    <li class="separator" />
    <li>
      <a
        href="https://github.com/Fruup/bachelor-thesis-web"
        target="_blank"
        aria-label="link to github repository"
      >
        <GitHubIcon />
      </a>
    </li>
  </ul>
</nav>

<style lang="scss">
  nav {
    ul {
      padding: 0;
      margin: 0;

      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-items: center;
    }

    ul {
      list-style: none;
    }

    .separator {
      width: 1px;
      height: 1rem;
      background-color: var(--color-text);
    }
  }
</style>
