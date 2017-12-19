Esta medida resulta útil cuando queremos obtener una vista sobre una serie de medidas que no siguen una distribución normal (campana de gauss).

Si por ejemplo tenemos medidas de cuanto tiempo tarda en cargar una página un usuario, la distribución no será normal.
En una distribución normal la gran mayoría de las personas cargarían la página en la media de todos los valores, y luego iría decrementando el número de usuarios según estos tardan en cargarla la web más y menos tiempo.

La distribución estadística para una carga de una página web es más bien muchos usuarios que cargan la web en unos pocos milisegundos, y otro grupo que la carga en varios cientos de milisegundos (por ejemplo).
Si hiciesemos la medía tendríamos un valor irreal, ya que ningún (o casi ningún) usuario carga la web en ese tiempo.

Con los percentiles obtenemos el valor por el que debajo máximo de tiempo de carga para un porcentaje.

Un ejemplo tipico sería una gráfica de barras stacked agrupada cada 10m.
En cada grupo de 10m nos dirá en cuanto tiempo contesta el 50% más rápido, el 75% más rápido, etc.

Lo normal sería hacer unos grupos de:
25%
50%
75%
90%
95%

Mirar ../percentiles.md con el ejemplo percentiles.png
