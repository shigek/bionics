import yargs from 'yargs'

const getCommand: any = {
  "optimize": () => "optimize",
  "query": () => "query",
  "modify": () => "modify",
}

const args = yargs
  .command("* <command>", "print a message received as an argument")
  .options({
    capitalize: {
      type: "boolean",
      describe: "convert received messages to uppercase",
      demandOption: true,
      default: false,
    },
  })
  .parseSync();
console.log(getCommand[args.command]);