#!/bin/bash

set -o errexit -o nounset

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
  echo "Skipping release because this is a pull request"
  exit 0
fi
if [[ "$TRAVIS_BRANCH" != "master" && "$TRAVIS_TAG" == "" ]]; then
  echo "Skipping release because this is not the master branch or a tag"
  exit 0
fi

RELEASE_ENV="dev"
if [[ "$TRAVIS_TAG" != "" ]]; then
  RELEASE_ENV="prd"
fi

echo "Releasing $RELEASE_ENV"

mkdir release
# Figure this out later
# cd src/
# demeteorizer -o ./release
cp -rf src/. ./release

cd release

git init
git config user.name "CI"
git config user.email "CI@github.com"

git remote add upstream "https://$GH_TOKEN@github.com/Zywave/Retrospectre.git"
git fetch upstream
git reset upstream/release-$RELEASE_ENV

touch .

git add -A .
git commit -m "CI"
git push -q upstream HEAD:release-$RELEASE_ENV
