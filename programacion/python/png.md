mirar imagen.md

https://github.com/drj11/pypng
Implementacion pure-python de un writer/reader de png.


# Leer un png
import png
p = png.Reader(filename="imagen5_2")
for x in p.asRGBA()[2]:
  print(x)

Esto nos imprime un array de elementos del estilo (R,G,B,A,R,G,B,A...) (primer pixel, segindo pixel, etc):
R_00, G_00, B_00, A_00, R_01, G_01, B_01, A_01, ...

p = png.Reader(bytes=string_o_bytes)
