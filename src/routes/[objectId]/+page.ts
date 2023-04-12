import { findAll } from '$lib/db';
import type { PageLoad } from './$types';

export const load = (async ({ data, params }) => {
  return {
    objectId: params.objectId,
    invoice: data.invoice,
    rulesets: data.rulesets
  };
}) satisfies PageLoad;
