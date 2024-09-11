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

# Auth

Si queremos añadir auth podemos hacer uso de unos endpoints donde se puede obtener el login actual.

<https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-authorization>
<https://learn.microsoft.com/en-us/azure/static-web-apps/user-information?tabs=javascript>
