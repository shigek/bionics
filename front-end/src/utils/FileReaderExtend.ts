class FileReaderExtend extends FileReader {
    // constructor() {
    //     super();
    // }

    #readAs(blob: Blob, ctx: any) {
        return new Promise((res, rej) => {
            super.addEventListener("load", ({ target }) => res(target?.result));
            super.addEventListener("error", ({ target }) => rej(target?.error));
            if (ctx === "readAsArrayBuffer") {
                super.readAsArrayBuffer(blob);
            } else if (ctx === "readAsDataURL") {
                super.readAsDataURL(blob);
            } else {
                super.readAsText(blob);
            }
        });
    }

    readAsArrayBuffer(blob: Blob) {
        return this.#readAs(blob, "readAsArrayBuffer");
    }

    readAsDataURL(blob: Blob) {
        return this.#readAs(blob, "readAsDataURL");
    }

    readAsText(blob: Blob) {
        return this.#readAs(blob, "readAsText");
    }
}
export default FileReaderExtend;