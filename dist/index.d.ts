import { GitSnapshotActions } from "./file.js";
import { DebounceFlusher } from "./flusher.js";
import { GitManager } from "./git.js";
import type { GitAdapterOpts } from "./types.js";
export declare function createGit(opts: GitAdapterOpts): Promise<{
    adapter: GitSnapshotActions;
    gitManager: GitManager;
    debounceFlusher: DebounceFlusher;
}>;
export declare function createGitAdapter(opts: GitAdapterOpts): Promise<GitSnapshotActions>;
export declare const DYNAMIC: {
    git: typeof createGitAdapter;
};
