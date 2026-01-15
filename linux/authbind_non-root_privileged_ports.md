<https://en.wikipedia.org/wiki/Authbind>

Permitir a un usuario no root bindear puertos privilegiados.

Ejemplo para permitir a mi usuario bindear el puerto 443:

```bash
sudo touch /etc/authbind/byport/443
sudo chown $USER /etc/authbind/byport/443
sudo chmod 755 /etc/authbind/byport/443
```

```bash
❯ ls -la /etc/authbind/byport/443                                                    -rwxr-xr-x 1 adrian root 0 ene 12 09:24 /etc/authbind/byport/443
```

Arrancar un programa escuhando en el 443:

```bash
authbind python -m http.server 443
```

# Como funciona

LD_PRELOAD para capturar las syscall `bind()`, comprobar la configuración y luego usert el setsuid /usr/lib/authbind/helper

Puede dar problemas para programas linkados estáticamente, que no usen la llamada a "bind".
