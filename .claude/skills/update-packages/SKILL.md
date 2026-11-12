---
name: update-packages
description: Update all outdated npm dependencies to their latest versions, verify the build/lint pass, and commit the result. Use when the user wants to bump packages, update dependencies, or upgrade to latest.
---

# Update Packages

Bump every outdated dependency in `package.json` to its latest published version, verify nothing breaks, and commit.

## Steps

1. **Check what's outdated.** This project uses Yarn 4, which has no `yarn outdated` command. Instead, fetch the latest published version of every package in `dependencies` and `devDependencies` with a single call:
   `yarn npm info <pkg1> <pkg2> ... --fields name,version --json`
   This prints one JSON object per line (`{"name":"next","version":"16.4.6"}`). Compare each `version` with the one in `package.json`; a package is outdated when they differ. If nothing is outdated, stop and tell the user there is nothing to update.

2. **Pin each outdated package to its `Latest` version in `package.json`.** For every outdated package, edit its version string in `package.json` (in both `dependencies` and `devDependencies` as applicable) to the exact latest version number — not the string `"latest"`. Only touch packages that are actually outdated — leave everything else unchanged. Keep the existing version-prefix style of this repo (e.g. if versions are pinned exactly with no `^`, write the bare version number).

3. **Apply the changes.** Run `yarn install` to update `yarn.lock` to match the new versions in `package.json`.

4. **Verify.** Run `yarn build` and `yarn lint`. Both must succeed. If either fails:
   - Read the error output and try to fix it (e.g. a breaking change in an upgraded package).
   - If a specific package's new major version is the cause and the fix is non-trivial, report it to the user and ask how to proceed rather than silently downgrading.
   - Do not commit while the build or lint is broken.

5. **Commit.** Stage `package.json` and `yarn.lock` and commit with a message like `update packages`. Match the style of recent commits in this repo (lowercase, terse). Do not push unless the user asks.

## Notes

- Run the commands from the project root.
- Peer-dependency warnings (YN0060/YN0086) during `yarn install` are informational; only act on them if the build or lint fails.
- Keep the user informed of which packages were bumped and to what versions.
