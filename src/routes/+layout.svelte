<script lang="ts">
  import Button from '$components/elements/Button.svelte';
  import Heading from '$components/elements/Heading.svelte';
  import Flex from '$components/layout/Flex.svelte';
  import Styled from '$components/layout/Styled.svelte';
  import { companyUrl, sessionId } from '$lib/store';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  sessionId.set(data.authSessionId);
  companyUrl.set(data.companyUrl);
</script>

<Styled width="100vw" height="80px" position="fixed" padding="0 3vw" backgroundColor="#f5f3f1">
  <Flex width="100%" height="100%" alignItems="center" justifyContent="space-between">
    <Heading>Rozúčtování</Heading>
    <Flex>
      <Button href="/rules">Všechny sady pravidel</Button>
      <Button href="/create">Vytvořit sadu pravidel</Button>
    </Flex>
  </Flex>
</Styled>
<slot />
