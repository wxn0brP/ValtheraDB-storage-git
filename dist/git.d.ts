import type { GitManagerOpts } from "./types.js";
export declare class GitManager {
    _opts: GitManagerOpts;
    _dir: string;
    constructor(_opts: GitManagerOpts, _dir: string);
    _configured: boolean;
    _getAuthUrl(): string;
    _run(args: string[]): void;
    clone(): Promise<void>;
    pull(): Promise<void>;
    add(): Promise<void>;
    commit(message: string): Promise<void>;
    push(): Promise<void>;
    hasChanged(): Promise<boolean>;
}
