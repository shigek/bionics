"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aminoacid2Codon = exports.nucleotide2Codon = void 0;
const db_1 = require("../utils/db");
const codon_1 = require("../constants/codon");
const nedb_utils_1 = require("./nedb-utils");
const random_1 = require("./random");
const nucleotide2Codon = (nucleotideSequence) => {
    let codonSequence = [];
    for (let i = 0; i < nucleotideSequence.length; i++) {
        let code = `${nucleotideSequence[i]}${nucleotideSequence[i + 1]}${nucleotideSequence[i + 2]}`;
        codonSequence.push(code);
        i += 2;
    }
    return codonSequence;
};
exports.nucleotide2Codon = nucleotide2Codon;
const aminoacid2Codon = async (rows) => {
    let codonSequence = [];
    const db = (0, db_1.openDB)(codon_1.CODON);
    for (const code1 of rows) {
        const record = await (0, nedb_utils_1.findOne)(db, { condition: JSON.stringify({ code1 }) });
        const index = (0, random_1.randRange)(0, record.codon.length - 1);
        codonSequence.push(record.codon[index]);
    }
    return codonSequence;
};
exports.aminoacid2Codon = aminoacid2Codon;
