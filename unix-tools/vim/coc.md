Una especie de super extensión para autocompletado y mas cosas.

Puede hacer uso de los Language Servers para autocompletar, etc.

Usa ventanas flotantes (neovim 4.x, nightly el 1/4/2019).


https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions
El concepto más potente es el de extensión, que permite autocompletar, añadir comandos, configuraciones, etc.

:CocList extensions
  para listarlas, control+c para salir
  ? means invalid extension
  * means extension is activated
  + means extension is loaded
  - means extension is disabled
  Usar el tabulador para activar/desactivar/actualizar/desinstalar/configurar
  Usar enter para cambiar entre activa y loaded

:CocInstall coc-gocode
  instalar una


# Language servers
Editar config con :CocConfig

Añadir los LS como:
{
  "languageserver":{
    "golang": {
      "command": "gopls",
      "args": [],
      "rootPatterns": ["go.mod", ".vim/", ".git/", ".hg/"],
      "filetypes": ["go"]
    }
  }
}

## Python
Muy lento este, mejor pyright
https://github.com/pappasam/coc-jedi
:CocInstall coc-jedi

Static checks y code completion
https://github.com/fannheyward/coc-pyright


# Coc-sources
https://github.com/neoclide/coc-sources

## Emoji
Por defecto ":" en modo insert nos abré el desplegable
Tengo el plugin desactivado por defecto.
Para activarlo:
CocList extensions
  escribir emoji
  dar a tab y enable
  pero luego dejarlo disabled, que es un poco excesivo que salga todo eso cada vez que se ponen ":"



# Colors
## Diagnostics
:h coc-highlights



# Errores
Cuando en la status line vemos "Code: 0" es que estamos teniendo problemas con el LS. Mirar debug

Un fallo que he visto con el de Go es cuando usamos CGO y hay ciertas flags inválidas.
Se arregla permitiendo esas flags:
export CGO_CXXFLAGS_ALLOW=".*"
export CGO_LDFLAGS_ALLOW=".*"
export CGO_CFLAGS_ALLOW=".*"



# Debug
Cuando falla un LS puedo usar sysdig para ver que se le está enviando y que está contestando.

El proceso node tambien genera logs en:
/tmp/node-client.log
/tmp/coc-nvim.log

Podemos activar las trazas para ver los mensajes con el LPS con:
:CocCommand workspace.showOutput



Podemos subir el nivel de debug:
export NVIM_COC_LOG_LEVEL=debug

Arrancar nvim

Y luego ver los logs con:
:CocOpenLog
