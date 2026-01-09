# CPU al 100%

Mirar con strace que PID genera más trazas.

Mirar que thread es el culpable:

```bash
ps -T -p 1778846
```

Si es "NAT", mirar si el problema es que las DNS usadas del host no funcionan en el guest.

Setear las típicas de google.
