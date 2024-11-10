import fs from "fs";
import * as nedb from "./db";
import * as f from "./file";
import Nedb from "@seald-io/nedb";
export const importTable = async (args: any) => {
    const file = args["input"];
    deleteTable(args["db"]);
    const db = nedb.openDB(args["db"]);
    for (const line of f.readLine(file)) {
        if (line.length === 0) {
            break;
        }
        await (await db).insertAsync(JSON.parse(line.replace("\n", "")));
    }
    return true;
}
export const exportTable = async (args: any) => {
    const file = args["output"];
    const documents = await findTable(args);
    f.writeJSON(file, documents);
    return true;
}
export const findTable = async (args: any) => {
    const db = await nedb.openDB(args["db"]);
    const cursor = db.findAsync(JSON.parse(args["condition"]))
    const document = await cursor.execAsync();
    return document;
}
export const findOne = async (db: Promise<Nedb<Record<string, any>>>, args: any) => {
    const cursor = (await db).findAsync(JSON.parse(args["condition"]))
    const document = await cursor.execAsync();
    return document[0];
}

export const deleteTable = (file: string) => {
    fs.unlink(file, err => {
        if (err) return false;
        return true;
    });
}
