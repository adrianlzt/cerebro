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
