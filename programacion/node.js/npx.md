<https://docs.npmjs.com/cli/v11/commands/npx>

<https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b>

Ejecutar programas de node pasando el nombre del paquete.
Bajará temporalmente las deps necesarias, ejecutará y se saldrá.

# Install

sudo npm install -g npx

# Uso

```bash
npx -y @angular/cli new my-app
```

Un repo de github:

```bash
npx github:myuser/my-cli-tool#dev-branch
```

Buscar en que directorio se ha instalado el "virtual env" y borrarlo completo:

```bash
fd FOO ~/.npm/_npx/
```
