https://www.vaultproject.io/

# Auth
Auth con user/pass
https://www.vaultproject.io/docs/auth/userpass.html

Tenemos que activar el Auth Method user/pass.
Una vez activo usaremos la consola para crear usuarios:
vault write auth/userpass/users/mitchellh password=foo policies=admins


# Conceptos
Las ACL deciden que se puede hacer para cada path.
Ejemplo:
path "secret/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

Esta ACL permite todos las capabilities bajo el path secret/

Luego tendremos que poner las policies a los usuarios:
write auth/userpass/users/nombre policies=admins,all



# CLI

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


# Docker
docker run -e "SKIP_SETCAP=1" --name vault -p 8200:8200 -v "${PWD}/config:/vault/config" -v "${PWD}/data:/vault/file" -d vault
  modo desarrollo, vulnerable porque mete pass en swap (hace falta CAP IPC_LOCK, pero me falla)

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
