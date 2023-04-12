<script lang="ts">
  import Button from '$components/elements/Button.svelte';
  import Icon from '$components/elements/Icon.svelte';
  import Flex from '$components/layout/Flex.svelte';
  import Main from '$components/layout/Main.svelte';
  import Styled from '$components/layout/Styled.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Main>
  <h2>Všechna pravidla</h2>

  <Styled padding="0 8px" backgroundColor="#eee" borderRadius="4px" width="100%">
    <table>
      <tbody>
        {#each data.rulesets.map((ruleset) => ({ ...ruleset, rules: ruleset.rules.sort((a, b) => {
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
              <Button width="150px" href="/rules/{ruleset.id}/edit">Upravit</Button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
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

  tr > td:last-child {
    font-weight: 500;
    width: 10%;

    text-align: left;
  }
</style>
