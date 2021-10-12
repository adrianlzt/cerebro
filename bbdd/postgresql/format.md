aur/pgformatter-git
pg_format -out formatted.sql orig.sql

Desde vim:
Seleccionar visual + :!pg_format %

Con https://github.com/joe-re/sql-language-server creo que usando coc me funciona, pero ahora con neovim 0.5 y el lsp integrado parece que no tira. Revisar
