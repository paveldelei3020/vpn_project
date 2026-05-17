# Переменные
NPM = npm
GIT = git

.PHONY: install dev build push pull reinstall clean info lint lint-fix help


# Установить зависимости в обе папки и корень
install:
	cd frontend && $(NPM) install
	cd backend && $(NPM) install
	$(NPM) install concurrently --save-dev

dev:
	npx concurrently --kill-others --prefix "[{name}]" --names "FRONT,BACK" "npx concurrently -C frontend \"vite --clearScreen false\"" "node backend/server.js"

# Сборка фронтенда
build:
	cd frontend && $(NPM) run build

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

# Удаление node_modules и билдов во всех папках
clean:
	rm -rf node_modules package-lock.json
	rm -rf frontend/node_modules frontend/dist frontend/package-lock.json
	rm -rf backend/node_modules backend/package-lock.json
	@echo "Очистка завершена. Используйте 'make install' для восстановления."

# Информация о версиях ПО
info:
	@echo "Node version:" && node -v
	@echo "NPM version:" && $(NPM) -v
	@echo "Git version:" && $(GIT) --version

# --- ЛИНТЕР (ESLint) ---

# Проверка кода на ошибки внутри фронтенда
lint:
	cd frontend && npx eslint "src/**/*.{js,jsx}"

# Автоматическое исправление ошибок стиля во фронтенде
lint-fix:
	cd frontend && npx eslint "src/**/*.{js,jsx}" --fix

# --- СПРАВКА ---
help:
	@echo "Доступные команды:"
	@echo "  make install     - Установить зависимости (Frontend + Backend)"
	@echo "  make dev         - Запустить сервер разработки и бэкенд вместе"
	@echo "  make build       - Собрать фронтенд для продакшена"
	@echo "  make lint        - Проверить код линтером"
	@echo "  make lint-fix    - Исправить ошибки линтером автоматически"
	@echo "  make push m='msg'- Добавить изменения, закоммитить и запушить в Git"
	@echo "  make clean       - Удалить все зависимости и папки сборки"
	@echo "  make info        - Показать версии установленного ПО"