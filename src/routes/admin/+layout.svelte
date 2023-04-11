<script lang="ts">
  import Button from '$components/elements/Button.svelte';
  import Heading from '$components/elements/Heading.svelte';
  import Input from '$components/elements/Input.svelte';
  import Flex from '$components/layout/Flex.svelte';

  let currentUser = false;

  let username: string;
  let password: string;

  function login(username: string, password: string) {
    console.log(username, password);
    currentUser = true;
  }
</script>

{#if currentUser}
  sup bitch
  <!-- Logged in -->
{:else}
  <Flex width="320px" margin="220px auto" direction="column" gap="40px" alignItems="stretch">
    <Heading textAlign="left">Přihlášení</Heading>
    <form on:submit|preventDefault={() => login(username, password)}>
      <Flex width="100%" margin="auto" direction="column" gap="24px" alignItems="start">
        <Input name="username" label="Přihlašovací jméno" bind:value={username} />
        <Input name="password" type="password" label="Heslo" bind:value={password} />
        <Button submit>Přihlásit se</Button>
      </Flex>
    </form>
  </Flex>
{/if}
