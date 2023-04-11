<script lang="ts">
  import { parseMargin, type Margin, type Gap, parseGap } from '$lib/layout';
  import { onMount } from 'svelte';

  export let justifyContent = 'space-between';
  export let alignItems = 'center';
  export let gap: string | Gap = '8px';
  export let direction = 'row';
  export let wrap = 'nowrap';
  export let width = 'fit-content';
  export let height = 'fit-content';
  export let margin: string | Margin = '0';

  onMount(() => {
    margin = parseMargin(margin);
    gap = parseGap(gap);
  });
</script>

<div
  class="flex"
  style={`
    --justifyContent: ${justifyContent};
    --alignItems: ${alignItems};
    --gap: ${gap};
    --direction: ${direction};
    --wrap: ${wrap};
    --width: ${width};
    --height: ${height};
    --margin: ${margin};
  `}
>
  <slot />
</div>

<style lang="scss">
  .flex {
    display: flex;
    justify-content: var(--justifyContent);
    align-items: var(--alignItems);
    gap: var(--gap);
    flex-direction: var(--direction);
    flex-wrap: var(--wrap);
    width: var(--width);
    height: var(--height);
    margin: var(--margin);
  }
</style>
