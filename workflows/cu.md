# CU — Cleanup after CMPD

## Objective
Safely remove fully merged feature worktrees and branches after CMPD, then reclaim secondary local and VPS resources. Must not prune Docker images or resources belonging to other projects sharing the VPS.

## Preconditions
- The preceding CMPD completed and `origin/main` contains the feature work.
- Cleanup runs from the primary checkout (`/Users/jeffzeena/upsquad website/upsquad`).

## Steps

1. Fetch origin and inspect `git worktree list`, local branches merged into `main`, and matching remote branches.
2. Use a branch named by the user. Otherwise identify the most recently merged non-`main` branch that still has a worktree. If none exists, report that there is no branch/worktree cleanup target.
3. Verify the branch is present in both local `main` and `origin/main`:
   ```bash
   git merge-base --is-ancestor <branch> main
   git merge-base --is-ancestor <branch> origin/main
   ```
4. Inspect the target worktree's `git status --short`. Stop if it contains uncommitted or untracked changes.
5. List the exact worktree path, local branch, remote branch, and temporary files proposed for deletion. Ask for explicit confirmation before deleting any worktree or branch.
6. After confirmation:
   - Remove the clean worktree: `git worktree remove <worktree-path>`
   - Delete the local branch: `git branch -d <branch>`
   - Delete the remote branch if one exists: `git push origin --delete <branch>`
   - Run `git worktree prune`
7. Clean secondary resources (upon user confirmation):
   - Dangling UpSquad Docker images on the VPS:
     ```bash
     ssh root@72.61.245.97 'docker image prune -f --filter label=com.docker.compose.project=upsquad'
     ```
8. Report each removed item and the final clean status.

## Safety Rules
- Never use `git branch -D` or `git worktree remove --force`.
- Never delete an unmerged branch.
- Never run unfiltered `docker image prune -f` or `docker system prune -a`; the VPS is shared.
