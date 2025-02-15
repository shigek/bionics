"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const codon_1 = require("../constants/codon");
const nedb_utils_1 = require("../utils/nedb-utils");
const utils_1 = require("../utils/utils");
const translate = async (data) => {
    let start = codon_1.START_AMINO_ACID;
    let end = codon_1.END_CODON;
    let sequence = [];
    let codonSequence = [];
    if (data[0] === codon_1.START_AMINO_ACID) {
        if (codon_1.END_CODON !== data[data.length - 1]) {
            throw new Error(`終止コドンが不正です expected: ${codon_1.END_CODON} actual: ${data[data.length - 1]}`);
        }
        codonSequence = await (0, utils_1.aminoacid2Codon)(data);
        for (let i = 1; i < (codonSequence.length - 1); i++) {
            start = codonSequence[0];
            end = codonSequence[codonSequence.length - 1];
            sequence.push(codonSequence[i]);
        }
    }
    else {
        start = codon_1.START_AMINO_ACID;
        end = codon_1.END_CODON;
        codonSequence = (0, utils_1.nucleotide2Codon)(data);
        if (codonSequence[0] !== codon_1.START_CODON) {
            throw new Error(`開始コドンが不正です expected: ${codon_1.START_CODON} actual: ${data[0]}`);
        }
        if (!codon_1.CODON_END_CODON.includes(codonSequence[codonSequence.length - 1])) {
            throw new Error(`終止コドンが不正です expected: ${codon_1.CODON_END_CODON} actual: ${data[codonSequence.length - 1]}`);
        }
        if (data.length % 3 !== 0) {
            throw new Error(`3の倍数になっていません`);
        }
        if (data.length / 3 <= 2) {
            throw new Error(`開始コドン または、終了コドンが不正です`);
        }
        const codonTable = await (0, nedb_utils_1.findTable)({ db: codon_1.CODON, condition: JSON.stringify({}) });
        if (codonTable.length === 0) {
            throw new Error(`${codon_1.CODON} is empty`);
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
};
exports.translate = translate;
