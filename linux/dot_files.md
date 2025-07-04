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
chezmoi managed --include=encrypted
```

Hacer como un "git status":

```bash
chezmoi status
```

Si vemos 'MM' es que tiene modificaciones locales.
Si vemos 'M' es que hay ficheros en chezmoi más modernos que en nuestros dotfiles.

## Config

~/.config/chezmoi/chezmoi.toml

## Encriptar

Una buena práctica es encriptar los ficheros para que no sean legibles en el repo.
Meter muchos ficheros luego da problems con el "diff", porque el gpg a veces falla al intentar descomprimir algunos ficheros.
Mejor reducir el número de ficheros encriptados.

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
args = ["--quiet"]
```

Listar todo los ficheros encriptados:

```bash
chezmoi managed --include=encrypted
```

## Git

Config:

```toml
[git]
autoCommit = true
autoPush = true
```

Para hacerlo a mano, distintas opciones:

```bash
chezmoi cd && git ...
chezmoi git -- status
```

Bajar los cambios de remoto y aplicarlos:

```bash
chezmoi update
```

Más seguro, bajar y ver que va a cambiar:

```bash
chezmoi git pull -- --autostash --rebase && chezmoi diff
```

Si nos gusta:

```bash
chezmoi apply
```

Podemos solo aplicar ciertos ficheros:

```bash
chezmoi apply ~/.bashrc
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

To automatically run chezmoi apply whenever you save the file in your editor, run:

```bash
chezmoi edit --watch $FILENAME
```

## Configurar nueva máquina

```bash
sh -c "$(curl -fsLS get.chezmoi.io)" -- init --apply adrianlzt
```

Para contenedores podemos usar (la diferencia es que borra los ficheros de chezmoi, dejando solo los dotfiles):

```bash
sh -c "$(curl -fsLS get.chezmoi.io)" -- init --one-shot $GITHUB_USERNAME
```

## Templates

<https://www.chezmoi.io/user-guide/manage-machine-to-machine-differences/#use-templates>
<https://www.chezmoi.io/user-guide/templating/#template-data>

Para ver que datos podemos usar en las

```bash
chezmoi data
```

Podemos añadir más datos en: ~/.config/chezmoi/chezmoi.toml

Integración con gopass: <https://www.chezmoi.io/user-guide/password-managers/gopass/>

Añadir un fichero como una template:

```bash
chezmoi add --template ~/.config/chezmoi/chezmoi.toml
```

Convertir un fichero en template:

```bash
chezmoi chattr +template ~/.zshrc
```

## Instalar paquetes

<https://www.chezmoi.io/user-guide/advanced/install-packages-declaratively/>

<https://www.chezmoi.io/user-guide/advanced/install-your-password-manager-on-init/>

## Configurar un nuevo host

```bash
chezmoi init git@github.com:adrianlzt/dotfiles.git
chezmoi diff
chezmoi apply
```
