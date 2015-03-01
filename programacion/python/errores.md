: No such file or directory

Mirar que el fichero no tenga finales de linea windows

vim fichero.py
abajo pondra [DOS]

:set ff=unix
para cambiarlo

file fichero.py
fichero.py: Python script, ASCII text executable, with CRLF line terminators

"with CRLF line terminators" nos indica que es un fichero DOS
