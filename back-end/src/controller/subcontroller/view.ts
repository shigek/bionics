import { extract } from "../../service/extract";
import { check } from "../../service/check";
import { optimize } from "../../service/optimize";

import { KI, KO, ReplacePair, RESTRICTION_ENZYME } from "../../constants/codon";
import { readFile } from "../../utils/file";
import { outputForward, outputHtml } from "../../service/service";
import { OptimizeResult, ExtractResult } from "../../model/model";
import { findOne } from "../../utils/nedb-utils";
import { openDB } from "../../utils/db";

export const view = async (args: any) => {
  const inputPath = args["input-path"];
  const outputPath = args["output-path"];
  const nucleicAcid = args["nucleic-acid"];
  const biospecies = args["biospecies"];
  const reaseArray = args["rease"].split(",");
  const size = args["size"] / 3;
  const rep = ReplacePair[nucleicAcid]();

  const data = readFile("./template/view.html");
  //　制限酵素
  let rease = "";
  const db = openDB(RESTRICTION_ENZYME);
  for (const enzyme of reaseArray) {
    const rEaseTable = await findOne(db, { condition: JSON.stringify({ enzyme }) });
    if (rease.length === 0) {
      rease += `${enzyme}( ${rEaseTable.codon} )`
    } else {
      rease += `, ${enzyme}( ${rEaseTable.codon} )`
    }
  }

  // optimize
  const optimized: OptimizeResult = await optimize(`${inputPath}/codon-${nucleicAcid}.txt`, biospecies);
  let html = data.replace("{8}", optimized.translate.start + optimized.translate.sequence.join("") + optimized.translate.end);
  await outputForward(`./temp/codon-${nucleicAcid}.txt`, optimized.forward, rep);

  // extract
  const extracts: ExtractResult = await extract(`./temp/codon-${nucleicAcid}.txt`, size);
  html = html
    .replace("{0}", args["size"])
    .replace("{1}", extracts.start + extracts.forward.join("") + extracts.end)
    .replace("{2}", extracts.reverseStart + extracts.reverse.join("") + extracts.reverseEnd)
    .replace("{3}", extracts.start + extracts.reverseForward.join("") + extracts.end)
    .replace("{4}", extracts.reverseStart + extracts.reverse.join("") + extracts.reverseEnd)
    .replace("{5}", biospecies)
    .replace("{6}", rease);

  // check
  const { rows } = await check(`./temp/codon-${nucleicAcid}.txt`, reaseArray);

  html = html.replace("{7}", rows.replaceAll("KI", KI).replaceAll("KO", KO));
  outputHtml(`${outputPath}/codon-${args["nucleic-acid"]}-view.html`, html);
}
