Queremos borrar unos rpms que subimos en un momento determinado pero ya no los usamos.
El problema es que esos rpms pesan mucho y se bajan cada vez que se hace un git clone.

Buscamos donde se encontraba el directorio que contenía los rpms (buscando por las ramas hasta encontrar uno donde aún estaban)
localrepo/

En gitlab >=11.6 hay una opción para pasarle una lista de commits a borrar:
<https://docs.gitlab.com/ee/user/project/repository/reducing_the_repo_size_using_git.html#repository-cleanup>

En gitlab también parece que si hacemos un fork esos commits dereferenciados ya no se llevan al nuevo fork.
Podmeos hacer un fork, derefenciarlo.
Mover el repo original a otro nombre (o borrarlo).
Forkear del fork de nuevo a la organzación origen y derefenciarlo.
De esta manera tendremos el mismo repo pero con ese commit quitado.

# git-filter-repo

<https://github.com/newren/git-filter-repo>
<https://htmlpreview.github.io/?https://github.com/newren/git-filter-repo/blob/docs/html/git-filter-repo.html>

<https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository>
Parece que en github se sigue viendo si apuntamos al commit directamente.
Petición a soporte para que borren cache?

En Arch: pacman -Ss git-filter-repo

Mirar ejemplos con:
git-filter-repo --help
<https://github.com/newren/git-filter-repo#how-do-i-use-it>

Hace un análisis de que tenemos en el repo, tamaños, tipos de fichero, etc.
git filter-repo --analyze

Borrar la palabra "secret":
git filter-repo --replace-text <(echo 'secret==>foobar')
git filter-repo --replace-text fichero.txt
fichero.txt tipo:
foo==>bar

Parece que el commit original sigue existiendo, pero sin enlazar.
Mirar si hay opciones para eliminarlo.

Si queremos borrar ficheros, meterlos en un fichero de texto y ejecutar:
git filter-repo --invert-paths --paths-from-file borrar.txt

Luego tendremos que añadir el origin de nuevo (bfg lo habrá quitado):
git remote add origin <url_to_the_repo>

Y hacer un push forzado:
git push --set-upstream origin feature/bad_file --force

Para github luego tendremos que contactar con soporte para que borren las caches que contengan ese commit o borrar ese datos en PRs externas al repo.

En gitlab on-premises, ir a <https://gitlab.foo.com/ORG/NOMBRE/-/settings/repository>
Y en "Repository cleanup" subir el fichero que pide.
<https://gitlab.com/gitlab-org/gitlab/-/issues/223752>
Parece que subir un fichero vacío también dispara la limpieza.

En bitbucket hay un artículo al respecto, <https://confluence.atlassian.com/bitbucketserverkb/how-do-i-remove-sensitive-unwanted-content-that-was-pushed-to-my-bitbucket-server-instance-1019389998.html>, pero no dicen de hacer nada extra, solo contactar soporte si puede que esos ficheros estén en PRs.

-- DEPRECATED --

## Usando el jar bfg

<http://rtyley.github.io/bfg-repo-cleaner/>
yaourt -S bfg

no borra de HEAD a no ser que lo forcemos

git clone --mirror git://example.com/some-big-repo.git
cp -pr some-big-repo.git ~/some-big-repo.git.bak
  backup por si acaso
java -jar ~/Descargas/bfg-1.11.5.jar --delete-files *.rpm some-big-repo.git
bfg -B 10 repo.git
  borrar los 10 ficheros más grandes
cd some-big-repo.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push
  El push me salta algunos mensajes de "deny updating a hidden ref" pero parece que funciona correctamente

Borrar ficheros más grandes de 100MB
java -jar bfg.jar --strip-blobs-bigger-than 100M some-big-repo.git

Replace all passwords listed in a file (prefix lines 'regex:' or 'glob:' if required) with ***REMOVED*** wherever they occur in your repository :
$ bfg --replace-text passwords.txt  my-repo.git

## Forma con git directamente ##

<https://help.github.com/articles/remove-sensitive-data>

git filter-branch --force --index-filter 'git rm -r --cached --ignore-unmatch localrepo' --prune-empty --tag-name-filter cat -- --all
  forcing (--force) Git to process—but not check out (--index-filter)—the entire history of every branch and tag (--tag-name-filter cat -- --all)
  removing the specified file ('git rm -r --cached --ignore-unmatch localrepo') and any empty commits generated as a result (--prune-empty).
  Note that you need to specify the path to the file you want to remove, not just its filename.

Analizará todas las ramas y nos mostrará que ficheros ha borrado.
Al final nos dirá que ramas ha modificado y que tags.

Meter los ficheros que queremos borrar en el gitignore
echo "localrepo/" >> .gitignore
git add .gitignore
git commit -m "Eliminados rpms para siempre"

Comprobar que hemos borrado todo lo necesario (haciendo un git checkout sha encuentro aun los rpms :/)

Para terminar pusheamos los cambios
git push origin --all --force
git push origin --tags --force

git filter-branch --tree-filter "find . -name 'Mifichero' -exec sed -i -e 's,texto1,texto2,g' {} \;"
cambiar texto1 por texto2 en el fichero Mifichero en todo el histórico de una rama concreta.
