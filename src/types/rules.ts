export type RuleType = 'absolute' | 'relative' | 'rest';

export interface CompanyUnit {
  id: number;
  name: string;
}

export interface Rule {
  id: number;
  type: RuleType;
  amount: number;
  companyUnit: CompanyUnit;
}

export interface RuleSet {
  name: string;
  rules: Rule[];
}

export function createSelect(units: CompanyUnit[]): {
  [key: string]: { label: string; icon?: string };
} {
  return units.reduce((acc, unit) => {
    acc[`${unit.id}`] = { label: unit.name };
    return acc;
  }, {} as { [key: string]: { label: string; icon?: string } });
}
