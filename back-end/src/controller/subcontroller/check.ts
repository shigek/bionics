import { ReplacePair } from "../../constants/codon";
import * as service from "../../service/check";
import { writeString } from "../../utils/file";

export const check = async (args: any) => {
  const inputPath = args["input-path"];
  const outputPath = args["output-path"];
  const reaseArray = args["rease"].split(",");
  const nucleicAcid = args["nucleic-acid"]
  const rep = ReplacePair[args["nucleic-acid"]]();
  const { rows } = await service.check(`${inputPath}/codon-${nucleicAcid}.txt`, reaseArray);
  writeString(`${outputPath}/codon-${args["nucleic-acid"]}-check.txt`, rows.replaceAll(rep.from, rep.to));
}
