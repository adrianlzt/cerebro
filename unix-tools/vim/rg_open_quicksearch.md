Buscar con ripgrep y abrir resultados en Neovim

```bash
rg --vimgrep fantastic | nvim -c 'cgetbuffer' -c 'copen'
```

Nos abre la pestaña de quickfix con los resultados de la búsqueda.
Al seleccionar un resultado y pulsar `Enter`, se abrirá el archivo en la posición indicada.

Creada functión de zsh para usarlo:

```bash
rgvi foobar
```
