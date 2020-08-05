all:
	mkdir build
	cp -rf public/index.html build/index.html
	elm make src/Main.elm --output build/elm.js
	cp -rf assets build
clean:
	rm -rf build/