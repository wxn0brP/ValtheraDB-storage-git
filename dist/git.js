import { execFileSync } from "child_process";
import { mkdir, stat } from "fs/promises";
import { join } from "path";
export class GitManager {
    _opts;
    _dir;
    constructor(_opts, _dir) {
        this._opts = _opts;
        this._dir = _dir;
    }
    _configured = false;
    _getAuthUrl() {
        if (this._opts.auth.type === "token") {
            const token = this._opts.auth.token ?? process.env.GITHUB_TOKEN ?? "";
            const username = this._opts.auth.username ?? "git";
            if (this._opts.url.startsWith("https://")) {
                return this._opts.url.replace("https://", `https://${username}:${token}@`);
            }
        }
        return this._opts.url;
    }
    _run(args) {
        execFileSync("git", args, {
            cwd: this._dir,
            encoding: "utf8",
            stdio: [
                "pipe",
                "pipe",
                "pipe",
            ],
        });
    }
    async clone() {
        await mkdir(this._dir, {
            recursive: true,
        });
        try {
            await stat(join(this._dir, ".git"));
            return;
        }
        catch {
            // not initialized
        }
        const url = this._getAuthUrl();
        try {
            execFileSync("git", [
                "clone",
                "--branch",
                this._opts.branch,
                "--single-branch",
                url,
                ".",
            ], {
                cwd: this._dir,
                encoding: "utf8",
                stdio: [
                    "pipe",
                    "pipe",
                    "pipe",
                ],
            });
        }
        catch (err) {
            this._run([
                "init",
                "-b",
                this._opts.branch,
            ]);
            this._run([
                "remote",
                "add",
                "origin",
                url,
            ]);
        }
    }
    async pull() {
        try {
            this._run([
                "fetch",
                "origin",
                this._opts.branch,
            ]);
            this._run([
                "reset",
                "--hard",
                `origin/${this._opts.branch}`,
            ]);
        }
        catch { }
    }
    async add() {
        this._run([
            "add",
            ".",
        ]);
    }
    async commit(message) {
        if (!this._configured) {
            this._run([
                "config",
                "user.name",
                "ValtheraDB Git Adapter",
            ]);
            this._run([
                "config",
                "user.email",
                "valthera@noreply.local",
            ]);
            this._configured = true;
        }
        this._run([
            "commit",
            "-m",
            message,
        ]);
    }
    async push() {
        try {
            this._run([
                "push",
                "origin",
                this._opts.branch,
            ]);
        }
        catch {
            this._run([
                "push",
                "--force",
                "origin",
                this._opts.branch,
            ]);
        }
    }
    hasChanged() {
        const stdout = execFileSync("git", [
            "status",
            "--porcelain",
        ], {
            cwd: this._dir,
        });
        return stdout.length > 0;
    }
}
