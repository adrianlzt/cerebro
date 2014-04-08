#!/bin/bash
#
# https://gist.github.com/lelandbatey/8677901
#
# Hace el efecto de cuando escaneamos un documento de texto
# Intenta eliminar todo el fondo solo dejando las letras
#
convert $1 -morphology Convolve DoG:15,100,0 -negate -normalize -blur 0x1 -channel RBG -level 60%,91%,0.1 $2
