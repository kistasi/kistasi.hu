---
name: update-packages
description: Update all outdated npm dependencies to their latest versions, verify the build/lint pass, and commit the result. Use when the user wants to bump packages, update dependencies, or upgrade to latest.
---

# Update Packages

Bump every outdated dependency in `package.json` to its latest published version, verify nothing breaks, and commit.

## Steps

1. **Check what's outdated.** Run `yarn outdated`. This exits non-zero when there are outdated packages — that is expected, not a failure. Parse the table to get the list of package names that have a newer version available. If nothing is outdated, stop and tell the user there is nothing to update.

2. **Set each outdated package to `latest` in `package.json`.** For every package listed by `yarn outdated`, edit its version string in `package.json` (in both `dependencies` and `devDependencies` as applicable) to `"latest"`. Only touch packages that actually appeared in the `yarn outdated` output — leave everything else unchanged.

3. **Apply the changes.** Run `yarn`. This resolves `latest` to concrete versions and updates `yarn.lock`. After it completes, the `"latest"` strings in `package.json` will have been pinned back to real version numbers by yarn — that is fine and expected.

4. **Verify.** Run `yarn build` and `yarn lint`. Both must succeed. If either fails:
   - Read the error output and try to fix it (e.g. a breaking change in an upgraded package).
   - If a specific package's new major version is the cause and the fix is non-trivial, report it to the user and ask how to proceed rather than silently downgrading.
   - Do not commit while the build or lint is broken.

5. **Commit.** Stage `package.json` and `yarn.lock` and commit with a message like `update packages`. Match the style of recent commits in this repo (lowercase, terse). Do not push unless the user asks.

## Notes

- Run the commands from the project root.
- `yarn outdated` returning a non-zero exit code is normal when updates exist; do not treat it as an error.
- Keep the user informed of which packages were bumped and to what versions.
