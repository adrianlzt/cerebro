Hago un pull request de una rama que he creado. Esta rama tiene dos commits, pero me piden que solo tenga uno para aceptar el pull request

# Usando rebase + squash
git rebase HEAD~2
  cambiamos los "pick" por "squash", excepto el primero de la lista (que intentaría hacer squash con el anterior, que no lo hemos seleccinado)

Se puede usar para N commits

# Usando reset
me clono mi codigo
git clone ...

miro las ramas remotas
git branch -a

comienzo a trabajar en local con los datos de una rama remota
git co -b origin/feature/cosa feature/cosa

Deshago los commits (no uso --hard para no borrar los ficheros)
git reset HEAD~1
git reset HEAD~1

Añado los ficheros
git add *

Hago un único commit
git cam "nueva funcionalidad"

Subo la rama a origin de forma forzada (si no, no me dejara, al haber borrado commits)
git push origin feature/cosa -f

Voy al pull request y ya solo aparece un commit.
