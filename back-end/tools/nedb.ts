import yargs from 'yargs'
import { importTable, findTable, exportTable } from '../src/utils/nedb-utils'

type Command = {
  [key: string]: any
}
const getCommand: Command = {
  "query": async (args: any) => await findTable(args),
  "import": async (args: any) => await importTable(args),
  "export": async (args: any) => await exportTable(args),
}
const args = yargs
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
        } {
          throw new Error("Error: please specify an command --output <file> or -o <file> required.");
        }
      } else if (args["command"] === "import") {
        if (args["input"]) {
          return true;
        } {
          throw new Error("Error: please specify an command --input <file> or -i <file> required.");
        }
      } else if (args["command"] === "query") {
        return true
      } else {
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
  const result = await getCommand[args.command](args)
  console.log(result);
})();
