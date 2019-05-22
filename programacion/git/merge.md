Merge con la actual                         git merge <branch>
Solucionar merges                           git mergetool



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
