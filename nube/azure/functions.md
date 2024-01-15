https://learn.microsoft.com/es-es/azure/azure-functions/
Mirar tambien app_services.md

Coste por uso.
Escalado automático.
Típico uso, event-driven, serverless, microservices.

Tipo amazon lambda.


Podemos probarlas en local con Azure Functions Core Tools.
En arch linux: aur/azure-functions-core-tools-bin


# CLI
az functionapp list


# Desplegar app

Podemos subir el código con sftp:// (en linux usar lftp).
Para las credencials ver el "publish profile", usar "xq" para ver el .xml.
Ahí estarán distintas credenciales para distintos servicios de subida de datos.


## Local git
Nos crean un server git donde poder subir el código.

Para saber el user/pass, bajarnos el "publish profile" desde el "Deployment Center".
Será un XML donde tendremos el user (userName) y password (userPWD).

Al pushear el código lanzaremos el despliegue.

## Golang
https://blog.stackademic.com/a-quick-guide-to-creating-azure-function-with-golang-4c22b4f90e68
https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-other

Tenemos que subir un binario compilado.

Por defecto la ruta será URL/api/NOMBREFUNC

https://stackoverflow.com/a/67188482
Podemos quitar el "/api" metiendo en hosts.json
```
  "extensions": { "http": { "routePrefix": "" } }
```

En la function podemos poner que su ruta es "/".

Para ejecución local configurar en local.setting.json
```
{
  ...
  "Values": {
    ...
    "AzureWebJobsDisableHomepage": "true"
  }
}
```
