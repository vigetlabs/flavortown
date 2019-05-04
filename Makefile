MAKEFLAGS += '-j 8'

SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=lib/%.js)
MORPH = $(wildcard lib/*.jpg)
ASCII = $(MORPH:lib/%.jpg=lib/%.txt)

FRAMES = 50

flavor: build asciify
	node lib/index.js $(FRAMES)

build: $(LIB)

morph: res/input.jpg res/output.jpg
	convert res/input.jpg res/output.jpg -morph $(FRAMES) lib/morph.jpg

asciify: morph $(ASCII)

lib/%.txt: lib/%.jpg
	jp2a --width=256 $< > $@

lib/%.js: src/%.js package.json
	mkdir -p $(@D)
	node_modules/.bin/babel $< -o $@

clean:
	rm -rf lib/*