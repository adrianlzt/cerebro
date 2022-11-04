https://github.com/metacloud/molecule
https://molecule.readthedocs.io/en/latest/

Lo usamos para levantar la infraestructura que necesitamos para hacer los tests.
La idea es, levantar la infra (con vagrant por ejemplo), desplegar el rol de ansible que queremos probar y luego verificar que todo va bien con testinfra (entre otras opciones)

Para levantar la infra se usa el propio ansible.
Parece que los métodos soportados oficlamente son docker y podman.

# Conceptos
scenario: podemos tener varios por rol. Es cada test suite que queremos
platforms: los distintos SOs donde queremos probar
driver: que servicio usamos para crear la máquina donde probar (docker, podman, ost, etc)

# Install
```
pip install ansible molecule "molecule[podman]" "molecule[docker]" "molecule[lint]"
```

# Crear rol con molecule integrado
molecule init role datadope.pruebas_test_role

## Estructura ficheros
molecule/NOMBRE_SCENARIO/molecule.yml: parametrización
molecule/NOMBRE_SCENARIO/converge.yml: playbook que llama al rol
molecule/NOMBRE_SCENARIO/verify.yml: donde definimos lo que queremos testear (también se puede usar testinfra)

Por defecto el driver será "delegated", es decir, que se delega al desarrollador la conexión a la máquina donde probar.

## Lint
Si queremos linter, añadiremos al molecule.yml
```
lint: |
  set -e
  yamllint .
  ansible-lint
  flake8
```


# Openstack
pipenv install molecule molecule-openstack ansible openstacksdk
molecule init role datadope.pruebas_test_role

# ANTIGUO

Generalmente lanzaremos primero:
molecule create
  creamos la vm

molecule converge
  esto desplegará el playbook sobre la VM

molecule idempotence
  esto mirará que no se produce ningún cambio

molecule verify
  lanzamos los tests sobre nuestra vm
  Si lo hacemos con testinfra lanzará algo tipo: testinfra tests/test_infra.py --connection=ansible --ansible-inventory=.molecule/ansible_inventory --sudo



# Idempotence
Lo que hace es volver a lanzar el playbook de ansible y ver que ninguna tarea devuelve "changed"


# Debug
molecule --debug CMD
