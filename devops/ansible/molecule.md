https://github.com/metacloud/molecule
https://molecule.readthedocs.io/en/latest/
https://www.ansible.com/blog/developing-and-testing-ansible-roles-with-molecule-and-podman-part-1
  la doc oficial está muy coja. Esta doc ayuda, pero está también desactualizada respecto a la v4

Lo usamos para levantar la infraestructura que necesitamos para hacer los tests.
La idea es, levantar la infra (con vagrant por ejemplo), desplegar el rol de ansible que queremos probar y luego verificar que todo va bien con testinfra (entre otras opciones)

Para levantar la infra se usa el propio ansible.
Parece que los métodos soportados oficlamente son docker y podman.

# Conceptos
scenario: podemos tener varios por rol. Es cada test suite que queremos
platforms: los distintos SOs donde queremos probar
driver: que servicio usamos para crear la máquina donde probar (docker, podman, ost, etc)

Flujo típico (lo que hace molecule test):
dependency, lint, cleanup, destroy, syntax, create, prepare, converge, idempotence, side_effect, verify, cleanup, destroy

Si hacemos un create haremos:
dependency, create, prepare

Si lanzamos prepare no se ejecutará si ya se ha ejecutado, pero lo podemos forzar con:
molecule prepare -f

## Para collections
https://www.jeffgeerling.com/blog/2019/how-add-integration-tests-ansible-collection-molecule
https://ericsysmin.com/2020/04/30/ansible-collections-role-tests-with-molecule/

Según el segundo, parece que lo mejor es un dir molecule/ a la altura de la collection.
Para inicializarlo:
molecule init scenario

Luego crear un escenario por role:
molecule init scenario NOMBRE


# Install
```
pip install ansible molecule "molecule[podman]" "molecule[docker]"
```

# Crear rol con molecule integrado
molecule init role datadope.pruebas_test_role -d DRIVER

Los valores que podemos poner en DRIVER vienen definidos por esta función:
https://github.com/ansible-community/molecule/blob/52faa6647f2297f9a8f75dcc751299528ebadf64/src/molecule/api.py#L48

Si no sale nada, verificar que estamos usando el ansible y python donde hemos instalado molecule y sus drivers.
Mirar con:
molecule drivers


## Estructura ficheros
molecule/NOMBRE_SCENARIO/molecule.yml: parametrización
molecule/NOMBRE_SCENARIO/converge.yml: playbook que llama al rol
molecule/NOMBRE_SCENARIO/verify.yml: donde definimos lo que queremos testear (también se puede usar testinfra)

create.yml: si no existe, se usa uno por defecto del driver.

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

Para usarlo:
molecule lint

## create
Creará las VMs o contenedores

Si queremos forzarlo, podemos marcar el estado de create a false en el state
~/.cache/molecule/NOMBRE_ROLE_O_COLLECTION/NOMBRE_SCENARIO/state.yml


## converge
Cada vez que hacemos una modificación en el rol podemos ejecutar:
molecule converge

Para aplicar el rol a las platforms del scenario.

## login
molecule login

Nos mete en la VM o contenedor para poder ver a mano que hemos hecho

## idempotence
Ejecutará el rol dos veces para ver que tenemos idempotencia

## verify
Ejecuta el playbook de verify para comprobar que se cumplen los tests que hayamos definido

Podemos definir tests más complejos, aplicando distintos side effects y luego verifies:
https://molecule.readthedocs.io/en/latest/configuration.html#root-scenario:~:text=%3A-,Advanced%20testing,-If%20needed%2C%20Molecule

## destroy
Borrar las VMs/containers.
Tendremos que ejecutarlo si queremos cambiar de provisioner

# Drivers

## Docker
A partir de la imagen base que le pasamos, construye una nueva para ser compatible.
Usa este dockerfile: https://github.com/ansible-community/molecule-docker/blob/c2c6dbef50dd4fe2c1e6d27aa386156d66f49ffb/src/molecule_docker/playbooks/Dockerfile.j2

Se pueden customizar las imágenes base con Dockerfiles que dejemos en el scenario
https://molecule.readthedocs.io/en/latest/examples.html#customizing-the-docker-image-used-by-a-scenario-platform


## Openstack
pipenv install molecule molecule-openstack ansible openstacksdk
molecule init role datadope.pruebas_test_role


# Internals
El estado lo almacena en
~/.cache/molecule/NOMBRE_ROLE_O_COLLECTION/NOMBRE_SCENARIO/state.yml
Por ejemplo:
~/.cache/molecule/ansible-collection-iometrics__role_tests/jboss-monitor/state.yml

En el fichero molecule.yml tendremos el render completo del fichero (lo que hayamos definido + defaults para el resto de cosas).


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
