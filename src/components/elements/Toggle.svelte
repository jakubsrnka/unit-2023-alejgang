<script lang="ts">
  export let active = false;
</script>

<div
  class="toggle"
  class:toggle--active={active}
  on:click={() => (active = !active)}
  on:keypress={() => (active = !active)}
>
  <div class="toggle__alt">
    <svg
      width="51"
      height="31"
      viewBox="0 0 51 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="toggle__alt__svg"
    >
      <path
        d="M15.857 0.0921522C17.597 -0.0078478 19.335 0.0001522 21.075 0.0001522C21.087 0.0001522 29.892 0.0001522 29.892 0.0001522C31.666 0.0001522 33.404 -0.0078478 35.143 0.0921522C36.724 0.182152 38.264 0.374152 39.797 0.803152C43.024 1.70515 45.842 3.58915 47.879 6.26015C49.904 8.91415 51 12.1632 51 15.4992C51 18.8392 49.904 22.0862 47.879 24.7402C45.842 27.4102 43.024 29.2952 39.797 30.1972C38.264 30.6262 36.724 30.8172 35.143 30.9082C33.404 31.0082 31.666 30.9992 29.926 30.9992C29.914 30.9992 21.107 31.0002 21.107 31.0002C19.335 30.9992 17.597 31.0082 15.857 30.9082C14.277 30.8172 12.737 30.6262 11.204 30.1972C7.977 29.2952 5.159 27.4102 3.122 24.7402C1.097 22.0862 0 18.8392 0 15.5002C0 12.1632 1.097 8.91415 3.122 6.26015C5.159 3.58915 7.977 1.70515 11.204 0.803152C12.737 0.374152 14.277 0.182152 15.857 0.0921522Z"
        class="toggle__alt__svg__background"
      />
    </svg>
    <div class="toggle__alt__knob" />
  </div>
  <div class="toggle__label">
    <slot />
  </div>
</div>

<style lang="scss">
  .toggle {
    display: flex;
    align-items: center;
    gap: 19px;
    cursor: pointer;
    &--active {
      .toggle {
        &__alt {
          &__svg {
            &__background {
              fill: $color-green;
            }
          }
          &__knob {
            translate: 10px 0;
          }
        }
      }
    }
    &__alt {
      position: relative;
      width: 51px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      &__svg {
        &__background {
          fill: $color-medium-gray;
          transition: 0.3s ease all;
        }
      }
      &__knob {
        width: 27px;
        height: 27px;
        border-radius: 50%;
        background-color: $color-white;
        box-shadow: 0px 3px 8px rgba($color-black, 0.15), 0px 3px 1px rgba($color-black, 0.06);
        position: absolute;
        translate: -10px 0;
        transition: 0.3s ease all;
      }
    }
    &__label {
      font-size: 16px;
    }
  }
</style>
