<script lang="ts">
  import Main from '$components/layout/Main.svelte';
  import Styled from '$components/layout/Styled.svelte';
  import { sessionId, companyUrl } from '$lib/store';
  import type { PageData } from './$types';

  export let data: PageData;

  sessionId.set(data.authSessionId);
  companyUrl.set(data.companyUrl);
</script>

<Main>
  <Styled padding="8px" backgroundColor="#eee" borderRadius="4px" width="100%">
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
  <!-- <p>Object: {data.objectId}</p>
  <p>Session: {$sessionId}</p>
  <p>Company: {$companyUrl}</p> -->
</Main>

<style lang="scss">
  table {
    border-collapse: collapse;
    width: 100%;
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
