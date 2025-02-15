"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const create_1 = require("./subcontroller/create");
const optimize_1 = require("./subcontroller/optimize");
const extract_1 = require("./subcontroller/extract");
const translate_1 = require("./subcontroller/translate");
const check_1 = require("./subcontroller/check");
const view_1 = require("./subcontroller/view");
const getCommand = {
    "check": async (args) => await (0, check_1.check)(args),
    "create": async (args) => await (0, create_1.create)(args),
    "extract": async (args) => await (0, extract_1.extract)(args),
    "optimize": async (args) => await (0, optimize_1.optimize)(args),
    "translate": async (args) => await (0, translate_1.translate)(args),
    "view": async (args) => await (0, view_1.view)(args),
};
const MainController = async (args) => {
    return getCommand[args.command](args);
};
exports.MainController = MainController;
