import { Decimal } from 'decimal.js';

export const divideAByB = (a: number, b: number) => {
  return new Decimal(a).dividedBy(new Decimal(b)).toNumber();
};
