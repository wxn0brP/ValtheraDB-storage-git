import { GitSnapshotActions } from "./file.js";
import type { GitAdapterOpts } from "./types.js";
export declare function createGitAdapter(opts: GitAdapterOpts): Promise<GitSnapshotActions>;
export declare const DYNAMIC: {
    git: typeof createGitAdapter;
};
