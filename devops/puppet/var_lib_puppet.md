Ficheros interesantes:

classes.txt: que clases tienen este nodo aplicadas
clientbucket: almacen de ficheros modificados
client_data/catalog/HOSTNAME.json: catalog que le envía el puppet master (todos los recursos a aplicar)
lib/: librerias (funciones, custom types, etc) de puppet y facter
state/resources.txt: que recursos están aplicados a esta máquina
state/agent_catalog_run.lock: avisa de que el agent está corriendo (para que no haya varios simultáneamente)
ssl/: certificados del nodo y del master
