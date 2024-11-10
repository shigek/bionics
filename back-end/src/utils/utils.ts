import { openDB } from "../utils/db";
import { CODON } from "../constants/codon";
import { findOne } from "./nedb-utils";
import { randRange } from "./random";

export const nucleotide2Codon = (nucleotideSequence: string[]): string[] => {
    let codonSequence: string[] = [];
    for (let i = 0; i < nucleotideSequence.length; i++) {
        let code = `${nucleotideSequence[i]}${nucleotideSequence[i + 1]}${nucleotideSequence[i + 2]}`;
        codonSequence.push(code);
        i += 2
    }
    return codonSequence;
}

export const aminoacid2Codon = async (rows: string[]): Promise<string[]> => {
    let codonSequence: string[] = [];
    const db = openDB(CODON);
    for (const code1 of rows) {
        const record = await findOne(db, { condition: JSON.stringify({ code1 }) });
        const index = randRange(0, record.codon.length - 1);
        codonSequence.push(record.codon[index]);
    }
    return codonSequence;
}

