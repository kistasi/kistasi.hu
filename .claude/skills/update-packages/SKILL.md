---
name: update-packages
description: Update all outdated npm dependencies to their latest versions, verify the build/lint pass, and commit the result. Use when the user wants to bump packages, update dependencies, or upgrade to latest.
---

# Update Packages

Bump every outdated dependency in `package.json` to its latest published version, verify nothing breaks, and commit.

## Steps

1. **Check what's outdated.** Run `yarn outdated`. This exits non-zero when there are outdated packages — that is expected, not a failure. Parse the table to get each outdated package name together with the exact version in its **Latest** column. If nothing is outdated, stop and tell the user there is nothing to update.

2. **Pin each outdated package to its `Latest` version in `package.json`.** For every package listed by `yarn outdated`, edit its version string in `package.json` (in both `dependencies` and `devDependencies` as applicable) to the exact version number shown in that package's **Latest** column — not the string `"latest"`. Only touch packages that actually appeared in the `yarn outdated` output — leave everything else unchanged. Keep the existing version-prefix style of this repo (e.g. if versions are pinned exactly with no `^`, write the bare version number).

3. **Apply the changes.** Run `yarn` to update `yarn.lock` to match the new versions in `package.json`.

4. **Verify.** Run `yarn build` and `yarn lint`. Both must succeed. If either fails:
   - Read the error output and try to fix it (e.g. a breaking change in an upgraded package).
   - If a specific package's new major version is the cause and the fix is non-trivial, report it to the user and ask how to proceed rather than silently downgrading.
   - Do not commit while the build or lint is broken.

5. **Commit.** Stage `package.json` and `yarn.lock` and commit with a message like `update packages`. Match the style of recent commits in this repo (lowercase, terse). Do not push unless the user asks.

## Notes

- Run the commands from the project root.
- `yarn outdated` returning a non-zero exit code is normal when updates exist; do not treat it as an error.
- Keep the user informed of which packages were bumped and to what versions.
