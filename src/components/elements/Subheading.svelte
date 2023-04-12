<script lang="ts">
  export let textAlign: 'left' | 'right' | 'center' | 'justify' = 'left';
  export let textAlignMobile: 'left' | 'right' | 'center' | 'justify' = textAlign;
</script>

<p class="subheading" style="--text-align: {textAlign}; --text-align-mobile: {textAlignMobile};">
  <slot />
</p>

<style lang="scss">
  .subheading {
    font-size: 24px;
    line-height: 31px;
    font-weight: bold;
    text-align: var(--text-align);

    margin-bottom: 1rem;
  }
  @include mobile {
    .subheading {
      font-size: 16px;
      line-height: 31px;
      text-align: var(--text-align-mobile);
    }
  }
</style>
