http://www.polinux.upv.es/drupal/node/1062

Crear repositorio                                   git init
Añadir ficheros                                     git add            git add -f (si el fichero esta conf como ignorado .gitignore)
Borrar ficheros                                     git rm
Quitar ficheros del staged sin borrar               git reset fichero.txt
Quitar cambios del staged sin commit                git checkout -- fichero.txt
                                                    Si habiamos hecho algún cambio, pero aun no commit, este comando devuelve el fichero al estado que tiene en el repo
Commit only new files                               git commit -m “mensaje”
Commit changes                                      git commit -a -m “mensaje”
Rehacer un commit                                   git commit --all --amend <- el --all es necesario?
Cambiar mensaje del ultimo commit                   git commit --amend --message "nuevo mensaje"
Restaurar un fichero a un commit                    git checkout <commit> path/to/file
Restaurar todo a un commmit                         git checkout <commit>
Estado                                              git status
Log del git (o de un fichero)                       git log <fichero>
Log mostrando los diff de los n ult commits         git log -p -2
Log de un fichero poniendo los cambios              git log -p -2 <fichero>
Log entre commits                                   git log xxxx..yyyy (xxx no lo pilla)
Log de un fichero borrado                           git log --all --full-history -- FICHERO
Log en JSON                                         https://gist.github.com/varemenos/e95c2e098e657c7688fd
                                                    https://gist.github.com/adrianlzt/b12c47715c2f68501e8e6cac098af77c
El ultimo sed quita los cambios de linea            git log --pretty=format:'{ "commit": "%H", "abbreviated_commit": "%h", "tree": "%T", "abbreviated_tree": "%t", "parent": "%P", "abbreviated_parent": "%p", "refs": "%D", "encoding": "%e", "subject": "%s", "sanitized_subject_line": "%f", "body": "%b", "commit_notes": "", "verification_flag": "%G?", "signer": "%GS", "signer_key": "%GK", "author": { "name": "%aN", "email": "%aE", "date": "%aD" }, "commiter": { "name": "%cN", "email": "%cE", "date": "%cD" }},' | sed "$ s/,$//" | sed ':a;N;$!ba;s/\r\n\([^{]\)/\\n\1/g'| awk 'BEGIN { print("[") } { print($0) } END { print("]") }' | sed ':a;N;$!ba;s/\n/ /g'

Mostrar configuración                               git config -l
Configurar remoto                                   git remote add origin ssh://git@bitbucket.org/pepe/pepe.git
                                                    git remote add origin git@bitbucket.org:pepe/dotfiles.git
                                                    Para usar ssh, meter mi clave pública en el servidor remoto
Push a dos remotos                                  http://stackoverflow.com/questions/14290113/git-pushing-code-to-two-remotes
                                                    git remote set-url --add --push origin git@github.com:adrianlzt/puppet-monitoring.git
                                                    git remote set-url --add --push origin git@miserver.com:pepe/puppet-monitoring.git
Agregar un remoto de donde hemos hecho fork         git remote add upstream https://github.com/otheruser/repo.git
Mostrar remotos                                     git remote -v
Borrar remoto                                       git remote remove origin (o en vez de origin, el nombre que sea)
Bajar código de un origin (sobreescribe local)      git fetch upstream
Subir a remoto                                      git push
Subir a determinado remoto y branch                 git push origin master
                                                    git push -u <remoto> <branch>
                                                    git push --set-upstream <remoto> <branch>
                                                    -u (--set-upstream) hace que git recuerde a que remoto debe subir
Subir todas branches y tags                         git push --all
                                                    git push --tags
Copiar repo remoto                                  git clone <url> <dir-local> (si !<dir-local> crea un dir como el repo)
 Con credenciales                                   git clone https://user:pass@github.com/asdasd.git
 Clonar y saltar directamente a una rama            git clone -b rama http...
Copiar repo remoto y submodules                     git clone --recursive <url> <dir-local> (si !<dir-local> crea un dir como el repo)
Borrar remoto                                       git remote rm origin
Ver conf remoto                                     git remote show origin
Nueva rama                                          git branch <nombre>
Renombrar rama                                      git branch -m old_branch new_branch
Listar ramas locales y remotas                      git branch --all   git br -a
Borrar rama local                                   git branch -d <branch>
Borra rama remota                                   git push origin :<branch>
Movernos de rama o tag                              git checkout <nombre>
Movernos a rama orphaned                            git checkout --orphan <nombre>    will have no parents / new history totally disconnected 
Salirnos de un branch forzadamente                  git checkout -f <nombre>
New branch & move                                   git checkout -b <nombre>
Coger branch remota                                 git checkout -b blabla origin/blabla
Merge con la actual                                 git merge <branch>
Solucionar merges                                   git mergetool
Mergear contra otro origin                          git merge upstream/master
Subir código a remoto                               git push origin <branch>
Reabase (cambios de otro branch a este)             git rebase develop   Aplica los cambios de develop sobre la rama donde estemos http://git-scm.com/book/ch3-6.html
Definir un repo remoto por defecto para bajar       git branch --set-upstream-to=origin/develop develop
Bajar código de remoto                              git pull
                                                    = fetch + merge
Diff branches                                       git diff <branch1> <branch2>
                                                    git diff <branch1>..<branch2>
Diff branches rama contra el ancestro común         git diff <branch1>...<branch2>
Mirar cambios                                       git diff
Cambios respecto al dir local (sin commit)          git diff --staged
Borrar last commit: modificando ficheros            git reset --hard HEAD~1
                    sin modificar ficheros          git reset HEAD~1
Undo un reset                                       git reset HEAD@{1}

Submódulos                                          git submodule add <url> <path>
Añadir etiqueta                                     git tag -a “v1.0” -m “mensaje”
Listar etiquetas                                    git tag       git tag -l “v1.*”
Borrar etiqueta                                     git tag -d "0.1.0"
Borrar etiqueta remota                              git push origin :0.1.0
Mirar alias                                         git aliases
Dejar lo que estamos haciendo sin commit            git stash  http://www.gitguys.com/topics/temporarily-stashing-your-work/
                                                    git stash save "mensaje"
Mostrar stashs                                      git stash list
Volver a lo que estábamos haciendo                  git stash pop
                                                    git stash pop stash@{0}
Listar ficheros versionados                         git ls-files  merges file listing in the dir cache index with actual workdir list.shows different combinations of the two.
Mostrar ficheros excluídos                          git ls-files --others --exclude-from=.git/info/exclude
Mostrar ramas contenidas en rama develop            git branch --contains develop
Contenido de un fichero                             git show HEAD:nuevo



Directorio de trabajo distinto que directorio de git
git --git-dir=/dir/.git/ --work-tree=/dir


Obtener solo parte del repositorio - sparse checkout
http://stackoverflow.com/questions/600079/is-there-any-way-to-clone-a-git-repositorys-sub-directory-only
git init <repo>
cd <repo>
git remote add origin <url>
git config core.sparsecheckout true
echo some/dir/ >> .git/info/sparse-checkout
git pull origin master


Trabajando con ramas - branch
http://git-scm.com/book/en/Git-Branching-Basic-Branching-and-Merging
Nueva rama: git branch <nombre>
Trabajar en la nueva rama: git checkout <nombre>
Crear nueva rama y ponernos en ella: git checkout -b <nombre>
Cuando hagamos un pull deberemos determinar que rama queremos subir. No cogerá por defecto en la que estemos.


Deshacer - undo - delete
http://stackoverflow.com/questions/927358/undo-last-git-commit


Borrar el último commit:
$ git reset --hard HEAD~1
Si quiero subir el cambio me pedirá force (git push -f)


Cambiar usuario y email de commit realizado
git commit --amend --author='ez <ep@gmail.com>'


Definir usuario y email
git config --global user.name "ez"
git config --global user.email pep@gmail.com


Atajos - shortcuts
https://git.wiki.kernel.org/index.php/Aliases#Introduction
http://lukas.zapletalovi.com/2012/07/my-git-aliases-again.html
http://blog.blindgaenger.net/advanced_git_aliases.html
http://stackoverflow.com/questions/7066325/how-to-list-show-git-aliases
Editar ~/.gitconfig
Otra opción: 
$ git config --global alias.co checkout
$ git config --global alias.lg “log -p”


Submodules
Podemos hacer que nuestro repositorio dependa de otros repositorio git.
git submodule add <url> <path>

Con git ls-files si vemos que un directorio solo aparece el nombre, pero no los ficheros de dentro, es que git piensa que es un submodule.
Lo podemos quitar con: git rm nombre (renombrar antes el directorio por si acaso)

Remotes
El remote ‘origin’ es a donde se hace push y pull por defecto.
Si queremos tener varios remotos sincronizados mediante push, podemos hacer lo siguiente en .git/config
[remote "origin"]
          url = git@bitbucket.org:adrit/dotfiles.git
          url = ssh://asda@sun/home/repositorios/dotfiles
[remote "bitbucket"]
          fetch = +refs/heads/*:refs/remotes/origin/*
          url = git@bitbucket.org:asda/dotfiles.git
[remote "sun"]
          url = ssh://er@sun/home/repositorios/dotfiles
          fetch = +refs/heads/*:refs/remotes/sun/*

## Alias ##
        ci = commit
        cam = commit -am
        ca = commit -a
        cm = commit -m
        co = checkout
        st = status
        br = branch -v
        df = diff
        lg = log --graph --all --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(red)%s%C(reset) %C(bold black)— %an%C(reset)%C(bold yellow)%d%C(reset)' --abbrev-commit --date=relative
        pu = pull
        g = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative
        h = !git --no-pager log origin/master..HEAD --abbrev-commit --pretty=oneline
        alias = !git config --list | grep 'alias\\.' | sed 's/alias\\.\\([^=]*\\)=\\(.*\\)/\\1\\t=> \\2/' | sort
        this = !git init && git add . && git commit -m \"initial commit\"
        ignore=!([ ! -e .gitignore ] && touch .gitignore) | echo $1 >>.gitignore
        sba = show-branch --color=always -a --more=10 --no-name
        sb = show-branch -a --list
        ccm = !git reset --soft HEAD~ && git commit


## Sincronizar mi fork contra el de origen
https://help.github.com/articles/syncing-a-fork

git remote add upstream https://github.com/JuliaLang/julia.git
git fetch upstream
git co master
git merge upstream/master
