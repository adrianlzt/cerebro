https://caddyserver.com/download?package=github.com%2Fgreenpau%2Fcaddy-security

# Google as IdP
Crear OAuth client ID
https://console.cloud.google.com/apis/credentials/oauthclient
Tipo: web app
Auth JS: https://caddy.foo.co
Auth redirect URI: https://caddy.foo.co/oauth2/google/authorization-code-callback


Config de ejemplo
https://raw.githubusercontent.com/authp/authp.github.io/main/assets/conf/oauth/google/Caddyfile

Tendremos que crear un uuid para usar como JWT_SHARED_KEY y definir también GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET.
Podemos quitar lo de "import tls_config" para que la cree sola con letsencrypt.

Al acceder a auth.myfiosgateway.com nos mandará al IdP de google.
Una vez autenticados veremos el "portal", donde tendremos links a las distintas cosas.
Esas "cosas" serán los vhosts que declaremos, como está el de assetq.myfiosgateway.com.
