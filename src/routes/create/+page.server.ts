import { sendRequest } from '$lib/api';
import type { CompanyUnit } from '$types/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
  const params = new URLSearchParams();
  params.append('detail', 'full');
  const companyUnits = await sendRequest<CompanyUnit[]>(
    cookies.get('companyUrl') ?? '',
    cookies.get('authSessionId') ?? '',
    'stredisko',
    'GET',
    params
  );

  return {
    companyUnits: companyUnits ?? []
  };
}) satisfies PageServerLoad;
