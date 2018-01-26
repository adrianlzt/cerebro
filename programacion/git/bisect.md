http://git-scm.com/docs/git-bisect
https://labs.consol.de/development/git/2018/01/12/automated-debugging-with-git.html

Find by binary search the change that introduced a bug


Marcamos una versión mala (la actual probablemente) y una versión donde funcionaba.
El nos lleva a la mitad de todos esos commits.
Miramos si funciona.
Si funciona marcamos como good, y nos llevará a la mitad entre esta parte buena y la parte mala.
Si no funciona marcamos como bad, y nos llevará a la mitad entre el punto actual y la versión buena.
etc

git bisect start
git bisect good COMMIT/TAG
git bisect bad # si donde estamo esta roto

Si nos equivocamos al poner good/bad ->
git bisect log > fichero.log
modificamos el fichero.log para arreglar el fallo
git bisect replay

En una sola linea, siendo HEAD donde está roto y 0.12.0 donde está bien:
git bisect start HEAD 0.12.0

git bisect visualize
  esto arrancará gitk (x11) para ver los commits entre las revisiones buena y mala

Nos lleva a la mitad de los commits
Probamos
Si sigue mal: git bisect bad
Si está bien: git bisect good
Saltará a la mitad hacia atrás (si bad) o hacia delante (si good)

git bisect reset
  para terminar el bisect


# Automatico
git bisect start broken stable
git bisect run COMMAND

Por ejemplo:
git bisect run make test

Va saltando entre los commits hasta encontrar el primero que rompe "make test"
