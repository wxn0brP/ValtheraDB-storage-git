import type { DbDirOpts } from "@wxn0brp/db-storage-dir/types";
export interface GitAuthOpts {
    type: "token";
    token?: string;
    username?: string;
}
export interface GitManagerOpts {
    url: string;
    auth: GitAuthOpts;
    branch: string;
}
export interface FlusherOpts {
    delay: number;
    autoFlush: boolean;
}
export interface GitAdapterOpts {
    dir: string;
    git: GitManagerOpts;
    flusher?: Partial<FlusherOpts>;
    dirOpts?: DbDirOpts;
}
