<script lang="ts">
  import Button from '$components/elements/Button.svelte';
  import Icon from '$components/elements/Icon.svelte';
  import Input from '$components/elements/Input.svelte';
  import RuleEditor from '$components/elements/RuleEditor.svelte';
  import Subheading from '$components/elements/Subheading.svelte';
  import Divider from '$components/layout/Divider.svelte';
  import Flex from '$components/layout/Flex.svelte';
  import Main from '$components/layout/Main.svelte';
  import Styled from '$components/layout/Styled.svelte';
  import { save } from '$lib/db';
  import { companyUrl, sessionId } from '$lib/store';
  import type { RuleSet } from '$types/db';
  import type { PageData } from './$types';

  export let data: PageData;

  let setName: string;

  export let newAmount: string;
  export let newRuleType: string;
  export let newCompanyId: string;

  let errorMessage: string | undefined = undefined;
  const companyUnits = data.companyUnits;

  let rules: RuleSet = {
    name: '',
    rules: []
  };

  function addRule() {
    const newAmountInt = parseInt(newAmount);

    if (newRuleType === 'rest') {
      let hasRestRule = false;
      rules.rules.forEach((rule) => {
        if (rule.type === 'rest') {
          hasRestRule = true;
        }
      });
      if (hasRestRule) {
        errorMessage = 'Nelze přidat více pravidel typu "Zbytek".';
        return;
      }
    }
    if ((newAmount === '0' || newAmount === '') && newRuleType !== 'rest') {
      errorMessage = 'Nelze přidat pravidlo s hodnotou 0.';
      return;
    }
    if (newCompanyId === '') {
      errorMessage = 'Pravidlu musí být přiřazeno středisko';
      return;
    }
    let totalPercentage = newRuleType === 'relative' ? newAmountInt : 0;
    rules.rules
      .filter((rule) => rule.type === 'relative')
      .forEach((rule) => {
        totalPercentage += rule.amount;
      });
    if (totalPercentage > 100 || (totalPercentage === 100 && newRuleType === 'absolute')) {
      errorMessage = 'Nelze přidat pravidla tak, aby dohromady přesahovaly 100%.';
      return;
    }
    rules.rules = rules.rules.concat([
      {
        id: rules.rules.length,
        type:
          newRuleType === 'absolute'
            ? 'absolute'
            : newRuleType === 'relative'
            ? 'relative'
            : 'rest',
        amount: newAmountInt,
        companyUnit: {
          id: parseInt(newCompanyId),
          nazev: companyUnits.find((unit) => unit.id == parseInt(newCompanyId))?.nazev ?? 'N/A'
        }
      }
    ]);
    console.log(companyUnits);
    newAmount = '0';
  }

  function removeRule(id: number) {
    rules.rules = rules.rules.filter((rule) => rule.id !== id);
  }

  async function saveRules() {
    if (rules.rules.length === 0) {
      errorMessage = 'Nelze uložit prázdnou sadu pravidel.';
      return;
    }
    if (rules.name === '') {
      errorMessage = 'Nelze uložit sadu pravidel bez jména.';
      return;
    }
    const ruleSet: RuleSet = {
      name: rules.name,
      rules: rules.rules
    };
    await save($companyUrl, $sessionId, 'ruleset', ruleSet);
  }

  $: rules.name = setName;
</script>

{#if errorMessage}
  <Styled
    position="fixed"
    width="100vw"
    height="100vh"
    zIndex="1000"
    backgroundColor="rgba(0,0,0,.2)"
  >
    <Flex width="100vw" height="100vh" alignItems="center" justifyContent="center">
      <Styled
        width="420px"
        padding="32px"
        height="240px"
        backgroundColor="#fff"
        borderRadius="16px"
        zIndex="1000"
      >
        <Flex
          height="100%"
          width="100%"
          alignItems="center"
          direction="column"
          justifyContent="space-between"
        >
          {errorMessage}
          <Button on:click={() => (errorMessage = undefined)}>Ok</Button>
        </Flex>
      </Styled>
    </Flex>
  </Styled>
{/if}

<Main>
  <Subheading>Vytvořit novou sadu pravidel</Subheading>
  <Styled padding="30px 0 20px">
    <Input name="setName" bind:value={setName} label="Jméno sady pravidel" width="420px" />
  </Styled>
  <Flex gap="12px" direction="column" width="100%">
    {#each rules.rules as rule}
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Styled padding="4px" backgroundColor="#ccc" borderRadius="4px">
            {#if rule.type === 'rest'}
              Zbytek
            {:else}
              {rule.amount}{rule.type === 'absolute' ? 'Kč' : '%'}
            {/if}
          </Styled>
          <Icon icon="arrow-right" /> středisko: <Styled
            padding="4px"
            backgroundColor="#ddd"
            borderRadius="4px">{rule.companyUnit.nazev}</Styled
          >
        </Flex>
        <div on:click={() => removeRule(rule.id)} on:keypress={() => removeRule(rule.id)}>
          <Icon icon="cross" />
        </div>
      </Flex>
    {/each}
  </Flex>
  <Divider />
  <Flex
    direction="column"
    gap="32px"
    width="100%"
    justifyContent="space-between"
    alignItems="start"
  >
    <RuleEditor bind:newAmount bind:newCompanyId bind:newRuleType {companyUnits} />
    <Button on:click={addRule}>Přidat pravidlo</Button>
  </Flex>

  <Button on:click={saveRules}>Uložit sadu pravidel</Button>
</Main>
