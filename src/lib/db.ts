import type { GlobalStore } from '$types/api';
import type { Database, ValueOf } from '$types/db';
import { sendRequest } from '$lib/api';

const ENDPOINT = 'global-store';

async function getGlobalStore(key: string): Promise<GlobalStore | null> {
  const store = await sendRequest<GlobalStore[]>(ENDPOINT, 'GET');
  return store?.find((entity) => entity.klic === key) ?? null;
}

export async function getCollection<C extends keyof Database>(
  collection: C
): Promise<ValueOf<C>[]> {
  const store = await getGlobalStore(`alejgang:database:${collection}`);
  if (store === null) {
    return [];
  }
  return JSON.parse(store.hodnota) as ValueOf<C>[];
}

export async function saveCollection<C extends keyof Database>(
  collection: C,
  data: ValueOf<C>[]
): Promise<boolean> {
  const store = (await getGlobalStore(`alejgang:database:${collection}`)) ?? {
    klic: `alejgang:database:${collection}`,
    hodnota: '[]'
  };
  store.hodnota = JSON.stringify(data);
  const response = await sendRequest<GlobalStore[]>(ENDPOINT, 'POST', store);
  console.log(response);
  return true;
}

export async function findOneBy<C extends keyof Database>(
  collection: C,
  filters: Partial<ValueOf<C>> = {}
) {
  return (await findBy(collection, filters))?.[0];
}

export async function findBy<C extends keyof Database>(
  collection: C,
  filters: Partial<ValueOf<C>> = {}
) {
  return (await findAll(collection)).filter((entity) => {
    for (const field of Object.keys(filters)) {
      const key = field as keyof ValueOf<C>;
      if (entity[key] !== filters[key]) {
        return false;
      }
    }
    return true;
  });
}

export async function findAll<C extends keyof Database>(collection: C): Promise<ValueOf<C>[]> {
  return await getCollection(collection);
}

export async function save<C extends keyof Database>(collection: C, entity: ValueOf<C>) {
  const data = await getCollection(collection);
  let found = false;
  data.map((item) => {
    const key = 'id' as keyof ValueOf<C>;
    if (item[key] === entity[key]) {
      found = true;
      return entity;
    }
    return item;
  });
  if (!found) {
    data.push(entity);
  }
  return await saveCollection(collection, data);
}
