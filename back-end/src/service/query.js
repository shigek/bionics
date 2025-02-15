"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryBiospecies = void 0;
const codon_1 = require("../constants/codon");
const nedb_utils_1 = require("../utils/nedb-utils");
const queryBiospecies = async () => {
    const rows = await (0, nedb_utils_1.findTable)({ db: codon_1.OPTIMIZED_CODON, condition: JSON.stringify({}) });
    const biospecies = new Set();
    for (const row of rows) {
        biospecies.add(row.biospecies);
    }
    if (biospecies.size <= 0) {
        throw new Error(`"data is empty in optimized-codon-table"`);
    }
    else {
        return Array.from(biospecies);
    }
};
exports.queryBiospecies = queryBiospecies;
