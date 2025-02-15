"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const nedb_utils_1 = require("../src/utils/nedb-utils");
const getCommand = {
    "query": async (args) => await (0, nedb_utils_1.findTable)(args),
    "import": async (args) => await (0, nedb_utils_1.importTable)(args),
    "export": async (args) => await (0, nedb_utils_1.exportTable)(args),
};
const args = yargs_1.default
    .command("* command", "print a commands received as arguments")
    .positional("command", {
    describe: "command for printing",
    type: "string",
    demandOption: true,
})
    .options({
    input: {
        type: "string",
        describe: "import from file",
        alias: "i",
    },
})
    .options({
    output: {
        type: "string",
        describe: "export to file",
        alias: "o",
    },
})
    .options({
    db: {
        type: "string",
        describe: "database table name",
        demandOption: true,
        alias: "d",
    },
})
    .options({
    condition: {
        type: "string",
        describe: "database table name",
        default: "{}"
    },
})
    .check((args) => {
    if (args["db"]) {
        if (args["command"] === "export") {
            if (args["output"]) {
                return true;
            }
            {
                throw new Error("Error: please specify an command --output <file> or -o <file> required.");
            }
        }
        else if (args["command"] === "import") {
            if (args["input"]) {
                return true;
            }
            {
                throw new Error("Error: please specify an command --input <file> or -i <file> required.");
            }
        }
        else if (args["command"] === "query") {
            return true;
        }
        else {
            throw new Error("Error: please specify an command export or import or query");
        }
    }
    else {
        throw new Error("Error: please specify an command --db <table> or -d <table> required.");
    }
}).alias({
    h: "help",
    v: "version",
})
    .parseSync();
(async () => {
    const result = await getCommand[args.command](args);
    console.log(result);
})();
