import { writable, type Readable } from 'svelte/store';

export const sessionId = writable('');
export const companyUrl = writable('');

export function awaitStore<T>(store: Readable<T>) {
  return new Promise<T>((resolve) => {
    const unsubscribe = store.subscribe((value) => {
      resolve(value);
      setTimeout(() => unsubscribe(), 5);
    });
  });
}
