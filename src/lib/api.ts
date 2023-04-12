import { sessionId, companyUrl, awaitStore } from '$lib/store';
import type { Response } from '$types/api';

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function sendRequest<T, B = object>(
  key: string,
  method: Methods,
  body?: B,
  params: URLSearchParams = new URLSearchParams()
): Promise<T | null> {
  const session = await awaitStore(sessionId);
  const company = await awaitStore(companyUrl);
  const response = await fetch(`${company}/${key}.json?${params.toString()}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-authSessionId': session
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  if (!response.ok) {
    console.error(response);
    return null;
  }

  const json = await response.json();
  const data = (json as Response<T>).winstrom;
  if (body === undefined) {
    return data['results'];
  }

  return data[key];
}
