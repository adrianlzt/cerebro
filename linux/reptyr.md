Cambiar un proceso de PTY
Util para meter un proceso en una screen/tmux

shell1> long_running_proc
shell1> Control+z
shell1> bg %
shell1> disown %

shell2> tmux
shell2> reptyr PID
