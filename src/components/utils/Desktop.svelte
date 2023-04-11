<script>
  import MediaQuery from '$components/utils/MediaQuery.svelte';
</script>

<MediaQuery query="(min-width: 721px)" let:matches>
  {#if matches}
    <slot />
  {/if}
</MediaQuery>
