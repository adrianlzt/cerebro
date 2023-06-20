https://microsoft.github.io/language-server-protocol/

Protocolo para implementar el típico autocompletado para distintos lenguajes.

El language server puede tener un motón de capacidades:
https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#languageFeatures

Entre otras:
  Syntax highlighting
  Validation/linting
  Autocomplete
  Documentation reference
  Jump to definition
  Rename

Usa JSON-RPC, con un esquema similar a las peticiones HTTP.

No he encontrado ningún cliente sencillo para hacer pruebas.

Podemos usar sysdig con -c echo_fds para ver la comunicación.
