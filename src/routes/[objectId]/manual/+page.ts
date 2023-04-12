import type { PageLoad } from './$types';

export const load = (async ({ data, params }) => {
    return {
        objectId: params.objectId,
        invoice: data.invoice,
        companyUnits: data.companyUnits ?? []
    };
}) satisfies PageLoad;