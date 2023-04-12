import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }) => {
  if (url.pathname === '/') {
    const uri = `/${[...url.searchParams.entries()]
      .map((value) => encodeURIComponent(value[1]))
      .join('/')}`;
    throw redirect(300, uri);
  }

  return {};
};

export const prerender = false;
export const ssr = false;
