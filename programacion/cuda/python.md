https://towardsdatascience.com/numba-weapon-of-mass-optimization-43cdeb76c7da

# PyCUDA
Tenemos que meter código c dentro de python.
Es el más rápido para python

Arch:
pacman -S python-pycuda


# Numba
Se escribe todo en python y el convierte a código compilado.
Podemos generar código que se pueda ejecutar tanto en GPU como en CPU.
Es más lento de PyCUDA.

Arch:
yay -S python-numba

El soporte para pyhon 3.9 debería llegar con la versión 0.53
https://github.com/numba/numba/milestone/44
https://github.com/numba/numba/issues/6345#issuecomment-759509837
