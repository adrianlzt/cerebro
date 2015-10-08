http://matplotlib.org/

matplotlib is a python 2D plotting library which produces publication quality figures in a variety of hardcopy formats and interactive environments across platforms. matplotlib can be used in python scripts, the python and ipython shell (ala MATLAB®* or Mathematica®†), web application servers, and six graphical user interface toolkits.


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
