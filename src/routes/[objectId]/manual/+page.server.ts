import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Invoice } from '$types/invoice';
import { findAll } from '$lib/db';
import { sendRequest } from '$lib/api';
import type { CompanyUnit } from '$types/db';

export const load = (async ({ cookies, params }) => {
    const authSessionId = cookies.get('authSessionId');
    const companyUrl = cookies.get('companyUrl');

    if (!authSessionId || !companyUrl) {
        throw error(404, {
            message: 'Invalid parameters'
        });
    }

    const invoiceId = params.objectId;

    const invoice: Invoice | null = await fetch(
        `${companyUrl}/faktura-prijata/${invoiceId}.json?detail=full`,
        {
            headers: {
                'X-authSessionId': '433e21dbe040afcff96bc15c510fa4e19d7d8b9cdc1db6e395945c0b01fb1c46'
            }
        }
    )
        .then((r) => r.json())
        .then((r) => {
            if (r.winstrom['faktura-prijata'].length !== 1) {
                return null;
            }

            const resp = r.winstrom['faktura-prijata'][0];

            return { sum: resp.sumZklCelkem, name: resp.popis, company: resp.nazFirmy };
        });

    if (!invoice) {
        throw error(404, {
            message: 'We could not find this invoice.'
        });
    }

    const p = new URLSearchParams();
    p.append('detail', 'full');
    const companyUnits = await sendRequest<CompanyUnit[]>(
        cookies.get('companyUrl') ?? '',
        cookies.get('authSessionId') ?? '',
        'stredisko',
        'GET',
        undefined,
        p
    );

    return {
        invoice: invoice,
        companyUnits: companyUnits
    };
}) satisfies PageServerLoad;
