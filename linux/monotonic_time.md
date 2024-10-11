Tiempo monotónico desde el arrande de linux (en nanosegundos):

```bash
awk '/^now/ {print $3; exit}' /proc/timer_list
```

Es el intervalo de tiempo, siempre credenciente, desde que arrancó el sistema.

En horas:

```bash
awk '/^now/ {print $3/1000/1000/1000/60/60; exit}' /proc/timer_list
```
