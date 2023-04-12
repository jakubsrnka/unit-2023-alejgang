<script lang="ts">
  import Button from '$components/elements/Button.svelte';
  import Icon from '$components/elements/Icon.svelte';
  import Flex from '$components/layout/Flex.svelte';
  import Main from '$components/layout/Main.svelte';
  import Styled from '$components/layout/Styled.svelte';
  import { sendRequest } from '$lib/api';
  import { sessionId, companyUrl } from '$lib/store';
  import type { RuleSet } from '$types/db';
  import { writable } from 'svelte/store';
  import type { PageData } from './$types';

  export let data: PageData;
  let errorMessage: string | undefined = undefined;

  const saving = writable<string | undefined>(undefined);

  const colors = ['#DDF9C1', '#F8DDA4', '#A4C2A5'];

  function filterRuleset(ruleset: RuleSet) {
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
    return sumSumSum == sum || (isRest && sumSumSum < sum);
  }

  let appliedRuleset: string | undefined = undefined;

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
    $saving = ruleset.id;
    if (
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
      })
    ) {
      appliedRuleset = ruleset.id;
      errorMessage = 'Faktura byla úspěšně rozdělena';
    } else {
      errorMessage = 'Nepodařilo se rozdělit fakturu';
    }
    $saving = undefined;
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
  <h2>Detail faktury</h2>
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

  <h2>Dostupná pravidla</h2>

  <Styled padding="0 8px" backgroundColor="#eee" borderRadius="4px" width="100%">
    <table>
      <tbody>
        {#each data.rulesets
          .filter(filterRuleset)
          .map((ruleset) => ({ ...ruleset, rules: ruleset.rules.sort((a, b) => {
              if (a.type === 'rest') {
                return 1;
              }
              if (a.type === b.type) {
                return b.amount - a.amount;
              }
              return a.type === 'relative' ? -1 : 1;
            }) })) as ruleset}
          <tr>
            <td>{ruleset.name}</td>
            <td>
              <Flex direction="column" gap="4px">
                {#each ruleset.rules.sort((a, b) => {
                  if (a.type === 'rest') {
                    return 1;
                  }
                  if (a.type === b.type) {
                    return b.amount - a.amount;
                  }
                  return a.type === 'relative' ? -1 : 1;
                }) as rule}
                  <Flex alignItems="center">
                    <Styled
                      minWidth="6rem"
                      padding="4px 6px"
                      backgroundColor="#ccc"
                      borderRadius="4px"
                    >
                      <Flex direction="row" justifyContent="center" width="100%">
                        {rule.type === 'rest'
                          ? 'Zbytek'
                          : `${rule.amount} ${rule.type === 'absolute' ? 'Kč' : '%'}`}
                      </Flex>
                    </Styled>

                    <Icon size={16} icon="arrow-right" />

                    <Styled padding="4px 6px" backgroundColor="#ddd" borderRadius="4px"
                      >{rule.companyUnit.nazev}</Styled
                    >
                  </Flex>
                {/each}
              </Flex>
            </td>
            <td>
              <Styled border="2px solid #aaaaaaaa" height="30px" width="100%" borderRadius="4px">
                <Flex height="100%" width="100%" gap="">
                  {#each ruleset.rules as rule, i}
                    <Styled
                      width={rule.type === 'relative'
                        ? rule.amount + '%'
                        : rule.type === 'absolute'
                        ? rule.amount / parseInt(data.invoice.sum) + '%'
                        : 'auto'}
                      backgroundColor={colors[colors.length % (i + 1)]}
                      height="100%"
                      minWidth="32px"
                      flexGrow={rule.type === 'rest' ? '1' : '0'}
                    >
                      <Flex width="100%" alignItems="center" justifyContent="center">
                        {rule.companyUnit.nazev}
                      </Flex>
                    </Styled>
                  {/each}
                </Flex>
              </Styled>
            </td>
            <td>
              <Button width="150px" on:click={() => applyRuleset(ruleset)}>
                {#if $saving === ruleset.id}
                  Ukládám...
                {:else if appliedRuleset === ruleset.id}
                  Aplikováno
                {:else}
                  Použít
                {/if}
              </Button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </Styled>

  <Styled margin="1rem 0 0 0">
    <Button href={`/${data.objectId}/manual`}>Manuální rozúčtování</Button>
  </Styled>
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
  tr > td:nth-child(3) {
    width: 50%;
    padding-right: 32px;
  }

  tr > td:last-child {
    font-weight: 500;
    width: 10%;

    text-align: left;
  }
</style>
