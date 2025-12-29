Para que systemd pueda arrancar nuestra aplicación necesitamos meter esta macro:

```
init_daemon_domain(testprog_t, testprog_exec_t)
```

Nuestra aplicación correrá con el contexto:

```
system_u:system_r:testprog_t:s0
```
