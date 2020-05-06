Queremos borrar unos rpms que subimos en un momento determinado pero ya no los usamos.
El problema es que esos rpms pesan mucho y se bajan cada vez que se hace un git clone.

Buscamos donde se encontraba el directorio que contenía los rpms (buscando por las ramas hasta encontrar uno donde aún estaban)
localrepo/


# git-filter-repo
https://github.com/newren/git-filter-repo

En Arch: pacman -Ss git-filter-repo

Mirar ejemplos con:
git-filter-repo --help
https://github.com/newren/git-filter-repo/blob/master/Documentation/git-filter-repo.txt

Borrar la palabra "secret":
git filter-repo --replace-text <(echo 'secret==>foobar')

Parece que el commit original sigue existiendo, pero sin enlazar.
Mirar si hay opciones para eliminarlo.



-- DEPRECATED --
## Usando el jar bfg
http://rtyley.github.io/bfg-repo-cleaner/
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
https://help.github.com/articles/remove-sensitive-data

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
