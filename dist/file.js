import { FileActions, vFileCpu } from "@wxn0brp/db-storage-dir";
export class GitSnapshotActions extends FileActions {
    constructor(folder, options) {
        super(folder, options, vFileCpu);
    }
    async getCollections() {
        const all = await super.getCollections();
        return all.filter(c => !c.startsWith(".git"));
    }
}
