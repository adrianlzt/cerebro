http://git-scm.com/book/ch3-6.html

Si tenemos dos ramas sobre las que se ha trabajado en paralelo, rebase las une como si fuesen una única.

Aplica los cambios de develop sobre la rama donde estemos 
  git rebase develop   


Podemos tener problemas mergeando, ante los que habrá tres posibilidades:

  Solucionarlos y: git rebase --continue

  Saltarnos ese problema en particular: git rebase --skip

  Olvidarnos del rebase: git rebase --abort
