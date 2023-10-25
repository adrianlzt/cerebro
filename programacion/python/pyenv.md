https://github.com/pyenv/pyenv

Simple Python version management

Es como gvm, nvm, rvm, etc

# Install
pacman -S pyenv

echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.zshrc

Arrancar otra shell

Instalar una versión de python:
pyenv install 3.8.6


pyenv shims
Aqui ahora veremos "shims", que van a capturar las llamadas a python


Para poder usar python 3.8.6, por ejemplo, en un directorio, podemos hacer:
echo 3.8.6 > .python-version


# Debian
apt install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev python-openssl git

Instalar esto antes para tener un build "completo" de python.
