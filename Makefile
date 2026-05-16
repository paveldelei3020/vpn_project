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

# --- РАБОТА С GIT ---

# Пример: make push m="описание фичи"
push:
	$(GIT) add .
	$(GIT) commit -m "$(m)"
	$(GIT) push

pull:
	$(GIT) pull

# --- ОЧИСТКА И ПЕРЕУСТАНОВКА ---

# Полная переустановка зависимостей
reinstall: clean install

# Удаление node_modules и билда
clean:
	rm -rf dist node_modules package-lock.json
	@echo "Очистка завершена. Используйте 'make install' для восстановления."

# Информация о версиях ПО
info:
	@echo "Node version:" && node -v
	@echo "NPM version:" && $(NPM) -v
	@echo "Git version:" && $(GIT) --version

# --- ЛИНТЕР (ESLint) ---

# Проверка кода на ошибки
lint:
	npx eslint "src/**/*.{js,jsx}"

# Автоматическое исправление ошибок стиля
lint-fix:
	npx eslint "src/**/*.{js,jsx}" --fix

# --- СПРАВКА ---
help:
	@echo "Доступные команды:"
	@echo "  make install     - Установить зависимости"
	@echo "  make dev         - Запустить сервер разработки"
	@echo "  make build       - Собрать проект для продакшена"
	@echo "  make lint        - Проверить код линтером"
	@echo "  make lint-fix    - Исправить ошибки линтером автоматически"
	@echo "  make push m='msg'- Добавить изменения, закоммитить и запушить в Git"
	@echo "  make clean       - Удалить зависимости и папку сборки"
	@echo "  make info        - Показать версии установленного ПО"