import type { PageLoad } from './$types';

export const load = (async ({ data, params }) => {
  return {
    objectId: params.objectId,
    invoice: data.invoice,
    rulesets: data.rulesets.map((ruleset) => ({
      ...ruleset,
      rules: ruleset.rules.sort((a, b) => {
        if (a.type === 'rest') {
          return 1;
        }
        if (a.type === b.type) {
          return b.amount - a.amount;
        }
        return a.type === 'relative' ? -1 : 1;
      })
    }))
  };
}) satisfies PageLoad;
