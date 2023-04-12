export type Database = {
  user: User[];
  role: Role[];
  ruleset: RuleSet[];
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

export interface RuleSet extends Entity {
  name: string;
  rules: Rule[];
}

export interface Rule {
  id: number;
  type: RuleType;
  amount: number;
  companyUnit: CompanyUnit;
}

export type RuleType = 'absolute' | 'relative' | 'rest';

export interface CompanyUnit {
  id: number;
  nazev: string;
}
