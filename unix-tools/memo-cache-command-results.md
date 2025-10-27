# memo

<https://raw.githubusercontent.com/aktau/dotfiles/refs/heads/master/bin/memo>

Recuerda la salida de un comando, para evitar tener que rejecutarlo.

```bash
memo curl https://httpbin.io/delay/5
```

Para borrar la cache:

```bash
memo -c curl https://httpbin.io/delay/5
```

Para borrar toda la cache:

```bash
memo -c
```

Almacena en /tmp/memo/

# bkt

<https://github.com/dimo414/bkt>

Como memo, escrito en rust.

```bash
bkt --ttl=1m -- curl https://httpbin.io/delay/3
```

Hace falta especificar el TTL, o pasarlo con BKT_TTL.

Almacena en /tmp/bkt-0.8-cache-u1000/
