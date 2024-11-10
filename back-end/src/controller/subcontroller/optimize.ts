import * as service from "../../service/optimize";

import { ReplacePair } from "../../constants/codon";
import { outputForward, outputReverse, outputTranslate } from "../../service/service";

// アミノ酸から、逆翻訳
export const optimize = async (args: any) => {
    const inputPath = args["input-path"];
    const outputPath = args["output-path"];
    const biospecies = args["biospecies"];
    const nucleicAcid = args["nucleic-acid"];
    const rep = ReplacePair[nucleicAcid]();
    const { forward, translate, reverse } = await service.optimize(`${inputPath}/codon-${nucleicAcid}.txt`, biospecies);

    await outputForward(`${outputPath}/codon-${args["nucleic-acid"]}.txt`, forward, rep);
    outputReverse(`${outputPath}/codon-${args["nucleic-acid"]}-reverse.txt`, reverse, rep)
    outputTranslate(`${outputPath}/codon-${args["nucleic-acid"]}-translate.txt`, translate);
}
