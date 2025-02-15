"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.readLine = exports.writeString = exports.writeJSON = void 0;
const fs_1 = __importDefault(require("fs"));
const writeJSON = (file, rows) => {
    const stream = fs_1.default.createWriteStream(file);
    for (const row of rows) {
        console.log(row);
        stream.write(JSON.stringify(row) + "\n");
    }
    // エラー処理
    stream.on("error", (err) => {
        if (err)
            console.log(err.message);
    });
};
exports.writeJSON = writeJSON;
const writeString = (file, rows) => {
    const stream = fs_1.default.createWriteStream(file);
    stream.write(rows + "\n");
    // エラー処理
    stream.on("error", (err) => {
        if (err)
            console.log(err.message);
    });
};
exports.writeString = writeString;
const readLine = (file) => {
    var text = fs_1.default.readFileSync(file, 'utf8');
    var lines = text.toString().split('\n');
    return lines;
};
exports.readLine = readLine;
const readFile = (file) => {
    var text = fs_1.default.readFileSync(file, 'utf8');
    return text;
};
exports.readFile = readFile;
