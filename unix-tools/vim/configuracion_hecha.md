# LazyVim

<https://github.com/LazyVim/LazyVim>

Parece bastante completo.
Permite intstalar un montón de plugins y configuraciones de forma sencilla.

Para cambiar el schema de colores, jugar con los de tokio:
:colorscheme XXX

# lunarvim

<https://www.lunarvim.org/#opinionated>

LunarVim is an opinionated, extensible, and fast IDE layer for Neovim >= 0.5.0.

Neovim preconfigurado

~/.local/share/lunarvim/lvim
~/.local/bin/lvim

La config en
~/.config/lvim

Para entrar
lvim

Para actualizar
:LvimUpdate

# NvChad

<https://github.com/NvChad/NvChad>

Instalamos clonando el repo en .config/nvim
Tras arrancar abrimos el Mason installer para terminar de instalar lo que queramos.

Cosas que he instalado la primera vez, sin pensar demasiado
yapf
yamllint
yamlfmt
sqls
yaml-language-server
vim-language-server
sqlls
terraform-ls
sqlfmt
shellharden
shellcheck
rust-analyzer
ruff-lsp
ruff
python-lsp-server
pyright
mypy
misspell
markdownlint
grammarly-languageserver
jsonlint
json-lsp
jq-lsp
jq
helm-ls
gotests
gopls
golangci-lint-langserver
flake8
eslint-lsp
docker-compose-language-service
dockerfile-language-server
commitlint
basedpyright
awk-language-server
bash-language-server
bash-debug-adapter
autopep8
autoflake
ansible-lint
ansible-language-server
lua-language-server
stylua

Luego he metido en plugins unos cuantos ficheros lua sacados de
<https://github.com/LazyVim/LazyVim/tree/main/lua/lazyvim/plugins/extras>

ansible.lua
copilot-chat.lua
copilot.lua
docker.lua
git.lua
go.lua
helm.lua
json.lua
markdown.lua
python.lua
sql.lua
terraform.lua
toml.lua
typescript.lua
yaml.lua

Esto no vale, los he sacado de un repo que se llama LazyVim, pero que es ya una distro de neovim.

## Ver mappings

:NvCheatsheet
:Telescope keymaps

## Cambiar theme

<leader> + th

Suelo usar los ayu themes.

## Change leader

Modificar ~/.config/nvim.nvchad/init.lua
vim.g.mapleader = ","

## Configuraciones

Creo que nuestra customización va en:
~/.config/nvim.nvchad/lua/options.lua

# TODO

meter snippet ansible
comparar versus lunarvim
