Abre los tres ficheros spliteando en distintas ventanas automaticamente
vim -o file1 file2 file3


Abre varios ficheros (mejor usar buffers)
vim file1 file2 file3
:n siguiente fichero
:prev anterior fichero
:args ficheros abiertos


Abrir en varias pestañas:
vim -p file1 file2 file3
:tabn siguiente fichero
:tabp anterior fichero
:wq guarda y sale de la tab
