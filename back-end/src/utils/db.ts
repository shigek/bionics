import Datastore from "@seald-io/nedb";
export const openDB = async (filename: string) => {
    const db = new Datastore({ filename, autoload: true });
    await db.loadDatabaseAsync()
    return db;
}
