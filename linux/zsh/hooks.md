<https://zsh.sourceforge.io/Doc/Release/Functions.html#Hook-Functions>
<https://www.digitalocean.com/community/tutorials/how-to-use-editors-regex-and-hooks-with-z-shell#respond-to-events-with-hooks>
<https://github.com/zsh-users/zsh/blob/master/Functions/Misc/add-zsh-hook>
<https://github.com/rothgar/mastering-zsh/blob/master/docs/config/hooks.md>

Ejecutar funciones en eventos de zsh.

```bash
❯ add-zsh-hook
Usage: add-zsh-hook hook function
Valid hooks are:
  chpwd precmd preexec periodic zshaddhistory zshexit zsh_directory_name
```

Al usar ese comando lo que hacemos es añadir la función a la variable, tipo lista `nombre_functions`.
Por ejemplo, para ver los hooks de preexec:

```bash
echo ${preexec_functions}
```

Ver todos los hooks definidos:

```bash
typeset | grep _functions
```
