import { CODON, OPTIMIZED_CODON } from "../constants/codon";
import { readLine } from "../utils/file";
import { findTable } from "../utils/nedb-utils";
import { createReverse, createTranslate } from "./service";

export const optimize = async (inputFile: string, biospecies: string) => {
    const lines = readLine(inputFile);
    const codons = Array.from(lines.join("").replace("\n", ""));
    const endCodon = await findTable({ db: CODON, condition: JSON.stringify({ "code1": "*" }) });
    const startCodon = await findTable({ db: CODON, condition: JSON.stringify({ "code1": "M" }) });

    let start = "";
    let end = "";
    let sequence: string[] = [];
    for (let i = 0; i < codons.length; i++) {
        let code1 = `${codons[i]}${codons[i + 1]}${codons[i + 2]}`;
        if (i === 0) {
            if (!startCodon[0].codon.includes(code1)) {
                throw new Error(`Error: start codon not found in ${inputFile}`);
            }
            start = code1;
        } else if (i === codons.length - 3) {
            if (!endCodon[0].codon.includes(code1)) {
                throw new Error(`Error: end codon not found in ${inputFile}`);
            }
            end = code1;
        } else {
            sequence.push(code1);
        }
        i += 2
    }
    const translate = await createTranslate({ start, sequence, end });
    {
        let sequence: string[] = [];
        const codonStart = await findTable({ db: OPTIMIZED_CODON, condition: JSON.stringify({ biospecies, code1: translate.start }) });
        let start = codonStart[0].codon;
        for (const code1 of translate.sequence) {
            const codonTable = await findTable({ db: OPTIMIZED_CODON, condition: JSON.stringify({ biospecies, code1 }) });
            sequence.push(codonTable[0].codon);
        }
        const codonEnd = await findTable({ db: OPTIMIZED_CODON, condition: JSON.stringify({ biospecies, code1: translate.end }) });
        let end = codonEnd[0].codon;
        const forward = { start, sequence, end };
        const reverse = createReverse(forward);
        return { forward, translate, reverse };
    }
}

