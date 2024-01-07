mirar filter-branch.md

Con filter-repo
https://github.com/newren/git-filter-repo/?tab=readme-ov-file#simple-example-with-comparisons
git filter-repo --path src/

Si queremos renombrar el directorio:
--path-rename <old_name:new_name>

Si queremos moverlo al root del repo:
git filter-repo --subdirectory-filter a/b/




Aquí lo hacen con filter-branch, pero parece que es mejor usar filter-repo.
https://dev.to/art_ptushkin/how-to-migrate-a-directory-from-git-repository-to-another-one-preserving-git-history-bitbucket-example-15m5

Clonamos el repo original.
Usamos git filter-branch para quedarnos solo con el historico de un directorio
git filter-branch --subdirectory-filter DIRECTORIO -- --all
