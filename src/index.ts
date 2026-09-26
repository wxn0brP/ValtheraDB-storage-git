import { GitSnapshotActions } from "./file";
import { DebounceFlusher } from "./flusher";
import { GitManager } from "./git";
import type { GitAdapterOpts } from "./types";

export async function createGit(opts: GitAdapterOpts) {
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

	const originalRemoveCollection = adapter.removeCollection.bind(adapter);
	adapter.removeCollection = async (collection: string) => {
		const result = await originalRemoveCollection(collection);
		debounceFlusher.trigger();
		return result;
	};

	const originalClose = adapter.close.bind(adapter);
	adapter.close = async () => {
		if (interval) clearInterval(interval);
		await debounceFlusher.flush();
		await originalClose();
	};

	let interval: ReturnType<typeof setInterval> = null;
	if (flusherOpts.autoFlush) {
		interval = setInterval(() => {
			debounceFlusher.trigger();
		}, flusherOpts.delay);
	}

	return {
		adapter,
		gitManager,
		debounceFlusher,
	};
}

export async function createGitAdapter(opts: GitAdapterOpts) {
	const { adapter } = await createGit(opts);
	return adapter;
}

export const DYNAMIC = {
	git: createGitAdapter,
};
