http://git-scm.com/book/ch3-6.html

Si tenemos dos ramas sobre las que se ha trabajado en paralelo, rebase las une como si fuesen una única.

Aplica los cambios de develop sobre la rama donde estemos 
  git fetch origin develop
    actualizo primero develop, bajandome el codigo del remote
  git rebase develop   

Lo que hace es buscar el punto donde las ramas divergen.
Se va hasta el extremo de develop, y ahí aplica los commits que habíamos hecho en nuestra rama desde ese punto común hasta ahora.


Podemos tener problemas mergeando, ante los que habrá tres posibilidades:

  Solucionarlos y: git rebase --continue

  Saltarnos ese problema en particular: git rebase --skip

  Olvidarnos del rebase: git rebase --abort


# rebase interactive
git rebase -i HEAD~4
nos permite hacer modificaciones sobre los últimos 4 commits
