#!/usr/bin/env bash

set -e

js="build/elm.js"

mkdir -p build

cp -r public/index.html build/
elm make --output=$js src/Main.elm

cp -rf assets build