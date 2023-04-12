import type { GlobalStore } from '$types/api';
import type { Database, ValueOf } from '$types/db';
import { sendRequest } from '$lib/api';

const ENDPOINT = 'global-store';

async function getGlobalStore(key: string): Promise<GlobalStore | null> {
  const store = await sendRequest<GlobalStore[]>(ENDPOINT, 'GET');
  console.log(store);
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
  const store = await getGlobalStore(`alejgang:database:${collection}`);
  const value = JSON.stringify(data);
  console.log(value);
  if (store === null) {
    await sendRequest<
      {
        [key: string]: string;
      }[]
    >(ENDPOINT, 'POST', {
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
    >(ENDPOINT + '/' + store.id, 'PUT', {
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
  let found = false;
  const key = 'id' as keyof ValueOf<C>;
  const data = (await getCollection(collection))
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
  return await saveCollection(collection, data);
}
