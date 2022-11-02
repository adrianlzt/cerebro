# vim-gitgutter
Mostrar las líneas modificadas y gestionar los cambios pendientes
https://github.com/lewis6991/gitsigns.nvim

F10             activar/desactivar columna y colores con cambios
]c              siguiente cambio
[c              cambio anterior
,hu             quitar la modificación, dejandolo como estuviese en el commit anterior
,hs             meter ese cambio en el stage (nos permite commitear solo unos pocos cambios de un fichero). Podemos hacer selección visual para coger varias líneas
,hp             sobre un cambio, nos muestra una línea con el valor antiguo y otra con el nuevo
                si queremos stagear solo cierta parte de un cambio de una línea, hacemos el ,hp, saltamos a esa preview (C-w C-w), modificamos lo que no queremos y guardamos (:w)
:GitGutterFold  esconder todo menos los cambios. 'zr' para mostrar contexto (3 líneas por encima y por debajo). Mismo comando de nuevo para deshacer


# vim-fugitive
https://github.com/tpope/vim-fugitive
:G           git status
:Gblame      mostrar en vim git blame. Si damos intro sobre una linea nos lleva diff del commit
:Gdiffsplit  mostrar la ventana partida con git diff
:Git xxx     ejecutar git xxx
:Git xxx %   ejecutar git xxx, el % es el nombre del fichero que tenemos abierto
:Gwrite      hacer un git add al fichero
:Gcommit
:Gcommit -v  si queremos la vista como git commit -v


#
*git-vim.txt*  Git Bindings for Vim

==============================================================================
CONTENTS                                                    *git-vim-contents*

  1. Introduction.............................|git-vim|
  2. Commands.................................|git-vim-commands|
  3. Keymaps..................................|git-vim-keymaps|
  4. License..................................|git-vim-license|

==============================================================================
1. Introduction                                                      *git-vim*

Git-vim provides:

* Plugin files for calling git functions from inside Vim
* Syntax files for git displays

==============================================================================
2. Commands                                                 *git-vim-commands*

:GitAdd <file>
    git-add <file> or current file if not specified.

:GitCommit <args>
    git-commit.

:GitStatus
    Show git-status of current file or repository.

:GitLog
    Show git-log of current file or repository.

:GitCheckout <args>
    git-checkout. Completes git commits.

:GitDiff <args>
    git-diff. Completes git commits.

:GitPull <args>
    git-pull.

:GitPullRebase
    git-pull —rebase.

:GitPush <args>
    git-push. Defaults to +git push origin <current-branch>+.

:GitCatFile <args>
    git-cat-file.

:Git <args>
    Does any git command.

:GitVimDiffMerge
    Experimental. Call this command on unmerged file to enter vimdiff mode.

:GitVimDiffMergeDone
    Call this command after merging.

==============================================================================
3. Keymaps                                                   *git-vim-keymaps*

<Leader>gd
    :GitDiff

<Leader>gD
    :GitDiff —cached

<Leader>gs
    :GitStatus

<Leader>gl
    :GitLog

<Leader>ga
    :GitAdd

<Leader>gA
    :GitAdd <cfile>

<Leader>gc
    :GitCommit

In the git-status buffer:

<Enter>
    :GitAdd <cfile>

==============================================================================
4. License                                                   *git-vim-license*

The MIT License

 vim:tw=78:ts=8:ft=help
