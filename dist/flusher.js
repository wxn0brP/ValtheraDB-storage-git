export class DebounceFlusher {
    opts;
    git;
    _timer = null;
    _pending = false;
    constructor(opts, git) {
        this.opts = opts;
        this.git = git;
    }
    trigger() {
        this._pending = true;
        if (!this.opts.autoFlush)
            return;
        if (this._timer)
            clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            this.flush();
        }, this.opts.delay);
    }
    async _flushFn() {
        const changed = this.git.hasChanged();
        if (!changed)
            return;
        await this.git.add();
        await this.git.commit(`SYN`);
        await this.git.push();
    }
    async flush() {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
        if (!this._pending)
            return;
        this._pending = false;
        await this._flushFn();
    }
    isPending() {
        return this._pending;
    }
}
