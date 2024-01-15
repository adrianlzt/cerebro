https://learn.microsoft.com/es-es/azure/azure-functions/
Mirar tambien app_services.md

Coste por uso.
Escalado automático.
Típico uso, event-driven, serverless, microservices.

Tipo amazon lambda.


Podemos probarlas en local con Azure Functions Core Tools.
En arch linux: aur/azure-functions-core-tools-bin


# CLI
Listar las funciones:
az functionapp list

Hacer un despliegue:
zip function.zip -r *
az functionapp deployment source config-zip --resource-group iaplike --name iap-like --src function.zip

Con una function-linux no me funciona este deployment. Devuelve un "Bad request".


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
  Ojo, tenemos que compilar y subir el código para ser ejecutado en windows, que es el server function que se levanta por defecto.
  "defaultExecutablePath": "handler.exe",
  GOOS=windows GOARCH=amd64 go build handler.go


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


# Auth
Podemos proteger las functions de dos maneras.

Una es con el "authLevel" definido en cada function.json, pudiendo elegir que acceda todo el mundo o que haga falta una api key.

Otra forma es con el authentication provider, donde configuraremos un identity provider.


# Conexion con virtual nets
https://learn.microsoft.com/en-us/azure/azure-functions/functions-networking-options?tabs=azure-cli

Requires a supported Basic or Standard, Premium, Premium v2, Premium v3, or Elastic Premium App Service pricing tier.

Creo que las functions de pago por uso no puede conectar a private virtual nets.
Hace falta usar el plan premium, que es bastante caro.
