https://git-scm.com/book/it/v2/Customizing-Git-Git-Hooks
http://www.kernel.org/pub/software/scm/git/docs/githooks.html
Scripts que se ejecutan tras hacer operaciones con git.
Se almacenan en .git/hooks.
Por defecto hay unos cuantos de ejemplo, a los que deberemos quitar el .sample para que funcionen.
Estos ficheros deben ser ejecutables.

Hay ejemplos en .git/hooks
Deberemos renombrarlos sin el .sample para que funcionen


# Github enterprise
https://help.github.com/enterprise/2.8/admin/guides/developer-workflow/creating-a-pre-receive-hook-script/
mirar github_enterprise.md


Hay dos tipos de hooks, lado cliente y lado servidor

## client-side hooks
Podemos modificar el path de los hooks de manera global: https://stackoverflow.com/questions/1977610/change-default-git-hooks/37293001#37293001

git config --global core.hooksPath /path/to/my/centralized/hooks
  Esto modificará el path donde se encuentran los hooks, no usando los locales
  Configura ~/.gitconfig con:
    [core]
          hooksPath = ~/.git_hooks

Esto hará que no podamos usar los hooks locales.
Aunque podemos meter un "snippet" en el hook global para llamar al local si existe:
if [ -e ./.git/hooks/post-commit ]; then
    ./.git/hooks/post-commit "$@"
fi

Para saber de donde está almacenado el hook que estamos usando:
git rev-parse --git-path hooks/pre-commit

pre-commit para evitar commitear si hemos puesto NOCOMMIT o COMMITFAIL: https://gist.github.com/rzymek/969fd17583811addcc579af04e412a9f


Evitar lanzar los hooks para un commit:
git commit --no-verify
git commit -n



## server-side hooks
pre-receive, si queremos rechazar un push por algún motivo. Mirar ejemplo en ./pre-receive.py
Otro ejemplo en https://gist.github.com/f30a4d7004671c5eea5b21ba6ef967d3 donde se filtra quien puede hacer push segun un fichero .json
update
post-receive

Recibe el commit actual en git y el commit más reciente que se pushea. Refs es la "rama" (algo más):
commit_base commit_actual refs
Ejemplo:
571a1923115ab0110ba292edc4fcccce43157afc 2b9e3ed72fb9443023d4d1088845a0d0df21cb48 refs/heads/master

Simular ejecucción
./pre-receive <<< "571a1923115ab0110ba292edc4fcccce43157afc 2b9e3ed72fb9443023d4d1088845a0d0df21cb48 refs/heads/master"
