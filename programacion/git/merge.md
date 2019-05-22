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

Por último subimos los cambios al server:
git push origin develop


# Squash
git merge --squash rama
  nos trae todos los cambios de la rama y se pausa antes de mergear
  en el commit log tenenmos puestos todos los mensajes de commit de la rama
  lo que conseguimos es hacer un merge con un solo commit
