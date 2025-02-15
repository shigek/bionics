"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const main_coltroller_1 = require("../src/controller/main-coltroller");
const checkInputPath = (args) => {
    if (args["input-path"]) {
        return true;
    }
    {
        throw new Error("Error: please specify an --input-path <path> or -i <path>  required");
    }
};
const checkOutputPath = (args) => {
    if (args["output-path"]) {
        return true;
    }
    {
        throw new Error("Error: please specify an --output-path <path> or -o <path> required.");
    }
};
const checkSize = (args) => {
    if (args["size"] % 3 === 0) {
        return true;
    }
    {
        throw new Error("Error: sizeは、３の倍数でなければいけません");
    }
};
const args = yargs_1.default
    .command("* command", "print a paths received as arguments")
    .positional("command", {
    describe: "command for printing",
    type: "string",
    demandOption: true,
})
    .options({
    "format": {
        type: "string",
        default: "txt",
        describe: "ファイル出力形式 (html | txt)",
    },
    "input-path": {
        type: "string",
        describe: "入力ファイルパス",
        alias: "i",
    },
    "output-path": {
        type: "string",
        describe: "出力ファイルパス",
        alias: "o",
    },
    "nucleic-acid": {
        type: "string",
        describe: "塩基 (DNA | RNA)",
        default: "DNA",
        alias: "n",
    },
    "biospecies": {
        type: "string",
        describe: "生物種",
        default: "Bakersyeast",
    },
    "codon": {
        type: "string",
        describe: "核酸",
        default: "ATG",
    },
    "size": {
        type: "number",
        describe: "塩基の個数",
        default: 90,
        alias: "z",
    },
    "rease": {
        type: "string",
        describe: "制限酵素(REase[,REase]",
        default: "EcoRI",
    },
})
    .check((args) => {
    if (checkSize(args)) {
        if (args["command"] === "create") {
            return checkOutputPath(args);
        }
        else if (args["command"] === "optimize") {
            if (checkInputPath(args)) {
                return checkOutputPath(args);
            }
        }
        else if (args["command"] === "extract") {
            if (checkInputPath(args)) {
                return checkOutputPath(args);
            }
        }
        else if (args["command"] === "translate") {
            if (checkInputPath(args)) {
                return checkOutputPath(args);
            }
        }
        else if (args["command"] === "check") {
            if (checkInputPath(args)) {
                return checkOutputPath(args);
            }
        }
        else if (args["command"] === "view") {
            return checkOutputPath(args);
        }
        else {
            throw new Error("Error: please specify an command create or extract or optimize or check");
        }
    }
})
    .alias({
    h: "help",
    v: "version",
})
    .parseSync();
(async () => {
    await (0, main_coltroller_1.MainController)(args);
})();
