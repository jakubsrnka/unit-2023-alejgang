import type { GlobalStore } from '$types/api';
import type { Database, ValueOf } from '$types/db';
import { sendRequest } from '$lib/api';

const ENDPOINT = 'global-store';

async function getGlobalStore(
  url: string,
  session: string,
  key: string
): Promise<GlobalStore | null> {
  const store = await sendRequest<GlobalStore[]>(url, session, ENDPOINT, 'GET');
  return store?.find((entity) => entity.klic === key) ?? null;
}

export async function getCollection<C extends keyof Database>(
  url: string,
  session: string,
  collection: C
): Promise<ValueOf<C>[]> {
  const store = await getGlobalStore(url, session, `alejgang:database:${collection}`);
  if (store === null) {
    return [];
  }
  return JSON.parse(store.hodnota) as ValueOf<C>[];
}

export async function saveCollection<C extends keyof Database>(
  url: string,
  session: string,
  collection: C,
  data: ValueOf<C>[]
): Promise<boolean> {
  const store = await getGlobalStore(url, session, `alejgang:database:${collection}`);
  const value = JSON.stringify(data);
  if (store === null) {
    await sendRequest<
      {
        [key: string]: string;
      }[]
    >(url, session, ENDPOINT, 'POST', {
      winstrom: {
        'global-store': {
          klic: `alejgang:database:${collection}`,
          hodnota: value
        }
      }
    });
  } else {
    await sendRequest<
      {
        [key: string]: string;
      }[]
    >(url, session, ENDPOINT + '/' + store.id, 'PUT', {
      winstrom: {
        'global-store': {
          id: store.id,
          klic: `alejgang:database:${collection}`,
          hodnota: value
        }
      }
    });
  }
  return true;
}

export async function findOneBy<C extends keyof Database>(
  url: string,
  session: string,
  collection: C,
  filters: Partial<ValueOf<C>> = {}
) {
  return (await findBy(url, session, collection, filters))?.[0];
}

export async function findBy<C extends keyof Database>(
  url: string,
  session: string,
  collection: C,
  filters: Partial<ValueOf<C>> = {}
) {
  return (await findAll(url, session, collection)).filter((entity) => {
    for (const field of Object.keys(filters)) {
      const key = field as keyof ValueOf<C>;
      if (entity[key] !== filters[key]) {
        return false;
      }
    }
    return true;
  });
}

export async function findAll<C extends keyof Database>(
  url: string,
  session: string,
  collection: C
): Promise<ValueOf<C>[]> {
  return await getCollection(url, session, collection);
}

export async function save<C extends keyof Database>(
  url: string,
  session: string,
  collection: C,
  entity: ValueOf<C>
) {
  let found = false;
  const key = 'id' as keyof ValueOf<C>;
  const data = (await getCollection(url, session, collection))
    .filter((item) => item[key] !== undefined)
    .map((item) => {
      if (item[key] === entity[key]) {
        found = true;
        return entity;
      }
      return item;
    });
  if (!found) {
    entity[key] = (((data[data.length - 1]?.[key] ?? 0) as number) +
      1) as ValueOf<C>[keyof ValueOf<C>];
    data.push(entity);
  }
  return await saveCollection(url, session, collection, data);
}

export async function remove<C extends keyof Database>(
  url: string,
  session: string,
  collection: C,
  id: number
) {
  const key = 'id' as keyof ValueOf<C>;
  const data = (await getCollection(url, session, collection)).filter(
    (item) => item[key] !== undefined && item[key] !== id
  );
  return await saveCollection(url, session, collection, data);
}
