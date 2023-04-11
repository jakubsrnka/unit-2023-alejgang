<script lang="ts">
  type Input = 'text' | 'password' | 'email' | 'tel' | 'number' | 'textarea';
  export let type: Input = 'text';
  export let label: string | undefined = '';
  export let name: string;
  export let required = false;
  export let width = '100%';
  export let value = '';
  export let theme: 'light' | 'dark' = 'light';
  function typeAction(node: HTMLInputElement) {
    node.type = type;
  }
</script>

<div class="input input-{theme}" style="--input-width: {width}">
  {#if type === 'textarea'}
    <textarea {name} bind:value id={name} {required} class:input__with-value={value !== ''} />
  {:else}
    <input
      use:typeAction
      {name}
      bind:value
      id={name}
      {required}
      class:input__with-value={value !== ''}
    />
  {/if}
  {#if label}
    <label for={name}>{label}</label>
  {/if}
</div>

<style lang="scss">
  .input {
    position: relative;
    width: var(--input-width);

    label {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 17px;
      font-weight: 500;
      line-height: 22px;
      color: rgba($color-dark-gray, 0.6);
      transition: 0.3s ease all;
    }

    input,
    textarea {
      height: 37px;
      padding-bottom: 10px;
      width: var(--input-width);
      border: none;
      appearance: none;
      outline: none;
      border-bottom: 1px solid $color-medium-gray;
      font-size: 17px;
      line-height: 22px;
      font-weight: 500;
      color: $color-dark-gray;
      background-color: transparent;

      &.input__with-value,
      &:focus {
        border: none;
        border-bottom: 1px solid $color-blue;

        + label {
          font-size: 12px;
          line-height: 19px;
          translate: 0px -17px;
          color: $color-blue;
        }
      }
    }

    textarea {
      height: 130px;
      resize: none;
    }

    &-dark {
      label {
        color: $color-white;
      }
      input,
      textarea {
        color: $color-white;
      }
    }
  }
</style>
