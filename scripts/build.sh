#!/usr/bin/env bash

set -e

js="build/elm.js"

mkdir -p build

cp -rf public/* build/

elm make --output=$js src/Main.elm

cp -rf assets build/