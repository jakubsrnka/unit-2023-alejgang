import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { findAll } from '$lib/db';

export const load = (async ({ cookies }) => {
  const authSessionId = cookies.get('authSessionId');
  const companyUrl = cookies.get('companyUrl');

  if (!authSessionId || !companyUrl) {
    throw error(404, {
      message: 'Invalid parameters'
    });
  }
  return {
    rulesets: await findAll(companyUrl, authSessionId, 'ruleset')
  };
}) satisfies PageServerLoad;
