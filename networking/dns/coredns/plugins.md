Para obtener los que tiene instalados:
kc -n kube-system exec -it coredns-76b4fb4578-6tqc8 -- /coredns -plugins

# Host

Definir entradas a mano

```
. {
    hosts {
        # Syntax: [IP_ADDRESS] [HOSTNAME]
        192.168.1.100  myserver.local
        10.0.0.5       database.internal

        # Important: Allow other queries to pass to the next plugin
        fallthrough
    }

    # Forward all other queries to Google DNS (or your upstream)
    forward . 8.8.8.8
}
```
