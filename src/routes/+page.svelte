<script lang="ts">
  import { redirect } from '@sveltejs/kit';
  import type { PageData } from './$types';

  export let data: PageData;

  export function load() {
    throw redirect(302, data.location);
  }
</script>
