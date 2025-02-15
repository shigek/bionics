"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const service = __importStar(require("../../service/translate"));
const codon_1 = require("../../constants/codon");
const service_1 = require("../../service/service");
const file_1 = require("../../utils/file");
// アミノ酸翻訳（塩基配列から、アミノ酸配列を作る)
const translate = async (args) => {
    const inputPath = args["input-path"];
    const outputPath = args["output-path"];
    const biospecies = args["biospecies"];
    const nucleicAcid = args["nucleic-acid"];
    const rep = codon_1.ReplacePair[nucleicAcid]();
    const lines = (0, file_1.readLine)(`${inputPath}/codon-${nucleicAcid}.txt`);
    const nucleotideSequence = Array.from(lines.join("").replace("\n", ""));
    const translate = await service.translate(nucleotideSequence, biospecies);
    (0, service_1.outputTranslate)(`${outputPath}/codon-${args["nucleic-acid"]}-translate.txt`, translate, rep);
};
exports.translate = translate;
