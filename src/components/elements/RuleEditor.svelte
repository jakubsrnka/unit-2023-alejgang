<script lang="ts">
  import Flex from '$components/layout/Flex.svelte';
  import { createSelect, type CompanyUnit } from '$types/rules';
  import Input from '$components/elements/Input.svelte';
  import Select from '$components/elements/Select.svelte';
  import Grid from '$components/layout/Grid.svelte';

  export let companyUnits: CompanyUnit[];

  export let newAmount: string;
  export let newRuleType: string;
  export let newCompanyId: string;
</script>

<Grid templateColumns="1fr 1fr" alignItems="start" gap="64px">
  <Flex direction="column" gap="32px" width="420px">
    <Select
      title="Typ pravidla"
      name="newRuleType"
      items={{
        absolute: { label: 'Částka' },
        relative: { label: 'Procento' },
        rest: { label: 'Zbytek' }
      }}
      bind:value={newRuleType}
    />
    {#if newRuleType !== 'rest'}
      <Input name="newRuleAmount" bind:value={newAmount} label="Hodnota pravidla" width="420px" />
    {/if}
  </Flex>
  <Select
    title="Střediska"
    name="newRuleCompanyUnitSelect"
    items={createSelect(companyUnits)}
    bind:value={newCompanyId}
  />
</Grid>
