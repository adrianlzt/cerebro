Creamos un fichero con el nombre de la función terminado en .m
El nombre del fichero deberá ser el mismo que el que definimos en la primera línea.


Ejemplo de fichero squareThisNumber.m:
function y = squareThisNumber(x)
y = x^2;


Devolviendo multivariable:
function [y1,y2] = foo(x)
y1 = x^2;
y2 = x+3;


[a,b] = foo(3)


Si hacemos:
foo(3)
o
x = foo(3)
  solo obtendremos el primer parámetro


# Documentar
function J = pepe(A,B)
% A is foo
% B is bar
J = A+B




# Search path
octave cogerá las funciones que estén en los ficheros de nuestro working directory

Si queremos añadir otros directorios al search path:
addpath('/foo/bar')


# Punteros
Si queremos pasar una función a otra función, pasaremos su puntero como:
func(@función, foo, bar)
