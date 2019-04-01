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
