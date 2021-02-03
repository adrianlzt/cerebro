# Funciones de optimización
Ejemplo donde pasamos una función costFunction (que tenemos que tener definida) a "fminunc" para que nos encuentre el valor de los parámetros theta que obtiene el mínimo valor de la función.
costFunction tendrá un único parámeto, theta. Devolverá el valor del coste y un vector con los gradientes de cada variable (derivadas parciales para cada theta_n)

options = optimset('GradObj', 'on', 'MaxIter', '100'); % le especificamos que algoritmo usar, que le estamos pasando unos valores iniciales y que de 100 vueltas. 'GradObj' quiere decir que le pasamos una función que retorna el coste y el gradiente.
initialTheta = zeros(1,2);
[optTheta, functionVal, exitFlag] = fminunc(@(t)(costFunction(t, X, y)), initialTheta, options)
  % fminunc, find minimum unconstrained (sin restricciones en los valores de theta)

En optTheta nos devolverá los parámetros que minimizan la función.
En functionVal el resultado de costFunction para esos parámetros
En exitFlag 1 nos indica que ha consegido converger)


Ejemplo de un esqueleto de costFunction:

function [jVal, gradient] = costFunction(theta)
  jVal = [...code to compute J(theta)...];
  gradient = [...code to compute derivative of J(theta)...];
end


Si queremos hacer uso de fminunc y lo que tenemos como valores de respuesta son matrices, las tendremos que aplanar en un vector.
Ejemplo:

Usando un, ejemplo, con L=4, s1=s2=s3=10, K=1 (NN con una input layer con 10 units, una hidden layer con 10 units y una output layer con una única unit)
Estos serían los jVal:
Θ^1 tendrá dimensiones 10x11 (11 units de entrada, 10+bias) y 10 de salida (las de la hidden layer).
Θ^2 también será 10x11
Θ^3 será 1x11

Los valores de las derivadas pariales tendrán el mismo tamaño (serán los gradient):
D^1 10x11
D^2 10x11
D^3 1x11


Para aplanarlos:
thetaVec = [Theta1(:); Theta2(:); Theta3(:)]
DVec = [D1(:); D2(:); D3(:)]

Para volver a obtener las matrices a partir de los vectores aplanados:
Theta1 = reshape(thetaVec(1:110), 10, 11)
Theta2 = reshape(thetaVec(111:220), 10, 11)
Theta3 = reshape(thetaVec(221:231), 1, 11)
