all: build

build: public/* src/* src/**/*
	bash scripts/build.sh

build-opt: public/* src/* src/**/*
	bash scripts/build-opt.sh

.PHONY: clean
clean:
	rm -rf build/