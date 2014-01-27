Si estoy editando un fichero para el que no tengo permisos, en vez de salir, y entrar son sudo vim fichero, podemos hacer:

:w !sudo tee %
