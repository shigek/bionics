"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTable = exports.findOne = exports.findTable = exports.exportTable = exports.importTable = void 0;
const fs_1 = __importDefault(require("fs"));
const nedb = __importStar(require("./db"));
const f = __importStar(require("./file"));
const importTable = async (args) => {
    const file = args["input"];
    (0, exports.deleteTable)(args["db"]);
    const db = nedb.openDB(args["db"]);
    for (const line of f.readLine(file)) {
        if (line.length === 0) {
            break;
        }
        await (await db).insertAsync(JSON.parse(line.replace("\n", "")));
    }
    return true;
};
exports.importTable = importTable;
const exportTable = async (args) => {
    const file = args["output"];
    const documents = await (0, exports.findTable)(args);
    f.writeJSON(file, documents);
    return true;
};
exports.exportTable = exportTable;
const findTable = async (args) => {
    const db = await nedb.openDB(args["db"]);
    const cursor = db.findAsync(JSON.parse(args["condition"]));
    const document = await cursor.execAsync();
    return document;
};
exports.findTable = findTable;
const findOne = async (db, args) => {
    const cursor = (await db).findAsync(JSON.parse(args["condition"]));
    const document = await cursor.execAsync();
    return document[0];
};
exports.findOne = findOne;
const deleteTable = (file) => {
    fs_1.default.unlink(file, err => {
        if (err)
            return false;
        return true;
    });
};
exports.deleteTable = deleteTable;
