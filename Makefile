all: build

build: public/* src/* src/**/*
	bash scripts/build.sh

build-opt: public/* src/* src/**/*
	bash scripts/build-opt.sh

test:
	elm-test

.PHONY: clean
clean:
	rm -rf build/