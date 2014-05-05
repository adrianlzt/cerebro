Queremos borrar unos rpms que subimos en un momento determinado pero ya no los usamos.
El problema es que esos rpms pesan mucho y se bajan cada vez que se hace un git clone.

Buscamos donde se encontraba el directorio que contenía los rpms (buscando por las ramas hasta encontrar uno donde aún estaban)
localrepo/

## Usando el jar bfg ##
http://rtyley.github.io/bfg-repo-cleaner/

git clone --mirror git://example.com/some-big-repo.git
cp -pr some-big-repo.git ~/some-big-repo.git.bak
java -jar ~/Descargas/bfg-1.11.5.jar --delete-files *.rpm some-big-repo.git
cd some-big-repo.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push
  El push me salta algunos mensajes de "deny updating a hidden ref" pero parece que funciona correctamente




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
