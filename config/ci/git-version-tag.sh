#!/bin/bash
set -ex # e - exit on error, x - print command before execution

git fetch --prune --prune-tags --tags

CURRENT_BRANCH=$(git branch --show-current)

{
  LAST_TAG=$(git describe --abbrev=0 --tags)
} || {
  LAST_TAG="empty"
  FIRST_TAG="0.0.1"

  git tag $FIRST_TAG
  echo "Tagged with $FIRST_TAG"
  git push --tags
}

if [ "$CURRENT_BRANCH" == "master" ] && [ "$LAST_TAG" != "empty" ]; then
  VERSION_BITS=(${LAST_TAG//./ })

  VNUM1=${VERSION_BITS[0]}
  VNUM2=${VERSION_BITS[1]}
  VNUM3=${VERSION_BITS[2]}
  VNUM3=$((VNUM3 + 1))

  LAST_TAG_COMMIT_HASH=$(git rev-list -n 1 $LAST_TAG)
  LAST_COMMIT_HASH=$(git rev-parse HEAD)

  if [ "$LAST_TAG_COMMIT_HASH" == "$LAST_COMMIT_HASH" ]; then
    echo "Already a tag on this commit"
  else
    NEW_TAG="$VNUM1.$VNUM2.$VNUM3"
    git tag $NEW_TAG
    echo "Tagged with $NEW_TAG"
    git push --tags
  fi
else
  echo "Branch isn't master"
  echo "$CURRENT_BRANCH"
fi
