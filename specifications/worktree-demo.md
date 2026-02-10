# Git Worktree Intro

```bash
###############################################################################
# 0) Start in an empty folder (or create one)
###############################################################################

# Create a clean demo area and enter it
mkdir -p git-worktree-demo
cd git-worktree-demo

###############################################################################
# 1) Create a new repository and a first commit on main
###############################################################################

# Make the "main" repo directory
mkdir repo
cd repo

# Initialize a new git repository
git init

# Ensure we are on a branch named "main" (some systems default to "master")
git checkout -b main

# Create a simple file and commit it
echo "Hello from main (v1)" > app.txt
git add app.txt
git commit -m "Initial commit on main"

# Show current state
git status
git log --oneline --decorate -n 5

###############################################################################
# 2) Show the current worktree list (just one, the main working directory)
###############################################################################

git worktree list

###############################################################################
# 3) Create a second worktree for a feature branch
###############################################################################

# Move back to the demo root so the worktree folder sits next to "repo"
cd ..

# Add a new worktree in ../git-worktree-demo/wt-feature
# -b creates a new branch and checks it out in that new directory.
git -C repo worktree add ../wt-feature -b feature/greeting

# List worktrees again: now we have two working directories attached to the same repo
git -C repo worktree list

###############################################################################
# 4) Make a change in the feature worktree and commit it
###############################################################################

cd wt-feature

# We are on the feature branch in this worktree
git branch --show-current

# Edit the file in the feature worktree
echo "Hello from feature branch" >> app.txt

# Commit the change on the feature branch
git add app.txt
git commit -m "Add feature greeting"

# Show the commit graph from the feature worktree
git log --oneline --decorate --graph -n 10

###############################################################################
# 5) Compare with main worktree: file content differs
###############################################################################

# Go back to the main worktree (the original repo folder)
cd ../repo

# Confirm we're on main here
git branch --show-current

# app.txt on main does NOT include the feature line (yet)
cat app.txt

# But both worktrees share the same underlying repository data:
# main can "see" the feature branch commits in the graph
git log --oneline --decorate --graph --all -n 15

###############################################################################
# 6) Merge feature into main (from the main worktree)
###############################################################################

# Merge the feature branch into main
git merge --no-ff feature/greeting -m "Merge feature/greeting into main"

# Now app.txt on main includes the feature line
cat app.txt

# Show history after merge
git log --oneline --decorate --graph --all -n 20

###############################################################################
# 7) Add a third worktree at a specific commit (detached HEAD)
###############################################################################

# Create an "investigation" worktree at the very first commit
# This checks out a commit directly (detached HEAD), useful for debugging/bisecting.
cd ..
FIRST_COMMIT="$(git -C repo rev-list --max-parents=0 HEAD)"
echo "First commit is: $FIRST_COMMIT"

git -C repo worktree add ../wt-investigate "$FIRST_COMMIT"

# Show all worktrees
git -C repo worktree list

# Look at the file in the detached worktree (it should be the original version)
cd wt-investigate
git status
git rev-parse --short HEAD
cat app.txt

###############################################################################
# 8) Demonstrate the "one branch cannot be checked out twice" rule
###############################################################################

# Try to check out the same branch (main) into another worktree directory.
# This should fail because main is already checked out in ./repo.
cd ..
git -C repo worktree add ../wt-main-again main

# The failure is expected and demonstrates:
# typically, a branch can be checked out in only one worktree at a time.

###############################################################################
# 9) Clean up: remove extra worktrees safely
###############################################################################

# Remove the investigation worktree (detached commit worktree)
git -C repo worktree remove ../wt-investigate

# Remove the feature worktree folder
git -C repo worktree remove ../wt-feature

# Show worktrees again (should be back to only ./repo)
git -C repo worktree list

###############################################################################
# 10) Optional: prune stale metadata (useful if a worktree dir was deleted manually)
###############################################################################

git -C repo worktree prune
```
