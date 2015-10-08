#!/usr/bin/env python

from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.dates as mdates

NEGRO = 0

# Leemos la imagen y la convertimos en escala de grises
i = Image.open('linea.jpg').convert("L")

iar = np.asarray(i)
biar = iar.transpose()

linea = np.array([])
first_zero = False
for n in range(0,len(biar)):
    # Cogemos el primer punto negro que encontremos
    find = np.where(biar[n]==NEGRO)[0]

    # Si encontramos un punto negro, apuntamos su coordenada y
    # Si no lo encontramos, tomamos el valor anterior
    # Si es el primer valor, lo ponemos a 0
    if len(find) == 0:
        if n == 0:
            linea = np.append(linea,0)
            first_zero = True
        else:
            linea = np.append(linea,linea[n-1])
    else:
        linea = np.append(linea,len(iar)-find[0])

# Si no teniamos primer elemento, poner el valor del segundo
if first_zero:
    linea[0] = linea[1]

fig, ax = plt.subplots()
ax.plot(linea)
plt.show()
