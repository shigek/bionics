import { BaseCode, CODON } from "../constants/codon";
import { findTable } from "../utils/nedb-utils";
import { createForward, createReverse, createTranslate } from "./service";

export const create = async (size: number) => {
  const endCodon = await findTable({ db: CODON, condition: JSON.stringify({ "code1": "*" }) });
  const startCodon = await findTable({ db: CODON, condition: JSON.stringify({ "code1": "M" }) });

  let codonTable: string[] = [];
  for (const first of BaseCode) {
    for (const second of BaseCode) {
      for (const third of BaseCode) {
        if (!endCodon[0].codon.includes(`${first}${second}${third}`)) {
          codonTable.push(`${first}${second}${third}`);
        }
      }
    }
  }
  const forward = createForward(startCodon, codonTable, endCodon, size);
  const translate = await createTranslate(forward);
  const reverse = createReverse(forward);

  return { forward, translate, reverse };
}
