#!/usr/bin/env bash

set -e

js="build/elm.js"
minjs="build/elm.min.js"

mkdir -p build

cp -r public/index.html build/
elm make --optimize --output=$js src/Main.elm
uglifyjs $js --compress "pure_funcs=[F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9],pure_getters,keep_fargs=false,unsafe_comps,unsafe" | uglifyjs --mangle -o $minjs

printf "Init size: %-6s bytes ($js)\n" $(cat $js | wc -c)
printf "Mini size: %-6s bytes ($minjs)\n" $(cat $minjs | wc -c)
printf "Gzip size: %-6s bytes\n" $(cat $minjs | gzip -c | wc -c)

cp -rf assets build