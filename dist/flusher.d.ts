import { GitManager } from "./git.js";
import type { FlusherOpts } from "./types.js";
export declare class DebounceFlusher {
    opts: FlusherOpts;
    git: GitManager;
    _timer: ReturnType<typeof setTimeout>;
    _pending: boolean;
    constructor(opts: FlusherOpts, git: GitManager);
    trigger(): void;
    _flushFn(): Promise<void>;
    flush(): Promise<void>;
    isPending(): boolean;
}
