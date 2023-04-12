import { sendRequest } from '$lib/api';
import { findAll } from '$lib/db';
import type { CompanyUnit } from '$types/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, params }) => {
  const search = new URLSearchParams();
  search.append('detail', 'full');
  const companyUnits = await sendRequest<CompanyUnit[]>(
    cookies.get('companyUrl') ?? '',
    cookies.get('authSessionId') ?? '',
    'stredisko',
    'GET',
    undefined,
    search
  );

  const ruleset = (
    await findAll(cookies.get('companyUrl') ?? '', cookies.get('authSessionId') ?? '', 'ruleset')
  ).find((r) => r.id == params.id);
  if (ruleset === null || ruleset === undefined) {
    throw error(404, 'Soubor pravidel neexistuje');
  }

  return {
    companyUnits: companyUnits ?? [],
    ruleset
  };
}) satisfies PageServerLoad;
