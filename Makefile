# ����������
NPM = npm
GIT = git

# --- �������� ������� ---

install:
	npm install

dev:
	npm run dev

build:
	$(NPM) run build

# --- ������ � GIT (�������� �������) ---

# ������� ���: make push m="���� �����������"
push:
	$(GIT) add .
	$(GIT) commit -m "$(m)"
	$(GIT) push

# �������� ������ �� �����������
pull:
	$(GIT) pull

# --- ������� � ������������ ---

# ������ ������������� (���� ������ ����� �������)
reinstall: clean install

# �������� ������� (node_modules � ����� ������)
clean:
	rm -rf dist node_modules package-lock.json
	@echo "������ ������. ��������� 'make install' ��� ��������������."

# �������� ������ ����� (������� ��� ������)
info:
	@echo "Node version:" && node -v
	@echo "NPM version:" && $(NPM) -v
	@echo "Git version:" && $(GIT) --version

# --- ������� ---
help:
	@echo "��������� �������:"
	@echo "  make install  - ���������� �����������"
	@echo "  make dev      - ��������� ������ ����������"
	@echo "  make push m='msg' - �������� ��� �����, ����������� � ��������� � Git"
	@echo "  make clean    - ������� ����������� � ������"
	@echo "  make info     - �������� ������ �������������� ��"