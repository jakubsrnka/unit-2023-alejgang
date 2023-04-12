export interface Response<V> {
  winstrom: {
    [key: string]: V;
  };
}

export interface GlobalStore {
  id: number;
  klic: string;
  hodnota: string;
}
