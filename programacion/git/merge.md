Merge con la actual                         git merge <branch>
Solucionar merges                           git mergetool --tool=meld

LOCAL - the head for the file(s) from the current branch on the machine that you are using.
REMOTE - the head for files(s) from a remote location that you are trying to merge into your LOCAL branch.
BASE - the common ancestor(s) of LOCAL and REMOTE.
MERGED - the tag / HEAD object after the merge - this is saved as a new commit.

Si usamos meld tendremos:
  - izquierda, LOCAL, la rama sobre la que estamos
  - centro, fichero ascentro común (sin los cambios de ningún lado)
  - derecha, los cambios de lo que estamos intentando mergear

Tenemos que dejar en el centro el resultado que queremos.

CUIDADO no tengamos ignorados los espacios en blancos. Aquí puede ser determinantes (en python por ejemplo)

Podemos usar la opción del menú: Cambios -> Mezclar todo
Y luego solucionar las colisiones.


Entramos a la rama que queremos mergear, por ejemplo:
git checkout feature/rama

Desde esa rama hacermos merge a la rama donde queremos unirnos, por ejemplo:
git merge develop

Eso nos dirá que ficheros tienen problemas.
Podemos usar
git mergetool
Para ir por los ficheros deciciendo cual se usará.

Una vez concluído el merge tendremos que hacer commit:
git commit -m "message"

Ahora vamos a la rama donde se debe mergear, y hacemos merge
git checkout develop
git merge feature/rama
  si no ponemos nada, se hará ff (fast-forward) si es posible, si no se hará recursive (no-ff)

Por último subimos los cambios al server:
git push origin develop


# Squash
git merge --squash rama
  nos trae todos los cambios de la rama y se pausa antes de mergear
  en el commit log tenenmos puestos todos los mensajes de commit de la rama
  lo que conseguimos es hacer un merge con un solo commit


# Merge no fast forward
Crea un commit tipo "merge" donde se une la rama a la raiz.


# Merge fast forward
Cuando la raiz no ha avanzado desde que sacamos la rama.
Se mueve el "HEAD" al final de la rama.
No se crea ningún commit para el merge
