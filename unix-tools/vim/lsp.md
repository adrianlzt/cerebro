Sistituye a COC

https://github.com/neovim/nvim-lspconfig
https://crispgm.com/page/neovim-is-overpowering.html

Plug 'neovim/nvim-lspconfig'

Para ver como instalar los distintos servers:
https://github.com/neovim/nvim-lspconfig/blob/master/CONFIG.md


Ver que server estamos usando para el fichero abierto
:LspInfo

Los lsp servers arrancarán automáticamente si detectan los ficheros que definen un proyecto.
Podemos intentar arrancarlo a mano:
:LspStart XXX


# Mappings
,f format
,d definition
,D declaration
,t type definition
,i implementation
,r referencias (donde aparece lo que tenemos seleccionado
,s document symbol
,S workspace symbol
,rn rename
K tipo de dato
U firma de la función
