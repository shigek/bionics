import * as service from "../../service/create";

import { ReplacePair } from "../../constants/codon";
import { outputForward, outputReverse, outputTranslate } from "../../service/service";

export const create = async (args: any) => {
  const path = args["output-path"];
  const size = args["size"];
  const rep = ReplacePair[args["nucleic-acid"]]();
  const { forward, translate, reverse } = await service.create(size / 3);
  await outputForward(`${path}/codon-${args["nucleic-acid"]}.txt`, forward, rep);
  outputTranslate(`${path}/codon-${args["nucleic-acid"]}-translate.txt`, translate);
  outputReverse(`${path}/codon-${args["nucleic-acid"]}-reverse.txt`, reverse, rep)
}
