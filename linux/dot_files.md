<http://www.electricmonk.nl/log/2015/06/22/keep-your-home-dir-in-git-with-a-detached-working-directory/>

config='git --git-dir=/home/adrian/.config.git/ --work-tree=/home/adrian'

# Chezmoi

[chezmoi](https://www.chezmoi.io/).

Crea un repo git en ~/.local/share/chezmoi/

Añadir ficheros con:

```bash
chezmoi add ~/.bashrc
```

Añade los ficheros también a una boltdb:

```
.config/chezmoi/chezmoistate.boltdb
```

Pone el path, sha256, mode y tipo.

Para ver que tenemos añadido podemos hacer:

```bash
ls -R /home/adrian/.local/share/chezmoi
```

## Config

~/.config/chezmoi/chezmoi.toml

## Encriptar

Una buena práctica es encriptar los ficheros para que no sean legibles en el repo.

<https://www.chezmoi.io/user-guide/encryption/gpg/>

Los que queramos encriptar hacerlo con:

```bash
chezmoi add --encrypt FICHERO
```

Si añadimos un fichero sin --encrypt, luego podemos hacer el add --encrypt para que lo meta encriptado.
Pero cuidado si tenemos autocommit.

Config:

```toml
encryption = "gpg"
[gpg]
recipient = "adrianlzt@gmail.com"
```

## Git

Config:

```toml
[git]
autoCommit = true
autoPush = true
```

## Editar un fichero

Lo editaremos con chezmoi y luego aplicaremos los cambios:

```bash
chezmoi edit ~/.bashrc
chezmoi apply
```

To automatically run chezmoi apply when you quit your editor, run:

```bash
chezmoi edit --apply $FILENAME
```

```
To automatically run chezmoi apply whenever you save the file in your editor, run:

```bash
chezmoi edit --watch $FILENAME
```
