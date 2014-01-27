http://christoph.ruegg.name/blog/git-howto-revert-a-commit-already-pushed-to-a-remote-reposit.html

Borrar el último commit local:
git reset --hard HEAD~1

--hard
Resets the index and working tree. Any changes to tracked files in the working tree since <commit> are discarded.

Si no espeficicamos --hard, se usa:
--mixed
Resets the index but not the working tree (i.e., the changed files are preserved but not marked for commit) and reports what has not been updated. This is the default action.


Para subir el cambio a un repo remoto tendremos que forzarlo (-f)
git push origin -f)


Si no tenemos el git en local podríamos hacer:
git push mathnet +dd61ab32^:master

Que lo hace hace es ir a la rama master del server mathnet y mover el repositorio para ir al commit anterior (padre) de dd61ab32.
Where git interprets x^ as the parent of x and + as a forced non-fastforward push
