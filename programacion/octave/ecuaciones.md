# Resolver sistemas de ecuaciones
Tipo:
a*x_1 + b*x_2 = y_1
c*x_1 + d*x_2 = y_2

A = [a; b; c; d]
y = [y_1; y:2]
x = A \ y

Ejemplo:
A = [ 2, 0; 0, 2 ];
y = [ 2; 1 ];
x = A \ y
