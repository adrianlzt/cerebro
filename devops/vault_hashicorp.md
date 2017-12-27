https://www.vaultproject.io/

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



# UI
La oficial es de pago: https://www.vaultproject.io/docs/enterprise/ui/index.html

La mejor (Vue.js + Go): https://github.com/caiyeon/goldfish
Demo: https://vault-ui.io/

Otra en React: https://github.com/djenriquez/vault-ui
Otra: https://github.com/nyxcharon/vault-ui



# Ansible
https://docs.ansible.com/ansible/devel/plugins/lookup/hashi_vault.html

Otro módulo no oficial con ciertas mejoras: https://github.com/jhaals/ansible-vault
