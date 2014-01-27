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
