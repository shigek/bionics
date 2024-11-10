import { OPTIMIZED_CODON } from "../constants/codon";
import { findTable } from "../utils/nedb-utils";

export type BiospeciesResponse = {
    code: number
    message?: string
    biospecies?: string[]
}

export const queryBiospecies = async (): Promise<string[]> => {
    const rows = await findTable({ db: OPTIMIZED_CODON, condition: JSON.stringify({}) });
    const biospecies = new Set();
    for (const row of rows) {
        biospecies.add(row.biospecies)
    }
    if (biospecies.size <= 0) {
        throw new Error(`"data is empty in optimized-codon-table"`);
    } else {
        return <string[]>Array.from(biospecies);
    }
}
