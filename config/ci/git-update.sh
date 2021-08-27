#!/bin/bash
set -ex # e - exit on error, x - print command before execution

echo "git-update"

git fetch --all
git reset --hard origin/master
git pull
