<script lang="ts">
  export let textAlign: 'left' | 'right' | 'center' | 'justify' = 'left';
  export let textAlignMobile: 'left' | 'right' | 'center' | 'justify' = textAlign;
</script>

<h2 class="heading" style="--text-align: {textAlign}; --text-align-mobile: {textAlignMobile};">
  <slot />
</h2>

<style lang="scss">
  .heading {
    font-size: 36px;
    line-height: 41px;
    text-align: var(--text-align);
  }
  @include mobile {
    .heading {
      font-size: 28px;
      line-height: 40px;
      text-align: var(--text-align-mobile);
    }
  }
</style>
