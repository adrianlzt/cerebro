<https://azure.github.io/static-web-apps-cli/>

Azure nos permite desplegar webs estáticas (también se le puede añadir conexiones a db, serverless functions, etc).

Para manejarlas podemos hacer uso de la cli "swa" (aur/azure-static-web-apps-cli-bin).

Un ejemplo para desplegar un docusaurus:

```bash
npx create-docusaurus@latest foo classic --typescript
cd foo
swa
```

Esto nos ayudará a configurar swa, crear la SWA en azure y desplegar la web en preview.
Si queremos customizar donde debe crear la SWA, tendremos que usar algún fichero de configuración, en la CLI no da mucha flexibilidad para ello.

Para cambiar el plan de Free a Standard lo he hecho desde la web.

Para desplegar en producción:

```bash
swa deploy --env production
```

Al hacer deploy no estaremos haciendo el build.
Tendremos que primero generar el build con:

```
swa build
```

También podemos hacer un build tipo dev y luego subirlo:

```bash
yarn build --dev
swa deploy
```

# Auth

Si queremos añadir auth podemos hacer uso de unos endpoints donde se puede obtener el login actual.

<https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-authorization>
<https://learn.microsoft.com/en-us/azure/static-web-apps/user-information?tabs=javascript>

En cualquier SWA, podemos loguearnos usando github o azure.
Ejemplo para azure.

Entrar en:
<https://miweb.swa/.auth/login/aad>

Una vez hecho el proceso de login podemos obtener la información del usuario en:
<https://miweb.swa/.auth/me>

Desde Settings -> Role management podemos invitar a usuarios mediante email.
En ese momento le podemos asignar unos roles.
