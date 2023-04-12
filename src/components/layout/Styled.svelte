<script lang="ts">
  import { parseMargin, type Margin, type Padding } from '$lib/layout';
  import { onMount } from 'svelte';

  export let position = 'static';
  export let width = 'fit-content';
  export let height = 'fit-content';
  export let margin: string | Margin = '0';
  export let padding: string | Padding = '0';
  export let border = 'none';
  export let borderRadius = '0';
  export let backgroundColor = 'transparent';
  export let zIndex = 'auto';
  export let minWidth = 'initial';
  export let flexGrow = '0';

  onMount(() => {
    margin = parseMargin(margin);
    padding = parseMargin(padding);
  });
</script>

<div
  class="styled"
  style={`
    --width: ${width};
    --height: ${height};
    --margin: ${margin};
    --padding: ${padding};
    --position: ${position};
    --border: ${border};
    --border-radius: ${borderRadius};
    --background-color: ${backgroundColor};
    --z-index: ${zIndex};
    --min-width: ${minWidth};
    --flex-grow: ${flexGrow};
  `}
>
  <slot />
</div>

<style lang="scss">
  .styled {
    width: var(--width);
    height: var(--height);
    margin: var(--margin);
    padding: var(--padding);
    position: var(--position);
    border: var(--border);
    border-radius: var(--border-radius);
    background-color: var(--background-color);
    z-index: var(--z-index);
    min-width: var(--min-width);
    flex-grow: var(--flex-grow);
  }
</style>
