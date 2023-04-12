<script lang="ts">
  import Icon from '$components/elements/Icon.svelte';
  import ConditionalWrapper from '$components/utils/ConditionalWrapper.svelte';

  export let clazz = '';
  export let color = '#1d1d1b';
  export let textColor = '#fff';
  export let border: string | undefined = undefined;
  export let width = 'fit-content';
  export let icon: string | undefined = undefined;
  export let iconColor: string | undefined = undefined;
  export let iconSize = 18;
  export let submit = false;
  export let type: 'normal' | 'spacious' = 'normal';
  export let href: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let slimness: 'slim' | 'super-slim' | false = false;
  export let padding =
    slimness === 'super-slim' ? '0 18px' : slimness === 'slim' ? '0 16px' : '0 22px';
</script>

<ConditionalWrapper tag={href && 'a'} {href} {target}>
  <button
    on:click
    class="button button--{type} {clazz}"
    class:button--slim={slimness === 'slim'}
    class:button--super-slim={slimness === 'super-slim'}
    style="--button-width: {width}; --button-background-color: {color}; --button-border: {border}; --button-text-color: {textColor}; --button-padding: {padding};"
    type={submit ? `submit` : `button`}
  >
    <slot />
    {#if icon}
      <Icon {icon} color={iconColor} size={iconSize} />
    {/if}
  </button>
</ConditionalWrapper>

<style lang="scss">
  .button {
    height: 42px;
    line-height: 42px;
    width: var(--button-width);
    text-align: center;
    background-color: var(--button-background-color);
    color: var(--button-text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    border: none;
    font-size: 14px;
    transition: 0.1s ease all;
    padding: var(--button-padding);
    border-radius: 8px;
    white-space: nowrap;
    word-wrap: none;
    border: var(--button-border);
    &--normal {
      gap: 9px;
    }
    &--spacious {
      gap: 29px;
    }
    &--slim {
      height: 48px;
      line-height: 48px;
      border-radius: 24px;
      font-size: 14px;
    }
    &--super-slim {
      height: 43px;
      line-height: 43px;
      border-radius: 21.5px;
      font-size: 14px;
    }
  }
  @include mobile {
    .button {
      height: 48px;
      border-radius: 24px;
      font-size: 14px;
      &--spacious {
        gap: 18px;
      }
    }
  }
</style>
