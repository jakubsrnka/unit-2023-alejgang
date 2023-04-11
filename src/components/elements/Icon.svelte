<script lang="ts">
  export let icon: string;
  export let color = '#1d1d1b';
  export let size = 24;
  export let viewBox = 24;
  export let transition: boolean | string = false;
  export let hoverColor: string | null = null;
  export let casing: string | null = null;

  casing = casing === null ? `${size}px` : casing;
  hoverColor = hoverColor === null ? color : hoverColor;

  const icons: {
    [key: string]: string;
  } = {
    'arrow-down': `<path d="M16.8057 14.5593L12.0002 20.6293L7.19483 14.5593" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 3.62964L12 20.4596" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />`,
    'arrow-right': `<path d="M14.4297 5.93018L20.4997 12.0002L14.4297 18.0702" stroke-width="1.46" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.5 12H20.33" stroke-width="1.46" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>`,
    book: `<path d="M17.4163 13.2527V3.69725C17.4163 2.74725 16.6405 2.04267 15.6984 2.12184H15.6509C13.9884 2.26434 11.463 3.11142 10.0538 3.99809L9.91926 4.08517C9.68968 4.22767 9.30968 4.22767 9.08009 4.08517L8.88218 3.96642C7.47301 3.08767 4.95551 2.2485 3.29301 2.11392C2.35092 2.03475 1.58301 2.74725 1.58301 3.68934V13.2527C1.58301 14.0127 2.20051 14.7252 2.96051 14.8202L3.19009 14.8518C4.90801 15.0814 7.56009 15.9523 9.08009 16.7835L9.11176 16.7993C9.32551 16.9181 9.66593 16.9181 9.87176 16.7993C11.3918 15.9602 14.0518 15.0814 15.7776 14.8518L16.0388 14.8202C16.7988 14.7252 17.4163 14.0127 17.4163 13.2527Z" stroke="#1D1D1B" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9.5 4.34619V16.2212" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.13574 6.72119H4.35449" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.72949 9.09619H4.35449" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>`,
    'chevron-down': `<path d="M12.4498 5.59375L8.37481 9.66875C7.89356 10.15 7.10606 10.15 6.62481 9.66875L2.5498 5.59375" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>`,
    cross: `<path d="M6.69678 17.4329L17.3034 6.82634" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17.3034 17.4329L6.69678 6.82634" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    edit: `<path d="M11.5 5H4.88889C4.38792 5 3.90748 5.19901 3.55324 5.55324C3.19901 5.90748 3 6.38792 3 6.88889V20.1111C3 20.6121 3.19901 21.0925 3.55324 21.4468C3.90748 21.801 4.38792 22 4.88889 22H18.1111C18.6121 22 19.0925 21.801 19.4468 21.4468C19.801 21.0925 20 20.6121 20 20.1111V13.5" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.6662 3.57198C19.0325 3.20575 19.5292 3 20.0471 3C20.5651 3 21.0618 3.20575 21.428 3.57198C21.7943 3.93822 22 4.43494 22 4.95287C22 5.47081 21.7943 5.96753 21.428 6.33376L12.6824 15.0794L9 16L9.92059 12.3176L18.6662 3.57198Z" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`,
    facebook: `<path d="M22 16.19C22 19.83 19.83 22 16.19 22H15C14.45 22 14 21.55 14 21V15.23C14 14.96 14.22 14.73 14.49 14.73L16.25 14.7C16.39 14.69 16.51 14.59 16.54 14.45L16.89 12.54C16.92 12.36 16.78 12.19 16.59 12.19L14.46 12.22C14.18 12.22 13.96 12 13.95 11.73L13.91 9.28C13.91 9.12 14.04 8.98001 14.21 8.98001L16.61 8.94C16.78 8.94 16.91 8.81001 16.91 8.64001L16.87 6.23999C16.87 6.06999 16.74 5.94 16.57 5.94L13.87 5.98001C12.21 6.01001 10.89 7.37 10.92 9.03L10.97 11.78C10.98 12.06 10.76 12.28 10.48 12.29L9.28 12.31C9.11 12.31 8.98001 12.44 8.98001 12.61L9.01001 14.51C9.01001 14.68 9.14 14.81 9.31 14.81L10.51 14.79C10.79 14.79 11.01 15.01 11.02 15.28L11.11 20.98C11.12 21.54 10.67 22 10.11 22H7.81C4.17 22 2 19.83 2 16.18V7.81C2 4.17 4.17 2 7.81 2H16.19C19.83 2 22 4.17 22 7.81V16.19Z" fill="#1D1D1B"/>`,
    globe: `<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.99961 3H8.99961C7.04961 8.84 7.04961 15.16 8.99961 21H7.99961" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15 3C16.95 8.84 16.95 15.16 15 21" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 8.99961C8.84 7.04961 15.16 7.04961 21 8.99961" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`,
    next: `<path d="M14.4297 7.19458L20.4997 12L14.4297 16.8054" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.5 12H20.33" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>`,
    planet: `<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path  d="M7.99961 3H8.99961C7.04961 8.84 7.04961 15.16 8.99961 21H7.99961" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path  d="M15 3C16.95 8.84 16.95 15.16 15 21" stroke="#1D1D1B" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path  d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16" stroke="#1D1D1B" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path  d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001" stroke="#1D1D1B" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`,
    previous: `<path d="M9.57031 16.8054L3.50032 12L9.57031 7.19458" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M20.5 12L3.67 12" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />`,
    search: `<path d="M8.7085 15.8335C12.6435 15.8335 15.8335 12.6435 15.8335 8.7085C15.8335 4.77347 12.6435 1.5835 8.7085 1.5835C4.77347 1.5835 1.5835 4.77347 1.5835 8.7085C1.5835 12.6435 4.77347 15.8335 8.7085 15.8335Z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.9862 16.3795C15.4058 17.6461 16.3637 17.7728 17.0999 16.6645C17.7728 15.6511 17.3295 14.8199 16.1103 14.8199C15.2078 14.812 14.7012 15.5166 14.9862 16.3795Z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>`,
    settings: `<path d="M23.8335 7.04199H17.3335" stroke-width="1.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.49984 7.04199H2.1665" stroke-width="1.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.8332 10.8333C12.9272 10.8333 14.6248 9.13575 14.6248 7.04167C14.6248 4.94759 12.9272 3.25 10.8332 3.25C8.73909 3.25 7.0415 4.94759 7.0415 7.04167C7.0415 9.13575 8.73909 10.8333 10.8332 10.8333Z" stroke-width="1.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M23.8333 18.958H19.5" stroke-width="1.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.6665 18.958H2.1665" stroke-width="1.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.1667 22.7503C17.2607 22.7503 18.9583 21.0527 18.9583 18.9587C18.9583 16.8646 17.2607 15.167 15.1667 15.167C13.0726 15.167 11.375 16.8646 11.375 18.9587C11.375 21.0527 13.0726 22.7503 15.1667 22.7503Z" stroke="#1D1D1B" stroke-width="1.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>`,
    'shopping-cart': `<path d="M7.17539 21.975C6.67539 21.975 6.25039 21.8 5.90039 21.45C5.55039 21.1 5.37539 20.675 5.37539 20.175C5.37539 19.675 5.55039 19.25 5.90039 18.9C6.25039 18.55 6.67539 18.375 7.17539 18.375C7.67539 18.375 8.10039 18.55 8.45039 18.9C8.80039 19.25 8.97539 19.675 8.97539 20.175C8.97539 20.675 8.80039 21.1 8.45039 21.45C8.10039 21.8 7.67539 21.975 7.17539 21.975ZM17.1754 21.975C16.6754 21.975 16.2504 21.8 15.9004 21.45C15.5504 21.1 15.3754 20.675 15.3754 20.175C15.3754 19.675 15.5504 19.25 15.9004 18.9C16.2504 18.55 16.6754 18.375 17.1754 18.375C17.6754 18.375 18.1004 18.55 18.4504 18.9C18.8004 19.25 18.9754 19.675 18.9754 20.175C18.9754 20.675 18.8004 21.1 18.4504 21.45C18.1004 21.8 17.6754 21.975 17.1754 21.975ZM5.87539 5.475L8.62539 11.175H15.8254L18.9504 5.475H5.87539ZM5.12539 3.975H19.8504C20.2337 3.975 20.5254 4.15 20.7254 4.5C20.9254 4.85 20.9254 5.2 20.7254 5.55L17.3504 11.625C17.1671 11.9417 16.9296 12.1958 16.6379 12.3875C16.3462 12.5792 16.0254 12.675 15.6754 12.675H8.10039L6.70039 15.275H18.9754V16.775H6.92539C6.22539 16.775 5.72122 16.5417 5.41289 16.075C5.10456 15.6083 5.10872 15.0833 5.42539 14.5L7.02539 11.55L3.22539 3.5H1.27539V2H4.20039L5.12539 3.975Z"/>`,
    text: `<polyline points="4 7 4 4 20 4 20 7" stroke-width="1.7"></polyline>
      <line x1="9" y1="20" x2="15" y2="20" stroke-width="1.7"></line>
      <line x1="12" y1="4" x2="12" y2="20" stroke-width="1.7"></line>`,
    twitter: `<path d="M21 6.41894C20.3379 6.71191 19.626 6.91113 18.8789 6.99902C19.6406 6.54199 20.2266 5.81836 20.502 4.95703C19.79 5.37891 18.999 5.68652 18.1582 5.85352C17.4844 5.13574 16.5234 4.68457 15.4629 4.68457C13.4238 4.68457 11.7686 6.33984 11.7686 8.37891C11.7686 8.66895 11.8008 8.95019 11.8652 9.21973C8.79492 9.06738 6.07324 7.59668 4.25391 5.36133C3.93457 5.90625 3.75293 6.54199 3.75293 7.21875C3.75293 8.49902 4.40332 9.62988 5.39648 10.292C4.79004 10.2715 4.22168 10.1074 3.72363 9.8291C3.72363 9.84668 3.72363 9.86133 3.72363 9.87598C3.72363 11.666 4.99512 13.1602 6.68555 13.4971C6.375 13.582 6.0498 13.6289 5.71289 13.6289C5.47559 13.6289 5.24121 13.6055 5.01855 13.5615C5.4873 15.0293 6.85254 16.0957 8.4668 16.1279C7.2041 17.1182 5.61035 17.707 3.88184 17.707C3.58301 17.707 3.29004 17.6895 3 17.6543C4.63477 18.7031 6.57422 19.3154 8.66016 19.3154C15.4541 19.3154 19.1689 13.6875 19.1689 8.80664C19.1689 8.64844 19.1631 8.4873 19.1572 8.3291C19.8779 7.80762 20.5049 7.15723 21 6.41894Z" />`,
    user: `<path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`
  };

  let svg: string;
  $: svg = icons[icon];
</script>

<span
  style="--casing: {casing}"
  class:filled={icon === 'facebook' || icon === 'twitter' || icon === 'shopping-cart'}
>
  <svg
    viewBox={`0 0 ${viewBox} ${viewBox}`}
    width={`${size}px`}
    height={`${size}px`}
    style="--color: {color}; --transition: {transition === false
      ? 'none'
      : transition === true
      ? '.2s ease all'
      : transition}; --color-hover: {hoverColor}"
    preserveAspectRatio="xMidYMid meet">{@html svg}</svg
  >
</span>

<style lang="scss">
  span {
    width: var(--casing);
    height: var(--casing);
    display: grid;
    place-content: center;
    svg {
      transition: var(--transition);
      :global(*) {
        stroke: var(--color);
        fill: transparent;
        transition: inherit;
      }
    }
    &:hover {
      svg {
        :global(*) {
          stroke: var(--color-hover);
        }
      }
    }
    &.filled {
      svg {
        :global(*) {
          stroke: none;
          fill: var(--color);
        }
      }
      &:hover {
        svg {
          :global(*) {
            stroke: none;
            fill: var(--color-hover);
          }
        }
      }
    }
  }
</style>
