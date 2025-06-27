Para copiar cuando estamos conectados en un server remoto:

https://jvns.ca/til/vim-osc52/

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
