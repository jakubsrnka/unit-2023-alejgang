export type Database = {
  user: User[];
  role: Role[];
};

export type Collections = keyof Database;

export type Entities = Database extends { [key: string]: (infer T)[] } ? T : never;

export type ValueOf<C extends Collections> = Database[C] extends (infer T)[] ? T : never;

export interface Entity {
  id?: string;
}

export interface User {
  email: string;
}

export interface Role {
  name: string;
}
