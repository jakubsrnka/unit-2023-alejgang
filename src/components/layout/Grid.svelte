<script lang="ts">
  import { parseMargin, type Margin, type Gap, parseGap } from '$lib/layout';
  import { onMount } from 'svelte';

  export let justifyContent = 'space-between';
  export let alignItems = 'center';
  export let gap: string | Gap = '8px';
  export let templateColumns = 'unset';
  export let templateRows = 'unset';
  export let margin: string | Margin = '0';
  export let height = 'unset';

  onMount(() => {
    margin = parseMargin(margin);
    gap = parseGap(gap);
  });
</script>

<div
  class="grid"
  style={`
  --justifyContent: ${justifyContent};
  --alignItems: ${alignItems};
  --gap: ${gap};
  --templateCols: ${templateColumns};
  --templateRows: ${templateRows};
  --margin: ${margin};
  --height: ${height};
`}
>
  <slot />
</div>

<style lang="scss">
  .grid {
    display: grid;
    justify-content: var(--justifyContent);
    align-items: var(--alignItems);
    gap: var(--gap);
    grid-template-columns: var(--templateCols);
    grid-template-rows: var(--templateRows);
    margin: var(--margin);
    height: var(--height);
  }
</style>
