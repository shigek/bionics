"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimize = void 0;
const codon_1 = require("../constants/codon");
const file_1 = require("../utils/file");
const nedb_utils_1 = require("../utils/nedb-utils");
const service_1 = require("./service");
const optimize = async (inputFile, biospecies) => {
    const lines = (0, file_1.readLine)(inputFile);
    const codons = Array.from(lines.join("").replace("\n", ""));
    const endCodon = await (0, nedb_utils_1.findTable)({ db: codon_1.CODON, condition: JSON.stringify({ "code1": "*" }) });
    const startCodon = await (0, nedb_utils_1.findTable)({ db: codon_1.CODON, condition: JSON.stringify({ "code1": "M" }) });
    let start = "";
    let end = "";
    let sequence = [];
    for (let i = 0; i < codons.length; i++) {
        let code1 = `${codons[i]}${codons[i + 1]}${codons[i + 2]}`;
        if (i === 0) {
            if (!startCodon[0].codon.includes(code1)) {
                throw new Error(`Error: start codon not found in ${inputFile}`);
            }
            start = code1;
        }
        else if (i === codons.length - 3) {
            if (!endCodon[0].codon.includes(code1)) {
                throw new Error(`Error: end codon not found in ${inputFile}`);
            }
            end = code1;
        }
        else {
            sequence.push(code1);
        }
        i += 2;
    }
    const translate = await (0, service_1.createTranslate)({ start, sequence, end });
    {
        let sequence = [];
        const codonStart = await (0, nedb_utils_1.findTable)({ db: codon_1.OPTIMIZED_CODON, condition: JSON.stringify({ biospecies, code1: translate.start }) });
        let start = codonStart[0].codon;
        for (const code1 of translate.sequence) {
            const codonTable = await (0, nedb_utils_1.findTable)({ db: codon_1.OPTIMIZED_CODON, condition: JSON.stringify({ biospecies, code1 }) });
            sequence.push(codonTable[0].codon);
        }
        const codonEnd = await (0, nedb_utils_1.findTable)({ db: codon_1.OPTIMIZED_CODON, condition: JSON.stringify({ biospecies, code1: translate.end }) });
        let end = codonEnd[0].codon;
        const forward = { start, sequence, end };
        const reverse = (0, service_1.createReverse)(forward);
        return { forward, translate, reverse };
    }
};
exports.optimize = optimize;
