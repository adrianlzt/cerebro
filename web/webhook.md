https://github.com/adnanh/webhook
https://www.hookdoo.com/ -> SaaS de pago

Levanta un server web que escucha webhooks y ejecuta comandos.

# Install
go get github.com/adnanh/webhook


# Config
https://github.com/adnanh/webhook/wiki/Hook-Definition
Se hace en un fichero hooks.json, donde definimos que comandos ejecutar para que IDs

Ejemplos: https://github.com/adnanh/webhook/wiki/Hook-Examples

## Parametros
https://github.com/adnanh/webhook/wiki/Hook-Examples
Pasar parametros al comando. Params puestas en la url, variables de entorno, valores de un json (si es un json, el content-type del envio debe ser application/json)
  pass-arguments-to-command:
    [
      {
        source: payload,
        name: push_data
      },
      {
        source: url,
        "name": "param"
      }
    ]




## Rules
https://github.com/adnanh/webhook/wiki/Hook-Rules
Analizar el json enviando por el webhook para decidir si lanzar el comando


# Run
El ID será el que pongamos al ejecutar el hook:
http://yourserver:9000/hooks/ID



# Docker
Correr como un container
https://hub.docker.com/r/almir/webhook/

docker run --rm -it -p 9000:9000 -v "$PWD:/etc/webhook" almir/webhook -verbose -hooks=/etc/webhook/hooks.json -hotreload
