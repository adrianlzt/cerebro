Sustituye a COC

<https://github.com/neovim/nvim-lspconfig>
<https://crispgm.com/page/neovim-is-overpowering.html>

Plug 'neovim/nvim-lspconfig'

Para ver como instalar los distintos servers:
<https://github.com/neovim/nvim-lspconfig/blob/master/CONFIG.md>

Ver que server estamos usando para el fichero abierto
:LspInfo

Los lsp servers arrancarán automáticamente si detectan los ficheros que definen un proyecto.
Podemos intentar arrancarlo a mano:
:LspStart XXX

# Mappings

,lf format
,ld definition, ir al código donde se define
,lD declaration
,lt type definition
,li implementation
,lr referencias (donde aparece lo que tenemos seleccionado
,ls document symbol
,lS workspace symbol
,lR rename
K tipo de dato, o documentación (por ejemplo, en ansible)
U firma de la función

g. ir al siguiente error
g, ir al error anterior

,lc intentar arreglar el problema actual

# Debug

```
vim.lsp.set_log_level("on")
```

Genera el log en:
~/.local/state/nvim/lsp.log
