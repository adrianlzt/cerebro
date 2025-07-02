Para copiar cuando estamos conectados en un server remoto:

<https://jvns.ca/til/vim-osc52/>

pbcopy:

```bash
#!/bin/bash
printf "\033]52;c;%s\007" "$(base64 | tr -d '\n')"
```

Si en el server remoto hacemos:

```bash
echo foo | pbcopy
```

Se copiará en el portapapeles local.

En alacritty hace falta permitir el poder pegar desde el protocolo OSC52.

Tesetar que puede pegar. Copiar "Hello" y ejecutar:

```bash
printf '\x1b]52;c;?\x07'
```

Deberemos ver: 52;c;SGVsbG8=

Copiar en el clipboard:

```bash
printf '\x1b]52;c;%s\x07' "$(printf 'This text was set by OSC 52!' | base64 -w 0)"
```

# Nvim

Si queremos forzar que el clipboard de nvim funcione con OSC52:

```vim
let g:clipboard = 'osc52'
```

Funciona un poco mal, me deja el nvim pillado muchas veces con un mensaje de que está esperando al servidor de OSC52.
