<script lang="ts">
  import Button from '$components/elements/Button.svelte';
  import Icon from '$components/elements/Icon.svelte';
  import RuleEditor from '$components/elements/RuleEditor.svelte';
  import Flex from '$components/layout/Flex.svelte';
  import Main from '$components/layout/Main.svelte';
  import Styled from '$components/layout/Styled.svelte';
  import Input from '$components/elements/Input.svelte';
  import type { Rule, RuleSet } from '$types/db';
  import type { PageData } from './$types';
  import Divider from '$components/layout/Divider.svelte';
  import { save } from '$lib/db';
  import { companyUrl, sessionId } from '$lib/store';
  import { sendRequest } from '$lib/api';
  import { writable } from 'svelte/store';

  export let data: PageData;

  function filterRuleset(ruleset: RuleSet, flag: boolean) {
    const sum = parseInt(data.invoice.sum);
    const perctSum = ruleset.rules.reduce((acc, rule) => {
      if (rule.type === 'relative') {
        return acc + rule.amount;
      }
      return acc;
    }, 0);
    const absoluteSum = ruleset.rules.reduce((acc, rule) => {
      if (rule.type === 'absolute') {
        return acc + rule.amount;
      }
      return acc;
    }, 0);
    const isRest = ruleset.rules.some((rule) => rule.type === 'rest');
    const perctSumAbsolute = (sum * perctSum) / 100;
    const sumSumSum = perctSumAbsolute + absoluteSum;
    return sumSumSum == sum || ((isRest || flag) && sumSumSum < sum);
  }

  let setName = 'Template 1';

  export let newAmount: string;
  export let newRuleType: string;
  export let newCompanyId: string;

  let errorMessage: string | undefined = undefined;
  const companyUnits = data.companyUnits;

  const saving = writable<string | undefined>(undefined);

  async function applyRuleset(ruleset: RuleSet) {
    const sum = parseInt(data.invoice.sum);
    const totalApplied = ruleset.rules.reduce((acc, rule) => {
      if (rule.type === 'relative') {
        return acc + (sum * rule.amount) / 100;
      }
      if (rule.type === 'absolute') {
        return acc + rule.amount;
      }
      return acc;
    }, 0);

    if (!filterRuleset(ruleset, false)) {
      errorMessage = 'Rozdělení musí pokrýt celou fakturu!';
      return;
    }

    $saving = ruleset.id;

    await sendRequest($companyUrl, $sessionId, 'faktura-prijata', 'POST', {
      winstrom: {
        '@version': '1.0',
        'faktura-prijata': [
          {
            id: data.objectId,
            bezPolozek: false,
            'polozkyFaktury@removeAll': true,
            polozkyFaktury: ruleset.rules.map((rule) => ({
              nazev: `${data.invoice.name} - ${rule.companyUnit.nazev}`,
              mnozMj: 1,
              cenaMj:
                rule.type === 'rest'
                  ? sum - totalApplied
                  : rule.type === 'absolute'
                  ? rule.amount
                  : (sum * rule.amount) / 100,
              typSzbDphK: 'typSzbDph.dphOsv',
              kopStred: false,
              stredisko: rule.companyUnit.id
            }))
          }
        ]
      }
    });
    $saving = undefined;
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

    await applyRuleset(rules);
  }

  let rules: RuleSet = {
    name: 'Template 1',
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

    const newRule: Rule = {
      id: rules.rules.length,
      type:
        newRuleType === 'absolute' ? 'absolute' : newRuleType === 'relative' ? 'relative' : 'rest',
      amount: newAmountInt,
      companyUnit: {
        id: parseInt(newCompanyId),
        nazev: companyUnits.find((unit) => unit.id == parseInt(newCompanyId))?.nazev ?? 'N/A'
      }
    };

    if (
      !filterRuleset(
        {
          ...rules,
          rules: [...rules.rules, newRule]
        },
        true
      )
    ) {
      errorMessage = 'Částka řádků nemůže přesahovat celkovou částku faktury.';
      return;
    }

    rules.rules = rules.rules.concat([newRule]);

    newAmount = '0';
  }

  function removeRule(id: number) {
    rules.rules = rules.rules.filter((rule) => rule.id !== id);
  }
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
  <h2>Manuální rozúčtování</h2>
  <Styled
    padding="0 8px"
    margin="0 0 1rem 0"
    backgroundColor="#eee"
    borderRadius="4px"
    width="100%"
  >
    <table>
      <tbody>
        <tr>
          <td>Název faktury</td>
          <td>{data.invoice.name}</td>
        </tr>
        <tr>
          <td>Firma</td>
          <td>{data.invoice.company}</td>
        </tr>
        <tr>
          <td>Částka</td>
          <td>{data.invoice.sum} Kč</td>
        </tr>
      </tbody>
    </table>
  </Styled>

  <Styled>
    <Button href={`/${data.objectId}`}>Zobrazit dostupná pravidla</Button>
  </Styled>

  <Divider />

  <Flex
    direction="column"
    gap="32px"
    width="100%"
    justifyContent="space-between"
    alignItems="start"
  >
    {#each rules.rules.sort((a, b) => {
      if (a.type === 'rest') {
        return 1;
      }
      if (a.type === b.type) {
        return b.amount - a.amount;
      }
      return a.type === 'relative' ? -1 : 1;
    }) as rule}
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

    <RuleEditor bind:newAmount bind:newCompanyId bind:newRuleType {companyUnits} />

    <Button on:click={addRule}>Přidat řádek faktury</Button>
  </Flex>

  <Divider />

  <Flex direction="row" gap="8px">
    <Button on:click={saveRules}>Uložit jako sadu pravidel a aplikovat</Button>
    <Button
      on:click={async () => {
        await applyRuleset(rules);
      }}>Aplikovat</Button
    >
  </Flex>

  <!-- <Styled margin="1rem 0 0 0">
    <Button href="">Manuální rozúčtování</Button>
  </Styled> -->

  <!-- <p>Object: {data.objectId}</p>
  <p>Session: {$sessionId}</p>
  <p>Company: {$companyUrl}</p> -->
</Main>

<style lang="scss">
  h2 {
    margin-bottom: 1rem;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  tr {
    border-bottom: 1px solid #ddd;

    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: 0.6rem 0;
  }

  tr > td:first-child {
    font-weight: 600;
  }

  tr > td:last-child {
    font-weight: 500;
    width: 80%;

    text-align: left;
  }
</style>
