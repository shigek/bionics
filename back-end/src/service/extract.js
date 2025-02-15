"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = void 0;
const codon_1 = require("../constants/codon");
const file_1 = require("../utils/file");
const extract = async (inputFile, size) => {
    const lines = (0, file_1.readLine)(inputFile);
    const codons = Array.from(lines.join("").replace("\n", ""));
    console.log(size);
    let start = "";
    let end = "";
    let sequence = [];
    for (let i = 0; i < codons.length; i++) {
        let code1 = `${codons[i]}${codons[i + 1]}${codons[i + 2]}`;
        if (i === 0) {
            start = code1;
        }
        else if (i === codons.length - 3) {
            end = code1;
        }
        else {
            sequence.push(code1);
        }
        i += 2;
    }
    const forward = { start, sequence, end };
    end = (0, codon_1.getReverseCodon)(forward.start);
    start = (0, codon_1.getReverseCodon)(forward.end);
    let current = 0;
    let fsequence = { start: forward.start, end: forward.end, reverseStart: start, reverseEnd: end, forward: [], reverseForward: [], reverse: [] };
    for (let i = forward.sequence.length - 1; i >= 0; i--) {
        fsequence.reverseForward.push(forward.sequence[i]);
        fsequence.reverse.push((0, codon_1.getReverseCodon)(forward.sequence[i]));
        current++;
        i -= 2;
        if (size <= current) {
            break;
        }
    }
    current = 0;
    for (let i = 0; i < forward.sequence.length; i++) {
        fsequence.forward.push(forward.sequence[i]);
        current++;
        i += 2;
        if (size <= current) {
            break;
        }
    }
    return fsequence;
    // const data = readFile("./template/5-3.html");
    // const html = data
    //     .replaceAll("{0}", size)
    //     .replaceAll("{1}", forward.start + fsequence.forward.join("") + forward.end)
    //     .replace("{2}", forward.start + fsequence.reverseForward.join("") + forward.end)
    //     .replace("{3}", start + fsequence.reverse.join("") + end);
    // const reverse = { start, sequence, end };
    // outputForward(`${outputPath}/codon-${args["nucleic-acid"]}-extract.txt`, forward, rep, size);
    // outputReverse(`${outputPath}/codon-${args["nucleic-acid"]}-extract.reverse.txt`, reverse, rep)
    // outputHtml(`${outputPath}/codon-${args["nucleic-acid"]}-extract.html`, html);
};
exports.extract = extract;
