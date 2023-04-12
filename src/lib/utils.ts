import type { CompanyUnit } from '$types/db';

export function createSelect(units: CompanyUnit[]): {
  [key: string]: { label: string; icon?: string };
} {
  return units.reduce((acc, unit) => {
    acc[`${unit.id}`] = { label: unit.nazev };
    return acc;
  }, {} as { [key: string]: { label: string; icon?: string } });
}
