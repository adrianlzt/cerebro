# Funciones de optimización
Ejemplo donde pasamos una función costFunction (que tenemos que tener definida) a "fminunc" para que nos encuentre el valor de los parámetros theta que obtiene el mínimo valor de la función.
costFunction tendrá un único parámeto, theta. Devolverá el valor del coste y un vector con los gradientes de cada variable (derivadas parciales para cada theta_n)

options = optimset('GradObj', 'on', 'MaxIter', '100'); % le especificamos que algoritmo usar, que le estamos pasando unos valores iniciales y que de 100 vueltas
initialTheta = zeros(1,2);
[optTheta, functionVal, exitFlag] = fminunc(@costFunction, initialTheta, options)

En optTheta nos devolverá los parámetros que minimizan la función.
En functionVal el resultado de costFunction para esos parámetros
En exitFlag 1 nos indica que ha consegido converger)


Ejemplo de un esqueleto de costFunction:

function [jVal, gradient] = costFunction(theta)
  jVal = [...code to compute J(theta)...];
  gradient = [...code to compute derivative of J(theta)...];
end
