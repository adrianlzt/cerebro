http://oauth.net/

An open protocol to allow secure authorization in a simple and standard method from web, mobile and desktop applications.

Es una forma de autenticarse por tokens en vez de htpasswd


Dependiendo que tipo de credential registremos, al menos en google, el redirect tendrá que ser distinto.
Si registramos una Web, tendremos que poner una web de redirección válida con un dominio permitido en la Pantalla de autorización de oauth


# Para cli
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


# Para web
Ponemos el response_type=token
Tras acceder el cliente, google nos pasa el token a la redirect_uri
