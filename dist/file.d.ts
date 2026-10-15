import { FileActions } from "@wxn0brp/db-storage-dir";
import type { DbDirOpts } from "@wxn0brp/db-storage-dir/types";
export declare class GitSnapshotActions extends FileActions {
    version: string;
    capabilities: {
        transactions: boolean;
        indexes: boolean;
        persistent: boolean;
    };
    constructor(folder: string, options: DbDirOpts);
    getCollections(): Promise<string[]>;
}
