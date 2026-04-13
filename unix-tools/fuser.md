Herramienta para encontrar el proceso que tiene abierto un fichero, socket, puerto.

```bash
❯ sudo fuser -v 22/tcp
                     USER        PID ACCESS COMMAND
22/tcp:              root       1266 F.... sshd
```

Podemos usar -k para matarlo

-ki para matarlo preguntando antes
