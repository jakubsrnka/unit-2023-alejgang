import type { CompanyUnit } from '$types/rules';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
  const companyUnits: Promise<CompanyUnit[]> = fetch(
    'https://unit2023.flexibee.eu/v2/c/company5/stredisko.json?detail=full',
    {
      headers: {
        'X-authSessionId': '433e21dbe040afcff96bc15c510fa4e19d7d8b9cdc1db6e395945c0b01fb1c46'
      }
    }
  )
    .then((r) => r.json())
    .then((r) => r.winstrom.stredisko.map((s: any) => ({ id: s.id, name: s.nazev })));

  return {
    companyUnits: await companyUnits
  };
}) satisfies PageServerLoad;
