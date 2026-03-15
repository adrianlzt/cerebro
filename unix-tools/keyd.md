https://github.com/rvaiya/keyd
Tal vez mejor kmonad?

A key remapping daemon for linux.

Pequeño y funcional, pero parece que kmonad es más potente.

Es un daemon

```bash
sudo systemctl enable keyd
sudo systemctl start keyd
sudo keyd reload
```

# Buscar una tecla

```bash
sudo keyd monitor
```

# Config

/etc/keyd/default.conf
```toml
[ids]
*

[main]
capslock = escape

# Usar la cedilla como /
\ = S-7
# Poner directamente `
[ = macro([ space)

[altgr]
# G- tells keyd to explicitly hold AltGr while pressing the key
\ = G-\
```
