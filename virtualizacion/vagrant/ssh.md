Lo que hace cuando ejecutamos: vagrant ssh

```bash
ssh vagrant@127.0.0.1 -p 2222 -o LogLevel=FATAL -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o IdentitiesOnly=yes -i .vagrant/machines/default/virtualbox/private_key
```

Antiguamente:

```bash
ssh vagrant@127.0.0.1 -p 2222 -o LogLevel=FATAL -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o IdentitiesOnly=yes -i /home/adrian/.vagrant.d/insecure_private_key
```

Hacer tunel:

```bash
vagrant ssh -- -L 9090:127.0.0.1:9090
```
