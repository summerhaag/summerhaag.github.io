#!/bin/bash
SHADER=$1
if [ -z "$SHADER" ]; then
  echo "Usage: npm run rebuild -- <shader-name>"
  echo "Example: npm run rebuild -- quad-dual"
  exit 1
fi
cd /Users/summerhaag/shaders && ./node_modules/.bin/shader build "$SHADER"
