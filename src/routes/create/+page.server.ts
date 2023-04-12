import type { CompanyUnit } from '$types/rules';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, cookies }) => {
  const companyUrl = cookies.get('companyUrl') ?? '';
  const authSessionId = cookies.get('authSessionId') ?? '';

  const companyUnits: Promise<CompanyUnit[]> = fetch(`${companyUrl}/stredisko.json?detail=full`, {
    headers: {
      'X-authSessionId': authSessionId
    }
  })
    .then((r) => r.json())
    .then((r) => r.winstrom.stredisko.map((s: any) => ({ id: parseInt(s.id), name: s.nazev })));

  return {
    companyUnits: await companyUnits
  };
}) satisfies PageServerLoad;
