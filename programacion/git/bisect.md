http://git-scm.com/docs/git-bisect

Find by binary search the change that introduced a bug


Marcamos una versión mala (la actual probablemente) y una versión donde funcionaba.
El nos lleva a la mitad de todos esos commits.
Miramos si funciona.
Si funciona marcamos como good, y nos llevará a la mitad entre esta parte buena y la parte mala.
Si no funciona marcamos como bad, y nos llevará a la mitad entre el punto actual y la versión buena.
etc
