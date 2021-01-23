identiy: a set of facts about a thing that make it what it is
single sign-on: un único acceso para poder acceder a todo lo que necesitamos

oauth -> authorization -> decir que puede hacer un usuario (grant access to your api, getting access to user data in other systems)
openid -> authentication -> decir quien es un usuario (logging the user in, making your accounts available in other systems)

Mirar ejemplos prácticos abajo.

https://www.youtube.com/watch?v=996OiexHze0
  OAuth 2.0 and OpenID Connect (in plain English)

https://www.oauth.com/
Libro hecho por okta
Tiene un "playground"


# OAuth
http://oauth.net/
https://developers.google.com/identity/protocols/OAuth2

https://twitter.com/sec_r0/status/1347603985096724493
gráficos explicativos con los distintos code flows


An open protocol to allow secure authorization in a simple and standard method from web, mobile and desktop applications.
Es una forma de autenticarse por tokens en vez de htpasswd
OAuth1 ya no se usa.

El típico ejemplo es cuando una app nos pide acceso para acceder a nuestros contactos, se llama el flow "Authorization channel".
Este es el use case original (authorization)
Pero oauth también se ha extendido a otros casos de uso de authentication

## Flow: Authorization channel
El "client" (por ejemplo, Uber), pide al "resource owner" (nosotros), que quiere acceder a nuestros contactos (que los tiene el "Resource server")=.
Para ello, al clickar en una web de uber, nos redirigirá a una web (el "Autorization server", por ejemplo accounts.google.com) donde en la URL irá:
  los scopes (que recursos) solicita (param scope en el caso de google)
  quien los solicita (client_id)
  un callback/redirect uri (redirect_uri). Los dominios permitidos podrán estar registrados a priori, para evitar que alguien modifique la request y acabe donde no debe
  en el caso de google también se puede pasar un "state" que nos devolverá luego google en el callback
Llegaremos a la web de google, nos autenticaremos con nuestro user&pass, nos mostrará un cartelito de quien nos está solicitando y el que exactamente.
Si aceptamos, nuestro navegador cargará la web redirect_uri con el código proporcionado por google como un parámetro de la uri, para que el "client" pueda cogerlo.
La web del cliente (Uber) recibirá ese código y lo podrá intercambiar por un token para acceder a la información que solicitó (únicamente a esa información).

Back channel: tráfico considerado seguro, por ejemplo tráfico encriptado ente los servicios de tu backend
Front channel: tráfico que puede ser interceptado, por ejemplo entre el navegador y un servicio

Todo ese flujo (excepto la conex Uber ---código--> google) es "front channel", tráfico "no seguro", que alguien podría interceptar.
Por eso google no pasa directamente el token para acceder a los datos por ahí.
Pasa ún codigo que solo el client podrá intercambiar por el token.
En el caso de que alguien pudiese esnifar ese tráfico, obtendrían un código que no podrían usar.

La obtención del token se hará en el back channeld (uber ---código--> google) con una secret key que tendrá el client.
Cuando nos registramos en google como "client", no da un client_id (lo que pasaremos en el primer redirect a accounts.google) y un client_secret (que usará el client para obtener el token)


Existen otros tipos de flows:
 - Implicit: nos devuelven el token directamente por el front channels (por si no tenemos back channel, por ejemplo un app que solo corre en el navegador, react o js por ejemplo). Menos seguro
 - Resource owner password credentials (back channel only): para apps viejas, no recomendado
 - Client credentials (back channel only): normalmente usado en machine 2 machine communication (no usado normalmente)

## Debugger oauth
https://oauthdebugger.com/

Nos permite generar una llada oauth2 a un server y obtener el resultado del callback.
Un ejemplo sería:
Authorize URI: https://accounts.google.com/o/oauth2/v2/auth
Redirect URI: https://oauthdebugger.com/debug
Client ID (el client id de pixlr): 419782477519.apps.googleusercontent.com
Scope: https://www.googleapis.com/auth/drive.file

No nos dejará porque el dominio del redirect_uri no está aceptado para el client_id registrado en google


## OAuth con google para una cli
User -> web google
Retorna un codigo.
Usamos la key y el codigo para obtener el token

Solicitamos para la app con client id CLIENTID permisos para acceder a los reminders.
Esta web la tendremos que abrir con el navegador y nos devolverá un código.
curl "https://accounts.google.com/o/oauth2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Freminders&response_type=code&client_id=CLIENTID&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob"

Luego usaremos ese código para obtener el token de acceso a la API:
curl -vd "client_id=CLIENTID&client_secret=CLIENTSECRET&redirect_uri=urn:ietf:wg:oauth:2.0:oob&grant_type=authorization_code&code=4/EAF_cd1Kri59d0QnVJQVECMYZ5MlVlBvasDjQZ91eoi0LuRL0tm6T1Y" https://accounts.google.com/o/oauth2/token

{
  "access_token": "a29.GlvQBr2ciF9wT-Y4PcqdKWhr_kRKCrEQL9SkggqkPlhOv3mA7LxhR2_vEnvuO",
  "expires_in": 3600,
  "refresh_token": "1/9uypr7jLW7ax7qPA2Bxwo6jk5cd7n-GNln",
  "scope": "https://www.googleapis.com/auth/reminders",
  "token_type": "Bearer"
}


## OAuth Google para una web
Ponemos el response_type=token
Tras acceder el cliente, google nos pasa el token a la redirect_uri



## Flow autentication
OAuth no se pensó para authentication, pero se "hackeo" para poder usarlo.
No estaba pensado para este use case. No hay una forma estandar de pasar la información del usuario al client.
Se han hecho diferentes implementaciones (por ejemplo "Facebook login" o "Google login", lo de loguearnos en distintas webs con nuestra cuenta de google/facebook).

Para solucionar este problema se creó OpenID





# OpenID Connect
Montado encima de OAuth2 (una extensión).
Los distintos flows de OpenID: https://medium.com/@darutk/diagrams-of-all-the-openid-connect-flows-6968e3990660

OpenID era otra cosa para autenticarnos con nuestro dominio (algo de que metías cierta metadata en tu web y donde te querias loguear chequeaba eso)

Añade:
  - id token (info sobre el user, para el response_type)
  - userinfo endpoint, para obtener más info del user a partir del id token
  - standar set of scopes (los scopes de oauth)
  - implementación estandarizada

El flow es muy similar al "Autorization channel", la diferencia es que en los scopes que se envían al authorization server se pasa el scope "openid profile".
Con el "code" que se devuelve al redirect_uri podemos obtener el token id del usuario y su token para solicitar cosas.

Flows con openid:
  simple login
  single sign-on across sites
  mobile app login

Podemos pedir:
 - code (auth code), que intercambiaremos por un token
 - access token: para poder acceder a los recursos (creo que tenemos que usar el flow implicit obligatoriamente)
 - id token: info sobre el usuario (creo que tenemos que usar el flow implicit obligatoriamente)



## Debugger
https://oidcdebugger.com/

En el authorize uri poner la url de un server de openid.
En el scope poner "openid"
Solicitar "id_token", que será un JWT (json web token)
Podemos leer ese token en https://www.jsonwebtoken.io/

## JWT (json web token)
Header
Payload
  user, email, expiración, etc
Signature
  para verificar que este JWT es válido (firmado con una clave privada del openid server que podemos verificar con su clave pública)






# Ejemplos

## Web app with server backend
https://youtu.be/996OiexHze0?t=3466
Usaremos OpenID connect (code flow) para obtener el ID token.
Luego setearemos una cookie al usuario para trackear el id token que le pertenece.
Logramos separación entre la app y el sistema de auth.

## native mobile app
Usaremos OpenID connect, code flow + PKCE (prove code for key exchange) para obtener el ID token.
Ese se almacenará en alguna keychain del dispositivo.
Toda la gestión de hablar con un openid server está ya programada en una lib llamada AppAuth

## SPA (single page application) con API backend
OpenID connect (implicit flow), obteniendo token y id token.
Con id token sabemos quien es el usuario.
El token lo usamos para las peticiones que realizemos a las APIs.
Tener cuidado de que esos tokens no puedan ser "leaked". Medidas extra de seguridad de JS.

