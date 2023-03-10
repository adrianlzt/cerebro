Cuando guarde el fichero main.py, salir del remote shell, subir código, entrar en el repl y reiniciar la ejecución.

:autocmd BufWritePost main.py !tmux send-keys -t 2 C-] && sleep 0.4 && tmux send-keys -t 2 "mpremote cp main.py : && mpremote repl" Enter && sleep 1 && tmux send-keys -t 2 C-d
