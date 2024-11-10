import fs from "fs";
import { CODON, END_CODON, getReverseCodon, START_AMINO_ACID, } from "../constants/codon";
import { Sequence } from "../model/model";
import { findTable } from "../utils/nedb-utils";
import { randRange } from "../utils/random";

export const createReverse = (forward: Sequence) => {
    const end: string = getReverseCodon(forward.start);
    let sequence: string[] = []
    for (const codon of forward.sequence) {
        sequence.push(getReverseCodon(codon));
    }
    const start: string = getReverseCodon(forward.end);
    return { start, sequence, end };
}
export const createTranslate = async (forward: Sequence) => {
    const codonTable = await findTable({ db: CODON, condition: JSON.stringify({}) });
    const start: string = START_AMINO_ACID;
    let sequence: string[] = []
    for (const codon of forward.sequence) {
        for (const record of codonTable) {
            if (record.codon.includes(codon)) {
                sequence.push(record.code1);
            }
        }
    }
    const end: string = END_CODON;
    return { start, sequence, end };
}
export const createForward = (startCodon: any, codonTable: any, endCodon: any, size: number) => {
    const start: string = startCodon[0].codon[0];
    let sequence: string[] = []
    for (let i = 0; i < size; i++) {
        sequence.push(codonTable[randRange(0, 60)]);
    }
    const end: string = endCodon[0].codon[randRange(0, 2)];
    return { start, sequence, end };
}

export const outputReverse = (file: string, data: Sequence, rep: { from: string, to: string }, size?: number) => {
    const stream = fs.createWriteStream(file);
    stream.write(data.start.replaceAll(rep.from, rep.to));
    const outputSize = (size) ? size : data.sequence.length;
    let current = 0;
    while (data.sequence) {
        const codon = data.sequence.pop();
        if (!codon) {
            break;
        }
        current++;
        codon.replaceAll(rep.from, rep.to);
        stream.write(codon.replaceAll(rep.from, rep.to));
        if (outputSize <= current) {
            break;
        }
    }
    stream.write(data.end.replaceAll(rep.from, rep.to));
    stream.end('\n');
    stream.on('finish', () => {
        console.log('ファイルに正常に書き込みました');
    });
}
export const outputTranslate = (file: string, data: Sequence, size?: number) => {
    const stream = fs.createWriteStream(file);
    stream.write(data.start);
    const outputSize = (size) ? size : data.sequence.length;
    let current = 0;
    for (const codon of data.sequence) {
        stream.write(codon);
        current++;
        if (outputSize <= current) {
            break;
        }
    }
    stream.write(data.end);
    stream.end('\n');
    stream.on('finish', () => {
        console.log('ファイルに正常に書き込みました');
    });
}
export const outputForward = async (file: string, data: Sequence, rep: { from: string, to: string }, size?: number) => {
    const stream = fs.createWriteStream(file);
    stream.write(data.start.replaceAll(rep.from, rep.to));
    const outputSize = (size) ? size : data.sequence.length;
    let current = 0;
    for (const codon of data.sequence) {
        stream.write(codon.replaceAll(rep.from, rep.to));
        current++;
        if (outputSize <= current) {
            break;
        }
    }
    stream.write(data.end.replaceAll(rep.from, rep.to));
    stream.end('\n');
    await new Promise<void>((resolve, reject) => {
        stream.on('error', (err) => {
            reject(err);
        });
        stream.on('finish', () => {
            console.log('ファイルに正常に書き込みました')
            resolve();
        });
    });
}

export const outputHtml = (file: string, data: string) => {
    const stream = fs.createWriteStream(file);
    stream.write(data);
    stream.end('\n');
    stream.on('finish', () => {
        console.log('ファイルに正常に書き込みました');
    });
}
