# ports

Listar los que ya se encuentran definidos:

```bash
semanage port -l
```

Un _attribute_ puede tener varios puertos asociados:

```
http_port_t                    tcp      80, 81, 443, 488, 8008, 8009, 8443, 9000
```

Setear el _attribute_ testprog_port_t con el puerto 10000:

```bash
semanage port -a -t testprog_port_t -p tcp 10000
```
