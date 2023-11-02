all: build-opt

build:
	bash scripts/build.sh

build-opt:
	bash scripts/build-opt.sh

.PHONY: clean
clean:
	rm -rf build/