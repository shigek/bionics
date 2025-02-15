"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const codon_1 = require("../constants/codon");
const nedb_utils_1 = require("../utils/nedb-utils");
const service_1 = require("./service");
const create = async (size) => {
    const endCodon = await (0, nedb_utils_1.findTable)({ db: codon_1.CODON, condition: JSON.stringify({ "code1": "*" }) });
    const startCodon = await (0, nedb_utils_1.findTable)({ db: codon_1.CODON, condition: JSON.stringify({ "code1": "M" }) });
    let codonTable = [];
    for (const first of codon_1.BaseCode) {
        for (const second of codon_1.BaseCode) {
            for (const third of codon_1.BaseCode) {
                if (!endCodon[0].codon.includes(`${first}${second}${third}`)) {
                    codonTable.push(`${first}${second}${third}`);
                }
            }
        }
    }
    const forward = (0, service_1.createForward)(startCodon, codonTable, endCodon, size);
    const translate = await (0, service_1.createTranslate)(forward);
    const reverse = (0, service_1.createReverse)(forward);
    return { forward, translate, reverse };
};
exports.create = create;
