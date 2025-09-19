https://ssh-j.com/

expose SSH behind NAT

En la máquina que queremos exponer el ssh:
```bash
ssh any-username@ssh-j.com -N -R laptop-behind-nat:22:localhost:22
```

Para conectar remotamente:
```
ssh -J any-username@ssh-j.com laptop-behind-nat
```
