import { FileActions, vFileCpu } from "@wxn0brp/db-storage-dir";
import { version } from "./version.js";
export class GitSnapshotActions extends FileActions {
    version = version;
    capabilities = {
        transactions: true,
        indexes: false,
        persistent: true,
    };
    constructor(folder, options) {
        super(folder, options, vFileCpu);
    }
    async getCollections() {
        const all = await super.getCollections();
        return all.filter(c => !c.startsWith(".git"));
    }
}
