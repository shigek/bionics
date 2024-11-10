import * as service from "../../service/translate";

import { ReplacePair } from "../../constants/codon";
import { outputTranslate, } from "../../service/service";
import { readLine } from "../../utils/file";

// アミノ酸翻訳（塩基配列から、アミノ酸配列を作る)
export const translate = async (args: any) => {
  const inputPath = args["input-path"];
  const outputPath = args["output-path"];
  const biospecies = args["biospecies"];
  const nucleicAcid = args["nucleic-acid"];
  const rep = ReplacePair[nucleicAcid]();

  const lines = readLine(`${inputPath}/codon-${nucleicAcid}.txt`);
  const nucleotideSequence = Array.from(lines.join("").replace("\n", ""));

  const translate = await service.translate(nucleotideSequence, biospecies);
  outputTranslate(`${outputPath}/codon-${args["nucleic-acid"]}-translate.txt`, translate, rep);
}
