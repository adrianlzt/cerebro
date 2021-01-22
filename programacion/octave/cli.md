Podemos movernos por los directorios con:
cd
pwd

# Varaibles
Variables que tengo definidas:
who

Si queremos el tamaño de los datos, tipo y size:
whos

Para borrar variables:
clear("A")

Borrar todas:
clear


# load data
Cargar fichero de valores separados por tabs (columnas) y rows por nuevas líneas
load('fichero.dat')

Cargará los valores en la variable "fichero"


# guardar datos
save foo.mat v;
  guardar variable "v" en fichero "foo.mat"
  formato de octave, unos comentarios al comienzo y luego valores separados por espacios en blanco y cambios de línea

Si solo queremos los valores, sin los comentarios:
save foo.mat v -ascii


# prompt
Para cambiar el prompt:
PS1('lo que quieras> ');


# command chaining
a=1, b=2, c=3
  ejecuta los tres comandos mostrando el output

a=1; b=2; c=3
  hace lo mismo pero sin mostrar el resultado
