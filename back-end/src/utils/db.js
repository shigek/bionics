"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDB = void 0;
const nedb_1 = __importDefault(require("@seald-io/nedb"));
const openDB = async (filename) => {
    const db = new nedb_1.default({ filename, autoload: true });
    await db.loadDatabaseAsync();
    return db;
};
exports.openDB = openDB;
