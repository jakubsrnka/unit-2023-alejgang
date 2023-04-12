<script>
  import Button from '$components/elements/Button.svelte';
  import Heading from '$components/elements/Heading.svelte';
  import Flex from '$components/layout/Flex.svelte';
  import Main from '$components/layout/Main.svelte';
  import Styled from '$components/layout/Styled.svelte';
</script>

<Styled width="100vw" height="80px" position="fixed" padding="0 3vw" backgroundColor="#f5f3f1">
  <Flex width="100%" height="100%" alignItems="center" justifyContent="space-between">
    <Heading>UnIT 2023 - Rozúčtování</Heading>
    <Button href="/create">Vytvořit sadu pravidel</Button>
  </Flex>
</Styled>
<Main>
  <slot />
</Main>
