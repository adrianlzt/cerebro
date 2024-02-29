https://github.com/nvim-treesitter/nvim-treesitter

Plugin para neovim >= 0.5.0 para parsear lenguajes.
Es el que gestiona el coloreado, movernos por funciones, etc.

Instalar con plug:
Plug 'nvim-treesitter/nvim-treesitter', {'do': ':TSUpdate'}


:TSInstallInfo
  ver que lenguajes podemos instalar

:TSInstall {language}
  instalar un lenguaje
  funciona "tab" para autoexpansión

:TSPlaygroudToggle
  para ver como está descompoinendo el código


:TSModuleInfo
Por cada lenguage tiene diferentes módulos que pueden, o no, funcionar:
highlight
incremental_selection
indent
playground
query_linter


Si da errores tipo
treesitter/highlighter: Error executing lua: /usr/share/nvim/runtime/lua/vim/treesitter/query.lua:259: query: invalid node type at position 672 for language python
Ejecutar :TSUpdate
