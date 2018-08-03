Usar mhinz/vim-grepper

Plug 'mhinz/vim-grepper'


:Grepper


nnoremap <C-g> :Grepper -tool rg<cr>
nnoremap <A-G> :Grepper -tool rg -cword -noprompt<cr>
Control+g abre para que busquemos una palabra
Alt+Shift+g busca la palabra selecionada




http://vim.wikia.com/wiki/Find_in_files_within_Vim

Configurar para usar ripgrep
init.vim
set grepprg=rg



:grep palabra
  hace un grep de palabra en el dir que estemos

