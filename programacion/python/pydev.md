IDE de Python sobre Eclipse.

http://pydev.sourceforge.net/manual_101_install.html


## Vim ##
http://vrapper.sourceforge.net/home/

Añadirlo a la lista de urls disponibles para obtener software.

Quitar el bind a Control+V para poder usar el bloque visual de vim.
Window -> Preferences -> General -> keys
Buscar por: paste


# PEP-8
Activar el chequeo de código de pep8

Window -> Preferences -> Editor -> Code Analysis -> pep8.py
Marcar como error o warning

Para aumentar el tamaño de las líneas aceptadas hasta los 120 caracters:
Marcar "Use system interpreter"
Arguments:
--max-line-length=120

Reiniciar eclipse


Podemos poner estos comentarios en una linea para evitar que eclipse los marque como errores
Si nos ponemos en el fallo y pulsamos "control+1" no saldrá un desplegable donde podemos seleccionar el elemento para que nos ponga el comentario.
# @UndefinedVariable
# @UnresolvedImport
# @UnusedVariable


# Unit test
Control+F9
Saca un desplegable para elegir que unit tests ejecutar.
