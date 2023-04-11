<script lang="ts">
  interface SelectItem {
    label: string;
    icon?: string;
  }
  export let title: string;
  export let items: { [key: string]: SelectItem };
  export let width = '100%';
  export let name: string;
  export let required = false;
</script>

<div class="select" style="--width: {width};">
  <div class="select__title">
    <h3>{title}</h3>
  </div>
  {#each Object.entries(items) as [value, item]}
    <div class="select__item">
      <div class="select__item__divider" />
      <input type="radio" id={value} {name} {value} {required} class="select__item__input" hidden />
      <label for={value}>
        <div class="select__item__alt" />
        {item.label}
        {#if item.icon}
          <img src={item.icon} alt={item.label} />
        {/if}
      </label>
    </div>
  {/each}
</div>

<style lang="scss">
  .select {
    width: var(--width);
    background: $color-white;
    border: 1.5px solid $color-medium-gray;
    border-radius: 13px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-bottom: 6px;

    &__title {
      width: 100%;
      height: 54px;
      background-color: $color-medium-gray;
      border-top-left-radius: 11px;
      border-top-right-radius: 11px;
      display: flex;

      h3 {
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 120%;
        display: flex;
        align-items: center;
        margin-left: 16px;
      }
    }
    &__item {
      width: calc(var(--width) - 20px);
      height: 46px;
      display: flex;
      align-items: center;
      letter-spacing: 0.02em;
      margin-left: 10px;
      padding-left: 6px;

      &:not(:last-of-type) {
        border-bottom: 1px solid $color-medium-gray;
      }
      &__input {
        &:checked + label {
          .select__item {
            &__alt {
              width: 20px;
              height: 20px;
              border: 2px solid $color-dark-gray;
              border-radius: 50%;
              box-sizing: border-box;
              padding: 3px;
              &::after {
                content: '';
                width: 10px;
                height: 10px;
                display: block;
                background: $color-dark-gray;
                border-radius: 50%;
              }
            }
          }
        }
      }
      label {
        width: 100%;
        height: 100%;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        color: $color-dark-gray;
        display: flex;
        align-items: center;
        letter-spacing: 0.02em;
        gap: 20px;
        .select__item {
          &__alt {
            width: 20px;
            height: 20px;
            border: 2px solid $color-medium-gray;
            border-radius: 50%;
            box-sizing: border-box;
          }
        }
        img {
          max-height: 30px;
          max-width: 56px;
        }
      }
    }
  }
</style>
