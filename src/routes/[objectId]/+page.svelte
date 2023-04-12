<script lang="ts">
  import { sessionId, companyUrl } from '$lib/store';
  import type { PageData } from './$types';

  export let data: PageData;

  sessionId.set(data.authSessionId);
  companyUrl.set(data.companyUrl);
</script>

<p>Object: {data.objectId}</p>
<p>Session: {$sessionId}</p>
<p>Company: {$companyUrl}</p>
