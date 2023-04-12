import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
  return {
    authSessionId: cookies.get('authSessionId') ?? '',
    companyUrl: cookies.get('companyUrl') ?? ''
  };
}) satisfies PageServerLoad;
