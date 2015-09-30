#!/bin/bash

echo "inicio"
exec pwd
echo "fin"


El exec nos saca de la ejecucción normal por lo que no llegaremos a la traza de fin.

De la man:
If exec is specified with command, it shall replace the shell with command without creating a new process.
