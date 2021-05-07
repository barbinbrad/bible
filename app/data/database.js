import { createDbWorker, } from "sql.js-httpvfs";

let store;

export class Store {
    constructor() {
        this.worker = null;
        this.error = "";

        if (typeof window === "undefined") {
            console.log('window is undefined');
            this.ready = Promise.reject("[server side]");
            this.ready.catch(() => {
                // ignore
            });
        }
        else {
            console.log('window is defined')
            Object.assign(window, { httpvfs: this });
            this.ready = this.init();
        }
    }
    async init() {
        const workerUrl = "/sqlite.worker.js"; // had to stuff these in the public folder
        const wasmUrl = "/sql-wasm.wasm";
        const dbUrl = '/bible.db';

        const config = {
            from: "inline",
            config: {
                serverMode: "full", // file is just a plain old full sqlite database
                requestChunkSize: 4096, // the page size of the  sqlite database (by default 4096)
                url: "bible.db" // url to the database (relative or full)
            }
        };

        this.worker = await createDbWorker(
            [config],
            workerUrl.toString(), wasmUrl.toString()
        );

        return this.worker;
    }
}

export function getStore() {
    if (!store)
        store = new Store();
    return store;
}

