<https://www.vaultproject.io/>

Vault VS passwords managers
<https://web.archive.org/web/20211206021559/https://www.reddit.com/r/devops/comments/r9r5u7/comment/hneodbp/>

# Install

<https://developer.hashicorp.com/vault/install>

## Production hardening

<https://developer.hashicorp.com/vault/tutorials/operations/production-hardening>

Best practices:
<https://www.linkedin.com/pulse/securely-storing-secrets-best-practices-hashicorp-vault-pavel-topal>
<https://medium.com/hashicorp-engineering/how-id-attack-your-hashicorp-vault-and-how-you-can-prevent-me-system-hardening-ce151454e26b>

Parece buena idea usar distintos engines para distintos conjuntos de secretos, así evitamos mostrar que existen a quien no haga falta.
No usar docker si es posible.
TLS 1.3 hasta vault, con HSTS
Obligar a MFA
El token generado tras el login que sea short lived (9h, con max ttl 24h?)
Usar IaC para configurar vault (<https://registry.terraform.io/providers/hashicorp/vault/latest/docs>)
Activar auditing
Hacer backups
Meter dentro de la VPN?
pros: más seguro
cons: sin acceso sin vpn (posibilidad de cachear con el proxy v1.16; cuanto tiempo? perdemos auditing, se baja todo)
Transmitir las claves de unseal de manera segura
Borrar el token root (se puede regenerar con las claves de unseal)
Desactivar el histórico de bash si vamos a meter info sensible.

# Arrancar server

Modo desarrollo (sin config):
vault server -dev -dev-root-token-id="root"

Tenemos que inicializarlo tras arrancarlo (antiguo, ver como es ahora):
vault operator init -key-shares=3 -key-threshold=1

Luego hacer el unseal.
Luego loguearnos.

# Config

Arrancar sin TLS, con una configuración simple para hacer pruebas.

```
disable_mlock = true

storage "file" {
  path = "/mnt/blob"
}

listener "tcp" {
  address = "[::]:8200"
  tls_disable = true
}

api_addr = "http://127.0.0.1:8200"
```

Para inicializarlo:
VAULT_ADDR=<http://127.0.0.1:8200> vault operator init

Si solo queremos una key de unseal podemos usar:
vault operator init -key-shares=1 -key-threshold=1

Luego haremos el unseal
VAULT_ADDR=<http://127.0.0.1:8200> vault operator unseal

Y luego podremos ya usarlo con el root token:
VAULT_TOKEN=hvs.XXX VAULT_ADDR=<http://127.0.0.1:8200> vault secrets list

# Auth methods

<https://developer.hashicorp.com/vault/docs/auth>

Podemos usar servicios de terceros para hacer la autenticación: AWS, Azure, Google cloud, github, etc.

Vault funciona validando el usuario y devolviéndole un token. Todas las peticiones en adelante se harán con ese token.

Ver cuales tenemos activos
vault auth list -detailed

Valores por defecto para ttl:
vault read sys/auth/token/tune
vault read sys/auth/userpass/tune

Modificar el default ttl:
vault auth tune -default-lease-ttl=72h github/
Modificar el tiempo máximo de ttl:
vault auth tune -max-lease-ttl=2m userpass/

Mirar también info en la sección Tokens.

## Auth con user/pass

<https://www.vaultproject.io/docs/auth/userpass.html>

Tenemos que activar el Auth Method user/pass.
vault auth enable userpass

Una vez activo usaremos la consola para crear usuarios:
vault write auth/userpass/users/mitchellh password=foo policies=admins

Para que funcione la cli (tendremos que pasar un token):
vault login
vault login -method=userpass username=foo
guardará el token en ~/.vault-token

Podemos usar un token-helper para almacenar ese token de forma segura.
Lo configuramos en ~/.vault con "token_helper = /foo/path"

<https://github.com/frntn/vault-token-helper-gopass>
mirar como configurarlo en <https://github.com/sethvargo/vault-token-helper-osx-keychain>
Este de gopass es muy simple, guarda el contenido en un path de gopass que le digamos
En mi caso lo guardo en privado/vault-auth
<https://github.com/joemiller/vault-token-helper>
soporte para pass, linux dbus secrets, osx, windows

Si queremos únicamente obtener el token (no lo guardará en ~/.vault-token):
vault login -token-only -method=userpass username=foo

O sacar la info en una tabla, como la salida normal, pero tampoco generar el ~/.vault-token:
vault login -no-store -method=userpass username=foo3

## LDAP

<https://developer.hashicorp.com/vault/docs/auth/ldap>

vault auth enable ldap

Configuración donde tenemos que especificar como se mapean los usuarios y grupos en el LDAP:
vault write auth/ldap/config \
 url="ldap://ldap.example.com" \
 userdn="cn=opensolutions,dc=ldap,dc=opensolutions,dc=clou" \
 groupdn="ou=Groups,dc=example,dc=com" \
 groupfilter="(&(objectClass=group)(member:1.2.840.113556.1.4.1941:={{.UserDN}}))" \
 groupattr="cn" \
 upndomain="example.com" \
 certificate=@ldap_ca_cert.pem \
 insecure_tls=false \
 starttls=true

Si queremos autenticarnos haciendo un bind DN con el usuario, podemos definir
userattr y userdn.
El bind se generará como:
"%s=%s,%s", cfg.UserAttr, EscapeLDAPValue(username), cfg.UserD

## OIDC / OpenID Connect

<https://developer.hashicorp.com/vault/tutorials/auth-methods/oidc-auth>
Implementación que usa vault para OIDC: <https://github.com/hashicorp/cap/tree/main/oidc>

Una extensión de oauth para hacer autenticación.

La idea es tener un identity provider (google, azure, etc)

Para autenticar con google solo falta oauth. Si queremos obtener los grupos si hace falta permisos de admin.
<https://developer.hashicorp.com/vault/tutorials/auth-methods/google-workspace-oauth>
<https://www.kostavro.eu/posts/2021-02-18-hashicorp-vault-part1/>
Los grupos de google se administran en: <https://groups.google.com/all-groups>
Podemos crear también subgrupos.

vault write auth/oidc/config -<<EOF
{
"oidc_discovery_url": "<https://accounts.google.com>",
"oidc_client_id": "XXX",
"oidc_client_secret": "XXX",
"default_role": "user",
"provider_config": {
"provider": "gsuite",
"gsuite_service_account": "/home/foo/idp-e7872456d12e-service-account-group-admin.json",
"gsuite_admin_impersonate": "<admin@foo.io>",
"fetch_groups": true,
"fetch_user_info": true,
"groups_recurse_max_depth": 5
}
}
EOF

vault write auth/oidc/role/user -<<EOF
{
"allowed_redirect_uris": "<http://localhost:8200/ui/vault/auth/oidc/oidc/callback,http://localhost:8250/oidc/callback>",
"user_claim": "email",
"groups_claim": "groups",
"verbose_oidc_logging": true,
"oidc_scopes": ["openid","email","profile"],
"claim_mappings": {
"sub": "google_id",
"email": "email",
"name": "name"
}
}
EOF

Para debuear podemos activar
vault write auth/oidc/role/your_default_role verbose_oidc_logging=true

<https://developer.hashicorp.com/vault/docs/auth/jwt#claims-as-metadata>
Para mapear metadata del OIDC a Vault usaremos los "claim_mappings".

### Mapear grupos de OIDC a grupos de Vault

<https://support.hashicorp.com/hc/en-us/articles/17137847224083-Azure-AD-Group-Mapped-to-Vault-External-Groups-auth-via-OIDC>
Para mapear los grupos de OIDC a policies de Vault haremos:

1. Crear un grupo type=external con las policies que queramos asignar
   vault write identity/group name="soporte_ext" type="external" policies="policy1,policy2"

2. Crear un group-alias, que mapeará el grupo de OIDC (puesto en "name") con el ID (grupo external de Vault) puesto en canonical_id.
   También tendremos que poner el mount_accessor, el del método de auth que estamos usando, lo podemos obtener con "vault auth list".
   vault write identity/group-alias name='<soporte@foo.io>' mount_accessor='auth_oidc_8e111111' canonical_id=11111111-3cec-5808-bc64-ffc1b528eaeb

### Vault como OIDC provider

<https://developer.hashicorp.com/vault/tutorials/auth-methods/oidc-identity-provider>

Esto es para que las aplicaciones se autentiquen contra vault.
Lo de arriba es para que puedas usar un OIDC externo para autenticarte contra vault.

### Desarrollo

<https://github.com/hashicorp/vault-plugin-auth-jwt>

Para cargar el plugin:
vault plugin register \
 -sha256=$(sha256sum vault-plugin-auth-jwt/bin/vault-plugin-auth-jwt | cut -d ' ' -f 1) \
 -command="vault-plugin-auth-jwt" \
 auth \
 oidc
vault auth enable -plugin-name='oidc' plugin

Para cambiarlo:
vault auth disable oidc
...register...
...enable...
Y cargar la config de ODIC (vault write...)

## AppRoles

Para máquinas usar AppRoles
<https://developer.hashicorp.com/vault/docs/auth/approle>

Activarlo

```
vault auth enable approle
```

Crear un named role:

```
vault write auth/approle/role/my-role \
    token_type=batch \
    secret_id_ttl=10m \
    token_num_uses=10 \
    token_ttl=20m \
    token_max_ttl=30m \
    secret_id_num_uses=40
```

## MFA/2FA

<https://developer.hashicorp.com/vault/docs/auth/login-mfa>

## Identity

<https://developer.hashicorp.com/vault/docs/secrets/identity>

Internamente Vault usa identity/ para almacenar los clientes conectados (excepto los que usan tokens).

vault path-help identity/

Ver las entities:
vault list identity/entity/id/

Detalle de una:
vault read identity/entity/id/53dcc787-3fa3-ce57-21bb-04b472957be5

Esas entities tendrán mapeados "alias", que serán los distintos métodos de acceso que se habrán usado:
vault list identity/alias/id/

Mostrar todos los alias name junto con su entity id:
for i in $(vault list -format=json identity/alias/id/ | jq -r '.[]'); do vault read -format=json identity/alias/id/$i | jq '.data | {"id":.canonical_id,"email":.metadata.email}'; done

Podemos asociar muchos alias a una única entity, de esta manera podríamos hacer que un usuario que se loguea de distintas
maneras siempre sea el mismo de cara a vault.

Los alias son los mapeos entre entities de vault y proveedores de identidad (terceros o locales).

### Groups

<https://developer.hashicorp.com/vault/tutorials/auth-methods/identity#create-an-internal-group>
<https://irezyigit.medium.com/vault-authorization-part-2-aliases-entities-and-groups-4f044d1e2010>

vault write identity/group name="engineers" \
 policies="team-eng" \
 member_entity_ids=$(cat entity_id.txt) \
 metadata=team="Engineering" \
 metadata=region="North America"

También se pueden crear grupos "external", para mapearlos a aquellos de los proveedores de identidad externos.
vault write -format=json identity/group name="education" \
 policies="education" \
 type="external" \
 metadata=organization="Product Education" | jq -r ".data.id" > group_id.txt

## Token

<https://developer.hashicorp.com/vault/tutorials/tokens/token-management>
<https://developer.hashicorp.com/vault/tutorials/tokens/tokens>

Info sobre el token que estamos usando actualmente
vault token lookup
En formato API:
auth/token/lookup-self

Ver todos los tokens actuales:
vault list -format=json auth/token/accessors/ | jq -r ".[]" | xargs -n 1 vault token lookup -format=json -accessor | jq '.data'

Crear un token:
vault token create -policy=my-policy -ttl=1h -explicit-max-ttl=2h
vault token create --period=0 -orphan -no-default-policy -policy=read-telemetry

Renovar un token (si es renovable), mantenemos el mismo token, pero se actualiza su tiempo de vida:
vault token renew

Los token tienen un tiempo de vida por defecto, default_lease_ttl, y un tiempo de vida máximo (max_lease_ttl).
Cuando nos logueamos se nos da un token con el ttl por defecto.
Podemos renovarlo sin pasarnos de max_lease_ttl. Al pasar ese tiempo tendremos que loguearnos de nuevo.

También existen los token periódicos, que tienen un ttl y se pueden renovar indefinidamente (mientras lo hagamos en ese ttl).

# Engines

<https://developer.hashicorp.com/vault/docs/secrets>

Son "funciones" que puede realizar Vault.
Cada una asociada a un "path".
Por ejemplo:
kv: almacenar key-values, la kv-v2 tiene versionado (por defecto 10)
vault secrets enable kv
vault secrets enable -version=2 -path=kv2 kv
totp
certificados
cloud varias: generar tokens dinámicos de acceso con tiempo de vida
cubbyhole: engine temporal asociado a un token que se destruye cuando expira el token, parece como un "create temp table" de sql. Útil para compartir credenciales, mirar "Share secrets"
transit: encriptar y desencriptar datos

Ver los que tenemos disponibles:
vault plugin list secret

Ayuda específica de cada engine:
vault path-help PATH/

Cada engine está separado del resto. Si hackeasen un engine, no podrían saltar al resto.
<https://developer.hashicorp.com/vault/docs/secrets#barrier-view>

Ejemplo, crear un engine kv:
vault secrets enable -path=kv kv

## LDAP

Esto no es para autenticar, si no para gestionar LDAP.

<https://developer.hashicorp.com/vault/tutorials/secrets-management/openldap>
<https://developer.hashicorp.com/vault/docs/secrets/ldap>

vault secrets enable ldap

vault write ldap/config binddn=$USERNAME bindpass=$PASSWORD url=ldaps://138.91.247.105

Opcional: podemos forzar el rotado de la pass de "root", para que solo openldap la conozca:
vault write -f ldap/rotate-root

Por defecto el schema usado por Vault es el que usa OpenLDAP, donde el usuario se lamacena en userPassword.

## Database

<https://developer.hashicorp.com/vault/docs/secrets/databases>
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

## transit

<https://developer.hashicorp.com/vault/tutorials/encryption-as-a-service/eaas-transit>

Le pasamos un texto y nos devuelve una cadena encriptada, que luego se la podemos enviar de nuevo para que nos la desencripte.

vault write transit/encrypt/orders plaintext=$(base64 <<< "4111 1111 1111 1111")
vault write transit/decrypt/orders ciphertext=$CIPHERTEXT

# ACL

<https://developer.hashicorp.com/vault/tutorials/policies/policies>
<https://irezyigit.medium.com/vault-authorization-acl-access-control-list-policies-d220be54ca31>
<https://github.com/jeffsanicola/vault-policy-guide>

Las ACL deciden que se puede hacer para cada path.
Ejemplo:
path "secret/\*" {
capabilities = ["create", "read", "update", "delete", "list"]
}

Esta ACL permite todos las capabilities bajo el path secret/

Para aplicarla, creamos la policy "admin":
vault policy write admin admin-policy.hcl

Luego tendremos que poner las policies a los usuarios:
write auth/userpass/users/nombre policies=admins,all

CUIDADO! si escribimos mal la policie no se hace ninguna comprobación. Si no matchea con una existente, simplemente se ignora.

Deben loguearse de nuevo (obtener un nuevo token), si le hemos cambiado las polcies.

Capabilities (y el verbo HTTP asociado):
create POST/PUT
read GET
update POST/PUT
delete DELETE
list LIST
patch PATCH
sudo -
deny -

Permitir ver los engines que hay (vault secrets list):
path "sys/mounts"
{
capabilities = ["read"]
}

Hay otro endpoint que solo permite ver los mounts donde tengamos permisos:
sys/internal/ui/mounts

Ver las políticas que tenemos:
vault policy list
vault policy read admin

Comprobar las capabilities de un token
vault token capabilities $ADMIN_TOKEN sys/auth/approle

Obtener que ACL hacen falta para una operación
vault kv get -output-policy -mount=secret customer/acme
vault kv put -output-policy -mount=secret customer/acme customer_name="ACME Inc." contact_email="<john.smith@acme.com>"

Ver nuestra ACL
vault read -format=yaml sys/internal/ui/resultant-acl | faq -f yaml .data

Para poder hacer

## Templating

<https://developer.hashicorp.com/vault/tutorials/policies/policy-templating>

# Grupos

Podemos crear un grupo y asignarle unas ACLs.
Luego podemos agregarle unos usuarios.
Los usuarios heredaran las ACLs del grupo.

# Entities / alias

Varios usuarios de distintos auth engines pueden unirse en un entitie.
Sería la forma de centralizar el usuario que se loguea por github y por ldap.

# Audit / traces

<https://developer.hashicorp.com/vault/docs/audit>
Detailed log of all requests to Vault, and their responses

Por defecto no viene activo.

Asegurarnos que tiene permisos de escritura en el path:
vault audit enable file file_path=/var/log/vault_audit.log

Nos genera un JSON por cada iteración.
La información sensible viene hasheada. Es posible desactivarlo (log_raw=true), pero entonces estaremos volcando información confidencial en el log.

elide_list_responses, por si queremos quitar las respuestas tipo "list", que pueden generar entradas muy largas en el log.

# Password policies / generación contraseñas

<https://developer.hashicorp.com/vault/docs/concepts/password-policies>
<https://developer.hashicorp.com/vault/docs/secrets/kv/kv-v2#:~:text=Write%20a%20password%20policy%3A>

En kv podemos usarlo para tener un generador de passwords de un formato determinado.
Típico uso:
vault kv put -mount=secret my-generated-secret \
 password=$(vault read -field password sys/policies/password/example/generate)

Por defecto vault tiene una política por defecto para generar contraseñas (cuando usamos plugin "databases" que crear passwords dinámicas).

# CLI

## Loguearnos server remoto

vault login -address=<http://vault.com:8200> -method=userpass username=adrian
Otra forma:
VAULT_ADDR=<http://vault.com:8200> vault ...

Cada vez que queramos comunicar con un server que no es local deberemos pasar el VAULT_ADDR o -address

## Autocompletado

<https://www.vaultproject.io/docs/commands/index.html#autocompletion>

Para que funcione el autocompletado tendremos que tener el ACL:
path "sys/mounts" {
capabilities = ["read"]
}
Asi podemos hacer cosas tipo:
vault read s\*<TAB>
E ir navegando por el arbol de secrets

Parece que "vault kv get/put/... <TAB>" no funciona
Tampoco para "vault write"

Como funciona internamente. Zsh llama a vault pasándole variables de entorno:
COMP_CWORD=3 COMP_LINE="vault kv get gopass/wi" COMP_POINT=24 vault

## Status

vault status
vault status -tls-skip-verify

VAULT_SKIP_VERIFY=true vault ...

Ignorar certs, tls, https, skip.

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

## AutoUnseal

Podemos usar otro servidor con claves para desbloquear el vault de manera automática.
El típico escenario es un vault desplegado en una nube, con las claves guardadas en un almacen de claves de dicha nube.

### Vault transit

<https://developer.hashicorp.com/vault/tutorials/auto-unseal/autounseal-transit>

Existe la opción es usar otro servidor vault para hacer unseal.

Ese segundo vault necesita tener el plugin transit activado.
vault secrets enable transit

Y una clave de encriptación:
vault write -f transit/keys/autounseal

Luego configuramos el segundo vault (el que tendrá auto unseal). Mirar la config en la doc.
Luego tendremos que inicializarlo (operator init).
En este caso nos devolverá el root token y claves de recuperación.

Si el segundo vault se reinicia, lo que hará es enviar las claves de unseal que tiene cifradas al primer vault, que las devuelve descifradas.
Y con esas claves se desbloquea el vault.
Mirando el tráfico, parece que primero encripta una cadena "tonta" y entiendo que ¿usará ese resultado para no enviar las claves tal cual?

### kv storage

Listar contenidos de un storage tipo KV (con el motor KV debe usarse "kv get/list/put" en vez de directamente "get/list/put")
vault kv list nombrePath
vault kv put some/path foo=bar foo2=bar2
si ya existe "some/path", lo estaremos borrando y recreando con estos valores
vault kv put kv/contacts/mario value=@prueba.yaml
subir un fichero.
Si queremos subir un fichero binario, usar base64
vault write kv/bin file=@<(cat /usr/bin/fc-cache | base64)
vault read -field=file kv/contacts/bin | base64 -d > fcat
Otra opción:
base64 /path/to/file | vault kv put secret/myapp/secretname file=-

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

Editar un secret (script bash custom <https://gist.github.com/adrianlzt/9ef4a1d1c966494ba596c3a1886aaebc>):
vault-editor kv/secret/secret-name

En el KV engine se puede confiurar para borrar los secrets cada x tiempo:
<https://www.vaultproject.io/api-docs/secret/kv/kv-v2#delete_version_after>

Copiar secrets entre distintos paths (si queremos mantener version mirar <https://gist.github.com/elasticdog/e82f0b8e63407cbb6af69341cb9d0336?permalink_comment_id=5013818#gistcomment-5013818>):
vault kv get -format=json kv/origin/path | vault kv put kv/destination/path -
vault kv get -format=json -field=data kv/origin/path | vault kv put kv/destination/path -

CLI para buscar en paths, keys o values:
<https://github.com/xbglowx/vault-kv-search>

Nos permite tener acceso a todas las credenciales e ir navegando con fuzzy search
vault-kv-search --search=path kv -r . --json | jq -r .path | sort -u | fzf --preview 'vault kv get --format=yaml ${} | faq -f yaml .data'

Se puede especificar la versión del KV, quitando la llamada a "mounts" y así poder usar el cacheo del proxy.
vault-kv-search --search=path kv -r . --json -k=1 | jq -r .path | sort -u | fzf --preview 'vault read -format=yaml ${} | faq -f yaml .data'
Para V2:
vault-kv-search --search=path kv/ -r . --json -k=2 | jq -r .path | sort -u | sed "s#\([^/]_\)/\(._\)#\1/data/\2#" | fzf --preview 'vault read -format=yaml ${} | faq -f yaml .data.data'

<https://github.com/hashicorp/vault/issues/5275>
Issue sobre lo de buscar o acceso recursivo.

<https://github.com/kir4h/rvault>
Small tool to perform some recursive operations on Hashicorp's Vault KV

<https://falcosuessgott.github.io/vkv/>
list, compare, import, document, backup & encrypt secrets

Otro cliente, en python
<https://vault-cli.readthedocs.io/>

## CLI safe

<https://github.com/Qarik-Group/safe>
Guarda el token en claro en $HOME/.saferc
No tiene autocompletado
Permite usar distintos servers de vault

## Otras herramientas

<https://github.com/gites/awesome-vault-tools>

## vaku

<https://github.com/Lingrino/vaku>
Usar las variables de entorno estandar.
Autocompletado, pero no navega por los engines ni paths.
Forzar a cachear todo el contenido de un engine, para poder tenerlo offline en nuestro cache.
Vaku necesita parche para no usar namespaces.
/home/adrian/Documentos/repos/vaku/vaku folder list gopass/ | parallel -j 10 vault read gopass/data/{} > /dev/null

## vht

<https://github.com/ilijamt/vht>
El buscador está bastante bien.
No tiene autocompletado para zsh.

## fuse

Montar los engines como ficheros

Issue solicitándolo: <https://github.com/hashicorp/vault/issues/110>

<https://github.com/jboero/hashifuse/tree/master/VaultFS>
no me deja vajar más de un nivel en kv2
<https://github.com/jboero/hashifuse/issues/7>

<https://github.com/asteris-llc/vaultfs>
sin desarrollo desde Marzo 2016
en go
me da un panic al intentar usarlo
hay algunos forks más recientes (2017), peo tampoco me funcionan

<https://github.com/PsyanticY/vaultfs>
sin desarrollo desde mayo 2021
python
sin terminar, no soporta "ls"

### TOTP

vault write totp/keys/my-key4 url="otpauth:///?secret=AAB7LBD7AAAAAAAA"
vault read totp/code/my-key4

<https://developer.hashicorp.com/vault/docs/secrets/totp#as-a-provider>
Tambíen se puede usar como provider.
Generando el código totp, que un cliente usará para generar el código totp y luego pudiendo verificar que ese código es correcto.
vault write totp/keys/my-gen generate=true account_name=x issuer=x
nos da el código en la variable "secret" de la url.

No implementado en la UI.

### SSH

<https://developer.hashicorp.com/vault/docs/secrets/ssh>

#### One time password

<https://developer.hashicorp.com/vault/docs/secrets/ssh/one-time-ssh-passwords>
El host remoto necesita poder conectar contra vault.

#### Signed certificates

Se crea una CA. Su llave pública se lleva a los servers donde queremos acceder.
Vault firma certificados ssh para permitiendo acceder a los servidores.

<https://github.com/isometry/vault-ssh-plus>
util para poder hacer "vssh servidor" y que gestione todo automáticamente por debajo.

Activar el engine
vault secrets enable -path=ssh-client-signer ssh

Crear una CA para firmar los certs:
vault write ssh-client-signer/config/ca generate_signing_key=true
O si ya tenemos una CA:
vault write ssh-client-signer/config/ca \
 private_key="..." \
 public_key="..."

Obtener la clave pública:
vault read ssh-client-signer/public_key -format=raw

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
"allowed_users": "\*",
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

Para navegar por los roles de un ssh mount:
vault list datadope-ssh/roles/

Detalles:
vault read datadope-ssh/roles/datadope-vault-vm

# Share secrets

<https://developer.hashicorp.com/vault/tutorials/secrets-management/cubbyhole-response-wrapping>

Si queremos compartir unas credenciales con alguien, que también tiene acceso a Vault:

- crearemos lo que necesitamos en nuestro cubbyhole
- haremos un wrap de ese secret
- compartiremos la cadena generada
- la otra persona podrá obtener la credencial una única vez

Desde la web también se puede hacer. En tools también podemos generar un wrapped al vuelo y tenemos una tool para hacer el unwrapped.

Obtenemos el wrapped token, ejemplos para cubbyhole y kv:
vault write cubbyhole/pepe foo=bar
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

Trae integrada una, pero no muy potente. No tiene buscador, por ejemplo.

<https://github.com/adobe/cryptr>
Última release Apr/2022
Para ver las keys necesita permiso de lectura sobre sus policies:
<https://github.com/adobe/cryptr?tab=readme-ov-file#secret-discovery>
path "sys/policy/POLITICA_ASIGNADA" {
capabilities = ["read"]
}

ARCHIVED 2019
La mejor (Vue.js + Go): <https://github.com/caiyeon/goldfish>
Demo: <https://vault-ui.io/>
Prod: <https://github.com/Caiyeon/goldfish/wiki/Production-Deployment>

Otra en React: <https://github.com/djenriquez/vault-ui> ARCHIVED
Otra: <https://github.com/nyxcharon/vault-ui> ARCHIVED

# API

```
curl -H "X-Vault-Token: foobarxxx" "http://127.0.0.1:8200/v1/secret?list=true"
curl -H "X-Vault-Token: $(vault print token)" -H "X-Vault-Request: true" http://127.0.0.1:8101/v1/kv/foo3
```

Ver que petición equivalente curl haría el cliente (no devuelve el valor, pero algo envía al server):
vault kv get -output-curl-string kv/foo3

<https://developer.hashicorp.com/vault/api-docs/system/health>
Obtener el estado del vault:
curl -s localhost:8200/v1/sys/health | jq

## Python

<https://pypi.org/project/hvac/>

Exportar VAULT_ADDR y VAULT_TOKEN
import hvac
client = hvac.Client()
client.secrets.kv.v2.list_secrets(mount_point="kv2", path="/")
client.secrets.kv.v2.create_or_update_secret(mount_point="kv2", path="/py", secret=dict(psss="1223", foo=333, bar=dict(abc=dict(jose:=1))))

# Vault agent and proxy

Aplicaciones para facilitar la integración de apps existentes con vault.
Podremos atacar a su API sin necesitar el token.

## AutoAuth

<https://developer.hashicorp.com/vault/docs/agent-and-proxy/autoauth>

Ambos tienen la funcionalidad de AutoAuth.
Se loguean contra Vault y dejan en un fichero la clave.
Actualizan ese fichero cuando caduque la clave.

## Cache

Ambos tienen cache, pero parece que solo cachean tokens y leases.
Valores de un engine kv no se cachean, en el log del agente/proxy vemos:
[DEBUG] agent.cache.leasecache: pass-through response; secret not renewable: method=GET path=/v1/kv/data/prod/zabbix

En la versión 1.16 el proxy podrá cachear kv: <https://github.com/hashicorp/vault/issues/19879>

El problema es que si usamos la cli, esta hace siempre una llamada a /v1/sys/internal/ui/mounts/kv (<https://developer.hashicorp.com/vault/api-docs/system/internal-ui-mounts>)
que no se cachea, por lo que si el server está caído no funciona.

Si usamos llamadas directas (sin usar "vault kv ..."), evitamos las llamadas a mounts. Ejemplo:
vault list kv2/metadata
para hacer un kb ls kv2/
vault list kv2/metadata/foo
para hacer un kb ls kv2/foo
vault read kv2/data/bar
para hacer un kv get kv2/bar

Si queremos usar "kv XX" necesitamos forzar (-kv-version=N) la versión del KV, para evitar que la tenga que consultar.
Parche con esa funcionalidad.
<https://github.com/hashicorp/vault/issues/19879>

El autocompletado no funcionará, porque internamente usa otro camino, que también obtiene el namespace
<https://github.com/hashicorp/vault/blob/2051758f04434fbcf99dc4180802e08e2a073748/command/base_predict.go#L255>

## Vault proxy

Parece que es un intermediario con Vault que tiene AutoAuth y puede cachear.

## Vault Agent

Parece que es para generar ficheros a partir de templates usando info de vault.
También puede ejecutar procesos inyectando secretos como variables de entorno.
Puede cachear.

Podemos configurar el agent para que levante un proceso con una variable de entorno determinada y que reinicie el proceso si se cambia la variable de entorno (si no reiniciamos la variable de entorno que ve el programa no se modifica).

# Integrar vault con systemd

<https://medium.com/@umglurf/using-systemd-credentials-to-pass-secrets-from-hashicorp-vault-to-systemd-services-928f0e804518>

# Backend storage

<https://developer.hashicorp.com/vault/docs/configuration/storage>
Se recomienda usar el método de ficheros que trae por defecto.

# Namespaces (enterprise feature)

<https://developer.hashicorp.com/vault/tutorials/enterprise/namespaces>
Each namespace would have its own auth methods, secrets engines, policies, and so on. Think of it as a mini-vault.

# Terraform

Se puede usar para provisionar vault.

Puede ser sencillo usar terraformer para generar los .tf files a partir de cosas ya creadas en un vault donde hagamos las cosas a mano
terraformer plan vault --resources=policy

# Ansible

<https://docs.ansible.com/ansible/devel/plugins/lookup/hashi_vault.html>

Otro módulo no oficial con ciertas mejoras: <https://github.com/jhaals/ansible-vault>

# Debug

<https://www.vaultproject.io/docs/commands/debug>

vault debug
lo arrancamos, hacemos interacciones y lo paramos. Nos genera un .tgz con ficheros con datos (pero no veo las llamadas de clientes)
Es para el vault server

Si queremos ver que peticiones hace vault hacia fuera podemos hacer un MitM, con burpsuite por ejemplo.

```bash
HTTPS_PROXY=http://localhost:8080 vault server
```

Tendremos que instalar la CA de burp en nuestro SO.

Para el cliente:

```bash
HTTPS_PROXY=http://localhost:8000 VAULT_SKIP_VERIFY=true vault ...
```

# Backup

Cuidado si usamos autounseal, porque si perdemos acceso al provider que usa para desbloquear, no podremos recuperar los datos.
