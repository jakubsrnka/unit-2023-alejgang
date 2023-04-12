import type { PageLoad } from './$types';

export const load = (async ({ data, params }) => {
  return {
    companyUrl: data.companyUrl,
    authSessionId: data.authSessionId,
    objectId: params.objectId
  };
}) satisfies PageLoad;
