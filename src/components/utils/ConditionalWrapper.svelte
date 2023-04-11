<script lang="ts">
  export let tag: string | false | undefined = undefined;
</script>

{#if tag}
  <svelte:element this={tag} {...$$restProps}>
    <slot />
  </svelte:element>
{:else}
  <slot />
{/if}
