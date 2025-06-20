# LazyVim

<https://github.com/LazyVim/LazyVim>

Parece bastante completo.
Permite intstalar un montón de plugins y configuraciones de forma sencilla.

Para cambiar el schema de colores, jugar con los de tokio:
:colorscheme XXX

## Keymaps

<https://www.lazyvim.org/keymaps>

Si presionamos

<leader>sk - para buscar en las keymaps, podemos usar su "description"

## plugins

Muchos ya vienen preparados en los "extras".
Mirar en :LazyExtras

## package manager, formatters, linters, etc

Usa mason.
Easily install and manage LSP servers, DAP servers, linters, and formatters.
:Mason

También se puede abrir con <leader>cm

Para actualizar todo: "C"

## diagnostics

Deshabilitarlas <leader>ud

## buscar

<leader><space> buscar ficheros
<leader>s cosas con fzf
<leader>sg grepear en el root
<leader>sG grepear en el cwd
<leader>ss saltar a una función, símbolo, etc

## Instalación

/home/adrian/.local/share/nvim/lazy/LazyVim

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

# Window popup

Usa <https://github.com/folke/noice.nvim> para mostrar "ventanas" dentro de neovim.

Para los keywords de noice buscar por "noice" o "notification"

space+n: histórico de notificaciones

# TODO

meter snippet ansible
comparar versus lunarvim
