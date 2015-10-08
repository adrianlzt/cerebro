http://pythonprogramming.net/python-pixel-arrays/?completed=/image-recognition-python/

mirar imagen_reconocer_linea.py

pip install pillow
pip install numpy

Generar una imagen con gimp cd 25x25 pixeles
Imagen -> Modo -> Indexado -> Blanco/Negro

Dibujar una linea negra

from PIL import Image
import numpy as np
i = Image.open('images/dot.png')
iar = np.asarray(i)
print(iar)

iar será un array de 25x25
Cada valor será un array de tres valores (r,g,b)
iar[0][0] será la casilla de izquierda arriba
iar[-1][0] será la casilla de izquierda abajo


im.save("nombre.png", "PNG")

Convertir imagen a escala de grises:
i = Image.open('linea.jpg').convert("L")

Para blanco/negro es "1", pero no me funciona bien.

