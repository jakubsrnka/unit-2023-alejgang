<script lang="ts">
  import '$src/styles/global.scss';
  import { page } from '$app/stores';
  import Main from '$components/layout/Main.svelte';
</script>

<Main>
  <section>
    {#if $page.error}
      <h1>{$page.status}: {$page.error.message}</h1>
    {:else}
      <h1>Oh no, something went wrong</h1>
    {/if}
  </section>
</Main>

<style lang="scss">
  section {
    min-height: 100vh;
    height: 100vh;
    display: grid;
    place-content: center;
  }
</style>
