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

Buscar en que directorio se ha instalado el "virtual env" y borrarlo completo:

```bash
ls ~/.npm/_npx/*/node_modules | grep matcha-stock

```
