#!/bin/bash
set -ex # e - exit on error, x - print command before execution

npm ci
npm run build
