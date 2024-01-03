https://www.vaultproject.io/


# Arrancar server
Tenemos que inicializarlo tras arrancarlo:
vault init -key-shares=1 -key-threshold=1

Luego hacer el unseal.
Luego loguearnos.



# Auth methods
https://developer.hashicorp.com/vault/docs/auth

Podemos usar servicios de terceros para hacer la autenticación: AWS, Azure, Google cloud, github, etc.

Vault funciona validando el usuario y devolviéndole un token. Todas las peticiones en adelante se harán con ese token.

Auth con user/pass
https://www.vaultproject.io/docs/auth/userpass.html

Tenemos que activar el Auth Method user/pass.
vault auth enable userpass

Una vez activo usaremos la consola para crear usuarios:
vault write auth/userpass/users/mitchellh password=foo policies=admins

Para que funcione la cli (tendremos que pasar un token):
vault login


Para máquinas usar AppRoles
https://developer.hashicorp.com/vault/docs/auth/approle


MFA/2FA
https://developer.hashicorp.com/vault/docs/auth/login-mfa

## Identity
https://developer.hashicorp.com/vault/docs/secrets/identity

Internamente Vault usa identity/ para almacenar los clientes conectados (excepto los que usan tokens).

vault path-help identity/

Ver las entities:
vault list identity/entity/id/

Detalle de una:
vault read identity/entity/id/53dcc787-3fa3-ce57-21bb-04b472957be5

Esas entities tendrán mapeados "alias", que serán los distintos métodos de acceso que se habrán usado:
vault list identity/alias/id/


# Engines
https://developer.hashicorp.com/vault/docs/secrets

Son "funciones" que puede realizar Vault.
Cada una asociada a un "path".
Por ejemplo:
  kv: almacenar key-values, la kv-v2 tiene versionado (por defecto 10)
  totp
  certificados
  cloud varias: generar tokens dinámicos de acceso con tiempo de vida
  cubbyhole: engine temporal asociado a un token que se destruye cuando expira el token, parece como un "create temp table" de sql. Útil para compartir credenciales, mirar "Share secrets"

Ver los que tenemos disponibles:
vault plugin list secret

Ayuda específica de cada engine:
vault path-help PATH/

Cada engine está separado del resto. Si hackeasen un engine, no podrían saltar al resto.
https://developer.hashicorp.com/vault/docs/secrets#barrier-view


## Database
https://developer.hashicorp.com/vault/docs/secrets/databases
Un tipo especial de engines son los de tipo database

vault plugin list database

Vault tiene una credencial hardcoded asociada a la db y genera credenciales dinámicas a los usuarios de vault.


Uso:
Activar el plugin
vault secrets enable database

Creamos una nueva entrada para configurar, por ejemplo, un postgres:
vault write database/config/my-postgresql-database \
    plugin_name="postgresql-database-plugin" \
    allowed_roles="my-role" \
    connection_url="postgresql://{{username}}:{{password}}@localhost:5432/database-name" \
    username="vaultuser" \
    password="vaultpass" \
    password_authentication="scram-sha-256"

Configuramos un role para esa db:
vault write database/roles/my-role \
    db_name="my-postgresql-database" \
    creation_statements="CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}'; \
        GRANT SELECT ON ALL TABLES IN SCHEMA public TO \"{{name}}\";" \
    default_ttl="1h" \
    max_ttl="24h"

Obtenemos credenciales (durará 1h, renovable hasta 24h):
vault read database/creds/my-role





# ACL
https://learn.hashicorp.com/vault/identity-access-management/iam-policies.html
En esta web tenemos unas plantillas para crear ACLS para usuarios tipo: admin, provisioner
  https://learn.hashicorp.com/vault/identity-access-management/iam-policies.html#example-policy-for-admin


Las ACL deciden que se puede hacer para cada path.
Ejemplo:
path "secret/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

Esta ACL permite todos las capabilities bajo el path secret/

Luego tendremos que poner las policies a los usuarios:
write auth/userpass/users/nombre policies=admins,all


Permitir ver los engines que hay:
path "sys/mounts"
{
  capabilities = ["read"]
}

vault secrets list


# Grupos
Podemos crear un grupo y asignarle unas ACLs.
Luego podemos agregarle unos usuarios.
Los usuarios heredaran las ACLs del grupo.


# Entities / alias
Varios usuarios de distintos auth engines pueden unirse en un entitie.
Sería la forma de centralizar el usuario que se loguea por github y por ldap.


# Audit
https://developer.hashicorp.com/vault/docs/audit
Detailed log of all requests to Vault, and their responses

Por defecto no viene activo.

Asegurarnos que tiene permisos de escritura en el path:
vault audit enable file file_path=/var/log/vault_audit.log

Nos genera un JSON por cada iteración.
La información sensible viene hasheada. Es posible desactivarlo (log_raw=true), pero entonces estaremos volcando información confidencial en el log.

elide_list_responses, por si queremos quitar las respuestas tipo "list", que pueden generar entradas muy largas en el log.


# Password policies / generación contraseñas
https://developer.hashicorp.com/vault/docs/concepts/password-policies
https://developer.hashicorp.com/vault/docs/secrets/kv/kv-v2#:~:text=Write%20a%20password%20policy%3A

En kv podemos usarlo para tener un generador de passwords de un formato determinado.
Típico uso:
vault kv put -mount=secret my-generated-secret \
    password=$(vault read -field password sys/policies/password/example/generate)

Por defecto vault tiene una política por defecto para generar contraseñas (cuando usamos plugin "databases" que crear passwords dinámicas).




# CLI

## Loguearnos server remoto
vault login -address=http://vault.com:8200 -method=userpass username=adrian
Otra forma:
VAULT_ADDR=http://vault.com:8200 vault ...

Cada vez que queramos comunicar con un server que no es local deberemos pasar el VAULT_ADDR o -address


## Autocompletado
https://www.vaultproject.io/docs/commands/index.html#autocompletion

Para que funcione el autocompletado tendremos que tener el ACL:
path "sys/mounts" {
    capabilities = ["read"]
}
Asi podemos hacer cosas tipo:
vault read s*<TAB>
E ir navegando por el arbol de secrets

Parece que "vault kv get/put/... <TAB>" no funciona
Tampoco para "vault write"

## Status
vault status
vault status -tls-skip-verify


## Crear new vault server
vault operator init -key-shares=1 -key-threshold=1
  los parámetros indican que la master key solo se dividirá en un trozo y que hará falta un solo trozo para abrir el vault
  devolverá el número de claves master especificado en key-shares y un root token (como se loguea el user root contra el vault)


## Desbloquear/abrir el vault
vault operator unseal
vault operator unseal $KEY
  debemos pasar las keys necesarias para abrirlo, ejecutando el comando el número de veces definido en key-threshold

## Bloquear/cerrar el vault
vault operator seal
  esto será una operación poco común, realizada cuando consideremos que el vault está en riesgo
  solo se podrá abrir de nuevo metiendo las claves master
  cualquier user root puede hacer seal del vault


### kv storage
Listar contenidos de un storage tipo KV (con el motor KV debe usarse "kv get/list/put" en vez de directamente "get/list/put")
vault kv list nombrePath
vault kv put some/path foo=bar foo2=bar2
  si ya existe "some/path", lo estaremos borrando y recreando con estos valores
vault kv get some/path
vault kv get -version=2 some/path
vault kv delete some/path
vault kv undelete -version=2 some/path
vault kv get metadata some/path
  metadata de la entrda. Tambien muestra todas las versiones que ha tenido (fecha de creación y borrado)
vault kv metadata put -mount=secret -max-versions 2 -delete-version-after="3h25m19s" my-secret
  borrar entradas antiguas

Actualizaciones parciales:
vault kv patch foo/bar bar=123

Actualiza la versión 6 de kv/foo. Si tuviésemos una versión más moderna, falla.
vault kv patch -cas=6 kv/foo user2=jose3



En el KV engine se puede confiurar para borrar los secrets cada x tiempo:
https://www.vaultproject.io/api-docs/secret/kv/kv-v2#delete_version_after


### TOTP
vault write totp/keys/my-key4 url="otpauth:///?secret=AAB7LBD7AAAAAAAA"
vault read totp/code/my-key4

https://developer.hashicorp.com/vault/docs/secrets/totp#as-a-provider
Tambíen se puede usar como provider.
Generando el código totp, que un cliente usará para generar el código totp y luego pudiendo verificar que ese código es correcto.
vault write totp/keys/my-gen generate=true account_name=x issuer=x
  nos da el código en la variable "secret" de la url.

No implementado en la UI.




### SSH
https://developer.hashicorp.com/vault/docs/secrets/ssh

#### One time password
https://developer.hashicorp.com/vault/docs/secrets/ssh/one-time-ssh-passwords
El host remoto necesita poder conectar contra vault.


#### Signed certificates
Se crea una CA. Su llave pública se lleva a los servers donde queremos acceder.
Vault firma certificados ssh para permitiendo acceder a los servidores.

Activar el engine
vault secrets enable -path=ssh-client-signer ssh

Crear una CA para firmar los certs:
vault write ssh-client-signer/config/ca generate_signing_key=true
O si ya tenemos una CA:
vault write ssh-client-signer/config/ca \
    private_key="..." \
    public_key="..."


La clave pública que genera la configuraremos como TrustedUserCAKeys en los servidores donde queramos acceder.
/etc/ssh/sshd_config.d/trusted_user_ca.conf
TrustedUserCAKeys /etc/ssh/trusted-user-ca-keys.pem

/etc/ssh/trusted-user-ca-keys.pem
ssh-rsa AAAAB3NzaC1...

Reiniciamos sshd


Creamos un role para firmar certificados ssh:
vault write ssh-client-signer/roles/my-role -<<"EOH"
{
  "algorithm_signer": "rsa-sha2-256",
  "allow_user_certificates": true,
  "allowed_users": "*",
  "allowed_extensions": "permit-pty,permit-port-forwarding",
  "default_extensions": {
    "permit-pty": ""
  },
  "key_type": "ca",
  "default_user": "ubuntu",
  "ttl": "30m0s"
}
EOH

El default_user deberá matchear con el usuario contra el que queremos loguear.

Firmamos nuestra clave ssh:
vault write -field=signed_key ssh-client-signer/sign/my-role public_key=@$HOME/.ssh/id_rsa.pub > /tmp/foo
  podemos pedir otro usuario con "valid_principals=administrator"
chmod 600 /tmp/foo
Accedemos pasando la clave firmada y nuestra clave ssh:
SSH_AUTH_SOCK="" ssh -v -i /tmp/foo -i ~/.ssh/id_rsa USUARIO@HOST

Si guardamos la clave en este path, ssh la cogerá automáticamente:
vault write -field=signed_key ssh-client-signer/sign/my-role public_key=@$HOME/.ssh/id_rsa.pub > ~/.ssh/id_rsa-cert.pub

Ver datos de la clave firmada:
ssh-keygen -Lf /tmp/foo


# Share secrets
https://developer.hashicorp.com/vault/tutorials/secrets-management/cubbyhole-response-wrapping

Si queremos compartir unas credenciales con alguien, que también tiene acceso a Vault:
 - crearemos lo que necesitamos en nuestro cubbyhole
 - haremos un wrap de ese secret
 - compartiremos la cadena generada
 - la otra persona podrá obtener la credencial una única vez

Desde la web también se puede hacer. En tools también podemos generar un wrapped al vuelo y tenemos una tool para hacer el unwrapped.


Obtenemos el wrapped token, ejemplos para cubbyhole y kv:
vault read -wrap-ttl=5m cubbyhole/pepe
vault kv get -wrap-ttl=120 kv/dev
vault read -wrap-ttl=5m -field=wrapping_token cubbyhole/pepe
  Para solo sacar el token.
  Podemos obviar -wrap-ttl si usamos la variable de entorno VAULT_WRAP_TTL


La otra persona usa esto para leerlo:
vault unwrap hvs.XXXX


# Docker
VERSION=0.11.5
docker run --restart=unless-stopped \
  -v "$PWD/vault/config:/vault/config" \
  -v "$PWD/vault/file:/vault/file" \
  --cap-add=IPC_LOCK \
  -d -p 8200:8200 \
  --name=vault-${VERSION} vault:${VERSION} server

docker exec -it vault sh



# UI
La oficial es de pago: https://www.vaultproject.io/docs/enterprise/ui/index.html
Con el container viene la UI. Ya no es de pago? (30/10/2018)

ARCHIVED
La mejor (Vue.js + Go): https://github.com/caiyeon/goldfish
Demo: https://vault-ui.io/
Prod: https://github.com/Caiyeon/goldfish/wiki/Production-Deployment

Otra en React: https://github.com/djenriquez/vault-ui ARCHIVED
Otra: https://github.com/nyxcharon/vault-ui ARCHIVED


# API
curl -H "X-Vault-Token: foobarxxx" "http://127.0.0.1:8200/v1/secret?list=true"

https://developer.hashicorp.com/vault/api-docs/system/health
Obtener el estado del vault:
curl -s localhost:8200/v1/sys/health | jq


# Vault agent and proxy
Aplicaciones para facilitar la integración de apps existentes con vault.
Podremos atacar a su API sin necesitar el token.

## AutoAuth
https://developer.hashicorp.com/vault/docs/agent-and-proxy/autoauth

Ambos tienen la funcionalidad de AutoAuth.
Se loguean contra Vault y dejan en un fichero la clave.
Actualizan ese fichero cuando caduque la clave.

## Cache
Ambos tienen cache, pero parece que solo cachean tokens y leases.
Valores de un engine kv no se cachean, en el log del agente/proxy vemos:
[DEBUG] agent.cache.leasecache: pass-through response; secret not renewable: method=GET path=/v1/kv/data/prod/zabbix

En la versión 1.16 el proxy podrá cachear kv: https://github.com/hashicorp/vault/issues/19879


## Vault proxy
Parece que es un intermediario con Vault que tiene AutoAuth y puede cachear.

## Vault Agent
Parece que es para generar ficheros a partir de templates usando info de vault.
También puede ejecutar procesos inyectando secretos como variables de entorno.
Puede cachear.



# Ansible
https://docs.ansible.com/ansible/devel/plugins/lookup/hashi_vault.html

Otro módulo no oficial con ciertas mejoras: https://github.com/jhaals/ansible-vault


# Debug
https://www.vaultproject.io/docs/commands/debug

vault debug
  lo arrancamos, hacemos interacciones y lo paramos. Nos genera un .tgz con ficheros con datos (pero no veo las llamadas de clientes)
