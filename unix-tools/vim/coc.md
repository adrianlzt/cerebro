Una especie de super extensión para autocompletado y mas cosas.

Puede hacer uso de los Language Servers para autocompletar, etc.

Usa ventanas flotantes (neovim 4.x, nightly el 1/4/2019).


https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions
El concepto más potente es el de extensión, que permite autocompletar, añadir comandos, configuraciones, etc.

:CocList extensions
  para listarlas

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

