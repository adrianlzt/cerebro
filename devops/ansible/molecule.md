https://github.com/metacloud/molecule
https://molecule.readthedocs.io/en/latest/

Lo usamos para levantar la infraestructura que necesitamos para hacer los tests.
La idea es, levantar la infra (con vagrant por ejemplo), desplegar el rol de ansible que queremos probar y luego verificar que todo va bien con testinfra (entre otras opciones)

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
