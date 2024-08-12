<https://opensource.com/article/21/4/git-worktree>

Crear copias del repo en otros paths, donde podemos trabajar en otras ramas.
Es la versión "git" de andar repitiendo git clones.

Mirar que worktrees tenemos:
git worktree list

Crear uno nuevo con rama nueva:
git worktree add -b bar ../foo__bar main

   Si queremos forzar el crear una rama nueva aunque ya exista: -B

Crear para una rama existente:
git worktree add ../foo__feature_bar feature/bar

En el directorio ../foo__bar, tengo el nuevo repo con una rama "feature/bar" sacada de main

Borrar un worktree
git worktree remove hotfix
