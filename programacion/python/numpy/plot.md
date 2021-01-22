https://matplotlib.org/tutorials/introductory/pyplot.html
https://www.tutorialspoint.com/numpy/numpy_matplotlib.htm

# Pintar línea
import matplotlib.pyplot as plt
plt.plot([1, 2, 3, 4])
plt.ylabel('some numbers')
plt.show()

# Pintar puntos
Los puntos que pintamos: (1,1), (2,4), (3,9), (4,16)
plt.plot([1, 2, 3, 4], [1, 4, 9, 16], 'o')

Con arrays de numpy (siendo los puntos (x,y) (1,1), (2,3), (3,9)):
x=np.array([[1,2,3],[1,3,9]])
plt.plot(x[0], x[1], 'o')
plt.show()

# Ejes
x_min, x_max, y_min, y_max
plt.axis([0, 6, 0, 20])

# Color
Por defecto es azul, pero podemos cambiarlo con el tercer parámetro
Ejemplo, rojo:
plt.plot([], [], 'r')


# 3d
https://matplotlib.org/mpl_toolkits/mplot3d/tutorial.html

## Scatter
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter([1,2],[1,2],[1,2])
plt.show()
