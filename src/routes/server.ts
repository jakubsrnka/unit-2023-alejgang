import type { RequestHandler } from './$types';

export const load = (async ({ url }) => {
  console.log(url);

  const params = new URLSearchParams(url.search);

  console.log(`/${[...params.entries()].map((value) => encodeURIComponent(value[1])).join('/')}`);

  return {
    status: 302,
    location: `/${[...params.entries()].map((value) => encodeURIComponent(value[1])).join('/')}`,
    headers: {
      Location: `/${[...params.entries()].map((value) => encodeURIComponent(value[1])).join('/')}`
    }
  };
}) satisfies RequestHandler;

export const prerender = false;
