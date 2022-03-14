Mejor: bokeh.md
Mirar plotly.md


http://matplotlib.org/

matplotlib is a python 2D plotting library which produces publication quality figures in a variety of hardcopy formats and interactive environments across platforms. matplotlib can be used in python scripts, the python and ipython shell (ala MATLAB®* or Mathematica®†), web application servers, and six graphical user interface toolkits.

pip install matplotlib
  unos minutos en instalar

http://matplotlib.org/users/pyplot_tutorial.html

import matplotlib.pyplot as plt
plt.plot([1,2,3,4])
plt.ylabel('some numbers')
plt.show()


Multilinea
import numpy as np
import matplotlib.pyplot as plt

# evenly sampled time at 200ms intervals
t = np.arange(0., 5., 0.2)

# red dashes, blue squares and green triangles
plt.plot(t, t, 'r--', t, t**2, 'bs', t, t**3, 'g^')
plt.show()


# Fechas
http://stackoverflow.com/questions/17535065/plotting-dates-from-time-since-the-epoch-with-matplotlib

Mirar plot_date.py

Meter timezone:
ax.plot_date(time_plt, values[DATA], 'k-', label="Datos", tz='Europe/Madrid')


# Linea horizontal
plt.axhline(y=3, color='r')

# Colores
http://matplotlib.org/api/colors_api.htmlo

# Estilos de linea
http://matplotlib.org/api/axes_api.html
http://matplotlib.org/api/lines_api.html#matplotlib.lines.Line2D.set_linestyle


# Leyenda
ax.legend(["Datos","Estimacion"])
El primer elemento del array se asociará a la primera gráfica, el segundo a la segunda, etc.

Mejor asociar cuando definimos la grafica:
ax.plot_date(time_plt, values[DATA], 'k-', label="Datos")
ax.axhline(y=float(crit), color='r', linewidth=3, label="Critical")


ax = plt.subplot(1,1,1)
plt.plot(x_data[0], y_data[0], label="original")
plt.plot(x_data[0], data[0][0], label="epoch 0")
plt.legend(loc="upper left", bbox_to_anchor=[0, 1],
           ncol=2, shadow=True, title="Legend", fancybox=True)
plt.show()


# 3D
http://matplotlib.org/mpl_toolkits/mplot3d/tutorial.html
mirar scatter3d_demo.py

from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter([1,2,3],[0,2,6],[1,2,3]) # si no se define, se eligirá automáticamente
fig.show()

Otra forma de generar subplots:
fig, axs = plt.subplots(1,2, subplot_kw={"projection":'3d'})



# Parar ejecucción
plt.show()
Queda parado hasta que cerremos el programa


# subplots
http://matplotlib.org/users/recipes.html

crea 4 plots (2x2) y meto datos en tres de ellos
import matplotlib.pyplot as plt
fig, axs = plt.subplots(2, 2)
axs[0,0].plot([1,1,1])
axs[0,1].plot([0,1,2])
axs[1,0].plot([9,11,12])
fig.show()


El formato antiguo era (filas, columnas, que grafica):
fig = plt.figure()
ax1 = fig.add_subplot(221)
ax2 = fig.add_subplot(222)
ax3 = fig.add_subplot(223)
ax4 = fig.add_subplot(224)


# Limpiar
plt.cla() clears an axis, i.e. the currently active axis in the current figure. It leaves the other axes untouched.

plt.clf() clears the entire current figure with all its axes, but leaves the window opened, such that it may be reused for other plots.

plt.close() closes a window, which will be the current window, if not specified otherwise.



# Real time
## Con figure
import matplotlib.pyplot as plt

fig = plt.figure()
ax = fig.add_subplot(111)
for i in range(10):
    ax.axis([0, 1, 0, 12]) # si queremos poner unos ejes, los dos primeros son el eje X y los dos segundos en Y
    ax.plot([i,i])
    plt.pause(0.2)
    ax.clear() # si queremos borrar lo anterior


## Con plt
import matplotlib.pyplot as plt

plt.axis([0, 1000, 0, 11])
plt.ion()
plt.show()

for i in range(10):
    plt.plot([i,i])
    plt.pause(0.3)
