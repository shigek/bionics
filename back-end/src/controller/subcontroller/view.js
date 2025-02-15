"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.view = void 0;
const extract_1 = require("../../service/extract");
const check_1 = require("../../service/check");
const optimize_1 = require("../../service/optimize");
const codon_1 = require("../../constants/codon");
const file_1 = require("../../utils/file");
const service_1 = require("../../service/service");
const nedb_utils_1 = require("../../utils/nedb-utils");
const db_1 = require("../../utils/db");
const view = async (args) => {
    const inputPath = args["input-path"];
    const outputPath = args["output-path"];
    const nucleicAcid = args["nucleic-acid"];
    const biospecies = args["biospecies"];
    const reaseArray = args["rease"].split(",");
    const size = args["size"] / 3;
    const rep = codon_1.ReplacePair[nucleicAcid]();
    const data = (0, file_1.readFile)("./template/view.html");
    //　制限酵素
    let rease = "";
    const db = (0, db_1.openDB)(codon_1.RESTRICTION_ENZYME);
    for (const enzyme of reaseArray) {
        const rEaseTable = await (0, nedb_utils_1.findOne)(db, { condition: JSON.stringify({ enzyme }) });
        if (rease.length === 0) {
            rease += `${enzyme}( ${rEaseTable.codon} )`;
        }
        else {
            rease += `, ${enzyme}( ${rEaseTable.codon} )`;
        }
    }
    // optimize
    const optimized = await (0, optimize_1.optimize)(`${inputPath}/codon-${nucleicAcid}.txt`, biospecies);
    let html = data.replace("{8}", optimized.translate.start + optimized.translate.sequence.join("") + optimized.translate.end);
    await (0, service_1.outputForward)(`./temp/codon-${nucleicAcid}.txt`, optimized.forward, rep);
    // extract
    const extracts = await (0, extract_1.extract)(`./temp/codon-${nucleicAcid}.txt`, size);
    html = html
        .replace("{0}", args["size"])
        .replace("{1}", extracts.start + extracts.forward.join("") + extracts.end)
        .replace("{2}", extracts.reverseStart + extracts.reverse.join("") + extracts.reverseEnd)
        .replace("{3}", extracts.start + extracts.reverseForward.join("") + extracts.end)
        .replace("{4}", extracts.reverseStart + extracts.reverse.join("") + extracts.reverseEnd)
        .replace("{5}", biospecies)
        .replace("{6}", rease);
    // check
    const { rows } = await (0, check_1.check)(`./temp/codon-${nucleicAcid}.txt`, reaseArray);
    html = html.replace("{7}", rows.replaceAll("KI", codon_1.KI).replaceAll("KO", codon_1.KO));
    (0, service_1.outputHtml)(`${outputPath}/codon-${args["nucleic-acid"]}-view.html`, html);
};
exports.view = view;
