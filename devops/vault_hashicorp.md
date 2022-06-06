https://www.vaultproject.io/

# Auth
Auth con user/pass
https://www.vaultproject.io/docs/auth/userpass.html

Tenemos que activar el Auth Method user/pass.
Una vez activo usaremos la consola para crear usuarios:
vault write auth/userpass/users/mitchellh password=foo policies=admins


# Conceptos

## ACL
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


## Grupos
Podemos crear un grupo y asignarle unas ACLs.
Luego podemos agregarle unos usuarios.
Los usuarios heredaran las ACLs del grupo.


## Entities / alias
Varios usuarios de distintos auth engines pueden unirse en un entitie.
Sería la forma de centralizar el usuario que se loguea por github y por ldap.



# CLI

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


## Loguearnos server remoto
vault login -address=http://vault.com:8200 -method=userpass username=adrian
Otra forma:
VAULT_ADDR=http://vault.com:8200 vault ...

Cada vez que queramos comunicar con un server que no es local deberemos pasar el VAULT_ADDR o -address

## Crear new vault server
vault init -key-shares=1 -key-threshold=1
  los parámetros indican que la master key solo se dividirá en un trozo y que hará falta un solo trozo para abrir el vault
  devolverá el número de claves master especificado en key-shares y un root token (como se loguea el user root contra el vault)


## Desbloquear/abrir el vault
vault unseal KEY
  debemos pasar las keys necesarias para abrirlo, ejecutando el comando el número de veces definido en key-threshold

## Bloquear/cerrar el vault
vault seal
  esto será una operación poco común, realizada cuando consideremos que el vault está en riesgo
  solo se podrá abrir de nuevo metiendo las claves master
  cualquier user root puede hacer seal del vault


## Crear/borrar secrets
vault write secret/hello value=world
vault read secret/hello

### kv storage
Listar contenidos de un storage tipo KV (con el motor KV debe usarse "kv get/list/put" en vez de directamente "get/list/put")
vault kv list nombrePath
vault kv put some/path foo=bar foo2=bar2


Si queremos usar el motor kv debemos activarlo, por ejemplo, lo activamos en el path secret/
vault secrets enable -path=secret kv
Si no definimos el -path, lo pone en kv/


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

La mejor (Vue.js + Go): https://github.com/caiyeon/goldfish
Demo: https://vault-ui.io/
Prod: https://github.com/Caiyeon/goldfish/wiki/Production-Deployment

Otra en React: https://github.com/djenriquez/vault-ui
Otra: https://github.com/nyxcharon/vault-ui



# Ansible
https://docs.ansible.com/ansible/devel/plugins/lookup/hashi_vault.html

Otro módulo no oficial con ciertas mejoras: https://github.com/jhaals/ansible-vault
