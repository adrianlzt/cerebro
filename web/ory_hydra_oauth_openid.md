Para entender oauth2 mirar web/oauth.md

https://www.ory.sh/hydra/docs/index

Authorizaction server de  OAuth/OpenID


Posibles utilidades:

enable third-party solutions to access to your APIs: This is what an OAuth2 Provider does, Hydra is a perfect fit.

be an Identity Provider like Google, Facebook, or Microsoft: OpenID Connect and thus Hydra is a perfect fit.
Hydra perse no es un Identity provider (IdP), podemos usar https://github.com/janekolszak/idp o el de ejemplo que trae (nodejs, pero es una demo sin utilidad real)

enable your browser, mobile, or wearable applications to access your APIs: Running an OAuth2 Provider can work great for this. You don't have to store passwords on the device and can revoke access tokens at any time. GMail logins work this way.

you want to limit what type of information your backend services can read from each other. For example, the comment service should only be allowed to fetch user profile updates but shouldn't be able to read user passwords. OAuth 2.0 might make sense for you.


Cli, podemos bajarla en https://github.com/ory/hydra/releases/


Puerto 4444 es para interactuar con Hydra
4445 es el puerto administrativo (que no debe ser expuesto)


# Run server

## Kubernetes / helm
https://k8s.ory.sh/helm/hydra.html

helm repo add ory https://k8s.ory.sh/helm/charts

Desplegaremos una app de ejemplo que gestione login/logout/consent. pod: hydra-example-idp
Esta app la implementaríamos nosotros, y es donde gestionaremos el típico user/password en una db (por ejemplo).


Desplegaremos el server hydra
  pods: hydra y hydra-maester


Comprobar que podemos acceder a:
https://public-hydra.domain/.well-known/openid-configuration

Y a https://example-idp-hydra.domain/


### Maester
https://github.com/ory/k8s/blob/master/docs/helm/hydra-maester.md

Controller que gestiona oauth2 clients que se creen en el CRD oauth2clients.hydra.ory.sh

Ejemplo de un custom resource:
https://github.com/ory/hydra-maester/blob/master/config/samples/hydra_v1alpha1_oauth2client.yaml



## Docker-compose
go get -d github.com/ory/hydra
cd $GOPATH/src/github.com/ory/hydra
docker-compose -f quickstart.yml -f quickstart-postgres.yml up --build

Si estamos usando el docker-compose poner delante de los comandos:
docker-compose -f quickstart.yml exec hydra

El endpoint admin es http://127.0.0.1:4445/
el public http://127.0.0.1:4444/



# Admin

## Crear client OAuth2
hydra clients create --endpoint https://admin-hydra.domain/ --id my-client --secret secret -g client_credentials

Por defecto para recuperar un token a partir de un "code" tenemos que enviarlo en un post con auth basic.

Si queremos enviar las credenciales en el post (client_id=ID&client_secret=SECRET)
--token-endpoint-auth-method client_secret_post

Que tipos de flows permitimos al client:
--grant-types authorization_code,refresh_token,client_credentials,implicit

Que tipo de datos se podrá enviar al client (un code para que lo cambie por un token, un token, o un token de openid?)
Entiendo que esto va bastante intrincado con los grant-types que hayamos concedido (no podemos pedir un token si no tenemos el grant implicit, creo)
--response-types token,code,id_token

A que URL se podrá definir como redirect_uri (si queremos poner varios separar con coma):
--callbacks https://oidcdebugger.com/debug


Un ejemplo "con todo"
hydra clients create --endpoint https://hydra-admin.domain/ --id istio-authservice --secret secret123 --grant-types authorization_code,client_credentials,implicit --callbacks https://oidcdebugger.com/debug --response-types token,code,id_token




## Obtener token de un client
hydra token client --endpoint https://public-hydra.domain/ --client-id my-client --client-secret secret

## Inspeccionar el valor de un token
hydra token introspect --endpoint https://admin-hydra.domain/ --client-id my-client --client-secret secret 5txthIElu4tpf5idOZGkyT1TNay4qeg8tJuv6wMl9Xc.Uib5R1IVSqkg6bBGxemaLUrDWz7UKvpIpm5JF9I-2I0


## Mostrar info de un client
hydra clients get --endpoint https://hydra-admin.domain/ istio-sample-app-authservice



# Ejemplo openid connect
Crear un client:
hydra clients create --endpoint https://hydra-admin.domain/ --id testdebugger --secret secret123 -g client_credentials -c https://oidcdebugger.com/debug

Obtener el authorization_endpoint de https://hydra-public.domain/.well-known/openid-configuration

https://oidcdebugger.com/
Authorize URI: https://hydra-public.domain/oauth2/auth
Redirect URI: https://oidcdebugger.com/debug
Client ID: testdebugger
Scope: openid
Response type: code
Response mode: query
State: Hydra nos obliga a que sean al menos 8 caracteres.
Se suele usar para poner un anti-forgery token y/o a donde redirigir al user cuando termine el flow

Al enviar la request se nos reenviará a (decoded):
https://hydra-public.domain/oauth2/auth?client_id=testdebugger2&redirect_uri=https://oidcdebugger.com/debug&scope=openid&response_type=code&response_mode=query&state={"foo": 1231321}&nonce=nigck84ou8

El navegador enviará las cookies para este dominio.
Se nos reenviará al login provider (hydra-example-idp en el ejemplo que usamos)
https://example-idp-hydra.domain/login?login_challenge=2263bccf56d445c9b59913d104d9960d
Este usará el back channel para conectar con hydra y obtener info https://hydra/oauth2/auth/requests/login?login_challenge=2263bccf56d445c9b59913d104d9960d)
Hydra le devolverá un json para decirle si el usuario ya está autenticado.
Si no lo está, mostraremos el panel de login.
Si se ha logueado correctamente, o ya estaba auth, se lo diremos a hydra.
Aquí podemos ver un ejemplo de implementación en node:
https://github.com/ory/hydra-login-consent-node/blob/74e14f30ac9a04b536648a5634ade149841439db/routes/login.js#L10

Cuando el node le dijo a hydra que el usuario podía pasar, hydra le pasó una url para redirigir al usuario

Se nos reenviará de nuevo a https://hydra-public.domain/oauth2/auth añadiendo el param login_verifier=f7b95c857b9a45de883229f5e8a6faef

Y este a su vez nos renviará al consent, el que nos quien nos está solicitando acceso y a que.
https://example-idp-hydra.domain/consent?consent_challenge=7723efe27e7c45c685c22499591da95f
Este por detrás preguntara a Hydra datos de la request, para poder mostrar la info
https://github.com/ory/hydra-login-consent-node/blob/master/routes/consent.js


Al aceptar en esa web, se nos redirigirá de nuevo a https://hydra-public.domain/oauth2/auth añadiendo el param consent_verifier=ff10e4a1239f40cfb7935e1cf87b4c63 (ya sin el login_verifier)

Y eso nos llevará a la redirect_uri con el code: https://oidcdebugger.com/debug?code=N_rbziubzoLUHP2y03srVjJgpjlfgfv-2AAyWBR-qfQ.yyNuOnixe8KNn0GnuAygIxRFfEIgItD3RU1MlSNUHR8&scope=openid&state={"foo": 1231321}

Ahora la aplicación client intercambiará el code por un token, atacando a la url token_endpoint que pone en https://hydra-public.domain/.well-known/openid-configuration, usando su client id y el secret generado al crear el client:

curl -u "testdebugger3:secret123" https://hydra-public.domain/oauth2/token -d 'grant_type=authorization_code&code=jeJCdAy0yFAZWRSkJ0m3tJ1C4BDeaG5jbC3lS-2DBgE.rIrKqohux2LnVB0fo2RMyjzYhaSz5tq8s2mNkUPsprA&redirect_uri=https%3A%2F%2Foidcdebugger.com%2Fdebug'

Esto nos devolverá un JSON con los campos:
 access_token
 expires_in
 id_token (el JWT con la info del user según openid)
 scope
 token_type
