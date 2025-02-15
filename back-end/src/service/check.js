"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
const codon_1 = require("../constants/codon");
const file_1 = require("../utils/file");
const nedb_utils_1 = require("../utils/nedb-utils");
const check = async (inputFile, reaseArray) => {
    const line = (0, file_1.readLine)(inputFile).join("").replace("\n", "");
    let searchResult = [];
    for (const enzyme of reaseArray) {
        let end = 0;
        const rEaseTable = await (0, nedb_utils_1.findTable)({ db: codon_1.RESTRICTION_ENZYME, condition: JSON.stringify({ enzyme }) });
        const size = rEaseTable[0].codon.length;
        const codon = rEaseTable[0].codon;
        while (true) {
            const start = line.indexOf(rEaseTable[0].codon, end);
            if (start == -1) {
                break;
            }
            end = start + size;
            searchResult.push({ enzyme, codon, start, end, size });
        }
    }
    searchResult.sort((a, b) => a.start - b.start);
    let searchResult2 = [];
    for (let i = 0; i < searchResult.length; i++) {
        let start = searchResult[i].start;
        let end = searchResult[i].end;
        for (let j = i + 1; j < searchResult.length; j++) {
            if (searchResult[i].end > searchResult[j].start) {
                end = searchResult[j].end;
                i = j;
            }
            else {
                break;
            }
        }
        searchResult2.push({ start, end });
    }
    let row = "";
    let s = 0;
    for (const result of searchResult2) {
        for (let i = s; i < line.length; i++) {
            if (i === result.start) {
                row += "KI";
                for (let j = i; j < result.end; j++) {
                    row += line.charAt(j);
                }
                row += "KO";
                s = result.end;
                break;
            }
            else {
                row += line.charAt(i);
            }
        }
    }
    if (s < line.length) {
        row += line.slice(s);
    }
    return { rows: row };
    // const data = readFile("./template/check.html");
    // const html = data.replace("{0}", row.replaceAll("KI", KI).replaceAll("KO", KO));
    // outputHtml(`${outputPath}/codon-${args["nucleic-acid"]}.html`, html);
};
exports.check = check;
