import { GitSnapshotAdapter } from "./file.js";
import { DebounceFlusher } from "./flusher.js";
import { GitManager } from "./git.js";
import type { GitAdapterOpts } from "./types.js";
export declare function createGit(opts: GitAdapterOpts): Promise<{
    adapter: GitSnapshotAdapter;
    gitManager: GitManager;
    debounceFlusher: DebounceFlusher;
}>;
export declare function createGitAdapter(opts: GitAdapterOpts): Promise<GitSnapshotAdapter>;
export declare const DYNAMIC: {
    def: typeof createGitAdapter;
};
