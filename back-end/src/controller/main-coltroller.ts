import { create } from "./subcontroller/create"
import { optimize } from "./subcontroller/optimize"
import { extract } from "./subcontroller/extract"
import { translate } from "./subcontroller/translate"
import { check } from "./subcontroller/check"
import { view } from "./subcontroller/view"

type Command = {
    [key: string]: any
}
const getCommand: Command = {
    "check": async (args: any) => await check(args),
    "create": async (args: any) => await create(args),
    "extract": async (args: any) => await extract(args),
    "optimize": async (args: any) => await optimize(args),
    "translate": async (args: any) => await translate(args),
    "view": async (args: any) => await view(args),
}

export const MainController = async (args: any) => {
    return getCommand[args.command](args);
}