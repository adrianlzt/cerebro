vi scp://HOST//etc/hosts
vi scp://HOST/.ssh/id_rsa.pub

vi rsync://HOSTNAME//etc/hosts

# listen + remote commands

<https://neovim.io/doc/user/remote.html>

Arrancamos un nvim en modo servidor en el host remoto:

```
nvim --listen 0.0.0.0:8000 --headless
```

Para conectar como si estuvíeramos en el host remoto:

```bash
nvim --server 0.0.0.0:8081 --remote-ui
```

Ahora podemos enviarle comandos:

```
nvim --server 0.0.0.0:8000 --remote-send ':echo "Hello World!"<CR>'
```

# remove-nvim

<https://github.com/amitds1997/remote-nvim.nvim>

:RemoteStart
Seleccionar la opción que necesitemos

Instala neovim en el host remoto: ~/.remote-nvim/

Si queremos copiar neovim desde nuestra máquina al remoto mirar: <https://github.com/amitds1997/remote-nvim.nvim?tab=readme-ov-file#offline-on-remote>

En el remoto arrancará nvim en modo headless:

```
/home/user/.remote-nvim/nvim-downloads/v0.10.3/bin/nvim --listen 0.0.0.0:43201 --headless
```

También levanta un tunel ssh para mapear el puerto del nvim remoto a nuestro localhost.

Nota, si el fingerprint del servidor a cambiado, el port forwarding no funcionará.
Tendremos que borrar la clave el known_hosts.
