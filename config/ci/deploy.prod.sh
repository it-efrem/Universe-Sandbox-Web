#!/bin/bash
set -ex # e - exit on error, x - print command before execution

echo "deploy.prod"

cd \[JS\ web-version\]/
rm -rf build/

npm ci
npm run build
