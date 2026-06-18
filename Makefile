.PHONY: dev build clean install

PORT ?= 3000

install:
	bun install

dev:
	bunx next dev -p $(PORT) -H 127.0.0.1

build:
	bunx next build

clean:
	rm -rf .next node_modules
