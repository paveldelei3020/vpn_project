NPM = npm
GIT = git

install:
	$(NPM) install

dev:
	$(NPM) run dev

build:
	$(NPM) run build

push:
	$(GIT) add .
	$(GIT) commit -m "$(m)"
	$(GIT) push

info:
	@echo "Node version:" && node -v
	@echo "Git version:" && $(GIT) --version
