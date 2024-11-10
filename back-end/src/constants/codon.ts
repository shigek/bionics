export const RNA: string = "RNA";
export const DNA: string = "DNA";
export const START_AMINO_ACID: string = "M";
export const END_CODON: string = "*";

export const START_CODON: string = "ATG";
export const CODON_END_CODON: string[] = ["TAA","TAG","TGA"];

export const CODON: string = "./db/master/codon-table";
export const AMINOACID_NAME: string = "./db/master/aminoacid-names-table";
export const OPTIMIZED_CODON: string = "./db/master/optimized-codon-table";
export const RESTRICTION_ENZYME: string = "./db/master/restraction-enzyme-table";
export const KI = "<span class=\"midnightblue\">";
export const KO = "</span>";

export const BaseCode: string[] = ["T", "A", "C", "G"];
export const ReverseCodonData: { codon: string, reverse: string }[] = [
    { codon: "T", reverse: "A" },
    { codon: "A", reverse: "T" },
    { codon: "C", reverse: "G" },
    { codon: "G", reverse: "C" },
];
export const getReverseCodon = (codon: string): string => {
    const baseCodes = Array.from(codon);
    const reverseCodon: string[] = []
    for (const baseCode of baseCodes) {
        for (const data of ReverseCodonData) {
            if (baseCode === data.codon) {
                reverseCodon.push(data.reverse);
            }
        }
    }
    return `${reverseCodon[2]}${reverseCodon[1]}${reverseCodon[0]}`
}

type Pair = {
    [key: string]: any
}
export const ReplacePair: Pair = {
    RNA: () => { return { from: "T", to: "U" } },
    DNA: () => { return { from: "U", to: "T" } },
}
