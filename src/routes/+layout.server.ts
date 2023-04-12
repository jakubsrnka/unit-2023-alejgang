import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, cookies }) => {
  if (url.pathname === '/') {
    cookies.set('authSessionId', url.searchParams.get('authSessionId') ?? '');
    cookies.set('companyUrl', url.searchParams.get('companyUrl') ?? '');
    throw redirect(300, url.searchParams.get('objectId') ?? '');
  }

  return {};
};

export const prerender = false;
export const ssr = false;
