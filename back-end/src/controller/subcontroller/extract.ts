import * as service from "../../service/extract";

import { ReplacePair } from "../../constants/codon";
import { outputForward, outputReverse } from "../../service/service";

export const extract = async (args: any) => {
    const inputPath = args["input-path"];
    const outputPath = args["output-path"];
    const size = args["size"] / 3;
    const nucleicAcid = args["nucleic-acid"];
    const rep = ReplacePair[nucleicAcid]();
    const fsequence = await service.extract(`${inputPath}/codon-${nucleicAcid}.txt`, size);
    const forward = { start: fsequence.reverseEnd, sequence: fsequence.forward, end: fsequence.reverseStart };
    const reverse = { start: fsequence.reverseStart, sequence: fsequence.reverse, end: fsequence.reverseEnd };
    await outputForward(`${outputPath}/codon-${args["nucleic-acid"]}-extract.txt`, forward, rep);
    outputReverse(`${outputPath}/codon-${args["nucleic-acid"]}-extract.reverse.txt`, reverse, rep)
}
