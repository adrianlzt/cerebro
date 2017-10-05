https://upx.github.io/

UPX is a free, portable, extendable, high-performance executable packer for several executable formats.

Para saber si un binario esta packed con UPX:
strings binario | grep UPX


Comparando un binario escrito en go:
Tamaño sin upx: 8MB
Con UPX: 2.6MB



Descomprimir:
upx -d binario
