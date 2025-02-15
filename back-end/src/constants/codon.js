"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplacePair = exports.getReverseCodon = exports.ReverseCodonData = exports.BaseCode = exports.KO = exports.KI = exports.RESTRICTION_ENZYME = exports.OPTIMIZED_CODON = exports.AMINOACID_NAME = exports.CODON = exports.CODON_END_CODON = exports.START_CODON = exports.END_CODON = exports.START_AMINO_ACID = exports.DNA = exports.RNA = void 0;
exports.RNA = "RNA";
exports.DNA = "DNA";
exports.START_AMINO_ACID = "M";
exports.END_CODON = "*";
exports.START_CODON = "ATG";
exports.CODON_END_CODON = ["TAA", "TAG", "TGA"];
exports.CODON = "./db/master/codon-table";
exports.AMINOACID_NAME = "./db/master/aminoacid-names-table";
exports.OPTIMIZED_CODON = "./db/master/optimized-codon-table";
exports.RESTRICTION_ENZYME = "./db/master/restraction-enzyme-table";
exports.KI = "<span class=\"midnightblue\">";
exports.KO = "</span>";
exports.BaseCode = ["T", "A", "C", "G"];
exports.ReverseCodonData = [
    { codon: "T", reverse: "A" },
    { codon: "A", reverse: "T" },
    { codon: "C", reverse: "G" },
    { codon: "G", reverse: "C" },
];
const getReverseCodon = (codon) => {
    const baseCodes = Array.from(codon);
    const reverseCodon = [];
    for (const baseCode of baseCodes) {
        for (const data of exports.ReverseCodonData) {
            if (baseCode === data.codon) {
                reverseCodon.push(data.reverse);
            }
        }
    }
    return `${reverseCodon[2]}${reverseCodon[1]}${reverseCodon[0]}`;
};
exports.getReverseCodon = getReverseCodon;
exports.ReplacePair = {
    RNA: () => { return { from: "T", to: "U" }; },
    DNA: () => { return { from: "U", to: "T" }; },
};
