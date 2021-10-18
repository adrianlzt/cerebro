https://crispgm.com/page/neovim-is-overpowering.html

Plugins modernos para nvim 0.5.0
mirar:
treesitter.md
packer.md
lsp.md
lua.md

Parece que los plugins, etc se instalan en /home/adrian/.local/share/nvim

hace falta AUR/nvim-packer-git
Y ejecutar
:PackerSync

Usando la config lua de
https://github.com/crispgm/dotfiles/tree/main/nvim



# Mappings
Control+_  comentar línea/líneas

,R activar relative numbering
,n desactivar numbering


# Snippets



# Navegar
phaazon/hop.nvim
saltar a cualquier parte
control+h



# Mejoras
el autocompletado no me coje palabras cualesqueira de los buffers abiertos. Esto me parece super útil


# Plugins
https://github.com/wincent/ferret
reemplazar en varios ficheros


# Cazando al plugin lento
Cambiando el filetype a uno "desconocido" acelera todo.
Será el tresiteter? El LSP?

Quitando el highligth del treesitter va mucho más rápido:
:TSDisableAll highlight

Pero incluso cambiando el ft a none, tampoco va del todo fino.

Da igual con o sin tmux

Al abrir el tagbar parece que se ralentiza mucho más
