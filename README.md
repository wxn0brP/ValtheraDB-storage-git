# @wxn0brp/db-storage-git

Git-backed storage for [ValtheraDB](https://github.com/wxn0brP/ValtheraDB).
The adapter stores database files in a Git repository.

## Install

```sh
bun add @wxn0brp/db-storage-git
```

The package requires Git to be installed and available as `git` on the system path.

## Usage

```ts
import { createGitAdapter } from "@wxn0brp/db-storage-git";
import { ValtheraClass } from "@wxn0brp/db-core";

const adapter = createGitAdapter({
  dir: "./data",
  git: {
    url: "https://github.com/example/my-database.git",
    branch: "master",
    auth: {
      type: "token",
      username: "git",
      token: process.env.GITHUB_TOKEN,
    },
  },
  flusher: {
    delay: 10_000,
    autoFlush: true,
  },
});
const db = new ValtheraClass({ adapter });

await db.add({
  collection: "users",
  data: { name: "Ada" },
});

// Commit and push pending changes immediately.
await db.close();
```

## Synchronization behavior

When the adapter starts, it initializes the local worktree, clones the configured branch if needed, pulls the latest commit.
Database events mark the flusher as pending. A flush stages changes, creates a commit, and pushes it to the configured branch.

If a normal push fails, the adapter retries with a force push. Use a dedicated branch and repository when other writers may update the same branch.

## License

MIT
