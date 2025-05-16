Como instalar arch linux

<https://gist.github.com/zengxinhui/f328fdce54f5039689ee3aa4e91fc805>

Tuve que modificar el /etc/pacman.conf para meterle

```
SigLevel    = Never
```

Me daba fallo de las keys al hacer `pacstrap /mnt base linux`
