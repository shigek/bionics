import { END_CODON, CODON, START_AMINO_ACID, START_CODON, CODON_END_CODON } from "../constants/codon";
import { findTable } from "../utils/nedb-utils";
import { aminoacid2Codon, nucleotide2Codon } from "../utils/utils";

export const translate = async (data: string[]) => {
  let start = START_AMINO_ACID;
  let end = END_CODON;
  let sequence: string[] = [];
  let codonSequence: string[] = [];
  if (data[0] === START_AMINO_ACID) {
    if (END_CODON !== data[data.length - 1]) {
      throw new Error(`終止コドンが不正です expected: ${END_CODON} actual: ${data[data.length - 1]}`);
    }
    codonSequence = await aminoacid2Codon(data);
    for (let i = 1; i < (codonSequence.length - 1); i++) {
      start = codonSequence[0];
      end = codonSequence[codonSequence.length - 1];
      sequence.push(codonSequence[i]);
    }
  } else {
    start = START_AMINO_ACID;
    end = END_CODON;
    codonSequence = nucleotide2Codon(data);
    if (codonSequence[0] !== START_CODON) {
      throw new Error(`開始コドンが不正です expected: ${START_CODON} actual: ${data[0]}`);
    }
    if (!CODON_END_CODON.includes(codonSequence[codonSequence.length - 1])) {
      throw new Error(`終止コドンが不正です expected: ${CODON_END_CODON} actual: ${data[codonSequence.length - 1]}`);
    }
    if (data.length % 3 !== 0) {
      throw new Error(`3の倍数になっていません`);
    }
    if (data.length / 3 <= 2) {
      throw new Error(`開始コドン または、終了コドンが不正です`);
    }
    const codonTable = await findTable({ db: CODON, condition: JSON.stringify({}) });
    if (codonTable.length === 0) {
      throw new Error(`${CODON} is empty`);
    }
    for (let i = 1; i < (codonSequence.length - 1); i++) {
      const codonData = codonSequence[i];
      for (const codonRow of codonTable) {
        if (codonRow.codon.includes(codonData)) {
          sequence.push(codonRow.code1);
        }
      }
    }
  }
  return { start, sequence, end };
}

