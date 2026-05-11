# Переменные
NPM = npm
GIT = git

# --- ОСНОВНЫЕ КОМАНДЫ ---

install:
	$(NPM) install

dev:
	npx vite --clearScreen false

build:
	$(NPM) run build

# --- РАБОТА С GIT (Упрощаем коммиты) ---

# Быстрый пуш: make push m="Твой комментарий"
push:
	$(GIT) add .
	$(GIT) commit -m "$(m)"
	$(GIT) push

# Обновить проект из репозитория
pull:
	$(GIT) pull

# --- ОЧИСТКА И ОБСЛУЖИВАНИЕ ---

# Полная переустановка (если проект начал глючить)
reinstall: clean install

# Удаление лишнего (node_modules и папка сборки)
clean:
	rm -rf dist node_modules package-lock.json
	@echo "Проект очищен. Запустите 'make install' для восстановления."

# Проверка версии софта (полезно для отчета)
info:
	@echo "Node version:" && node -v
	@echo "NPM version:" && $(NPM) -v
	@echo "Git version:" && $(GIT) --version

# --- СПРАВКА ---
help:
	@echo "Доступные команды:"
	@echo "  make install  - Установить зависимости"
	@echo "  make dev      - Запустить сервер разработки"
	@echo "  make push m='msg' - Добавить все файлы, закоммитить и отправить в Git"
	@echo "  make clean    - Удалить зависимости и сборку"
	@echo "  make info     - Показать версии установленного ПО"