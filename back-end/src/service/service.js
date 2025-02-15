"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputHtml = exports.outputForward = exports.outputTranslate = exports.outputReverse = exports.createForward = exports.createTranslate = exports.createReverse = void 0;
const fs_1 = __importDefault(require("fs"));
const codon_1 = require("../constants/codon");
const nedb_utils_1 = require("../utils/nedb-utils");
const random_1 = require("../utils/random");
const createReverse = (forward) => {
    const end = (0, codon_1.getReverseCodon)(forward.start);
    let sequence = [];
    for (const codon of forward.sequence) {
        sequence.push((0, codon_1.getReverseCodon)(codon));
    }
    const start = (0, codon_1.getReverseCodon)(forward.end);
    return { start, sequence, end };
};
exports.createReverse = createReverse;
const createTranslate = async (forward) => {
    const codonTable = await (0, nedb_utils_1.findTable)({ db: codon_1.CODON, condition: JSON.stringify({}) });
    const start = codon_1.START_AMINO_ACID;
    let sequence = [];
    for (const codon of forward.sequence) {
        for (const record of codonTable) {
            if (record.codon.includes(codon)) {
                sequence.push(record.code1);
            }
        }
    }
    const end = codon_1.END_CODON;
    return { start, sequence, end };
};
exports.createTranslate = createTranslate;
const createForward = (startCodon, codonTable, endCodon, size) => {
    const start = startCodon[0].codon[0];
    let sequence = [];
    for (let i = 0; i < size; i++) {
        sequence.push(codonTable[(0, random_1.randRange)(0, 60)]);
    }
    const end = endCodon[0].codon[(0, random_1.randRange)(0, 2)];
    return { start, sequence, end };
};
exports.createForward = createForward;
const outputReverse = (file, data, rep, size) => {
    const stream = fs_1.default.createWriteStream(file);
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
};
exports.outputReverse = outputReverse;
const outputTranslate = (file, data, size) => {
    const stream = fs_1.default.createWriteStream(file);
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
};
exports.outputTranslate = outputTranslate;
const outputForward = async (file, data, rep, size) => {
    const stream = fs_1.default.createWriteStream(file);
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
    await new Promise((resolve, reject) => {
        stream.on('error', (err) => {
            reject(err);
        });
        stream.on('finish', () => {
            console.log('ファイルに正常に書き込みました');
            resolve();
        });
    });
};
exports.outputForward = outputForward;
const outputHtml = (file, data) => {
    const stream = fs_1.default.createWriteStream(file);
    stream.write(data);
    stream.end('\n');
    stream.on('finish', () => {
        console.log('ファイルに正常に書き込みました');
    });
};
exports.outputHtml = outputHtml;
