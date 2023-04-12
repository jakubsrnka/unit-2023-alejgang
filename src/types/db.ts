import type { RuleSet } from './rules';

export type Database = {
  user: User[];
  role: Role[];
  rulesets: RuleSetDb[];
};

export type Collections = keyof Database;

export type Entities = Database extends { [key: string]: (infer T)[] } ? T : never;

export type ValueOf<C extends Collections> = Database[C] extends (infer T)[] ? T : never;

export interface Entity {
  id?: string;
}

export interface User extends Entity {
  email: string;
}

export interface Role extends Entity {
  name: string;
}

export interface RuleSetDb extends Entity {
  ruleset: RuleSet;
}
