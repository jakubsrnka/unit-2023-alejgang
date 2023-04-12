<script lang="ts">
  import Icon from '$components/elements/Icon.svelte';
  import Flex from '$components/layout/Flex.svelte';
  import Main from '$components/layout/Main.svelte';
  import Styled from '$components/layout/Styled.svelte';
  import { sessionId, companyUrl } from '$lib/store';
  import type { RuleSet } from '$types/rules';
  import type { PageData } from './$types';

  export let data: PageData;

  sessionId.set(data.authSessionId);
  companyUrl.set(data.companyUrl);

  const rules: RuleSet[] = [
    {
      name: 'pravidlo 1',
      rules: [
        {
          id: 0,
          type: 'absolute',
          amount: 3000,
          companyUnit: {
            id: 1,
            name: 'C'
          }
        },
        {
          id: 1,
          type: 'relative',
          amount: 30,
          companyUnit: {
            id: 3,
            name: 'M'
          }
        }
      ]
    },
    {
      name: 'pravidlo 2',
      rules: [
        {
          id: 0,
          type: 'absolute',
          amount: 3000,
          companyUnit: {
            id: 1,
            name: 'C'
          }
        },
        {
          id: 1,
          type: 'relative',
          amount: 30,
          companyUnit: {
            id: 3,
            name: 'M'
          }
        }
      ]
    }
  ];
</script>

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
        {#each rules as ruleset}
          <tr>
            <td>{ruleset.name}</td>
            <td>
              <Flex direction="column" gap="4px">
                {#each ruleset.rules as rule}
                  <Flex alignItems="center">
                    <Styled
                      minWidth="6rem"
                      padding="4px 6px"
                      backgroundColor="#ccc"
                      borderRadius="4px"
                    >
                      <Flex direction="row" justifyContent="center" width="100%">
                        {rule.amount}
                        {rule.type === 'absolute' ? 'Kč' : '%'}
                      </Flex>
                    </Styled>

                    <Icon size={16} icon="arrow-right" />

                    <Styled padding="4px 6px" backgroundColor="#ddd" borderRadius="4px"
                      >{rule.companyUnit.name}</Styled
                    >
                  </Flex>
                {/each}
              </Flex>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </Styled>
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
