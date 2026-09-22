import { GitSnapshotActions } from "./file.js";
import { DebounceFlusher } from "./flusher.js";
import { GitManager } from "./git.js";
export async function createGitAdapter(opts) {
    const { dir, git, flusher } = opts;
    const adapter = new GitSnapshotActions(dir, opts.dirOpts ?? {});
    const gitManager = new GitManager(git, dir);
    await adapter.init();
    await gitManager.clone();
    await gitManager.pull();
    const flusherOpts = {
        delay: flusher?.delay ?? 10000,
        autoFlush: flusher?.autoFlush ?? true,
    };
    const debounceFlusher = new DebounceFlusher(flusherOpts, gitManager);
    const originalClose = adapter.close.bind(adapter);
    adapter.close = async () => {
        if (interval)
            clearInterval(interval);
        await debounceFlusher.flush();
        await originalClose();
    };
    let interval = null;
    if (flusherOpts.autoFlush) {
        interval = setInterval(() => {
            debounceFlusher.trigger();
        }, flusherOpts.delay);
    }
    return adapter;
}
export const DYNAMIC = {
    git: createGitAdapter,
};
